import React, { useState } from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const Accounts = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    created: '',
    status: '',
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
      const res = await axios.post('http://localhost:3001/accounts/updateaccount', formData);
      console.log('Account updated:', res.data);

      alert('Account updated successfully!');
      // Optionally reset the form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        created: '',
        status: '',
      });
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account');
    }
  };

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Update Form</h2>

        <TextField
          id="first_name"
          name="first_name"
          label="First Name"
          value={formData.first_name}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="last_name"
          name="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="phone"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="created"
          name="created"
          label="Date"
          type="date"
          value={formData.created}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="status"
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><VisibilityIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Accounts;
