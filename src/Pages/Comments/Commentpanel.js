import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Define DataGrid columns
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'comment', headerName: 'Comment', width: 200 },
  { field: 'subject', headerName: 'Subject', width: 200 },
  // You can uncomment or add more fields here if needed later
];

const Commentpanel = () => {
  const [author, setAuthor] = useState([]); // State to hold fetched comment data

  // Fetch comment data from backend when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:3001/comment/commentsData')
      .then((response) => {
        console.log(response.data);
        setAuthor(response.data); // Update state with comment data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2>Comments Panel</h2>

      {/* Add Button with Link to Add Comment form */}
      <div style={{ margin: '20px 0' }}>
        <Button
          variant="outlined"
          color="secondary"
          component={Link}
          to="/comments"
          sx={{ textTransform: 'none' }}
        >
          Add Comment
        </Button>
      </div>

      {/* MUI DataGrid to display comments */}
      <DataGrid
        rows={author}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Commentpanel;
