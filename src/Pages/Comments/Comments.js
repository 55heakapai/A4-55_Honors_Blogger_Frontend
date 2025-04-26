import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';

const Comments = () => {
  const [formData, setFormData] = useState({
    Comments: '',
    subject: '',
    status: '',
    created: '',
    post_id: '',
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
      const res = await axios.post('http://localhost:3001/comments/addcomment', formData);
      console.log('Comment submitted:', res.data);

      // Optional: reset form
      setFormData({
        Comments: '',
        subject: '',
        status: '',
        created: '',
        post_id: '',
      });

      alert('Comment submitted successfully!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment');
    }
  };

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Comment Form</h2>

        <TextField
          required
          id="Comments"
          name="Comments"
          label="Add Comments"
          placeholder="Add Comments"
          fullWidth
          value={formData.Comments}
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
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Subject"
          fullWidth
          value={formData.subject}
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

        <TextField
          required
          id="post_id"
          name="post_id"
          label="Post name"
          placeholder="Post name"
          fullWidth
          value={formData.post_id}
          onChange={handleChange}
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

export default Comments;
