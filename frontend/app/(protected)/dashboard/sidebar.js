"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./style.css";

export default function Sidebar() {
  const sidebarRef = useRef(null);
  const mobileToggleRef = useRef(null);

  /* --------------------------
     1. Desktop Toggle
  ---------------------------*/
  const handleDesktopToggle = () => {
    document.body.classList.toggle("sb-toggled");
  };

  /* --------------------------
     2. Mobile Toggle
  ---------------------------*/
  const handleMobileToggle = (e) => {
    e.stopPropagation();
    document.body.classList.toggle("sb-mobile-open");
  };

  /* --------------------------
     3. Click Outside (Mobile)
  ---------------------------*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(event.target) &&
        document.body.classList.contains("sb-mobile-open")
      ) {
        document.body.classList.remove("sb-mobile-open");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* --------------------------
     4. Page Switch Logic
  ---------------------------*/
  const handleSwitchPage = (pageId) => {
    const sections = document.querySelectorAll(".page-section");
    sections.forEach((s) => s.classList.remove("active-section"));

    const target = document.getElementById(pageId);
    if (target) target.classList.add("active-section");

    const links = document.querySelectorAll(".sidebar .nav-link");
    links.forEach((l) => l.classList.remove("active"));

    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      document.body.classList.remove("sb-mobile-open");
    }

    window.scrollTo(0, 0);
  };

  return (
    <nav className="sidebar" id="sidebar" ref={sidebarRef}>
      {/* Desktop Toggle */}
      <div className="sidebar-toggle-btn" onClick={handleDesktopToggle}>
        <i className="fas fa-chevron-left" />
      </div>

      {/* Mobile Toggle (comes from Navbar) */}
      <button
        ref={mobileToggleRef}
        id="mobileToggle"
        className="d-none"
        onClick={handleMobileToggle}
      />

      {/* Brand */}
      <div className="sidebar-header">
        <Link href="#" className="brand-logo">
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
          <span>PPCB</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="sidebar-content">
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className="nav-link active"
              onClick={() => handleSwitchPage("dashboard")}
            >
              <i className="fas fa-home" /> <span>MyProfile</span>
            </button>
          </li>

          <li className="nav-item mt-3 mb-1 nav-section-label">
            <span className="text-uppercase text-muted fw-bold ps-3">
              Dashboard
            </span>
          </li>

          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => handleSwitchPage("employees")}
            >
              <i className="fas fa-users" /> <span>Complaint Source</span>
            </button>
          </li>

          <li className="nav-item mt-3 mb-1 nav-section-label">
            <span className="text-uppercase text-muted fw-bold ps-3">
              Profile
            </span>
          </li>

          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => handleSwitchPage("settings")}
            >
              <i className="fas fa-cog" /> <span>Inspection</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
