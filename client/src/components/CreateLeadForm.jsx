import { useState } from "react";
import API from "../services/api";

function CreateLeadForm({ onLeadCreated }) {
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
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
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/leads", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Lead created successfully");

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

      setMessage("Failed to create lead");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Create New Lead
      </h2>

      {message && (
        <div
          style={{
            backgroundColor:
              message ===
              "Lead created successfully"
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

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
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
            placeholder="Email"
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

          <input
            type="text"
            name="leadSource"
            placeholder="Lead Source"
            value={formData.leadSource}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="assignedSalesperson"
            placeholder="Assigned Salesperson"
            value={
              formData.assignedSalesperson
            }
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
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
            marginTop: "20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Create Lead
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
};

export default CreateLeadForm;