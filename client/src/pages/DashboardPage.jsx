import { useEffect, useState } from "react";
import API from "../services/api";
import LeadsTable from "../components/LeadsTable";

function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>CRM Dashboard</h1>

      {!stats ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div style={cardStyle}>
              <h2>Total Leads</h2>
              <p>{stats.totalLeads}</p>
            </div>

            <div style={cardStyle}>
              <h2>New Leads</h2>
              <p>{stats.newLeads}</p>
            </div>

            <div style={cardStyle}>
              <h2>Qualified Leads</h2>
              <p>{stats.qualifiedLeads}</p>
            </div>

            <div style={cardStyle}>
              <h2>Won Leads</h2>
              <p>{stats.wonLeads}</p>
            </div>

            <div style={cardStyle}>
              <h2>Lost Leads</h2>
              <p>{stats.lostLeads}</p>
            </div>

            <div style={cardStyle}>
              <h2>Total Deal Value</h2>
              <p>${stats.totalDealValue}</p>
            </div>
          </div>

          <LeadsTable />
        </>
      )}
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

export default DashboardPage;