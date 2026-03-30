"use client";

import Image from "next/image";
import Link from "next/link";
import "./style.css";

export default function Navbar() {
  const handleSwitchPage = (page) => {
    console.log("Switch page:", page);
    // Replace with router.push('/route') if needed
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
                  <button className="dropdown-item text-danger">Logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
