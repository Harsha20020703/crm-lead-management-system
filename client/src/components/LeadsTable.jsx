import { useEffect, useState } from "react";
import API from "../services/api";

function LeadsTable() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Leads Management</h2>

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
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.leadName}</td>
              <td>{lead.companyName}</td>
              <td>{lead.status}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>${lead.estimatedDealValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;