import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const DonationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser] = useAuthState(auth);

  // If coming back from Scanner, you’ll have docId in location.state
  const docId = location.state?.docId;

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    description: "",
    notes: "",
    expiry: "",
    category: "",
    condition: "",
    receiptBase64: "",
    createdAt: serverTimestamp(),
  });

  // ✅ Load Firestore doc if editing
  useEffect(() => {
    const fetchData = async () => {
      if (docId) {
        const docRef = doc(db, "donations", docId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setFormData(snap.data()); // prefill with Firestore data
        }
      }
    };
    fetchData();
  }, [docId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      if (file.size > 10 * 1024) {
        alert("File size must be less than 10 KB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, receiptBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (docId) {
        // ✅ Update existing doc
        const docRef = doc(db, "donations", docId);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        navigate("/scanner", { state: { docId, ...formData } });
      } else {
        // ✅ Create new doc
        const docRef = await addDoc(collection(db, "donations"), {
          ...formData,
          createdAt: serverTimestamp(),
          userId: currentUser ? currentUser.uid : null,
        });
        navigate("/scanner", { state: { docId: docRef.id, ...formData } });
      }
    } catch (error) {
      console.error("Error saving donation:", error);
      alert("Failed to save donation.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">←</button>
        <h2 className="text-xl font-semibold">Donate Medicine</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4 border">
        {/* ✅ Required: Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name of medicine *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* ✅ Required: Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity *</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* Optional: Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description (Optional)</label>
          <textarea
            name="description"
            placeholder="Describe medicine"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-xl px-3 py-2"
          ></textarea>
        </div>

        {/* Optional: Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
          <textarea
            name="notes"
            placeholder="Any additional notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            className="w-full border rounded-xl px-3 py-2"
          ></textarea>
        </div>

        {/* ✅ Required: Expiry */}
        <div>
          <label className="block text-sm font-medium mb-1">Date Of Expiration *</label>
          <div className="relative">
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 pr-10"
              required
            />
            <FiCalendar className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* ✅ Required: Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Category *</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* ✅ Required: Condition */}
        <div>
          <label className="block text-sm font-medium mb-1">Condition *</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 bg-white"
            required
          >
            <option value="">Select</option>
            <option value="Used">Sealed</option>
            <option value="Unused">Unopened </option>
            <option value="Expired">Opened </option>
            <option value="Expired">Partially Used</option>
            <option value="Expired">New without Box</option>
          </select>
        </div>

        {/* ✅ Required: Receipt upload with preview */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload receipt of medicines *</label>
          {!formData.receiptBase64 ? (
            <label className="block border-2 border-dashed rounded-xl p-4 text-center text-gray-500 cursor-pointer">
              <input
                type="file"
                name="receipt"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                required
              />
              <p>📄 Receipt Image</p>
              <p className="text-xs">Click here to upload</p>
            </label>
          ) : (
            <img
              src={formData.receiptBase64}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white font-medium rounded-full py-3 hover:bg-blue-600 transition">
          Next
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
