"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import Image from "next/image";

const UsersPage = () => {
    const { getToken, fetchUserData } = useAppContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('customers'); // 'customers' or 'admins'

    const fetchUsers = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get("/api/user/get-all-users", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setUsers(data.users);
            } else {
                toast.error(data.message || "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
            console.error("Fetch users error:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = async (userId, currentRole) => {
        const newRole = (currentRole === 'admin') ? 'user' : 'admin';
        
        // Optimistic Update
        setUsers(prevUsers => 
            prevUsers.map(u => u._id === userId ? { ...u, role: newRole } : u)
        );

        try {
            const token = await getToken();
            const { data } = await axios.post("/api/user/update-role", {
                targetUserId: userId,
                role: newRole
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                toast.success(data.message);
                fetchUserData(); // Sync global state instantly
            } else {
                toast.error(data.message);
                fetchUsers(); // Revert if failed
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "เกิดข้อผิดพลาด");
            fetchUsers(); // Revert if failed
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="w-16 h-16 border-4 border-t-orange-600 border-gray-200 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-screen flex flex-col p-6 md:p-10 bg-gray-50/50 font-sans">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <span className="w-2.5 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></span>
                        จัดการผู้ใช้งาน <span className="text-gray-400 text-lg font-medium ml-2">({users.length} รายการ)</span>
                    </h1>
                    <p className="text-sm font-medium text-gray-500 mt-2 ml-5">
                        รายชื่อผู้ใช้งานและผู้ดูแลระบบทั้งหมด
                    </p>
                </div>
                
                {/* Tabs */}
                <div className="flex bg-gray-200/50 p-1 rounded-2xl w-max">
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                            activeTab === 'customers' 
                            ? 'bg-white text-orange-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        ลูกค้าทั่วไป
                    </button>
                    <button
                        onClick={() => setActiveTab('admins')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                            activeTab === 'admins' 
                            ? 'bg-white text-purple-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        ผู้ดูแลระบบ (Admin)
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex-1">
                
                {/* Desktop View: Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50/80 border-b border-gray-100 text-left">
                            <tr>
                                <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-nowrap">ลูกค้า</th>
                                <th className="py-5 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-nowrap">อีเมล</th>
                                <th className="py-5 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-nowrap">สิทธิ์ (Role)</th>
                                <th className="py-5 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right text-nowrap">จำนวนสินค้าในตะกร้า</th>
                                <th className="py-5 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right text-nowrap">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.filter(u => activeTab === 'admins' ? u.role === 'admin' : (u.role !== 'admin')).map((user, index) => {
                                const cartItemCount = Object.values(user.cartItems || {}).reduce((a, b) => a + b, 0);
                                
                                return (
                                    <tr key={index} className="hover:bg-orange-50/30 transition-colors group">
                                        <td className="py-5 px-8 flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm group-hover:border-orange-200 transition-colors">
                                                <Image 
                                                    src={user.imageUrl || '/default-avatar.png'} 
                                                    alt={user.name} 
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <p className="font-bold text-gray-800 text-sm group-hover:text-orange-600 transition-colors">
                                                {user.name}
                                            </p>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                                                {user.email}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider ${
                                                user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-600 border border-purple-200' 
                                                : 'bg-gray-100 text-gray-500 border border-gray-200'
                                            }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                                                cartItemCount > 0 
                                                ? 'bg-orange-100 text-orange-600' 
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {cartItemCount}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <button 
                                                onClick={() => toggleRole(user._id, user.role || 'user')}
                                                className={`px-4 py-2 rounded-xl text-[11px] font-bold transition-all shadow-sm active:scale-95 ${
                                                    user.role === 'admin'
                                                    ? 'bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50'
                                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                                }`}
                                            >
                                                {user.role === 'admin' ? 'ปลด Admin' : 'ตั้งเป็น Admin'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            
                            {users.filter(u => activeTab === 'admins' ? u.role === 'admin' : (u.role !== 'admin')).length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 font-medium">
                                        {activeTab === 'admins' ? 'ยังไม่มีผู้ดูแลระบบ' : 'ยังไม่มีลูกค้าในระบบ'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Cards */}
                <div className="md:hidden flex flex-col divide-y divide-gray-100">
                    {users.filter(u => activeTab === 'admins' ? u.role === 'admin' : (u.role !== 'admin')).map((user, index) => {
                        const cartItemCount = Object.values(user.cartItems || {}).reduce((a, b) => a + b, 0);
                        
                        return (
                            <div key={index} className="p-6 flex flex-col gap-4 hover:bg-orange-50/30 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image 
                                                src={user.imageUrl || '/default-avatar.png'} 
                                                alt={user.name} 
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                                    user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">ตะกร้า</span>
                                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                            cartItemCount > 0 
                                            ? 'bg-orange-100 text-orange-600' 
                                            : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {cartItemCount}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2">
                                    <div className="bg-gray-50 rounded-lg p-3 flex-1 flex flex-col justify-center border border-gray-100">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">UID</span>
                                        <span className="text-xs font-mono text-gray-500 truncate max-w-[150px]">{user._id}</span>
                                    </div>
                                    <button 
                                        onClick={() => toggleRole(user._id, user.role || 'user')}
                                        className={`rounded-lg px-4 flex items-center justify-center text-xs font-bold transition-all active:scale-95 whitespace-nowrap ${
                                            user.role === 'admin'
                                            ? 'bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50'
                                            : 'bg-gray-900 text-white hover:bg-gray-800'
                                        }`}
                                    >
                                        {user.role === 'admin' ? 'ปลด Admin' : 'ตั้งเป็น Admin'}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    
                    {users.filter(u => activeTab === 'admins' ? u.role === 'admin' : (u.role !== 'admin')).length === 0 && (
                        <div className="py-16 text-center text-gray-400 font-medium">
                            {activeTab === 'admins' ? 'ยังไม่มีผู้ดูแลระบบ' : 'ยังไม่มีลูกค้าในระบบ'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
