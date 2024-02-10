import React from 'react';
import { Typography, Divider, Rating, Box } from '@mui/material';
import { Person } from '@mui/icons-material';

const ReviewCard = ({ review }) => {
  return (
    <div style={{ padding: '10px 0' }}>
        <Box display="flex" alignItems="center">
            <Person style={{ marginRight: 5 }} />
            <Typography variant="body1">{review.user}</Typography>
        </Box>
        <Rating value={review.rating} readOnly />
        <Typography variant="body1">{review.title}</Typography>
        <Typography variant="body2">{review.content}</Typography>
        <Divider />
    </div>
  );
};

export default ReviewCard;
