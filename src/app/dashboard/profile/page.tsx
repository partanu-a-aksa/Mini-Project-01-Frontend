"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: "CUSTOMER" | "ORGANIZER";
  referralCode?: string | null;
  profilePicture?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ProfileForm() {
  const [user, setUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  //   const [preview, setPreview] = useState<string | null>(null);
  //   const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          oldPassword: "",
          newPassword: "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const payload: Record<string, string> = {};
      if (formData.fullName.trim()) payload.fullName = formData.fullName.trim();
      if (formData.email.trim()) payload.email = formData.email.trim();
      if (formData.oldPassword && formData.newPassword) {
        payload.oldPassword = formData.oldPassword;
        payload.newPassword = formData.newPassword;
      }

      const res = await api.put("/users/me", payload);
      setUser(res.data.user);
      setMessage("Profile updated successfully!");
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      {message && (
        <p
          className={`mb-3 text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder={user?.fullName || "Your Name."}
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder={user?.email || "Your email"}
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* gnti pass */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-sm font-medium text-gray-600 mb-2">
            Change Password (optional)
          </h2>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mb-2"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
