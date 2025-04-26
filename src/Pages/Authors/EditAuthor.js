import React from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";

const EditAuthor = (props) => {
  // const navigate = useNavigate();
  let [authInput, setAuthInput] = React.useState({
    first_name: props.selectedAuther.first_name,
    last_name: props.selectedAuther.last_name,
    email: props.selectedAuther.email,
    phone: props.selectedAuther.phone
  });

  function handleSubmit(event) {
    event.preventDefault();
    
    axios({
      method: 'put',
      url: `http://localhost:3001/author/updateauth/${props.selectedAuther._id}`,
      data: authInput,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(function (response) {
      console.log('Updated successfully', response);
      
      // Update the authors list
      props.setauthor(prevAuthors =>
        prevAuthors.map(author =>
          author._id === props.selectedAuther._id ? { ...author, ...authInput } : author
        )
      );
      
      props.setIsEditing(false);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function cancelHandler() {
    props.setIsEditing(false);
  }

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Author Edit Form</h2>
        <TextField
          id="first_name"
          label="First Name"
          value={authInput.first_name}
          onChange={event => setAuthInput({ ...authInput, first_name: event.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="last_name"
          label="Last Name"
          value={authInput.last_name}
          onChange={event => setAuthInput({ ...authInput, last_name: event.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          id="email"
          label="Email"
          value={authInput.email}
          onChange={event => setAuthInput({ ...authInput, email: event.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="phone"
          label="Phone Number"
          value={authInput.phone}
          onChange={event => setAuthInput({ ...authInput, phone: event.target.value })}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="outlined" color="secondary" onClick={cancelHandler} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditAuthor;
