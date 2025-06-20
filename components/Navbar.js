"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  console.log(session?.user);
  console.log(session?.user?.username);
  return (
    <nav className="flex items-center justify-between bg-black text-white px-4 h-14">
      <Link href="/" className="font-bold text-lg">
        GetMeAChai
      </Link>
      <ul className="flex items-center gap-4">
        
        <li>
          <Link href="/" className="hover:text-neutral-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-neutral-300">
            About
          </Link>
        </li>
        <li className="">
          <Link href={`${session?.user?.name}`} className="hover:text-neutral-300">
            Donate
          </Link>
        </li>
        
      

        {session ? (
          <>
            <li className="text-sm text-gray-300 hidden sm:block ml-64">
              Signed in as {session.user?.email}
            </li>
            <li className="">
              <button
                onClick={() => signOut()}
                className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-1 text-sm"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/Login"}>
            <button
              
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
