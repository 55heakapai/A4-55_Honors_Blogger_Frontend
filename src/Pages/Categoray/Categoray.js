import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';

const Category = () => {
  const [formData, setFormData] = useState({
    cat_name: '',
    cat_desc: '',
    status: '',
    created: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/category/addcat', formData);
      console.log('Success:', res.data);

      // Optional: reset form after submission
      setFormData({
        cat_name: '',
        cat_desc: '',
        status: '',
        created: '',
      });

      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category');
    }
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Category</h2>

        <TextField
          required
          id="cat_name"
          name="cat_name"
          label="Category Name"
          placeholder="Category Name"
          fullWidth
          value={formData.cat_name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="cat_desc"
          name="cat_desc"
          label="Category Description"
          placeholder="Category Description"
          fullWidth
          value={formData.cat_desc}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          id="status"
          name="status"
          label="Status"
          placeholder="Status"
          fullWidth
          value={formData.status}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="created"
          name="created"
          label="Date"
          type="date"
          fullWidth
          value={formData.created}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Category;
