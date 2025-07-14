import React, { useState } from 'react';

const UpdateModal = ({ transaction, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    sum: transaction.sum,
    date: transaction.date?.slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, _id: transaction._id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[350px]">
        <h2 className="text-lg font-semibold mb-4">Update Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Date:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Sum:</label>
            <input
              type="number"
              name="sum"
              value={form.sum}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
