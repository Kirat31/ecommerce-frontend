import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from "../../../actions/userAction";
import { useDispatch } from 'react-redux';

const UserOptions = ({user}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();

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

    function dashboard() {
        navigate('/dashboard');
    }

    function orders() {
        navigate('/orders');
    }
    function account() {
        navigate('/account');
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successful");
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

export default UserOptions