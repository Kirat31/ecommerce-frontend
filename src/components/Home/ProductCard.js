import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  
  return (
    <Card>
        <CardActionArea component ={Link} to={`/product/${product._id}`}>
          {console.log("image: ", product.images)}
        <CardMedia
          component="img"
          height="140"
          //image='https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/desktops/optiplex-desktops/optiplex-d13-aio/media-gallery-standard/optiplex-7410-plus-aio-front-wired.png?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=465&qlt=100,1&resMode=sharp2&size=465,402&chrss=full'
          image={product.images && product.images.length > 0 ? product.images[0].toString() : ''} // Assuming your product object has an 'image' property containing the URL of the product image
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
