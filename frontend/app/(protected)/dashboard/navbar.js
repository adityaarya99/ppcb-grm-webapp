"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logout } from "@/services/api";
import "./style.css";

export default function Navbar() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSwitchPage = (page) => {
    console.log("Switch page:", page);
    // Replace with router.push('/route') if needed
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container-fluid px-4">
        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-link text-dark d-md-none me-2 p-0"
          id="mobileToggle"
          type="button"
        >
          <i className="fas fa-bars fa-lg" />
        </button>

        {/* Navbar Right */}
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav align-items-center">
            {/* Notification Bell */}
            <li className="nav-item me-3 position-relative">
              <button className="btn p-0 border-0 bg-transparent">
                <i className="far fa-bell fa-lg" />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" />
              </button>
            </li>

            {/* Messages */}
            <li className="nav-item me-3 position-relative">
              <button className="btn p-0 border-0 bg-transparent">
                <i className="far fa-envelope fa-lg" />
              </button>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle d-flex align-items-center border-0 bg-transparent"
                data-bs-toggle="dropdown"
                type="button"
              >
                {/* Name + Role */}
                <div className="d-flex flex-column align-items-end me-2 d-none d-sm-block">
                  <span
                    className="fw-bold"
                    style={{ fontSize: "0.9rem", color: "#566a7f" }}
                  >
                    Vikas Khanduja
                  </span>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                    (Admin)
                  </small>
                </div>

                {/* Profile Initials */}
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold"
                  style={{
                    width: "38px",
                    height: "38px",
                    border: "2px solid white",
                    boxShadow: "0 0 0 1px #e0e0e0",
                  }}
                >
                  AM
                </div>
              </button>

              {/* Dropdown Menu */}
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSwitchPage("dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSwitchPage("complaints")}
                  >
                    Complaint Sources
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={confirmLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-card shadow rounded-4 p-4">
            <h5 className="mb-3">Confirm Logout</h5>
            <p className="text-muted mb-4">
              Are you sure you want to log out of your account?
            </p>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={cancelLogout}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .logout-confirm-overlay {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .logout-confirm-card {
          width: min(460px, 100%);
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.18);
        }
      `}</style>
    </nav>
  );
}
