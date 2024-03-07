import React from 'react'
import { Button, Container } from '@mui/material'
import AddInventoryForm from './AddInventoryForm';
import { Link } from 'react-router-dom';


const GetInventory = () => {
  return (
    <Container>
        <Button component={Link} to="/add-inventory" variant="contained" color="primary">
        Add Inventory
      </Button>
    </Container>
  )
}

export default GetInventory