import React, { useState } from "react";

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted Data:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Course:</label>
          <select name="course" value={formData.course} onChange={handleChange} required>
            <option value="">Select</option>
            <option>BCA</option>
            <option>B.Sc (CS)</option>
            <option>B.Tech</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
