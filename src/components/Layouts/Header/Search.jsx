import { Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../../actions/productAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        dispatch(getProduct(searchTerm)); // Dispatch getProduct action with search term
        if (location.pathname !== "/products") {
            navigate(`/products/${searchTerm}`); // Redirect to products page
        }
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <SearchIconWrapper onClick={handleSearch}>
                <SearchIcon sx={{ color: "#4d1c9c" }} />
            </SearchIconWrapper>
        </SearchContainer>
    );
};

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
  cursor: pointer; // Add cursor pointer to indicate clickable
`;

const InputSearchBase = styled('input')`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
  border: none;
  outline: none;
  background: transparent;
`;

export default Search;
