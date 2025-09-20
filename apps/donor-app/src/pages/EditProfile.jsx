// src/pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Camera } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) {
          setForm({ ...snap.data() });
        } else {
          setForm({
            name: auth.currentUser.displayName || "",
            email: auth.currentUser.email || "",
            phone: auth.currentUser.phoneNumber || "",
            address: "",
            photoURL: auth.currentUser.photoURL || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "profile_images");

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.ok) {
        setForm((prev) => ({ ...prev, photoURL: data.url }));
      }
    } catch (err) {
      console.error(err);
      alert("Profile upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("User not signed in");

      await setDoc(
        doc(db, "users", uid),
        {
          name: form.name,
          address: form.address,
          photoURL: form.photoURL || "/profile-default.png",
        },
        { merge: true }
      );

      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-xl mr-2">←</button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
      </div>

      <form onSubmit={handleSave} className="flex-1 p-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <img
              src={form.photoURL || "/profile-default.png"}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer">
              <Camera className="text-white w-8 h-8" />
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-600">{uploading ? "Uploading..." : "Change Profile Photo"}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none"
          />
        </div>

        <div>
  <label className="text-sm font-medium text-gray-700">Email</label>
  <input
    name="email"
    value={form.email || auth.currentUser?.email || ""}
    readOnly
    className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-100 text-gray-500"
  />
</div>

        <div>
  <label className="text-sm font-medium text-gray-700">Phone Number</label>
  <input
    name="phone"
    value={form.phone || auth.currentUser?.phoneNumber || ""}
    readOnly
    className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-100 text-gray-500"
  />
</div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl text-white text-lg font-semibold bg-blue-500 active:scale-[0.99] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
