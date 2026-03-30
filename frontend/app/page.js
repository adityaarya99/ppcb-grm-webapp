"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [showResult, setShowResult] = useState(false);
  const [trackInput, setTrackInput] = useState("");
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

  // Counter animation
  useEffect(() => {
    const targets = [4827, 3912, 915, 18.4, 94];
    const suffixes = ["", "", "", "", "%"];

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          targets.forEach((target, index) => {
            setTimeout(() => {
              let current = 0;
              const step = Math.ceil(target / 60);
              const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(interval);
                }
                setCounts((prev) => {
                  const newCounts = [...prev];
                  newCounts[index] = current;
                  return newCounts;
                });
              }, 25);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const doTrack = () => {
    if (trackInput.trim()) {
      setShowResult(true);
    } else {
      alert("Please enter a complaint number.");
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="pub-header">
        <div className="topbar d-none d-md-flex">
          <span>
            <i className="bi bi-telephone-fill me-1"></i>Helpline: 1800-XXX-XXXX
            &nbsp;|&nbsp;
            <i className="bi bi-envelope-fill me-1"></i>grm@ppcb.gov.in
          </span>
          <span>
            Government of Punjab &nbsp;|&nbsp; Last Updated: 12 March 2026
          </span>
        </div>
        <div className="mainbar">
          <div className="brand-logo">
            <div className="logo-emblem">
              <Image
                src="/images/logo.svg"
                alt="PPCB Logo"
                width={60}
                height={60}
              />
            </div>
            <div className="brand-text">
              <h1>PPCB – Grievance Redressal Mechanism</h1>
              <p>
                Punjab Pollution Control Board &nbsp;|&nbsp; Government of
                Punjab
              </p>
            </div>
          </div>
          <div className="header-nav">
            <a href="#" className="hn-btn hn-outline">
              <i className="bi bi-search"></i>
              <span className="hide-xs">Track</span>
            </a>
            <Link href="/citizen-grievance-form" className="hn-btn hn-outline">
              <i className="bi bi-pencil-square"></i>
              <span className="hide-xs">File Complaint</span>
            </Link>
            <Link href="/login" className="hn-btn hn-solid">
              <i className="bi bi-person-fill"></i>
              <span className="hide-xs">Officer Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="hero-content">
                <div className="hero-badge">
                  <i className="bi bi-shield-check-fill"></i> Official
                  Government Portal
                </div>
                <h1 className="hero-title">
                  Punjab&apos;s <em>Grievance</em>
                  <br />
                  Redressal System
                </h1>
                <p className="hero-sub">
                  Submit complaints about environmental pollution, track
                  real-time status, and ensure SOP-compliant timely resolution
                  through our integrated digital platform.
                </p>
                <div className="hero-actions">
                  <a href="#" className="btn-hp">
                    <i className="bi bi-pencil-square"></i> File a Grievance
                  </a>
                  <a href="#" className="btn-hs">
                    <i className="bi bi-search"></i> Track Complaint
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1 d-none d-lg-block">
              <div className="hero-panel">
                <div
                  style={{
                    fontSize: ".9rem",
                    color: "rgba(255,255,255,.5)",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  Live Complaint Stats
                </div>
                <div
                  className="d-flex flex-wrap gap-4 stats-strip"
                  ref={statsRef}
                >
                  <div className="hp-row">
                    <div className="stat-item">
                      <div className="stat-num">{counts[0]}</div>
                      <div className="stat-lbl">Complaints Registered</div>
                    </div>
                  </div>
                  <div className="hp-row">
                    <div className="stat-item">
                      <div className="stat-num">{counts[1]}</div>
                      <div className="stat-lbl">Disposed</div>
                    </div>
                  </div>
                  <div className="hp-row">
                    <div className="stat-item">
                      <div className="stat-num">{counts[2]}</div>
                      <div className="stat-lbl">Under Process</div>
                    </div>
                  </div>
                  <div className="hp-row">
                    <div className="stat-item">
                      <div className="stat-num">{counts[3]}</div>
                      <div className="stat-lbl">Avg. Days to Resolve</div>
                    </div>
                  </div>
                  <div className="hp-row">
                    <div className="stat-item">
                      <div className="stat-num">{counts[4]}%</div>
                      <div className="stat-lbl">Citizen Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container-fluid">
          <div className="text-center mb-5">
            <div className="sec-label">Why Use This Portal</div>
            <p className="sec-sub mt-2">
              A fully SOP-compliant grievance management platform for
              Punjab&apos;s citizens
            </p>
          </div>
          <div className="row g-4">
            <div className="col-sm-6 col-lg-4 col-xl-4">
              <div className="feat-card">
                <div className="feat-icon">
                  <i className="bi bi-broadcast"></i>
                </div>
                <h5>Multi-Channel Intake</h5>
                <p>
                  Portal, Email, WhatsApp, Letter, Social Media — all routed
                  into one unified system.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-4">
              <div className="feat-card">
                <div className="feat-icon">
                  <i className="bi bi-clock-history"></i>
                </div>
                <h5>SOP-Compliant TAT</h5>
                <p>
                  Every complaint tracked against defined timelines.
                  Auto-escalation on overdue cases.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-4">
              <div className="feat-card">
                <div className="feat-icon">
                  <i className="bi bi-person-badge"></i>
                </div>
                <h5>Role-Based Workflow</h5>
                <p>
                  GRM Cell → Ex-EN → RO → SDO/ADO. Clear responsibilities, no
                  manual paperwork.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-4">
              <div className="feat-card">
                <div className="feat-icon">
                  <i className="bi bi-bell-fill"></i>
                </div>
                <h5>Real-Time Alerts</h5>
                <p>
                  Automatic SMS and email alerts to complainants and officers at
                  every stage.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-4">
              <div className="feat-card">
                <div className="feat-icon">
                  <i className="bi bi-arrow-up-circle"></i>
                </div>
                <h5>Appeal Mechanism</h5>
                <p>
                  Two-level appeal: First to CEE, Second to Member Secretary.
                  Full history available.
                </p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-4">
              <div className="feat-card">
                <div className="feat-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>
                <h5>Audit Trail</h5>
                <p>
                  Complete digital record of every action. Transparent,
                  accountable, tamper-proof.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section
        className="section"
        style={{
          background: "white",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-fluid">
          <div className="text-center mb-5">
            <div className="sec-label">10-Step Workflow</div>
            <h2 className="sec-title">Complaint Resolution Journey</h2>
            <p className="sec-sub mt-2">
              From submission to final closure — SOP-compliant at every step
            </p>
          </div>
          <div className="row g-3">
            {[
              {
                num: 1,
                title: "Multi-Channel Intake",
                desc: "Portal, Email, Letter, WhatsApp, Social Media into one system.",
              },
              {
                num: 2,
                title: "Registration & OTP",
                desc: "Unique complaint number generated; auto-acknowledgement via SMS & Email.",
              },
              {
                num: 3,
                title: "Scrutiny by Ex-EN",
                desc: "Review jurisdiction, completeness, and allocate to appropriate level.",
              },
              {
                num: 4,
                title: "RO Allocation",
                desc: "Regional Officer receives case digitally with SOP timelines.",
              },
              {
                num: 5,
                title: "Field Inspection",
                desc: "SDO/ADO visits site, collects evidence, uploads inspection report.",
              },
              {
                num: 6,
                title: "Regulatory Action",
                desc: "Advisory, Notice, or Order issued. Compliance monitored via follow-up.",
              },
              {
                num: 7,
                title: "TAT Monitoring",
                desc: "Auto-escalation if SOP timelines are breached.",
              },
              {
                num: 8,
                title: "ATR & Disposal",
                desc: "Action Taken Report uploaded; complaint marked disposed.",
              },
              {
                num: 9,
                title: "Feedback & Appeal",
                desc: "Two-level appeal mechanism available if unsatisfied.",
              },
              {
                num: 10,
                title: "Final Closure",
                desc: "Closed with complete audit trail retained.",
              },
            ].map((step) => (
              <div className="col-6 col-md-4 col-lg-3" key={step.num}>
                <div className="step-card">
                  <div
                    className="step-num"
                    style={
                      step.num === 10 ? { background: "var(--success)" } : {}
                    }
                  >
                    {step.num}
                  </div>
                  <h6>{step.title}</h6>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK SECTION */}
      <section className="track-section">
        <div className="container-fluid">
          <div className="row g-4 align-items-center">
            <div className="col-lg-4">
              <div className="sec-label">Track Instantly</div>
              <h2 className="sec-title">Check Your Complaint Status</h2>
              <p className="sec-sub mt-2">
                Enter your complaint number to view real-time status, assigned
                officer, and complete action history.
              </p>
            </div>
            <div className="col-lg-8">
              <div className="track-card">
                <div className="row g-3 align-items-end">
                  <div className="col-md-5">
                    <label className="f-label">
                      Complaint Number <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className="f-control"
                      placeholder="e.g. PPCB/GRM/2025/00123"
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="f-label">Mobile / Email</label>
                    <input
                      type="text"
                      className="f-control"
                      placeholder="Verify identity"
                    />
                  </div>
                  <div className="col-md-3">
                    <button className="btn-full" onClick={doTrack}>
                      <i className="bi bi-search"></i> Track Status
                    </button>
                  </div>
                </div>
                {showResult && (
                  <div id="trackResult">
                    <hr className="divider" />
                    <div className="track-result">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                        <div>
                          <div
                            style={{
                              fontSize: ".68rem",
                              color: "var(--text-muted)",
                              fontWeight: "700",
                              letterSpacing: ".04em",
                            }}
                          >
                            COMPLAINT NO.
                          </div>
                          <div className="cid" style={{ fontSize: "1.05rem" }}>
                            PPCB/GRM/2025/00247
                          </div>
                        </div>
                        <span className="bs bs-progress">In Progress</span>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-6 col-md-3">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: ".04em",
                              color: "var(--text-muted)",
                            }}
                          >
                            Filed On
                          </div>
                          <div
                            style={{
                              fontSize: ".82rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            12 May 2025
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: ".04em",
                              color: "var(--text-muted)",
                            }}
                          >
                            Category
                          </div>
                          <div
                            style={{
                              fontSize: ".82rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            Air Pollution
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: ".04em",
                              color: "var(--text-muted)",
                            }}
                          >
                            Assigned To
                          </div>
                          <div
                            style={{
                              fontSize: ".82rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            RO – Ludhiana
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: ".04em",
                              color: "var(--text-muted)",
                            }}
                          >
                            Days Elapsed
                          </div>
                          <div
                            style={{
                              fontSize: ".82rem",
                              fontWeight: "700",
                              marginTop: "3px",
                              color: "var(--warning)",
                            }}
                          >
                            24 days
                          </div>
                        </div>
                      </div>
                      <div className="trk-progress">
                        <div className="trk-step done">
                          <div className="trk-dot">
                            <i
                              className="bi bi-check"
                              style={{ fontSize: ".7rem" }}
                            ></i>
                          </div>
                          <div className="trk-lbl">Registered</div>
                        </div>
                        <div className="trk-step done">
                          <div className="trk-dot">
                            <i
                              className="bi bi-check"
                              style={{ fontSize: ".7rem" }}
                            ></i>
                          </div>
                          <div className="trk-lbl">Scrutinised</div>
                        </div>
                        <div className="trk-step done">
                          <div className="trk-dot">
                            <i
                              className="bi bi-check"
                              style={{ fontSize: ".7rem" }}
                            ></i>
                          </div>
                          <div className="trk-lbl">Allocated</div>
                        </div>
                        <div className="trk-step curr">
                          <div className="trk-dot">4</div>
                          <div className="trk-lbl">Inspection</div>
                        </div>
                        <div className="trk-step">
                          <div className="trk-dot">5</div>
                          <div className="trk-lbl">Action</div>
                        </div>
                        <div className="trk-step">
                          <div className="trk-dot">6</div>
                          <div className="trk-lbl">ATR</div>
                        </div>
                        <div className="trk-step">
                          <div className="trk-dot">7</div>
                          <div className="trk-lbl">Closed</div>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <a href="#" className="btn-p">
                          <i className="bi bi-arrow-right me-1"></i> Full
                          Tracking Details
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-md-4">
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "800",
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                PPCB GRM Portal
              </div>
              <div
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontStyle: "italic",
                  color: "var(--accent-light)",
                  marginBottom: "12px",
                }}
              >
                Transparent. Accountable. Timely.
              </div>
              <div style={{ fontSize: ".78rem", lineHeight: "1.8" }}>
                Punjab Pollution Control Board
                <br />
                Government of Punjab
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div
                style={{
                  fontSize: ".65rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  color: "rgba(255,255,255,.4)",
                  marginBottom: "14px",
                }}
              >
                Quick Links
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <a
                  href="#"
                  style={{
                    fontSize: ".8rem",
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  File Complaint
                </a>
                <a
                  href="#"
                  style={{
                    fontSize: ".8rem",
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  Track Status
                </a>
                <a
                  href="#"
                  style={{
                    fontSize: ".8rem",
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  Officer Login
                </a>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <div
                style={{
                  fontSize: ".65rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  color: "rgba(255,255,255,.4)",
                  marginBottom: "14px",
                }}
              >
                Help
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <a
                  href="#"
                  style={{
                    fontSize: ".8rem",
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  FAQ
                </a>
                <a
                  href="#"
                  style={{
                    fontSize: ".8rem",
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  User Guide
                </a>
                <a
                  href="#"
                  style={{
                    fontSize: ".8rem",
                    color: "rgba(255,255,255,.55)",
                    textDecoration: "none",
                  }}
                >
                  RTI
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{
                  fontSize: ".65rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  color: "rgba(255,255,255,.4)",
                  marginBottom: "14px",
                }}
              >
                Contact
              </div>
              <div
                style={{
                  fontSize: ".8rem",
                  lineHeight: "2",
                  color: "rgba(255,255,255,.55)",
                }}
              >
                <div>
                  <i
                    className="bi bi-telephone-fill me-2"
                    style={{ color: "var(--accent-light)" }}
                  ></i>
                  1800-XXX-XXXX (Toll Free)
                </div>
                <div>
                  <i
                    className="bi bi-envelope-fill me-2"
                    style={{ color: "var(--accent-light)" }}
                  ></i>
                  grm@ppcb.gov.in
                </div>
                <div>
                  <i
                    className="bi bi-clock-fill me-2"
                    style={{ color: "var(--accent-light)" }}
                  ></i>
                  Mon–Fri, 09:00 AM – 05:00 PM
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{ borderColor: "rgba(255,255,255,.1)", margin: "24px 0" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              fontSize: ".72rem",
              color: "rgba(255,255,255,.35)",
            }}
          >
            <span>
              © 2026 Punjab Pollution Control Board. All rights reserved.
            </span>
            <span>
              Privacy Policy &nbsp;|&nbsp; Terms &nbsp;|&nbsp; Accessibility
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
