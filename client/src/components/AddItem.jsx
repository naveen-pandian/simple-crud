import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate instead of useHistory

const AddItem = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const navigate = useNavigate(); // Using useNavigate hook instead of useHistory

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/items', formData)
      .then(() => {
        setFormData({ name: '', description: '' });
        navigate('/'); // Navigating to the home page after successfully adding an item
      })
      .catch(error => {
        console.error('Error creating item:', error);
      });
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
