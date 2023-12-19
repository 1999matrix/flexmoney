// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    selectedBatch: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a call to the backend API
      const response = await axios.post('http://localhost:5000/enroll', formData);

      // Assuming the backend returns a success message
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Yoga Class Admission Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Batch:
          <select name="selectedBatch" onChange={handleInputChange}>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </select>
        </label>
        <br />
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
};

export default App;
