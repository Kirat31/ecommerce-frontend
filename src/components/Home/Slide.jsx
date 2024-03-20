import { Divider, Box, Typography, Button, styled, Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const Slide = ({ products, title }) => {
    const navigate = useNavigate();

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
                    
                    <Link key={index} to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                        
                        <ProductBox>
                            <Image src={product.images ? product.images[0].url : "Not found"} />
                            <TitleText>{product.name}</TitleText>
                            <TextContainer>
                                <Text>₹{product.price}</Text>
                            </TextContainer>
                            <Text>{product.tagline ? product.tagline : "tagline"}</Text>
                        </ProductBox>
                   
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
    background-color: #4d1c9c;
    border-radius: 2px;
    font-size: 13px;
    &:hover {
      background-color: #7a1ccb;
    }
`;

const StyledCarousel = styled(Carousel)`
    .react-multi-carousel-item {
        padding: 0 10px; /* Adjust spacing between products */
    }
`;

const ProductBox = styled(Box)`
    text-align: center;
    padding: 25px 15px;
    
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
});

const TitleText = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`;

const TextContainer = styled(Container)`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin: 8px;
`;
