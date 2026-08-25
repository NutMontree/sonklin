"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50/50 text-gray-800 flex flex-col font-sans overflow-hidden">
                {/* Hero Section */}
                <section className="relative bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-32 md:py-40 text-center overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-orange-500/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-orange-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                            เกี่ยวกับ<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">เรา</span>
                        </h1>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto mb-8"></div>
                        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            เราคือทีมงานที่มุ่งมั่นสร้างสรรค์ประสบการณ์ดิจิทัลที่ดีที่สุด และยกระดับคุณค่าของขนมไทยสู่สากล
                        </p>
                    </motion.div>
                </section>

                {/* Mission Section */}
                <section className="flex flex-col md:flex-row items-center justify-center gap-16 px-6 py-24 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:w-1/2 space-y-6"
                    >
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                            ภารกิจ<span className="text-orange-600">ของเรา</span>
                        </h2>
                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                เรามุ่งมั่นที่จะสืบสานและเผยแพร่เสน่ห์ของขนมไทย
                                ผ่านรสชาติที่กลมกล่อมและวัตถุดิบคุณภาพจากธรรมชาติ
                                เพื่อให้ทุกคำที่ลิ้มรสคือความสุขและความภาคภูมิใจในความเป็นไทย
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                ทีมของเราพัฒนาอย่างต่อเนื่องทั้งในด้านสูตรขนม การออกแบบบรรจุภัณฑ์
                                และประสบการณ์ของลูกค้า เพื่อให้ขนมไทยคงความอร่อยแบบดั้งเดิม
                                แต่ดูทันสมัยและเข้าถึงได้ในทุกยุคสมัย
                            </p>
                        </div>
                        
                        <div className="pt-4 flex gap-4">
                            <div className="bg-orange-50 px-6 py-4 rounded-2xl border border-orange-100 flex-1 text-center">
                                <p className="text-3xl font-black text-orange-600 mb-1">100%</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">วัตถุดิบธรรมชาติ</p>
                            </div>
                            <div className="bg-orange-50 px-6 py-4 rounded-2xl border border-orange-100 flex-1 text-center">
                                <p className="text-3xl font-black text-orange-600 mb-1">Premium</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">คุณภาพระดับสูง</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="md:w-1/2 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-[2rem] transform rotate-3 scale-[1.02] -z-10 opacity-30 blur-lg"></div>
                        <div className="bg-gray-900 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-800 p-10 flex items-center justify-center aspect-square">
                            <Image
                                src={assets.logo}
                                alt="Our Mission"
                                width={400}
                                height={400}
                                className="object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Team Section */}
                <section className="bg-white py-24 px-6 relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
                                ขับเคลื่อนโดย<span className="text-orange-600">ทีมของเรา</span>
                            </h2>
                            <p className="text-gray-500 max-w-xl mx-auto text-lg">ผู้เชี่ยวชาญที่หลงใหลในความสมบูรณ์แบบ ทั้งด้านรสชาติและการออกแบบ</p>
                        </motion.div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                            {[
                                {
                                    name: "นางปราณปรียา พรีมชา",
                                    role: "Thai Dessert Producer",
                                    img: assets.team1,
                                    desc: "ผู้เชี่ยวชาญด้านสูตรขนมไทยต้นตำรับ ที่ใส่ใจในทุกรายละเอียดของรสชาติ",
                                },
                                {
                                    name: "นายณัช มนตรี",
                                    role: "Frontend Developer & UX/UI Designer",
                                    img: assets.team2,
                                    desc: "นักออกแบบและพัฒนาเว็บไซต์ ที่เปลี่ยนวิสัยทัศน์ให้กลายเป็นประสบการณ์ดิจิทัล",
                                },
                            ].map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="bg-gray-50 p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_50px_-15px_rgba(234,88,12,0.15)] hover:-translate-y-2 transition-all duration-300 group"
                                >
                                    <div className="relative w-40 h-40 mx-auto mb-6">
                                        <div className="absolute inset-0 bg-orange-400 rounded-full transform scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                                        <Image
                                            src={member.img}
                                            alt={member.name}
                                            width={300}
                                            height={300}
                                            className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg relative z-10 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-orange-600 font-bold text-sm tracking-wide mb-4">{member.role}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-24 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            พร้อมที่จะเติบโตไปกับเราหรือไม่?
                        </h2>
                        <p className="mb-10 text-lg md:text-xl text-orange-50 font-medium leading-relaxed">
                            ไม่ว่าคุณจะเป็นลูกค้าที่กำลังมองหาสินค้าคุณภาพ หรือพาร์ทเนอร์ที่ต้องการร่วมธุรกิจกับเรา เราพร้อมให้บริการเสมอ
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-white text-orange-600 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            ติดต่อเราเลย
                        </Link>
                    </motion.div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default AboutPage;
