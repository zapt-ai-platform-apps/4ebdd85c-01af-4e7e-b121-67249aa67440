import React from 'react';

export default function ButtonList({
  buttons,
  handleDeleteButton,
  handleSendSMS,
  sendingId
}) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Your Buttons</h2>
      {buttons.length === 0 && <p>No buttons added yet.</p>}
      <ul>
        {buttons.map((button) => (
          <li key={button.id} className="flex items-center justify-between mb-2">
            <div
              className={`flex-1 mr-2 p-2 bg-gray-100 rounded cursor-pointer ${sendingId === button.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleSendSMS(button)}
            >
              <span className="font-semibold">{button.name}</span>
            </div>
            <button
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => handleDeleteButton(button.id)}
              title="Delete Button"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}