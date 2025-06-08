import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  phoneCountryCode: z.string().default("+91"),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  country: z.string().default("India"),
  city: z.string().min(1, "City is required"),
  pan: z.string().regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
  aadhar: z.string().regex(/^\d{12}$/, "Invalid Aadhar number")
});

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"];

export default function Form() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCountryCode: "+91",
    phoneNumber: "",
    country: "India",
    city: "",
    pan: "",
    aadhar: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const validated = formSchema.parse(form);
      navigate("/success", { state: validated });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((e) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-indigo-100 to-purple-100 shadow-xl rounded-2xl p-8 max-w-3xl mx-auto mt-12 space-y-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700">🇮🇳 Indian Registration Form</h2>

      {[
        ["First Name", "firstName"],
        ["Last Name", "lastName"],
        ["Username", "username"],
        ["Email ID", "email"],
        ["PAN Number", "pan"],
        ["Aadhar Number", "aadhar"]
      ].map(([label, name]) => (
        <div key={name} className="space-y-1">
          <label className="block font-medium text-gray-700">{label}</label>
          <input
            type="text"
            name={name}
            value={form[name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
        </div>
      ))}

      <div className="space-y-1">
        <label className="block font-medium text-gray-700">Password</label>
        <input
          type={form.showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
        <label className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={form.showPassword}
            onChange={() => setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
          />
          <span>Show Password</span>
        </label>
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Country Code</label>
          <input
            type="text"
            name="phoneCountryCode"
            value={form.phoneCountryCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="India">India</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}
