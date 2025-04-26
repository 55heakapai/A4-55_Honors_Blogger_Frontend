import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Posts = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    status: '',
    created: '',
    cat_id: '',
    auth_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/posts/addpost', formData);
      console.log('Post added:', res.data);
      alert('Post added successfully!');
      // Optionally reset the form
      setFormData({
        title: '',
        desc: '',
        status: '',
        created: '',
        cat_id: '',
        auth_id: '',
      });
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post');
    }
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Add Post</h2>

        <TextField
          id="title"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="desc"
          name="desc"
          label="Description"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Add your content"
          fullWidth
          multiline
          rows={4}
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
          value={formData.status}
          onChange={handleChange}
          placeholder="Status"
          fullWidth
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
          value={formData.created}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="cat_id"
          name="cat_id"
          label="Category"
          value={formData.cat_id}
          onChange={handleChange}
          placeholder="Category"
          fullWidth
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
          id="auth_id"
          name="auth_id"
          label="Author"
          value={formData.auth_id}
          onChange={handleChange}
          placeholder="Author"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
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

export default Posts;
