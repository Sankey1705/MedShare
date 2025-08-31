import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

  // ✅ Fetch profile from Firestore or fallback to Auth
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const refDoc = doc(db, "users", uid);
        const snap = await getDoc(refDoc);

        if (snap.exists()) {
          setForm((prev) => ({ ...prev, ...snap.data() }));
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
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle photo upload with 10KB restriction
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024) {  // 10KB check
        alert("File size must be less than 10KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photoURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Save profile to Firestore
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
          email: auth.currentUser.email,
          phone: auth.currentUser.phoneNumber,
          photoURL: form.photoURL || "/default-avatar.png",
          profileCompleted: true,
        },
        { merge: true }
      );

      navigate("/profile");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving profile. Try again.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => navigate(-1)} className="text-xl mr-2">←</button>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="flex-1 p-6 space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <img
              src={form.photoURL || "/default-avatar.png"}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer">
              <Camera className="text-white w-8 h-8" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-600">Change Profile Photo (Max 10KB)</p>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Change Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none"
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">Change Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            value={form.email}
            readOnly
            className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-100 text-gray-500"
          />
        </div>

        {/* Phone (read-only) */}
        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            readOnly
            className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-100 text-gray-500"
          />
        </div>

        {/* Save */}
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
