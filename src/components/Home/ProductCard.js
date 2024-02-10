import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card>
        <CardActionArea component ={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.image} // Assuming your product object has an 'image' property containing the URL of the product image
          alt={product.name} // Assuming your product object has a 'name' property
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description} {/* Assuming your product object has a 'description' property */}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
           ₹{product.price}{/* Assuming your product object has a 'price' property */}
          </Typography>
          <Rating name="product-rating" value={product.ratings} readOnly />
          <Typography variant="h6" sx={{ marginTop: '10px' }}>
            {product.numOfReviews}
          </Typography>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
