"use client";

import Image from "next/image";
import Link from "next/link";
import "./style.css";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Dashboard from "./dashboard";

export default function dasboard() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Dashboard />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      ></link>
    </>
  );
}
