import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



import API from "../services/api";
import LeadsTable from "../components/LeadsTable";

function DashboardPage() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#1e293b",
            }}
          >
            CRM Dashboard
          </h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Lead Management System
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {!stats ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            <DashboardCard
              title="Total Leads"
              value={stats.totalLeads}
            />

            <DashboardCard
              title="New Leads"
              value={stats.newLeads}
            />

            <DashboardCard
              title="Qualified Leads"
              value={stats.qualifiedLeads}
            />

            <DashboardCard
              title="Won Leads"
              value={stats.wonLeads}
            />

            <DashboardCard
              title="Lost Leads"
              value={stats.lostLeads}
            />

            <DashboardCard
              title="Total Deal Value"
              value={`$${stats.totalDealValue}`}
            />
          </div>

          <LeadsTable />
        </>
      )}


    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "14px",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          color: "#64748b",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          color: "#0f172a",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardPage;