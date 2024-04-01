"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoCalendar, IoCalendarOutline } from "react-icons/io5";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}



export const SidebarItem = ({ icon, path, title }: Props) => {
  const pathName = usePathname();

  {
    /* Active className: */
  }
  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
      ${
        path === pathName
          ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
          : ""
      }  
      `}
      >
        <CiBookmarkCheck size={30} />
        <span className={`group-hover:text-white-700`}>{title}</span>
      </Link>
    </li>
  );
};