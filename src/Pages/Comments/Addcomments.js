import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';

// Addcomments component handles form input and submission for adding comments
const Addcomments = (props) => {
  // Initial state for the comment form inputs
  const [commentInput, setCommentInput] = useState({
    comment: '',
    subject: '',
    status: '',
    created: '',
    post_id: ''
  });

  // Handles form submission to send data to backend
  function handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:3001/comment/AddCommnents',
      data: commentInput,
      headers: {
        token: localStorage.getItem('token'), // sending auth token from localStorage
      },
    })
      .then(function (response) {
        console.log(response);
        console.log('Added successfully');

        // Close the form after successful submission
        props.setIsAdding(false);

        // Refresh comment list after adding a new comment
        props.fetchCommentData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Cancels form input and hides the form
  function cancleHandler() {
    props.setIsAdding(false);
  }

  return (
    <div
      id="content"
      style={{
        padding: '20px',
        backgroundColor: 'rgb(237, 229, 229)',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Comment Form</h2>

        {/* Comment input field */}
        <TextField
          id="comment"
          name="comment"
          label="Add comments"
          value={commentInput.comment}
          onChange={(event) =>
            setCommentInput({ ...commentInput, comment: event.target.value })
          }
          placeholder="Add Comments"
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

        {/* Subject input field */}
        <TextField
          id="subject"
          name="subject"
          label="Subject"
          value={commentInput.subject}
          onChange={(event) =>
            setCommentInput({ ...commentInput, subject: event.target.value })
          }
          placeholder="Subject"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Status input field */}
        <TextField
          id="status"
          name="status"
          label="Status"
          value={commentInput.status}
          onChange={(event) =>
            setCommentInput({ ...commentInput, status: event.target.value })
          }
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

        {/* Created date input */}
        <TextField
          id="created"
          name="created"
          label="Date"
          type="date"
          value={commentInput.created}
          onChange={(event) =>
            setCommentInput({ ...commentInput, created: event.target.value })
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Post ID input field */}
        <TextField
          required
          id="post_id"
          name="post_id"
          label="Post name"
          value={commentInput.post_id}
          onChange={(event) =>
            setCommentInput({ ...commentInput, post_id: event.target.value })
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Buttons for cancel and submit */}
        <Button variant="outlined" color="secondary" onClick={cancleHandler}>
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" type="submit" sx={{ ml: 2 }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Addcomments;
