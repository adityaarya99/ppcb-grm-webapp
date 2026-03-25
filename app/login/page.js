"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OfficerLoginPage() {
  const [selectedRole, setSelectedRole] = useState("GRM Cell Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [formData, setFormData] = useState({
    empId: "PPCB0042",
    password: "••••••••",
  });
  const [forgotData, setForgotData] = useState({
    fpField: "",
  });

  const roleDescriptions = {
    "GRM Cell Admin":
      "Full access to register offline complaints, assign to Ex-EN, and manage workflow.",
    "Regional Officer":
      "Assign complaints to SDOs, monitor field inspections, review ATRs.",
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleForgotInputChange = (e) => {
    const { id, value } = e.target;
    setForgotData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const id = formData.empId.trim();
    const pw = formData.password.trim();

    if (!id || !pw) {
      setLoginError(true);
      return;
    }

    setLoginError(false);
    // Navigate to dashboard
    window.location.href = "/dashboard";
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic
    setShowForgotModal(false);
    setForgotData({ fpField: "" });
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 60%, #1a5ba0 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, sans-serif;
          display: flex;
          align-items: center;
        }

        .login-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .login-deco {
          background: rgba(0, 0, 0, 0.15);
          color: #fff;
          border-radius: var(--radius);
          padding: 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-deco__icon {
          font-size: 3rem;
          margin-bottom: 20px;
          border-radius: 50px;
          width: 80px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-deco__title {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .login-deco__desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.7;
          max-width: 560px;
        }

        .login-deco__cards {
          margin-top: 32px;
          display: grid;
          gap: 12px;
          max-width: 560px;
        }

        .kpi-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
        }

        .kpi-card__label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 4px;
        }

        .kpi-card__value {
          font-size: 1.6rem;
          font-weight: 800;
          font-family: 'Instrument Serif', serif;
        }

        .kpi-card__hint {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .login-card {
          background: #fff;
          border-radius: var(--radius);
          padding: 32px 28px;
          width: 100%;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .login-emblem {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: #fff;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(10, 79, 143, 0.35);
        }

        .login-title {
          font-family: 'Instrument Serif', serif;
          font-size: 1.6rem;
          text-align: center;
          margin-bottom: 4px;
        }

        .login-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 28px;
        }

        .role-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
          margin-bottom: 22px;
        }

        .role-btn {
          padding: 9px 8px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          text-align: center;
          transition: all 0.2s ease;
          background: #fff;
        }

        .role-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .role-btn.active {
          border-color: var(--primary);
          color: var(--primary);
          background: #e8f0fb;
        }

        .f-label {
          display: inline-block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .req {
          color: var(--danger, #c0392b);
        }

        .f-control {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          font-size: 0.95rem;
        }

        .pw-wrap {
          position: relative;
        }

        .pw-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          font-size: 1rem;
          padding: 0;
        }

        .remember-check {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        #rememberMe {
          accent-color: var(--primary);
          cursor: pointer;
        }

        .login-btn {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          color: #fff;
          padding: 13px 24px;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .login-btn:hover {
          box-shadow: 0 4px 16px rgba(10, 79, 143, 0.4);
          transform: translateY(-1px);
        }

        .alert-inline {
          margin-top: 12px;
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 0.85rem;
          text-align: center;
        }

        .alert-inline.error {
          background: #fde8e8;
          border: 1px solid #f8c0c0;
          color: var(--danger);
        }

        .hidden {
          display: none;
        }

        .back-link {
          text-align: center;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .back-link a {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .back-link a:hover {
          color: var(--primary);
        }

        .fp-modal {
          position: fixed;
          inset: 0;
          background: rgba(10, 30, 60, 0.55);
          backdrop-filter: blur(4px);
          z-index: 500;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .fp-modal.open {
          display: flex;
        }

        .fp-box {
          background: #fff;
          border-radius: var(--radius);
          padding: 32px;
          width: 100%;
          max-width: 380px;
          box-shadow: var(--shadow-lg);
          text-align: center;
        }

        .fp-icon {
          font-size: 2rem;
          margin-bottom: 12px;
        }

        .fp-title {
          font-weight: 800;
          margin-bottom: 4px;
        }

        .fp-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .btn-full {
          width: 100%;
          border: none;
          border-radius: var(--radius-sm);
          padding: 11px 14px;
          background: var(--primary);
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-as-link {
          background: none;
          border: none;
          font-size: 0.9rem;
          color: var(--text-muted);
          cursor: pointer;
          width: 100%;
          padding: 11px 0;
        }

        @media (max-width: 991.98px) {
          .login-deco {
            margin-bottom: 16px;
          }

          .login-card {
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 600px) {
          .login-deco {
            display: none;
          }

          .login-card {
            padding: 24px 20px;
          }

          .login-title {
            font-size: 1.4rem;
          }
        }
      `}</style>

      <div className="login-page">
        <div
          style={{
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
              padding: "32px",
              alignItems: "stretch",
            }}
          >
            {/* LEFT PANEL */}
            <div className="login-deco">
              <div className="login-deco__icon">
                <Image
                  src="/images/logo.svg"
                  alt="PPCB Logo"
                  width={60}
                  height={60}
                />
              </div>
              <h1 className="login-deco__title">
                PPCB Grievance
                <br />
                Redressal Portal
              </h1>
              <p className="login-deco__desc">
                Secure access for PPCB officers, GRM Cell, and management to
                process and resolve environmental grievances.
              </p>

              <div className="login-deco__cards">
                <section className="kpi-card">
                  <div className="kpi-card__label">Today&apos;s Pending</div>
                  <div
                    className="kpi-card__value"
                    style={{ color: "var(--danger)" }}
                  >
                    915
                  </div>
                  <div className="kpi-card__hint">
                    Active grievances requiring action
                  </div>
                </section>

                <section className="kpi-card">
                  <div className="kpi-card__label">Resolved Today</div>
                  <div
                    className="kpi-card__value"
                    style={{ color: "var(--success)" }}
                  >
                    210
                  </div>
                  <div className="kpi-card__hint">
                    Successfully closed cases
                  </div>
                </section>

                <section className="kpi-card">
                  <div className="kpi-card__label">Overdue Escalations</div>
                  <div
                    className="kpi-card__value"
                    style={{ color: "var(--warning)" }}
                  >
                    142
                  </div>
                  <div className="kpi-card__hint">
                    Require immediate attention
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="login-card">
              <div className="login-emblem">🔒</div>
              <h2 className="login-title">Officer Login</h2>
              <p className="login-sub">
                PPCB GRM Portal · Government of Punjab
              </p>

              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  color: "var(--text-muted)",
                }}
              >
                Login As
              </div>

              <div className="role-grid">
                <button
                  type="button"
                  className={`role-btn ${selectedRole === "GRM Cell Admin" ? "active" : ""}`}
                  onClick={() => handleRoleClick("GRM Cell Admin")}
                >
                  <i
                    className="bi bi-person-badge-fill"
                    style={{
                      display: "block",
                      marginBottom: "4px",
                      fontSize: "1rem",
                    }}
                  ></i>
                  PPCB GRM Cell Login
                </button>
                <button
                  type="button"
                  className={`role-btn ${selectedRole === "Regional Officer" ? "active" : ""}`}
                  onClick={() => handleRoleClick("Regional Officer")}
                >
                  <i
                    className="bi bi-shield-check"
                    style={{
                      display: "block",
                      marginBottom: "4px",
                      fontSize: "1rem",
                    }}
                  ></i>
                  Central/Regional Officer Login
                </button>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="empId" className="f-label">
                    Employee ID / Username <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="empId"
                    className="f-control"
                    placeholder="e.g. PPCB0001"
                    value={formData.empId}
                    onChange={handleInputChange}
                    autoComplete="username"
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="pwField" className="f-label">
                    Password <span className="req">*</span>
                  </label>
                  <div className="pw-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="pwField"
                      className="f-control"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      style={{ paddingRight: "40px" }}
                      autoComplete="current-password"
                    />
                    <button
                      className="pw-toggle"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <i
                        className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                    fontSize: "0.85rem",
                  }}
                >
                  <label className="remember-check">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--primary)",
                      fontWeight: "600",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="login-btn">
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Login to Dashboard</span>
                </button>

                {loginError && (
                  <div className="alert-inline error">
                    <i className="bi bi-exclamation-circle-fill me-1"></i>
                    Invalid credentials. Please try again.
                  </div>
                )}

                <div className="back-link">
                  <Link href="/">
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Public Portal
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <div
        className={`fp-modal ${showForgotModal ? "open" : ""}`}
        onClick={() => showForgotModal && setShowForgotModal(false)}
      >
        <div className="fp-box" onClick={(e) => e.stopPropagation()}>
          <div className="fp-icon">🔑</div>
          <h6 className="fp-title">Reset Password</h6>
          <p className="fp-desc">
            Enter your registered Employee ID or Email to receive reset
            instructions.
          </p>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="fpField" className="f-label">
              Employee ID / Email
            </label>
            <input
              type="text"
              id="fpField"
              className="f-control"
              placeholder="PPCB0001 or email@ppcb.gov.in"
              value={forgotData.fpField}
              onChange={handleForgotInputChange}
            />
          </div>

          <button
            className="btn-full"
            style={{ marginBottom: "12px" }}
            onClick={handleForgotPassword}
          >
            <i className="bi bi-send-fill me-1"></i>
            Send Reset Link
          </button>

          <button
            className="btn-as-link"
            type="button"
            onClick={() => setShowForgotModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
