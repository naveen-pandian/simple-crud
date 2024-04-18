import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Importing useNavigate instead of useHistory

const EditItem = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate(); // Using useNavigate hook instead of useHistory

  useEffect(() => {
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/items/${id}`, formData)
      .then(() => {
        navigate('/'); // Navigating to the home page after successful update
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
