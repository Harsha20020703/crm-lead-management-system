import { useEffect, useState } from "react";
import API from "../services/api";
import CreateLeadForm from "./CreateLeadForm";
import LeadNotes from "./LeadNotes";

function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [editingLead, setEditingLead] =
    useState(null);

  useEffect(() => {
    fetchLeads();
  }, [search, status]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        `/leads?search=${search}&status=${status}`,
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Lead deleted successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);

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
      const token = localStorage.getItem("token");

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
    <div style={{ marginTop: "40px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "14px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
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
          padding: "25px",
          borderRadius: "14px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Leads Management
        </h2>

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
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
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
              padding: "12px",
              width: "300px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">All Status</option>

            <option value="New">New</option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Proposal Sent">
              Proposal Sent
            </option>

            <option value="Won">Won</option>

            <option value="Lost">Lost</option>
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
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f1f5f9",
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
                <tr key={lead._id}>
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
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                      }}
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
                    {lead.estimatedDealValue}
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
                        onClick={() =>
                          handleDelete(
                            lead._id
                          )
                        }
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
              {selectedLead.companyName}
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
              <strong>Lead Source:</strong>{" "}
              {selectedLead.leadSource}
            </p>

            <p>
              <strong>Salesperson:</strong>{" "}
              {
                selectedLead.assignedSalesperson
              }
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedLead.status}
            </p>

            <p>
              <strong>Deal Value:</strong>{" "}
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
      [e.target.name]: e.target.value,
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
            gap: "10px",
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

          <input
            name="assignedSalesperson"
            value={
              formData.assignedSalesperson
            }
            onChange={handleChange}
            style={modalInput}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={modalInput}
          >
            <option value="New">New</option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Proposal Sent">
              Proposal Sent
            </option>

            <option value="Won">Won</option>

            <option value="Lost">Lost</option>
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

const tableHeader = {
  padding: "14px",
  textAlign: "left",
};

const tableCell = {
  padding: "14px",
  borderBottom:
    "1px solid #e2e8f0",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor:
    "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "450px",
  maxHeight: "90vh",
  overflowY: "auto",
};

const modalInput = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const viewButtonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const editButtonStyle = {
  backgroundColor: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

const closeButtonStyle = {
  backgroundColor: "#64748b",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "15px",
};

export default LeadsTable;