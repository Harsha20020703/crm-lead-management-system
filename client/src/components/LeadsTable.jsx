import { useEffect, useState } from "react";
import API from "../services/api";
import CreateLeadForm from "./CreateLeadForm";
import LeadNotes from "./LeadNotes";

function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] =
    useState("");
  const [status, setStatus] =
    useState("");
  const [source, setSource] =
    useState("");
  const [salesperson, setSalesperson] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [selectedLead, setSelectedLead] =
    useState(null);
  const [editingLead, setEditingLead] =
    useState(null);

  const [deleteLeadId, setDeleteLeadId] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  useEffect(() => {
    fetchLeads();
  }, [
    search,
    status,
    source,
    salesperson,
  ]);

  const fetchLeads = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await API.get(
        `/leads?search=${search}&status=${status}&leadSource=${source}&assignedSalesperson=${salesperson}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(
        `/leads/${deleteLeadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Lead deleted successfully"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

      setShowDeleteModal(false);

      fetchLeads();
    } catch (error) {
      console.log(error);

      setMessage("Failed to delete lead");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        `/leads/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "22px",
          boxShadow:
            "0 6px 18px rgba(0,0,0,0.05)",
        }}
      >
        <CreateLeadForm
          onLeadCreated={fetchLeads}
        />
      </div>

      <div
        style={{
          marginTop: "40px",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "22px",
          boxShadow:
            "0 6px 18px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#0f172a",
              fontWeight: "700",
            }}
          >
            Leads Management
          </h2>

          <p
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Search, filter, and manage
            all leads
          </p>
        </div>

        {message && (
          <div
            style={{
              backgroundColor:
                message.includes(
                  "successfully"
                )
                  ? "#16a34a"
                  : "#ef4444",
              color: "white",
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "25px",
              fontWeight: "600",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "30px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              padding: "14px 18px",
              width: "280px",
              borderRadius: "12px",
              border:
                "1px solid #dbeafe",
              backgroundColor:
                "#f8fafc",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={filterStyle}
          >
            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Proposal Sent">
              Proposal Sent
            </option>

            <option value="Won">
              Won
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          <select
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            style={filterStyle}
          >
            <option value="">
              All Sources
            </option>

            <option value="Website">
              Website
            </option>

            <option value="Facebook">
              Facebook
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

            <option value="Referral">
              Referral
            </option>
          </select>

          <select
            value={salesperson}
            onChange={(e) =>
              setSalesperson(
                e.target.value
              )
            }
            style={filterStyle}
          >
            <option value="">
              All Salespersons
            </option>

            <option value="John">
              John
            </option>

            <option value="David">
              David
            </option>

            <option value="Sarah">
              Sarah
            </option>

            <option value="Michael">
              Michael
            </option>
          </select>
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            width="100%"
            style={{
              borderCollapse:
                "separate",
              borderSpacing: "0 12px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor:
                    "#f8fafc",
                }}
              >
                <th style={tableHeader}>
                  Lead Name
                </th>

                <th style={tableHeader}>
                  Company
                </th>

                <th style={tableHeader}>
                  Lead Source
                </th>

                <th style={tableHeader}>
                  Salesperson
                </th>

                <th style={tableHeader}>
                  Status
                </th>

                <th style={tableHeader}>
                  Deal Value
                </th>

                <th style={tableHeader}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                >
                  <td style={tableCell}>
                    {lead.leadName}
                  </td>

                  <td style={tableCell}>
                    {lead.companyName}
                  </td>

                  <td style={tableCell}>
                    {lead.leadSource}
                  </td>

                  <td style={tableCell}>
                    {
                      lead.assignedSalesperson
                    }
                  </td>

                  <td style={tableCell}>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(
                          lead._id,
                          e.target.value
                        )
                      }
                      style={filterStyle}
                    >
                      <option value="New">
                        New
                      </option>

                      <option value="Contacted">
                        Contacted
                      </option>

                      <option value="Qualified">
                        Qualified
                      </option>

                      <option value="Proposal Sent">
                        Proposal Sent
                      </option>

                      <option value="Won">
                        Won
                      </option>

                      <option value="Lost">
                        Lost
                      </option>
                    </select>
                  </td>

                  <td style={tableCell}>
                    $
                    {
                      lead.estimatedDealValue
                    }
                  </td>

                  <td style={tableCell}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() =>
                          setSelectedLead(
                            lead
                          )
                        }
                        style={
                          viewButtonStyle
                        }
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          setEditingLead(
                            lead
                          )
                        }
                        style={
                          editButtonStyle
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeleteLeadId(
                            lead._id
                          );

                          setShowDeleteModal(
                            true
                          );
                        }}
                        style={
                          deleteButtonStyle
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <div style={modalOverlay}>
          <div style={modalStyle}>
            <h2>Lead Details</h2>

            <p>
              <strong>Name:</strong>{" "}
              {selectedLead.leadName}
            </p>

            <p>
              <strong>Company:</strong>{" "}
              {
                selectedLead.companyName
              }
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedLead.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedLead.phone}
            </p>

            <p>
              <strong>
                Lead Source:
              </strong>{" "}
              {
                selectedLead.leadSource
              }
            </p>

            <p>
              <strong>
                Salesperson:
              </strong>{" "}
              {
                selectedLead.assignedSalesperson
              }
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedLead.status}
            </p>

            <p>
              <strong>
                Deal Value:
              </strong>{" "}
              $
              {
                selectedLead.estimatedDealValue
              }
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(
                selectedLead.createdAt
              ).toLocaleString()}
            </p>

            <p>
              <strong>Updated:</strong>{" "}
              {new Date(
                selectedLead.updatedAt
              ).toLocaleString()}
            </p>

            <LeadNotes
              leadId={selectedLead._id}
            />

            <button
              onClick={() =>
                setSelectedLead(null)
              }
              style={closeButtonStyle}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div style={modalOverlay}>
          <div style={deleteModalStyle}>
            <h2
              style={{
                marginTop: 0,
                color: "#0f172a",
              }}
            >
              Delete Lead
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              Are you sure you want to
              delete this lead?
              This action cannot be undone.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
                marginTop: "30px",
              }}
            >
              <button
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
                style={
                  cancelButtonStyle
                }
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                style={
                  deleteButtonStyle
                }
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() =>
            setEditingLead(null)
          }
          onUpdated={fetchLeads}
        />
      )}
    </div>
  );
}

function EditLeadModal({
  lead,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] =
    useState({
      leadName: lead.leadName,
      companyName: lead.companyName,
      email: lead.email,
      phone: lead.phone,
      leadSource: lead.leadSource,
      assignedSalesperson:
        lead.assignedSalesperson,
      status: lead.status,
      estimatedDealValue:
        lead.estimatedDealValue,
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        `/leads/${lead._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdated();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalStyle}>
        <h2>Edit Lead</h2>

        <div
          style={{
            display: "grid",
            gap: "14px",
          }}
        >
          <input
            name="leadName"
            value={formData.leadName}
            onChange={handleChange}
            style={modalInput}
          />

          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            style={modalInput}
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={modalInput}
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={modalInput}
          />

          <input
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            style={modalInput}
          />

          <select
            name="assignedSalesperson"
            value={
              formData.assignedSalesperson
            }
            onChange={handleChange}
            style={modalInput}
          >
            <option value="John">
              John
            </option>

            <option value="David">
              David
            </option>

            <option value="Sarah">
              Sarah
            </option>

            <option value="Michael">
              Michael
            </option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={modalInput}
          >
            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Proposal Sent">
              Proposal Sent
            </option>

            <option value="Won">
              Won
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>

          <input
            name="estimatedDealValue"
            value={
              formData.estimatedDealValue
            }
            onChange={handleChange}
            style={modalInput}
          />

          <button
            onClick={handleUpdate}
            style={editButtonStyle}
          >
            Save Changes
          </button>

          <button
            onClick={onClose}
            style={closeButtonStyle}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const filterStyle = {
  padding: "14px 18px",
  borderRadius: "12px",
  border: "1px solid #dbeafe",
  backgroundColor: "#f8fafc",
  fontSize: "15px",
  minWidth: "170px",
  outline: "none",
};

const tableHeader = {
  padding: "18px",
  textAlign: "left",
  color: "#64748b",
  fontSize: "15px",
  fontWeight: "600",
};

const tableCell = {
  padding: "20px 18px",
  backgroundColor: "white",
  borderTop: "1px solid #f1f5f9",
  borderBottom:
    "1px solid #f1f5f9",
  fontSize: "15px",
  color: "#0f172a",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor:
    "rgba(15,23,42,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "35px",
  borderRadius: "22px",
  width: "500px",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.15)",
};

const deleteModalStyle = {
  backgroundColor: "white",
  width: "420px",
  padding: "30px",
  borderRadius: "20px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.12)",
};

const modalInput = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #dbeafe",
  backgroundColor: "#f8fafc",
  fontSize: "15px",
  outline: "none",
};

const viewButtonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const editButtonStyle = {
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const deleteButtonStyle = {
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const cancelButtonStyle = {
  backgroundColor: "#e2e8f0",
  color: "#0f172a",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};

const closeButtonStyle = {
  backgroundColor: "#64748b",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "18px",
  fontWeight: "600",
  fontSize: "14px",
};

export default LeadsTable;