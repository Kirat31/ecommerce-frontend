import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logoutAdmin } from "../../../actions/adminAction";
import { useDispatch } from 'react-redux';

const AdminOptions = ({adminInfo}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
       { icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard},
            {
                icon: <PeopleIcon />,
                name: "Seller",
                func: sellers,
            },
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {
            icon: <PeopleIcon />,
            name: "Users",
            func: users,
        },
        {icon: <PersonIcon />, name: "Profile", func: account},
        {icon: <ExitToAppIcon />, name: "Logout", func: logoutUser},
    ];

    

    function dashboard() {
        navigate('/dashboard');
    }

    function sellers() {
        navigate('/sellers');
    }

    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/admin-account');
    }

    function users() {
        navigate('/users');
    }

    function logoutUser() {
        dispatch(logoutAdmin());
        alert.success("Logout Successful");
        navigate('/');
    }
  return (
   <Box position="fixed" top={2} right={0} zIndex={9999}>
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=> setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    direction='down'
    icon={
        <AccountCircleIcon />
    }>
        
      {options.map((item)=> (
        <SpeedDialAction 
            key={item.name} 
            icon={item.icon} 
            tooltipTitle={item.name} 
            onClick={item.func}
        />
      ))}  
    </SpeedDial>
   </Box>
  )
}

export default AdminOptions