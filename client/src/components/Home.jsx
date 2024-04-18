import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        // Remove the deleted item from the state
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };
  console.log('item',items);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <Link to={`/edit/${item.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Item</Link>
    </div>
  );
};

export default Home;
