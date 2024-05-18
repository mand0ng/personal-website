"use client"
import React from "react";
import Link from "next/link";

export default function Header() {

    const [showMenu, setShowMenu] = React.useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const navLinks = [
        { name: "Home", url: "/", clickable: true },
        { name: "Resume", url: "/resume", clickable: true },
        { name: "Projects", url: "/projects", clickable: true },
        { name: "Blog", url: "/", clickable: false },
        { name: "Contact", url: "/", clickable: true },
    ];

    return(

    <div className="nav-contents">
        <div className="hidden md:block nav-contents-lg">
            <ul className="flex flex-wrap items-center justify-center text-gray-900 dark:text-white m-5">
                {navLinks.map((link, index) => (
                    <li key={index} className="me-4 md:me-6">
                        <Link href={link.clickable ? link.url : ""} className={`hover:underline ${link.clickable ? '' : 'cursor-not-allowed'}`}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className="block md:hidden relative">
               <button onClick={toggleMenu} className="block text-gray-900 hover:text-black focus:text-black focus:outline-none">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {showMenu && (
                    <div className="absolute top-0 left-0 right-0 mt-12 z-50 bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul className="flex flex-col items-center py-4">
                            {navLinks.map((link, index) => (
                                <li key={index} className="my-2">
                                    <Link onClick={toggleMenu} href={link.clickable ? link.url : ""} className={`${link.clickable ? 'text-gray-700' : 'text-gray-300'} hover:underline`}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    </div>
    )
}