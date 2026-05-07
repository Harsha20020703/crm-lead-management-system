import { useState } from "react";
import API from "../services/api";

function CreateLeadForm({ onLeadCreated }) {
  const [formData, setFormData] = useState({
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
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

      alert("Lead created successfully");

      setFormData({
        leadName: "",
        companyName: "",
        email: "",
        phone: "",
        status: "New",
        estimatedDealValue: "",
      });

      onLeadCreated();
    } catch (error) {
      console.log(error);

      alert("Failed to create lead");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "40px",
        display: "grid",
        gap: "10px",
      }}
    >
      <h2>Create New Lead</h2>

      <input
        type="text"
        name="leadName"
        placeholder="Lead Name"
        value={formData.leadName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <input
        type="number"
        name="estimatedDealValue"
        placeholder="Deal Value"
        value={formData.estimatedDealValue}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Create Lead
      </button>
    </form>
  );
}

export default CreateLeadForm;