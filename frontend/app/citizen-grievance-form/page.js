"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { submitGrievance, resetSubmissionState } from '@/features/grievances/slice';
import Swal from 'sweetalert2';
import { getDistricts, getGroupTypes } from '@/services/api';


export default function CitizenGrievanceFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complaintType, setComplaintType] = useState("individual");
  const [files, setFiles] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [groupTypes, setGroupTypes] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { loading, error, success, referenceNumber } = useSelector((state) => state.grievance);

  const [formData, setFormData] = useState({
    cpName: "",
    cpMobile: "",
    cpDistrict: "",
    cpPinCode: "",
    cpOccupation: "",
    cpAddress: "",
    // Group complainant
    cpGroupType: "",
    cpNodalName: "",
    cpNodalContact: "",
    cpGroupAddress: "",
    // Complaint details
    cCategory: "",
    industryName: "",
    pollutionLocation: "",
    cSubject: "",
    cDesc: "",
    prevComplaint: "No",
  });

  const [wordCounts, setWordCounts] = useState({
    subject: 0,
    description: 0,
  });

  const [declarationChecked, setDeclarationChecked] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle word count for subject
  const handleSubjectChange = (e) => {
    const value = e.target.value;
    const words = value
      .trim()
      .split(/\s+/)
      .filter((w) => w).length;

    if (words <= 100) {
      setFormData((prev) => ({ ...prev, cSubject: value }));
      setWordCounts((prev) => ({ ...prev, subject: words }));
    }
  };

  // Handle word count for description
  const handleDescChange = (e) => {
    const value = e.target.value;
    const words = value
      .trim()
      .split(/\s+/)
      .filter((w) => w).length;

    if (words <= 500) {
      setFormData((prev) => ({ ...prev, cDesc: value }));
      setWordCounts((prev) => ({ ...prev, description: words }));
    }
  };

  // Handle file uploads
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5)); // Max 5 files
  };

  // Go to specific step
  const goToStep = (stepNum) => {
    setCurrentStep(stepNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit complaint (dispatches Redux thunk)
  const handleSubmitComplaint = async () => {
    if (!declarationChecked) {
      alert("Please check declaration");
      return;
    }

    const form = new FormData();

    // ✅ FILES (Correct already)
    if (files && files.length > 0) {
      files.forEach((f) => form.append('file', f));
    }

    // ✅ REQUIRED FIELDS
    form.append('form_type', 'Individual');

    // ✅ pollution_types MUST BE ARRAY
    if (formData.cCategory) {
      const simple = String(formData.cCategory).split(' ')[0];
      form.append('pollution_types', simple);
      // backend Transform will convert to array
    }

    form.append('complaint_subject', formData.cSubject || '');
    form.append('complaint_details', formData.cDesc || ''); // ✅ FIXED

    form.append('site_address', formData.pollutionLocation || '');
    form.append('site_district_id', formData.cpDistrict || '');
    form.append('site_pincode', formData.cpPinCode || '');

    form.append(
      'filed_by_type',
      complaintType === 'individual' ? 'Individual' : 'Group'
    );

    // ✅ FIX FIELD NAMES
    form.append(
      'complainant_name',
      complaintType === 'individual'
        ? formData.cpName
        : formData.cpNodalName
    );

    form.append(
      'complainant_contact_no', // ✅ FIXED NAME
      complaintType === 'individual'
        ? formData.cpMobile
        : formData.cpNodalContact
    );

    // OPTIONAL
    form.append('industry_name', formData.industryName || '');

    dispatch(submitGrievance(form));
  };
  const handleStep1Next = () => {
    if (validateStep1()) {
      goToStep(2);
    }
  };
  const progressPercentages = { 1: "33.33%", 2: "66.66%", 3: "100%" };
  const validateStep1 = () => {
    let errors = [];

    if (complaintType === "individual") {
      if (!formData.cpName) errors.push("Complainant Name is required");
      if (!formData.cpMobile) errors.push("Mobile number is required");
      if (!/^[0-9]{10}$/.test(formData.cpMobile)) errors.push("Invalid mobile number");
      if (!formData.cpDistrict) errors.push("District is required");
      if (!formData.cpAddress) errors.push("Address is required");
    }

    if (complaintType === "group") {
      if (!formData.cpGroupType) errors.push("Group Type is required");
      if (!formData.cpNodalName) errors.push("Nodal Officer Name is required");
      if (!formData.cpNodalContact) errors.push("Nodal Contact is required");
      if (!formData.cpGroupAddress) errors.push("Group Address is required");
    }

    if (!formData.cCategory) errors.push("Pollution Type is required");
    if (!formData.pollutionLocation) errors.push("Pollution Location is required");
    if (!formData.cSubject) errors.push("Complaint Subject is required");
    if (!formData.cDesc) errors.push("Description is required");

    if (errors.length > 0) {
      Swal.fire({
        title: 'Validation Errors',
        html: errors.join('<br>'),
        icon: 'error'
      });
      return false;
    }

    return true;
  };
  // Show success state if Redux says so
  const successState = success;
  const generatedNum = referenceNumber || '';

  return (
    <>
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
              <h1>PPCB – File a Complaint</h1>
              <p>Grievance Redressal Mechanism &nbsp;|&nbsp; Punjab</p>
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

      <main
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          paddingBottom: "60px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Loading indicator */}
        {loading && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(255,255,255,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner-border text-primary" role="status" style={{ width: 60, height: 60 }}>
              <span className="visually-hidden">Submitting...</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div style={{ maxWidth: 600, margin: '24px auto 0', padding: '12px 20px', background: '#ffeaea', color: '#a94442', border: '1px solid #f5c6cb', borderRadius: 8, fontWeight: 600, fontSize: '1rem', textAlign: 'center' }}>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}
        {/* FORM HEADER */}
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--primary-dark), var(--primary))",
            padding: "clamp(20px, 5vw, 36px) clamp(16px, 5vw, 24px)",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "clamp(12px, 3vw, 24px)",
              marginTop: "0",
              marginBottom: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                <i className="bi bi-pencil-square me-2"></i>Citizen Grievance
                Portal
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                  opacity: 0.7,
                  margin: 0,
                }}
              >
                All complaints are registered, acknowledged, and tracked. You'll
                receive SMS & Email confirmation.
              </p>
            </div>
            <div
              style={{ textAlign: "right", display: "none" }}
              className="md:block"
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  opacity: 0.5,
                  marginBottom: "4px",
                }}
              >
                Helpline (Mon–Fri)
              </div>
              <div
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  fontWeight: "700",
                }}
              >
                1800-XXX-XXXX
              </div>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            marginTop: "-32px",
            padding: "clamp(12px, 4vw, 16px)",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
          }}
        >
          {!successState ? (
            <div
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
              {/* Step Navigation */}
              <nav
                style={{
                  background: "var(--surface2)",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "clamp(4px, 2vw, 8px)",
                      padding: "clamp(10px, 3vw, 16px) clamp(8px, 3vw, 20px)",
                      fontSize: "clamp(0.65rem, 2vw, 0.9rem)",
                      fontWeight: "600",
                      color:
                        currentStep === step
                          ? "var(--primary)"
                          : "var(--text-muted)",
                      borderBottom:
                        currentStep === step
                          ? "3px solid var(--primary)"
                          : "3px solid transparent",
                      cursor: "default",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(16px, 4vw, 20px)",
                        height: "clamp(16px, 4vw, 20px)",
                        borderRadius: "50%",
                        background:
                          currentStep === step
                            ? "var(--primary)"
                            : "var(--border)",
                        color:
                          currentStep === step ? "white" : "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "clamp(0.5rem, 2vw, 0.62rem)",
                        fontWeight: "800",
                        flexShrink: 0,
                      }}
                    >
                      {step}
                    </div>
                    <span
                      style={{
                        display: "none",
                      }}
                      className="step-text-responsive"
                    >
                      {step === 1
                        ? "Complainant / Complaint"
                        : step === 2
                          ? "Verify OTP"
                          : "Review & Submit"}
                    </span>
                  </div>
                ))}
              </nav>

              {/* Progress bar */}
              {/* <div style={{ height: "4px", background: "var(--border)" }}>
                <div
                  style={{
                    height: "100%",
                    width: progressPercentages[currentStep],
                    background: "var(--primary)",
                    transition: "width 0.4s",
                  }}
                ></div>
              </div> */}

              {/* STEP 1: Complainant Info */}
              {currentStep === 1 && (
                <div
                  style={{
                    padding: "clamp(16px, 4vw, 28px) clamp(12px, 4vw, 24px)",
                  }}
                >
                  {/* Complaint Type Selection */}
                  <div
                    className="row g-3 mb-4 pb-3"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <div className="col-12">
                      <label className="f-label">
                        Complainant Type <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="col-12">
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="complaintType"
                            id="typeIndividual"
                            value="individual"
                            checked={complaintType === "individual"}
                            onChange={(e) => setComplaintType(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="typeIndividual"
                          >
                            Individual
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="complaintType"
                            id="typeGroup"
                            value="group"
                            onChange={(e) => setComplaintType(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="typeGroup"
                          >
                            RWA/ Society/ Association/ CSO/ Other (Group of
                            Individuals)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3">
                    {/* INDIVIDUAL COMPLAINANT FIELDS */}
                    {complaintType === "individual" && (
                      <>
                        <div className="col-md-6">
                          <label className="f-label">
                            Complainant Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="f-control"
                            placeholder="As per official records"
                            id="cpName"
                            value={formData.cpName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            Complainant Contact No.{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            className="f-control"
                            placeholder="+91 XXXXX XXXXX"
                            id="cpMobile"
                            value={formData.cpMobile}
                            onChange={handleInputChange}
                          />
                          <p className="f-hint mb-0 small">
                            OTP will be sent to verify
                          </p>
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            District <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="f-select"
                            id="cpDistrict"
                            value={formData.cpDistrict}
                            onChange={handleInputChange}
                            disabled={loadingData}
                          >
                            <option value="">-- Select District --</option>
<option value="1">Amritsar</option>
<option value="2">Ludhiana</option>
<option value="3">Jalandhar</option>
<option value="4">Patiala</option>
<option value="5">Bathinda</option>
<option value="6">Mohali (SAS Nagar)</option>
<option value="7">Gurdaspur</option>
<option value="8">Hoshiarpur</option>
<option value="9">Moga</option>
<option value="10">Firozpur</option>
<option value="11">Faridkot</option>
<option value="12">Sangrur</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">Pin Code</label>
                          <input
                            type="text"
                            className="f-control"
                            placeholder="PIN Code"
                            id="cpPinCode"
                            value={formData.cpPinCode}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            Complainant&apos;s Occupation
                          </label>
                          <input
                            type="text"
                            className="f-control"
                            placeholder="Occupation"
                            id="cpOccupation"
                            value={formData.cpOccupation}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            Complainant&apos;s Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            className="f-control"
                            rows="2"
                            placeholder="House No., Street, Village/City, PIN Code"
                            id="cpAddress"
                            value={formData.cpAddress}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </>
                    )}

                    {/* GROUP COMPLAINANT FIELDS */}
                    {complaintType === "group" && (
                      <>
                        <div className="col-md-6">
                          <label className="f-label">
                            RWA/ Society/ Association/ CSO/ Other (Group Type){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="f-select"
                            id="cpGroupType"
                            value={formData.cpGroupType}
                            onChange={handleInputChange}
                            disabled={loadingData}
                          >
                            <option value="">-- Select Group Type --</option>
                            {groupTypes.map((groupType) => (
                              <option key={groupType.id} value={groupType.name}>
                                {groupType.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            Name of the Nodal Officer{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="f-control"
                            placeholder="Name of Nodal Officer"
                            id="cpNodalName"
                            value={formData.cpNodalName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            Contact Number of the Nodal Officer{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            className="f-control"
                            placeholder="+91 XXXXX XXXXX"
                            id="cpNodalContact"
                            value={formData.cpNodalContact}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="f-label">
                            Address of RWA/ Society/ Association/ CSO/ Group{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            className="f-control"
                            rows="2"
                            placeholder="House No., Street, Village/City, PIN Code, District"
                            id="cpGroupAddress"
                            value={formData.cpGroupAddress}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </>
                    )}

                    <div className="col-md-6">
                      <label className="f-label">
                        Pollution Type<span className="text-red-500">*</span>
                      </label>
                      <select
                        className="f-select"
                        id="cCategory"
                        value={formData.cCategory}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Category --</option>
                        <option>Air Pollution</option>
                        <option>Water Pollution</option>
                        <option>Noise Pollution</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="f-label">
                        Industry / Source Name (if known)
                      </label>
                      <input
                        type="text"
                        className="f-control"
                        placeholder="Name of factory, plant or establishment"
                        id="industryName"
                        value={formData.industryName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="f-label">
                        Exact Location / Address of Pollution Source{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="f-control"
                        placeholder="Village, Ward, Street, Landmark, District, PIN Code"
                        id="pollutionLocation"
                        value={formData.pollutionLocation}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="f-label">
                        Complaint Subject{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="f-control"
                        rows="2"
                        placeholder="Brief subject of your complaint"
                        id="cSubject"
                        value={formData.cSubject}
                        onChange={handleSubjectChange}
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
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {wordCounts.subject}/100 words
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="f-label">
                        Detailed Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        className="f-control"
                        rows="5"
                        placeholder="Describe: nature of pollution, its impact on environment and health, affected population, any previous complaints made and action taken (minimum 50 words)…"
                        id="cDesc"
                        value={formData.cDesc}
                        onChange={handleDescChange}
                      ></textarea>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "4px",
                        }}
                      >
                        <p className="f-hint">
                          Be specific about harm caused, affected areas, and any
                          earlier actions. (Max 500 words)
                        </p>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          {wordCounts.description}/500 words
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="f-label">
                        Upload Supporting Evidence
                      </label>
                      <div
                        style={{
                          border: "2px dashed var(--border)",
                          borderRadius: "var(--radius)",
                          padding:
                            "clamp(20px, 5vw, 36px) clamp(12px, 4vw, 20px)",
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          background: "var(--surface2)",
                          boxSizing: "border-box",
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary)";
                          e.currentTarget.style.background = "#e8f0fb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.background = "var(--surface2)";
                        }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(1.6rem, 5vw, 2rem)",
                            color: "var(--text-light)",
                            marginBottom: "8px",
                          }}
                        >
                          <i className="bi bi-cloud-arrow-up-fill"></i>
                        </div>
                        <div
                          style={{
                            fontWeight: "700",
                            fontSize: "0.88rem",
                            marginBottom: "4px",
                          }}
                        >
                          Click to upload or drag & drop
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          Photos, videos, documents (Max 10 MB each, up to 5
                          files)
                        </div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--text-light)",
                            marginTop: "6px",
                          }}
                        >
                          Supported: JPG, PNG, PDF, DOC, Video
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {files.map((file, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              background: "var(--surface2)",
                              border: "1px solid var(--border)",
                              borderRadius: "6px",
                              padding: "5px 10px",
                              fontSize: "0.75rem",
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
                    </div>

                    <div className="col-md-6">
                      <label className="f-label">
                        Have you complained before?
                      </label>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          marginTop: "8px",
                        }}
                      >
                        {["Yes", "No"].map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                prevComplaint: option,
                              }))
                            }
                            style={{
                              padding: "8px 20px",
                              border:
                                "1.5px solid " +
                                (formData.prevComplaint === option
                                  ? "var(--primary)"
                                  : "var(--border)"),
                              borderRadius: "12px",
                              fontSize: "0.76rem",
                              fontWeight: "600",
                              color:
                                formData.prevComplaint === option
                                  ? "white"
                                  : "var(--text-muted)",
                              background:
                                formData.prevComplaint === option
                                  ? "var(--primary)"
                                  : "white",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      onClick={handleStep1Next}
                      className="btn-p"
                      style={{ padding: "10px 26px", fontSize: "0.85rem" }}
                    >
                      Next <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Verify OTP */}
              {currentStep === 2 && (
                <div
                  style={{
                    padding: "clamp(16px, 4vw, 28px) clamp(12px, 4vw, 24px)",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        background: "linear-gradient(135deg,#deeafb,#b8d4f4)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.8rem",
                        margin: "0 auto 18px",
                      }}
                    >
                      🔐
                    </div>
                    <h6 style={{ fontWeight: "800", marginBottom: "8px" }}>
                      Verify Your Identity
                    </h6>
                    <p
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--text-muted)",
                        maxWidth: "380px",
                        margin: "0 auto 28px",
                      }}
                    >
                      A 6-digit OTP has been sent to your registered mobile
                      number or email address.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginBottom: "16px",
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength="1"
                          style={{
                            width: "46px",
                            height: "50px",
                            border: "1.5px solid var(--border)",
                            borderRadius: "var(--radius-sm)",
                            textAlign: "center",
                            fontSize: "1.2rem",
                            fontWeight: "700",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            color: "var(--text)",
                          }}
                          onKeyDown={(e) => {
                            if (e.key.match(/\d/)) {
                              const next = e.currentTarget.nextElementSibling;
                              if (next) next.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                    <p
                      style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                    >
                      Didn't receive?{" "}
                      <a
                        href="#"
                        style={{ color: "var(--primary)", fontWeight: "600" }}
                      >
                        Resend OTP
                      </a>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "12px",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button onClick={() => goToStep(1)} className="btn-o">
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </button>
                    <button
                      onClick={() => goToStep(3)}
                      className="btn-p"
                      style={{ padding: "10px 26px", fontSize: "0.85rem" }}
                    >
                      Verify <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review & Submit */}
              {currentStep === 3 && (
                <div
                  style={{
                    padding: "clamp(16px, 4vw, 28px) clamp(12px, 4vw, 24px)",
                  }}
                >
                  <h6 style={{ fontWeight: "800", marginBottom: "8px" }}>
                    Review & Submit
                  </h6>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      marginBottom: "22px",
                    }}
                  >
                    Please review all details before final submission.
                  </p>
                  <div
                    style={{
                      background: "var(--surface2)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "clamp(12px, 3vw, 18px) clamp(12px, 3vw, 20px)",
                      marginBottom: "12px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--text-muted)",
                        marginBottom: "14px",
                      }}
                    >
                      Complaint Summary
                    </div>
                    <div className="row g-3">
                      <div className="col-6 col-md-4">
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                          }}
                        >
                          Complainant
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            marginTop: "3px",
                          }}
                        >
                          {complaintType === "individual"
                            ? formData.cpName
                            : formData.cpNodalName || "—"}
                        </div>
                      </div>
                      <div className="col-6 col-md-4">
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                          }}
                        >
                          District
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            marginTop: "3px",
                          }}
                        >
                          {formData.cpDistrict || "—"}
                        </div>
                      </div>
                      <div className="col-6 col-md-4">
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                          }}
                        >
                          Category
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            marginTop: "3px",
                          }}
                        >
                          {formData.cCategory || "—"}
                        </div>
                      </div>
                      <div className="col-6 col-md-4">
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                          }}
                        >
                          Source
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            marginTop: "3px",
                          }}
                        >
                          Online Portal
                        </div>
                      </div>
                      <div className="col-6 col-md-4">
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                          }}
                        >
                          Mobile Verified
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            color: "var(--success)",
                            marginTop: "3px",
                          }}
                        >
                          ✓ Verified
                        </div>
                      </div>
                      <div className="col-6 col-md-4">
                        <div
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                          }}
                        >
                          Evidence
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            marginTop: "3px",
                          }}
                        >
                          {files.length} file(s)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#fff8e8",
                      border: "1px solid #f0d080",
                      borderRadius: "var(--radius-sm)",
                      padding: "clamp(10px, 3vw, 13px) clamp(12px, 3vw, 16px)",
                      fontSize: "clamp(0.75rem, 2vw, 0.8rem)",
                      color: "#a07000",
                      marginBottom: "18px",
                      boxSizing: "border-box",
                    }}
                  >
                    <i className="bi bi-info-circle-fill me-2"></i>
                    By submitting, you declare that the information provided is
                    true to the best of your knowledge. False complaints may
                    attract action under applicable laws.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="declareCb"
                      checked={declarationChecked}
                      onChange={(e) => setDeclarationChecked(e.target.checked)}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "var(--primary)",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <label
                      htmlFor="declareCb"
                      style={{ fontSize: "0.82rem", cursor: "pointer" }}
                    >
                      I agree to the declaration above and confirm all details
                      are accurate and correct.
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <button onClick={() => goToStep(2)} className="btn-o">
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </button>
                    <button
                      onClick={handleSubmitComplaint}
                      className="btn-full"
                      style={{ width: "auto", padding: "11px 30px" }}
                    >
                      <i className="bi bi-send-fill me-1"></i> Submit Complaint
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SUCCESS STATE */
            <div style={{ paddingTop: "clamp(12px, 4vw, 20px)" }}>
              <div className="data-card">
                <div
                  style={{
                    padding: "clamp(16px, 5vw, 20px) clamp(12px, 5vw, 16px)",
                    maxWidth: "600px",
                    margin: "0 auto",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(60px, 12vw, 80px)",
                      height: "clamp(60px, 12vw, 80px)",
                      background: "linear-gradient(135deg, #d4f5e2, #a8e8c2)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
                      margin: "0 auto clamp(12px, 3vw, 20px)",
                    }}
                  >
                    ✅
                  </div>
                  <h4 style={{ fontWeight: "800", marginBottom: "8px" }}>
                    Complaint Registered Successfully!
                  </h4>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.88rem",
                      maxWidth: "460px",
                      margin: "0 auto 6px",
                    }}
                  >
                    Your grievance has been received. An acknowledgement has
                    been sent to your mobile and email.
                  </p>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary-dark), var(--primary))",
                      color: "white",
                      padding: "12px 30px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "1.3rem",
                      fontWeight: "800",
                      letterSpacing: "0.06em",
                      display: "inline-block",
                      margin: "14px 0",
                      fontFamily: "'Instrument Serif', serif",
                    }}
                  >
                    {generatedNum}
                  </div>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      marginBottom: "28px",
                    }}
                  >
                    Save this number to track your complaint status at any time
                  </p>

                  <div
                    style={{
                      maxWidth: "460px",
                      margin: "0 auto 28px",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                        padding: "12px 14px",
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.85rem",
                          background: "#d4f5e2",
                          color: "var(--success)",
                        }}
                      >
                        <i className="bi bi-check2"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.82rem" }}>
                          SMS & Email Acknowledgement Sent
                        </div>
                        <div
                          style={{
                            fontSize: "0.74rem",
                            color: "var(--text-muted)",
                            marginTop: "2px",
                          }}
                        >
                          Delivered to your registered contact details
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                        padding: "12px 14px",
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.85rem",
                          background: "#deeafb",
                          color: "var(--primary)",
                        }}
                      >
                        <i className="bi bi-person-check"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.82rem" }}>
                          Under Scrutiny by Ex-EN (Grievance Cell)
                        </div>
                        <div
                          style={{
                            fontSize: "0.74rem",
                            color: "var(--text-muted)",
                            marginTop: "2px",
                          }}
                        >
                          Review within 2 working days
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                        padding: "12px 14px",
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.85rem",
                          background: "#fdf3d4",
                          color: "var(--warning)",
                        }}
                      >
                        <i className="bi bi-clock"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.82rem" }}>
                          Expected Resolution: 30 Working Days
                        </div>
                        <div
                          style={{
                            fontSize: "0.74rem",
                            color: "var(--text-muted)",
                            marginTop: "2px",
                          }}
                        >
                          As per SOP. You'll receive status updates via
                          SMS/Email.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href="/track-complaint"
                      className="btn-p"
                      style={{ padding: "11px 24px" }}
                    >
                      <i className="bi bi-search me-1"></i> Track Complaint
                    </a>
                    <Link
                      href="/"
                      className="btn-o"
                      style={{ padding: "11px 24px" }}
                    >
                      <i className="bi bi-house me-1"></i> Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
