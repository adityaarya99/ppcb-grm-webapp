"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

export default function CentralGrievanceFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [successState, setSuccessState] = useState(false);
  const [generatedNum, setGeneratedNum] = useState("");
  const mediaInputRef = useRef(null);

  // Form state management
  const [formData, setFormData] = useState({
    source: "citizen",
    sourceOtherText: "",
    pollutionType: "air",
    compSubject: "",
    refNo: "",
    dateReceipt: getTodayDate(),
    complainantType: "individual",
    indName: "",
    indContact: "",
    indDistrict: "",
    indPin: "",
    indOccupation: "",
    indAddress: "",
    groupType: "",
    nodalName: "",
    nodalContact: "",
    groupAddress: "",
    industryName: "",
    siteDistrict: "",
    sitePin: "",
    siteAddress: "",
    assignedTo: "",
  });

  const [subjectWordCount, setSubjectWordCount] = useState(0);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [declarationChecked, setDeclarationChecked] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle radio button change
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update subject word count
  const updateSubjectWordCount = (value) => {
    const words = value
      .trim()
      .split(/\s+/)
      .filter((w) => w).length;
    if (words <= 150) {
      setFormData((prev) => ({ ...prev, compSubject: value }));
      setSubjectWordCount(words);
    }
  };

  // Toggle complaint type
  const toggleComplaintType = (type) => {
    setFormData((prev) => ({ ...prev, complainantType: type }));
  };

  // Handle media file upload
  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  // Navigate to step
  const goStep = (n) => {
    setCurrentStep(n);
    if (n === 4) {
      // Populate review fields on step 4
      setTimeout(() => {
        document.getElementById("rv-source").textContent =
          formData.source || "—";
        document.getElementById("rv-type").textContent =
          formData.pollutionType || "—";
        document.getElementById("rv-subject").textContent =
          formData.compSubject || "—";
        if (formData.complainantType === "individual") {
          document.getElementById("rv-complainant").textContent =
            formData.indName || "—";
          document.getElementById("rv-district").textContent =
            formData.indDistrict || "—";
        } else {
          document.getElementById("rv-complainant").textContent =
            formData.nodalName || "—";
        }
        document.getElementById("rv-assigned").textContent =
          formData.assignedTo || "—";
      }, 0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit complaint
  const submitComplaint = () => {
    if (!declarationChecked) {
      alert("Please confirm the declaration to proceed.");
      return;
    }
    const num = `PPCB/MAN/2025/${String(1000 + Math.floor(Math.random() * 9000)).slice(-5)}`;
    setGeneratedNum(num);
    setSuccessState(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pcts = { 1: "25%", 2: "50%", 3: "75%", 4: "100%" };

  return (
    <>
      <style>{`
        .form-page {
          min-height: 100vh;
          background: var(--bg);
          padding-bottom: 60px;
        }

        .form-head {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          padding: 36px 24px;
          color: white;
        }

        .form-head h2 {
          font-size: clamp(1.4rem, 4vw, 1.2rem);
          margin-bottom: 5px;
        }

        .form-head p {
          color: rgba(255, 255, 255, .7);
          font-size: .9rem;
          margin: 0;
        }

        .form-wrap {
          max-width: 1000px;
          margin: -32px auto 0;
          padding: 0 16px;
        }

        .step-nav {
          background: var(--surface2);
          border-bottom: 1px solid var(--border);
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .step-nav::-webkit-scrollbar {
          display: none;
        }

        .step-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 20px;
          font-size: .9rem;
          font-weight: 600;
          color: var(--text-muted);
          border-bottom: 3px solid transparent;
          cursor: default;
          white-space: normal;
          flex: 1;
          text-align: center;
        }

        .step-tab.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .step-tab.done {
          color: var(--success);
          border-bottom-color: var(--success);
        }

        .step-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: .62rem;
          font-weight: 800;
          flex-shrink: 0;
        }

        .step-tab.active .step-dot {
          background: var(--primary);
          color: white;
        }

        .step-tab.done .step-dot {
          background: var(--success);
          color: white;
        }

        @media (max-width: 768px) {
          .step-tab {
            padding: 12px 8px;
            font-size: 0.75rem;
            gap: 4px;
          }

          .step-dot {
            width: 18px;
            height: 18px;
            font-size: 0.55rem;
          }
        }

        @media (max-width: 480px) {
          .step-tab {
            padding: 10px 4px;
            font-size: 0.7rem;
            gap: 2px;
          }

          .step-tab span:last-child {
            display: none;
          }

          .step-dot {
            width: 16px;
            height: 16px;
            font-size: 0.5rem;
          }
        }

        .form-body {
          padding: 28px 24px;
        }

        @media (max-width: 480px) {
          .form-body {
            padding: 20px 16px;
          }

          .form-head {
            padding: 24px 16px;
          }

          .form-head h2 {
            font-size: clamp(1.2rem, 3.5vw, 1.3rem);
          }

          .form-wrap {
            padding: 0 12px;
            margin: -24px auto 0;
          }
        }

        .upload-zone {
          border: 2px dashed var(--border);
          border-radius: var(--radius);
          padding: 36px 20px;
          text-align: center;
          cursor: pointer;
          transition: all .2s;
          background: var(--surface2);
        }

        .upload-zone:hover {
          border-color: var(--primary);
          background: #e8f0fb;
        }

        .review-block {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
        }

        .success-wrap {
          padding: 20px 16px;
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #d4f5e2, #a8e8c2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.4rem;
          margin: 0 auto 20px;
        }

        .comp-num {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
          color: white;
          padding: 12px 30px;
          border-radius: var(--radius-sm);
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: .06em;
          display: inline-block;
          margin: 14px 0;
          font-family: 'Instrument Serif', serif;
        }

        .req { color: var(--danger, #c0392b); }
        .fw-800 { font-weight: 800; }
        .mb-1 { margin-bottom: 8px; }
        .mb-2 { margin-bottom: 16px; }
        .mb-3 { margin-bottom: 24px; }
        .mb-4 { margin-bottom: 32px; }
        .mt-4 { margin-top: 32px; }
        .mt-5 { margin-top: 48px; }
        .py-5 { padding: 48px 0; }
        .d-flex { display: flex; }
        .justify-content-between { justify-content: space-between; }
        .justify-content-center { justify-content: center; }
        .align-items-center { align-items: center; }
        .align-items-start { align-items: flex-start; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 16px; }
        .flex-wrap { flex-wrap: wrap; }
        .row { display: flex; grid-template-columns: repeat(12, 1fr); gap: 0; }
        .col-12 { grid-column: 1 / -1; }
        .col-md-4 { grid-column: span 4; }
        .col-md-6 { grid-column: span 6; }
        @media (max-width: 768px) {
          .col-md-4 { grid-column: span 6; }
          .col-md-6 { grid-column: span 12; }
        }
        .form-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .form-check-input { width: 16px; height: 16px; cursor: pointer; accent-color: var(--primary); }
        .form-check-label { cursor: pointer; margin: 0; }
      `}</style>

      <div className="form-page">
        {/* HEADER */}
        <header className="pub-header">
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
                <h1>PPCB – Manual Complaint Entry</h1>
                <p>
                  Central Grievance Redressal Mechanism &nbsp;|&nbsp; Punjab
                </p>
              </div>
            </div>
            <div className="header-nav">
              <Link href="/" className="hn-btn hn-outline">
                <i className="bi bi-house-fill"></i>
                <span className="hide-xs">Home</span>
              </Link>
              <Link href="/track-complaint" className="hn-btn hn-outline">
                <i className="bi bi-search"></i>
                <span className="hide-xs">Track</span>
              </Link>
              <a href="tel:1800XXXXXXX" className="hn-btn hn-solid">
                <i className="bi bi-telephone-fill"></i>
                <span className="hide-xs">Helpline</span>
              </a>
            </div>
          </div>
        </header>

        {/* FORM HEADER */}
        <div className="form-head">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div>
              <h2>
                <i className="bi bi-pencil-square me-2"></i>Manual Complaint
                Entry Form
              </h2>
              <p>
                For authorized Grievance Cell and RO Offices to manually enter
                complaints into the system.
              </p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="form-wrap">
          {!successState ? (
            <div
              id="formCard"
              className="data-card"
              style={{
                boxShadow: "var(--shadow-lg)",
                boxSizing: "border-box",
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              {/* Step nav */}
              <nav className="step-nav">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`step-tab ${currentStep === step ? "active" : ""} ${step < currentStep ? "done" : ""}`}
                  >
                    <span className="step-dot">
                      {step < currentStep ? (
                        <i
                          className="bi bi-check2"
                          style={{ fontSize: ".65rem" }}
                        ></i>
                      ) : (
                        step
                      )}
                    </span>
                    <span>
                      {step === 1
                        ? "Complaint Details"
                        : step === 2
                          ? "Complainant Info"
                          : step === 3
                            ? "Location & Industry"
                            : "Assignment & Review"}
                    </span>
                  </div>
                ))}
              </nav>

              {/* Progress bar */}
              <div style={{ background: "var(--border)" }}>
                <div
                  id="progressBar"
                  style={{
                    height: "100%",
                    width: pcts[currentStep],
                    transition: "width .4s",
                    background:
                      "linear-gradient(90deg, var(--primary-dark), var(--primary))",
                  }}
                ></div>
              </div>

              <div className="form-body">
                {/* STEP 1: Complaint Details */}
                {currentStep === 1 && (
                  <div>
                    <h6 className="fw-800 mb-1">Complaint Details</h6>
                    <p
                      style={{
                        fontSize: ".8rem",
                        color: "var(--text-muted)",
                        marginBottom: "22px",
                      }}
                    >
                      Enter basic complaint information and metadata.
                    </p>

                    <div className="row mb-3">
                      <div className="col-md-8">
                        <label className="f-label">
                          Source of Complaint <span className="req">*</span>
                        </label>
                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            marginTop: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {["citizen", "central", "state", "other"].map(
                            (opt) => (
                              <label key={opt} className="form-check">
                                <input
                                  type="radio"
                                  name="source"
                                  value={opt}
                                  checked={formData.source === opt}
                                  onChange={handleRadioChange}
                                  className="form-check-input"
                                />
                                <span className="form-check-label">
                                  {opt === "citizen"
                                    ? "Citizen"
                                    : opt === "central"
                                      ? "Central Govt."
                                      : opt === "state"
                                        ? "State Govt."
                                        : "Other"}
                                </span>
                              </label>
                            ),
                          )}
                        </div>
                        {formData.source === "other" && (
                          <input
                            type="text"
                            name="sourceOtherText"
                            className="f-control"
                            placeholder="Specify if Other"
                            value={formData.sourceOtherText}
                            onChange={handleInputChange}
                            style={{ marginTop: "10px" }}
                          />
                        )}
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="f-label">
                          Pollution Type <span className="req">*</span>
                        </label>
                        <div
                          style={{
                            display: "flex",
                            gap: "16px",
                            marginTop: "10px",
                          }}
                        >
                          {["air", "water", "noise"].map((opt) => (
                            <label key={opt} className="form-check">
                              <input
                                type="radio"
                                name="pollutionType"
                                value={opt}
                                checked={formData.pollutionType === opt}
                                onChange={handleRadioChange}
                                className="form-check-input"
                              />
                              <span className="form-check-label">
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="f-label">
                          Complaint Subject Line <span className="req">*</span>
                        </label>
                        <textarea
                          className="f-control"
                          rows="2"
                          placeholder="Subject line of the complaint"
                          id="compSubject"
                          value={formData.compSubject}
                          onChange={(e) =>
                            updateSubjectWordCount(e.target.value)
                          }
                          style={{ resize: "vertical" }}
                        ></textarea>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: ".7rem",
                              color: "var(--text-muted)",
                            }}
                            id="subjWordCnt"
                          >
                            {subjectWordCount}/150 words
                          </span>
                        </div>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="f-label">
                          Board&apos;s Reference No.
                        </label>
                        <input
                          type="text"
                          className="f-control"
                          name="refNo"
                          placeholder="e.g., PPCB/GRM/2025/001"
                          value={formData.refNo}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="f-label">
                          Date of Receipt <span className="req">*</span>
                        </label>
                        <input
                          type="date"
                          className="f-control"
                          name="dateReceipt"
                          value={formData.dateReceipt}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-end"
                      style={{ marginTop: "32px" }}
                    >
                      <button
                        className="btn-p"
                        style={{ padding: "10px 26px", fontSize: ".85rem" }}
                        onClick={() => goStep(2)}
                      >
                        Next &nbsp;<i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Complainant Info */}
                {currentStep === 2 && (
                  <div>
                    <h6 className="fw-800 mb-1">Complainant Information</h6>
                    <p
                      style={{
                        fontSize: ".8rem",
                        color: "var(--text-muted)",
                        marginBottom: "22px",
                      }}
                    >
                      Provide complainant details (Individual or Group).
                    </p>

                    <div
                      className="row mb-3"
                      style={{
                        paddingBottom: "10px",
                        marginBottom: "10px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <div className="col-12">
                        <label className="f-label">
                          Whether filed by Individual or Group{" "}
                          <span className="req">*</span>
                        </label>
                      </div>
                      <div className="col-12">
                        <div className="d-flex gap-3">
                          {["individual", "group"].map((type) => (
                            <label key={type} className="form-check">
                              <input
                                type="radio"
                                name="complainantType"
                                value={type}
                                checked={formData.complainantType === type}
                                onChange={() => toggleComplaintType(type)}
                                className="form-check-input"
                              />
                              <span className="form-check-label">
                                {type === "individual"
                                  ? "Individual"
                                  : "RWA / Society / Association / CSO / Other (Group)"}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {formData.complainantType === "individual" && (
                      <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Complainant Name <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="f-control"
                            name="indName"
                            placeholder="Full name"
                            value={formData.indName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Complainant Contact No.{" "}
                            <span className="req">*</span>
                          </label>
                          <input
                            type="tel"
                            className="f-control"
                            name="indContact"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.indContact}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            District <span className="req">*</span>
                          </label>
                          <select
                            className="f-select"
                            name="indDistrict"
                            value={formData.indDistrict}
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select District --</option>
                            {[
                              "Amritsar",
                              "Bathinda",
                              "Faridkot",
                              "Jalandhar",
                              "Ludhiana",
                              "Mohali",
                              "Patiala",
                              "Sangrur",
                            ].map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">Pin Code</label>
                          <input
                            type="text"
                            className="f-control"
                            name="indPin"
                            placeholder="PIN Code"
                            value={formData.indPin}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">Occupation</label>
                          <input
                            type="text"
                            className="f-control"
                            name="indOccupation"
                            placeholder="Occupation"
                            value={formData.indOccupation}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Address <span className="req">*</span>
                          </label>
                          <textarea
                            className="f-control"
                            rows="2"
                            name="indAddress"
                            placeholder="Complainant's full address"
                            value={formData.indAddress}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                    )}

                    {formData.complainantType === "group" && (
                      <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Group Type <span className="req">*</span>
                          </label>
                          <select
                            className="f-select"
                            name="groupType"
                            value={formData.groupType}
                            onChange={handleInputChange}
                          >
                            <option value="">-- Select Group Type --</option>
                            {[
                              "Residents Welfare Association (RWA)",
                              "Society",
                              "Association",
                              "Civil Society Organization (CSO)",
                              "Other",
                            ].map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Name of the Nodal Officer{" "}
                            <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="f-control"
                            name="nodalName"
                            placeholder="Nodal officer name"
                            value={formData.nodalName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Contact Number of Nodal Officer{" "}
                            <span className="req">*</span>
                          </label>
                          <input
                            type="tel"
                            className="f-control"
                            name="nodalContact"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.nodalContact}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="f-label">
                            Address of Group <span className="req">*</span>
                          </label>
                          <textarea
                            className="f-control"
                            rows="2"
                            name="groupAddress"
                            placeholder="RWA/Society address"
                            value={formData.groupAddress}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                    )}

                    <div
                      className="d-flex justify-content-between"
                      style={{ marginTop: "48px" }}
                    >
                      <button className="btn-o" onClick={() => goStep(1)}>
                        <i className="bi bi-arrow-left"></i> Back
                      </button>
                      <button
                        className="btn-p"
                        style={{ padding: "10px 26px", fontSize: ".85rem" }}
                        onClick={() => goStep(3)}
                      >
                        Next &nbsp;<i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Location & Industry */}
                {currentStep === 3 && (
                  <div>
                    <h6 className="fw-800 mb-1">
                      Complaint Location & Industry Details
                    </h6>
                    <p
                      style={{
                        fontSize: ".8rem",
                        color: "var(--text-muted)",
                        marginBottom: "22px",
                      }}
                    >
                      Provide location and industry information.
                    </p>

                    <div className="row mb-3">
                      <div className="col-12 mb-3">
                        <label className="f-label">
                          Name of the Industry the complaint was filed against
                        </label>
                        <input
                          type="text"
                          className="f-control"
                          name="industryName"
                          placeholder="Industry/Establishment name"
                          value={formData.industryName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div
                        className="col-12 mb-3"
                        style={{
                          paddingBottom: "10px",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <label className="f-label">
                          Address of the site about which complaint is filed{" "}
                          <span className="req">*</span>
                        </label>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label
                          className="f-label"
                          style={{ fontSize: ".85rem" }}
                        >
                          District <span className="req">*</span>
                        </label>
                        <select
                          className="f-select"
                          name="siteDistrict"
                          value={formData.siteDistrict}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Select District --</option>
                          {[
                            "Amritsar",
                            "Bathinda",
                            "Faridkot",
                            "Jalandhar",
                            "Ludhiana",
                            "Mohali",
                            "Patiala",
                            "Sangrur",
                          ].map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label
                          className="f-label"
                          style={{ fontSize: ".85rem" }}
                        >
                          Pin Code
                        </label>
                        <input
                          type="text"
                          className="f-control"
                          name="sitePin"
                          placeholder="PIN Code"
                          value={formData.sitePin}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label
                          className="f-label"
                          style={{ fontSize: ".85rem" }}
                        >
                          Full Site Address <span className="req">*</span>
                        </label>
                        <textarea
                          className="f-control"
                          rows="3"
                          name="siteAddress"
                          placeholder="Village, Ward, Street, Landmark, Location details"
                          value={formData.siteAddress}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <div className="col-12 mb-3">
                        <label className="f-label">
                          Media File / Geo-coordinates
                        </label>
                        <div
                          className="upload-zone"
                          onClick={() => mediaInputRef.current?.click()}
                        >
                          <div
                            style={{
                              fontSize: "2rem",
                              color: "var(--text-light)",
                              marginBottom: "8px",
                            }}
                          >
                            <i className="bi bi-cloud-arrow-up-fill"></i>
                          </div>
                          <div
                            style={{
                              fontWeight: "700",
                              fontSize: ".88rem",
                              marginBottom: "4px",
                            }}
                          >
                            Click to upload or drag & drop
                          </div>
                          <div
                            style={{
                              fontSize: ".8rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            Photos, videos with coordinates (Max 10 MB)
                          </div>
                        </div>
                        <input
                          type="file"
                          ref={mediaInputRef}
                          accept="image/*,video/*"
                          onChange={handleMediaUpload}
                          style={{ display: "none" }}
                        />
                        {mediaFiles.length > 0 && (
                          <div
                            id="mediaList"
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {mediaFiles.map((file, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  background: "var(--surface2)",
                                  border: "1px solid var(--border)",
                                  borderRadius: "6px",
                                  padding: "5px 10px",
                                  fontSize: ".75rem",
                                }}
                              >
                                <i
                                  className="bi bi-file-earmark-fill"
                                  style={{ color: "var(--primary)" }}
                                ></i>
                                {file.name}
                                <span style={{ color: "var(--text-muted)" }}>
                                  ({Math.round(file.size / 1024)}KB)
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className="d-flex justify-content-between"
                      style={{ marginTop: "48px" }}
                    >
                      <button className="btn-o" onClick={() => goStep(2)}>
                        <i className="bi bi-arrow-left"></i> Back
                      </button>
                      <button
                        className="btn-p"
                        style={{ padding: "10px 26px", fontSize: ".85rem" }}
                        onClick={() => goStep(4)}
                      >
                        Next &nbsp;<i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Assignment & Review */}
                {currentStep === 4 && (
                  <div>
                    <h6 className="fw-800 mb-1">Assign & Review</h6>
                    <p
                      style={{
                        fontSize: ".8rem",
                        color: "var(--text-muted)",
                        marginBottom: "22px",
                      }}
                    >
                      Assign complaint to RO Office and review all details.
                    </p>

                    <div className="row mb-4">
                      <div className="col-12">
                        <label className="f-label">
                          Assigned To <span className="req">*</span>
                        </label>
                        <select
                          className="f-select"
                          name="assignedTo"
                          value={formData.assignedTo}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Select RO Office --</option>
                          {[
                            "Amritsar",
                            "Batala",
                            "Bathinda",
                            "Barnala",
                            "Faridkot",
                            "Fatehgarh Sahib",
                            "Hoshiarpur",
                            "Jalandhar-1",
                            "Jalandhar-2",
                            "Ludhiana-1",
                            "Ludhiana-2",
                            "Ludhiana-3",
                            "Ludhiana-4",
                            "Mohali",
                            "Muktsar Sahib",
                            "Patiala",
                            "Ropar / Rupnagar",
                            "Sangrur",
                            "Tarn Taran",
                            "ADO",
                          ].map((office) => (
                            <option key={office} value={office}>
                              {office}
                            </option>
                          ))}
                        </select>
                        <small style={{ color: "var(--primary)" }}>
                          Email notification will be sent to assigned office
                        </small>
                      </div>
                    </div>

                    <div className="review-block mb-3">
                      <div
                        style={{
                          fontSize: ".7rem",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: ".05em",
                          color: "var(--text-muted)",
                          marginBottom: "14px",
                        }}
                      >
                        Complaint Summary
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                            }}
                          >
                            Source
                          </div>
                          <div
                            id="rv-source"
                            style={{
                              fontSize: ".85rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            —
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                            }}
                          >
                            Pollution Type
                          </div>
                          <div
                            id="rv-type"
                            style={{
                              fontSize: ".85rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            —
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                            }}
                          >
                            Subject
                          </div>
                          <div
                            id="rv-subject"
                            style={{
                              fontSize: ".85rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            —
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                            }}
                          >
                            Complainant
                          </div>
                          <div
                            id="rv-complainant"
                            style={{
                              fontSize: ".85rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            —
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                            }}
                          >
                            District
                          </div>
                          <div
                            id="rv-district"
                            style={{
                              fontSize: ".85rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            —
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            style={{
                              fontSize: ".65rem",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              color: "var(--text-muted)",
                            }}
                          >
                            Assigned To
                          </div>
                          <div
                            id="rv-assigned"
                            style={{
                              fontSize: ".85rem",
                              fontWeight: "700",
                              marginTop: "3px",
                            }}
                          >
                            —
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-2 mb-4">
                      <input
                        type="checkbox"
                        id="declareCb"
                        checked={declarationChecked}
                        onChange={(e) =>
                          setDeclarationChecked(e.target.checked)
                        }
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "var(--primary)",
                          marginTop: "2px",
                          flexShrink: "0",
                          cursor: "pointer",
                        }}
                      />

                      <label
                        htmlFor="declareCb"
                        style={{ fontSize: ".82rem", cursor: "pointer" }}
                      >
                        I confirm that all information entered is accurate and
                        complete.
                      </label>
                    </div>

                    <div className="d-flex justify-content-between flex-wrap gap-2">
                      <button className="btn-o" onClick={() => goStep(3)}>
                        <i className="bi bi-arrow-left"></i> Back
                      </button>
                      <button
                        className="btn-full"
                        style={{ width: "auto", padding: "11px 30px" }}
                        onClick={submitComplaint}
                      >
                        <i className="bi bi-send-fill me-1"></i> Submit
                        Complaint
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div id="successState" style={{ paddingTop: "20px" }}>
              <div className="data-card">
                <div className="success-wrap py-5">
                  <div className="success-icon">✅</div>
                  <h4 className="fw-800 mb-2">
                    Complaint Registered Successfully!
                  </h4>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: ".88rem",
                      maxWidth: "460px",
                      margin: "0 auto 6px",
                    }}
                  >
                    The complaint has been entered into the system and assigned
                    to the relevant RO office.
                  </p>
                  <div className="comp-num" id="generatedNum">
                    {generatedNum}
                  </div>
                  <p
                    style={{
                      fontSize: ".78rem",
                      color: "var(--text-muted)",
                      marginBottom: "28px",
                    }}
                  >
                    Manual Entry Reference Number
                  </p>

                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link
                      href="/track-complaint"
                      className="btn-p"
                      style={{ padding: "11px 24px", textDecoration: "none" }}
                    >
                      <i className="bi bi-search me-1"></i> Track
                    </Link>
                    <Link
                      href="/"
                      className="btn-o"
                      style={{ padding: "11px 24px", textDecoration: "none" }}
                    >
                      <i className="bi bi-house me-1"></i> Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
