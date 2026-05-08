import { useState } from "react";
import API from "../services/api";

function CreateLeadForm({
  onLeadCreated,
}) {
  const [message, setMessage] =
    useState("");

  const salespersons = [
    "John",
    "David",
    "Sarah",
    "Michael",
  ];

  const [formData, setFormData] =
    useState({
      leadName: "",
      companyName: "",
      email: "",
      phone: "",
      leadSource: "",
      assignedSalesperson: "",
      status: "New",
      estimatedDealValue: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/leads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Lead created successfully"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

      setFormData({
        leadName: "",
        companyName: "",
        email: "",
        phone: "",
        leadSource: "",
        assignedSalesperson: "",
        status: "New",
        estimatedDealValue: "",
      });

      onLeadCreated();
    } catch (error) {
      console.log(error);

      setMessage(
        "Failed to create lead"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "35px",
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
          Create New Lead
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Add and manage new sales
          opportunities
        </p>
      </div>

      {message && (
        <div
          style={{
            backgroundColor:
              message ===
              "Lead created successfully"
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

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <input
            type="text"
            name="leadName"
            placeholder="Lead Name"
            value={formData.leadName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Lead Source
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
            name="assignedSalesperson"
            value={
              formData.assignedSalesperson
            }
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Salesperson
            </option>

            {salespersons.map(
              (person) => (
                <option
                  key={person}
                  value={person}
                >
                  {person}
                </option>
              )
            )}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
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
            type="number"
            name="estimatedDealValue"
            placeholder="Estimated Deal Value"
            value={
              formData.estimatedDealValue
            }
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "30px",
            backgroundColor:
              "#2563eb",
            color: "white",
            border: "none",
            padding: "16px 30px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "0.2s ease",
            boxShadow:
              "0 4px 12px rgba(37,99,235,0.2)",
          }}
        >
          Create Lead
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #dbeafe",
  fontSize: "15px",
  backgroundColor: "#f8fafc",
  outline: "none",
  color: "#0f172a",
};

export default CreateLeadForm;