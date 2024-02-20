import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';

function Search() {
    const navigate = useNavigate();
    const[keyword, setKeyword] = useState('');

    const searchSubmitHandler = (event) => {
        event.preventDefault();
        navigate(keyword.trim() ? `/products/${keyword}` : "/products");
    };

    return (
        <form onSubmit={searchSubmitHandler}>
            <MetaData title="search A Product --ECOMMERCE" />
      <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          onChange={(event)=>setKeyword(event.target.value)}
          InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                      <IconButton type='submit' value='Search'>
                          <SearchIcon />
                      </IconButton>
                  </InputAdornment>
              ),
          }}
      />
      </form>
    );
}

export default Search;
