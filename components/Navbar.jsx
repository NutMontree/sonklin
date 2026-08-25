"use client";
import React from "react";
import { assets, BagIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] text-gray-700 transition-all duration-300">
      <Image
        className="cursor-pointer w-10 md:w-12 hover:scale-105 transition-transform"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-6 lg:gap-10 max-md:hidden">
        <Link href="/" className="font-semibold text-gray-600 hover:text-orange-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300 py-1">
          หน้าแรก
        </Link>
        <Link href="/all-products" className="font-semibold text-gray-600 hover:text-orange-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300 py-1">
          สินค้าทั้งหมด
        </Link>
        <Link href="/about" className="font-semibold text-gray-600 hover:text-orange-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300 py-1">
          เกี่ยวกับเรา
        </Link>
        <Link href="/contact" className="font-semibold text-gray-600 hover:text-orange-500 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300 py-1">
          ติดต่อเรา
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs font-bold text-orange-600 border-2 border-orange-200 bg-orange-50 px-5 py-2 rounded-full hover:bg-orange-600 hover:text-white hover:border-orange-600 hover:shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95"
          >
            แผงควบคุมผู้ขาย
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-5">
        <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <Image className="w-4 h-4 opacity-70" src={assets.search_icon} alt="search icon" />
        </button>
        {user ? (
          <div className="hover:scale-105 transition-transform shadow-sm rounded-full">
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 md:w-12 h-10 md:h-12" }}}>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="หน้าแรก"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="สินค้าทั้งหมด"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="ตะกร้าสินค้า"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="ออเดอร์ของฉัน"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 font-bold text-sm bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <Image src={assets.user_icon} alt="user icon" className="invert w-4 h-4" />
            เข้าสู่ระบบ
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-[10px] font-bold text-orange-600 border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-full"
          >
            แผงผู้ขาย
          </button>
        )}

        {user ? (
          <div className="shadow-sm rounded-full">
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 md:w-12 h-10 md:h-12" }}}>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="หน้าแรก"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="สินค้าทั้งหมด"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="ตะกร้าสินค้า"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="ออเดอร์ของฉัน"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-1 font-bold text-xs bg-gray-900 text-white px-3 py-2 rounded-full"
          >
            <Image src={assets.user_icon} alt="user icon" className="invert w-3 h-3" />
            เข้าสู่ระบบ
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
