import { useEffect, useState } from "react";
import API from "../services/api";
import CreateLeadForm from "./CreateLeadForm";

function LeadsTable() {
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

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
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Lead deleted successfully");

      fetchLeads();
    } catch (error) {
      console.log(error);

      alert("Failed to delete lead");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
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
      <CreateLeadForm onLeadCreated={fetchLeads} />

      <h2 style={{ marginTop: "40px" }}>
        Leads Management
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
          }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: "10px",
          }}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Lead Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Deal Value</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.leadName}</td>

              <td>{lead.companyName}</td>

              <td>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    handleStatusChange(
                      lead._id,
                      e.target.value
                    )
                  }
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>

              <td>{lead.email}</td>

              <td>{lead.phone}</td>

              <td>${lead.estimatedDealValue}</td>

              <td>
                <button
                  onClick={() =>
                    handleDelete(lead._id)
                  }
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;