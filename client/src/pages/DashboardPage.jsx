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

      const response = await API.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        backgroundColor: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "38px",
                fontWeight: "700",
              }}
            >
              CRM Dashboard
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
                fontSize: "16px",
              }}
            >
              Lead Management System
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "14px 24px",
              border: "none",
              backgroundColor:
                "#ef4444",
              color: "white",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "0.2s",
              boxShadow:
                "0 4px 10px rgba(239,68,68,0.2)",
            }}
          >
            Logout
          </button>
        </div>

        {/* DASHBOARD CARDS */}
        {!stats ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Loading Dashboard...
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              <DashboardCard
                title=" Total Leads"
                value={stats.totalLeads}
                borderColor="#2563eb"
              />

              <DashboardCard
                title=" New Leads"
                value={stats.newLeads}
                borderColor="#0ea5e9"
              />

              <DashboardCard
                title=" Qualified Leads"
                value={
                  stats.qualifiedLeads
                }
                borderColor="#9333ea"
              />

              <DashboardCard
                title=" Won Leads"
                value={stats.wonLeads}
                borderColor="#16a34a"
              />

              <DashboardCard
                title=" Lost Leads"
                value={stats.lostLeads}
                borderColor="#dc2626"
              />

              <DashboardCard
                title=" Total Deal Value"
                value={`$${stats.totalDealValue}`}
                borderColor="#f59e0b"
              />

              <DashboardCard
                title=" Won Deal Value"
                value={`$${stats.totalWonDealValue}`}
                borderColor="#10b981"
              />
            </div>

            {/* LEADS TABLE */}
            <LeadsTable />
          </>
        )}
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  borderColor,
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "28px",
        borderRadius: "20px",
        boxShadow:
          "0 6px 18px rgba(0,0,0,0.06)",
        borderTop: `5px solid ${borderColor}`,
        transition: "0.2s ease",
      }}
    >
      <h3
        style={{
          marginBottom: "18px",
          color: "#64748b",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          margin: 0,
          color: "#0f172a",
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardPage;