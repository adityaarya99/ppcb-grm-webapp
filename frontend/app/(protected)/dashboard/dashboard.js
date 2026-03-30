"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { getGrievances } from "@/services/api";
import "./style.css";

export default function Dashboard() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleAccordionToggle = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        setLoading(true);
        const data = await getGrievances();
        setGrievances(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);
  return (
    <main className="main-content">
      <div id="dashboard" className="page-section active-section">
        <div className="d-none d-md-block text-muted mb-3">
          <span className="fw-bold highlight-blink">
            <span className="blink-arrow">➤</span>
            Form for manual entry of complaints (rights to be given to both
            Grievance Cell & RO Offices){" "}
            <Link href="#" className="text-primary fw-bold">
              Click here
            </Link>
          </span>
        </div>

        {/* ================= ACCORDION ================= */}
        <div className="custom-accordion mb-4">
          {/* -------- Profile Accordion Item -------- */}
          <div className={`acc-item ${activeAccordion === 0 ? "active" : ""}`}>
            <button
              type="button"
              className="acc-btn"
              onClick={() => handleAccordionToggle(0)}
            >
              <span>
                <i className="fas fa-user-circle me-2" />
                Profile Information
              </span>
              <i className="fas fa-chevron-down" />
            </button>

            <div className="acc-content">
              <div className="row mb-4 mt-3">
                <div className="col-12">
                  <div className="card profile-box border-0 rounded-3 overflow-hidden">
                    <div className="card-body">
                      <div className="row g-4 align-items-center">
                        {/* Profile Image */}
                        <div className="col-md-3 text-center">
                          <div className="p-2">
                            <Image
                              src="/Images/images.png"
                              alt="Profile"
                              width={140}
                              height={140}
                              className="rounded-circle border shadow-sm"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <h6 className="fw-bold mt-2 mb-0">
                            Member Secretary
                          </h6>
                          <small className="text-muted">Head Office</small>
                        </div>

                        {/* Profile Details */}
                        <div className="col-md-9">
                          <div className="row gy-4">
                            {[
                              {
                                icon: "fa-id-card",
                                label: "Employee Code",
                                value: "EMP1245",
                              },
                              {
                                icon: "fa-envelope",
                                label: "Email",
                                value: "ms@office.gov.in",
                              },
                              {
                                icon: "fa-calendar",
                                label: "Date of Birth",
                                value: "12-08-2000",
                              },
                              {
                                icon: "fa-phone",
                                label: "Mobile Number",
                                value: "8386328797",
                              },
                              {
                                icon: "fa-building",
                                label: "Office",
                                value: "Head Office Bhopal",
                              },
                              {
                                icon: "fa-layer-group",
                                label: "Section",
                                value: "Administration",
                              },
                            ].map((item, index) => (
                              <div className="col-md-6" key={index}>
                                <div className="p-2 bg-light rounded-3 shadow-sm d-flex align-items-center gap-3">
                                  <div className="icon header-card text-white rounded-circle p-3">
                                    <i className={`fas ${item.icon}`} />
                                  </div>
                                  <div>
                                    <small className="text-muted d-block">
                                      {item.label}
                                    </small>
                                    <h6 className="fw-bold mb-0">
                                      {item.value}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= COMPLAINT TABLE ================= */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card profile-box border-0 rounded-3 overflow-hidden">
              <div className="card-header header-card text-white py-3">
                <h5 className="mb-0">
                  <i className="fas fa-calendar-alt me-2" />
                  Leave Information
                </h5>
              </div>

              <div className="card-body p-4">
                <div className="table-scroll">
                  <table className="table table-hover align-middle text-center mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>SR No</th>
                        <th>Complainant Name</th>
                        <th>Phone</th>
                        <th>District</th>
                        <th>Pollution</th>
                        <th>View</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading && (
                        <tr>
                          <td colSpan="7">Loading...</td>
                        </tr>
                      )}

                      {error && (
                        <tr>
                          <td colSpan="7" style={{ color: "red" }}>
                            {error}
                          </td>
                        </tr>
                      )}

                      {!loading && grievances.length === 0 && (
                        <tr>
                          <td colSpan="7">No data found</td>
                        </tr>
                      )}

                      {grievances.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.complainant_name || "N/A"}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              {item.complaint_subject}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-info text-white">
                              <i className="fas fa-eye" />
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-success me-1">
                              <i className="fas fa-check" />
                            </button>
                            <button className="btn btn-sm btn-danger">
                              <i className="fas fa-times" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-muted small mt-3">
                  Showing <strong>1</strong> to <strong>10</strong> of{" "}
                  <strong>56</strong> entries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <div className="modal fade" id="viewComplaintModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">
                <i className="fas fa-file-alt me-2" />
                Complaint Details
              </h5>
              <button
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              Illegal burning of waste causing severe air pollution in a
              residential area.
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
