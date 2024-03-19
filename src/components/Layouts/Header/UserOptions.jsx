import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from "../../../actions/userAction";
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import profileImage from '../../../images/Profile.png';

const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

    const CustomSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
        '&.MuiSpeedDialAction-staticTooltip': {
          backgroundColor: 'transparent', // Set the background color to transparent
        },
      }));
      

    const options = [
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {icon: <PersonIcon />, name: "Profile", func: account},
        {icon: <ExitToAppIcon />, name: "Logout", func: logoutUser},
    ];

    if(user.role === "admin"){
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    if(user.role === "admin"){
        options.unshift({
            icon: <StorefrontIcon />,
            name: "Inventory",
            func: inventory,
        });
    }

    if(user.role === "admin"){
        options.unshift({
            icon: <PeopleIcon />,
            name: "Users",
            func: users,
        });
    }

    function dashboard() {
        navigate('/dashboard');
    }

    function inventory() {
        navigate('/inventory');
    }

    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/account');
    }
    
    function users() {
        navigate('/users');
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successful");
        navigate('/');
    }
  return (
   <Box position="fixed" top={2} right={0} zIndex={9999} >
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    direction='down'
    icon={<AccountCircleIcon sx={{ bgcolor: '#00695c' }} />}
>
        
      {options.map((item)=> (
        <CustomSpeedDialAction 
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

export default UserOptions