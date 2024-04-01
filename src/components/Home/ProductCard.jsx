import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductCard({ product }) {
  // const { comments } = useSelector((state) => state.commentList);
  // console.log("comments: ", comments.length);
  return (
    <Card>
        <CardActionArea component ={Link} to={`/product/${product._id}`}>
          {console.log("image: ", product.images)}
          <CardMedia
  component="img"
  height="140"
  image={product.images && product.images.length > 0 ? product.images[0].url : ''} // Assuming your product object has an 'images' array containing image objects with 'url' property
  alt={product.name} // Assuming your product object has a 'name' property
/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {product.description} // Assuming your product object has a 'description' property 
          </Typography> */}
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
           ₹{product.price}{/* Assuming your product object has a 'price' property */}
          </Typography>
          <Rating name="product-rating" value={product.ratings} readOnly />
          {/* <Typography variant="h6" sx={{ marginTop: '10px' }}>
            {comments.user.length} Reviews
          </Typography>
           */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
