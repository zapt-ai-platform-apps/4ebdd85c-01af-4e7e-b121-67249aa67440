import React from 'react';

export default function ButtonForm({
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  message,
  setMessage,
  handleAddButton,
  adding
}) {
  return (
    <form onSubmit={handleAddButton} className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">Create New Button</h2>
      <div className="mb-2">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded box-border"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Button Name"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Phone Number</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded box-border"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1234567890"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Message</label>
        <textarea
          className="w-full px-3 py-2 border rounded box-border"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
        ></textarea>
      </div>
      <button
        type="submit"
        className={`w-full py-2 mt-2 bg-blue-500 text-white rounded cursor-pointer ${adding ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={adding}
      >
        {adding ? 'Adding...' : 'Add Button'}
      </button>
    </form>
  );
}