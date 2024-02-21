"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import { db } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import Link from 'next/link'

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  };

  const onCreateClick = () => {
    if (session) {
      router.push("/pin-builder");
    } else {
      signIn();
    }
  };

  return (
    <nav className="flex justify-between gap-3 md:gap-2 items-center p-6">
      <Link href="/" className="w-10 h-10">
        <img
          src="/logo.png"
          className="hover:bg-gray-300 min-w-10 min-h-10 rounded-full cursor-pointer"
        />
      </Link>
      <Link 
        href="/"
        className="bg-black text-white p-2 px-4 rounded-full hidden md:block"
      >
        Inicio
      </Link>
      <Link 
        href="/pin-builder"
        className="font-semibold p-2 px-4 rounded-full"
      >
        Crear
      </Link>
      <div className="bg-[#e9e9e9] p-3 w-full flex gap-3 items-center rounded-full hidden md:flex">
        <HiSearch
          className="text-[25px]
            text-gray-500 md:hidden"
        />
        <input
          type="text"
          placeholder="Buscar"
          name=""
          id=""
          className="bg-transparent outline-none"
        />
      </div>
      {/*<HiBell
        className="text-[25px] md:text-[40px]
            text-gray-500"
      />*/}
      <Link href="/chatbox">
        <HiChat
          className="text-[25px] md:text-[40px] text-gray-500"
        />
      </Link>
      {session?.user ? (
        <Link href={"/" + session.user.email} className="w-10 h-10">
          <img
            src={session?.user?.image}
            alt="user_image"
            className="hover:bg-gray-300 min-w-10 min-h-10 rounded-full cursor-pointer"
          />
        </Link>
      ) : (
        <button
          className="font-semibold p-2 px-4 rounded-full"
          onClick={() => signIn()}
        >
          Iniciar Sesion
        </button>
      )}
    </nav>
  );
}

export default Header;
