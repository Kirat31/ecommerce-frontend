import React from 'react';
import { TextField, InputAdornment, IconButton, Stack } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Search = ({ onSearch, placeholder }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 }, width: '98%' }}
    >
      <TextField
        fullWidth
        placeholder={`Search by ${placeholder}`}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default Search;
