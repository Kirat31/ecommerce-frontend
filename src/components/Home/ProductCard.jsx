import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={product.images && product.images.length > 0 ? product.images[0].url : ''}
          alt={product.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ height: '3em', overflow: 'hidden' }}>
            {product.name}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '10px' }}>
            ₹{product.price}
          </Typography>
          <Rating name="product-rating" value={product.ratings} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
