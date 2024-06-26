import React from 'react';
import { Typography, Divider, Rating, Box } from '@mui/material';
import { Person } from '@mui/icons-material';

const ReviewCard = ({ comment }) => {
  console.log("user:", comment.user);
  return (
    <div style={{ padding: '10px 0' }}>
        <Box display="flex" alignItems="center">
            {/* <Person style={{ marginRight: 5 }} /> */}
            <Typography variant="h6">{comment.user.firstName}</Typography>
        </Box>
        <Rating value={comment.star} sx={{marginBottom: '8px'}} readOnly />
        {/* <Divider /> */}
        {/* <Typography variant="body1">{review.title}</Typography> */}
        <Typography variant="body1" sx={{ marginTop: '8px' }}>{comment.content}</Typography>
        {/* <Divider /> */}
    </div>
  );
};

export default ReviewCard;
