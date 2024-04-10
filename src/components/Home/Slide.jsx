import { Divider, Box, Typography, Button, styled, Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Slide = ({ products, title }) => {
    const navigate = useNavigate();
    console.log("products", products);
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                <ViewAllButton variant="contained" onClick={() => { navigate("/products") }}>
                    View All
                </ViewAllButton>
            </Deal>
            <Divider />
            <StyledCarousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={true}
                infinite={false}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {products.slice(0, 8).map((product, index) => (
                    
                    // sx={{marginBottom: '20px'}}
                    
                    <Link key={index} to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#36454F' }}>
                        
                        <Grid container spacing={8} sx={{padding: '95px', alignItems: 'center' ,textAlign: 'center', marginBottom: '-80px'}}>
                            <Image src={product.images ? product.images[0].url : "Not found"} />
                            <TextContainer>
                            <TitleText>{product.name}</TitleText>
                            
                                <Text>₹{product.price}</Text>
                            
                            {/* <Text>{product.tagline ? product.tagline : "tagline"}</Text> */}
                            </TextContainer>
                        </Grid>
                   
                    </Link>
                ))}
            </StyledCarousel>
        </Component>
    );
};

export default Slide;

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #36454F;
    border-radius: 2px;
    font-size: 13px;
    &:hover {
      background-color: #7a1ccb;
    }
`;

const StyledCarousel = styled(Carousel)`
    .react-multi-carousel-item {
        padding: 0 10px; /* Adjust spacing between products */
        paddingLeft: 220px;
    }
`;

const ProductBox = styled(Box)`
    text-align: center;
    padding: 25px 15px;
    border: 2px solid red;
    border-radius: 2px;
    display: flex;
    flex-direction: column; 
    align-items: center; 
`;

const Image = styled('img')({
    width: 200,
    height: 150,
});

const TitleText = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #36454F;
`;

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`;

const TextContainer = styled(Container)`
    
    width: 180px;
    justify-content: left;
    align-items: left;
    
`;
