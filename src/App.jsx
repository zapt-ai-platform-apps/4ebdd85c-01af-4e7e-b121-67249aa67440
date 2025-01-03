import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ButtonForm from './components/ButtonForm';
import ButtonList from './components/ButtonList';

export default function App() {
  const [buttons, setButtons] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sendingId, setSendingId] = useState(null);
  const [adding, setAdding] = useState(false);

  // Load buttons from localStorage
  useEffect(() => {
    const storedButtons = JSON.parse(localStorage.getItem('buttons')) || [];
    setButtons(storedButtons);
  }, []);

  // Save buttons to localStorage
  useEffect(() => {
    localStorage.setItem('buttons', JSON.stringify(buttons));
  }, [buttons]);

  const handleAddButton = async (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !message) {
      alert('Please fill in all fields.');
      return;
    }

    setAdding(true);

    const newButton = {
      id: uuidv4(),
      name,
      phoneNumber,
      message,
    };

    setButtons([...buttons, newButton]);
    setName('');
    setPhoneNumber('');
    setMessage('');
    setAdding(false);

    console.log('Added new button:', newButton);
  };

  const handleDeleteButton = (id) => {
    const updatedButtons = buttons.filter((button) => button.id !== id);
    setButtons(updatedButtons);
    console.log('Deleted button with id:', id);
  };

  const handleSendSMS = async (button) => {
    if (sendingId !== null) return; // Prevent multiple clicks

    setSendingId(button.id);
    console.log('Sending SMS for button:', button);

    try {
      const response = await fetch('/api/sendSMS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: button.phoneNumber,
          message: button.message,
        })
      });

      if (!response.ok) {
        throw new Error('Error sending SMS');
      }

      const result = await response.json();
      alert('SMS sent successfully!');
      console.log('SMS sent successfully:', result);
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS. Please try again.');
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <div className="w-full max-w-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">SMS Button App</h1>
        <ButtonForm
          name={name}
          setName={setName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          message={message}
          setMessage={setMessage}
          handleAddButton={handleAddButton}
          adding={adding}
        />
        <ButtonList
          buttons={buttons}
          handleDeleteButton={handleDeleteButton}
          handleSendSMS={handleSendSMS}
          sendingId={sendingId}
        />
      </div>
      {/* Made on ZAPT Badge */}
      <div className="mt-auto mb-4">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Made on ZAPT
        </a>
      </div>
    </div>
  );
}