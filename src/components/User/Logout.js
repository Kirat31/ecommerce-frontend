import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/userAction";
import { logoutSeller } from '../../actions/sellerAction';
import { logoutAdmin } from '../../actions/adminAction';
import styled from 'styled-components';
// import { updateCustomer } from '../redux/userHandle';

const Logout = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const {isAuthenticated: sellerAuth, sellerInfo} = useSelector(state => state.seller);
  const { isAuthenticated: adminAuth, adminInfo } = useSelector(state => state.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log(user);
//       dispatch(updateCustomer(currentUser, currentUser._id));
//     }
//   }, [isAuthenticated, user, dispatch])

  const handleLogout = () => {
    console.log("hi");
    dispatch(logout());
    // if(!isAuthenticated)
    navigate('/');
  };

  const handleSellerLogout = () => {
    dispatch(logoutSeller());
    navigate('/');
  };

  const handleAdminLogout = () => {
    dispatch(logoutAdmin());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };
console.log("seller", sellerInfo);
console.log("user", user);
console.log("Admin", adminInfo);
  return (
    <LogoutContainer>
        {isAuthenticated && (
        <>
        
        <h1> {user.firstName}</h1>
              <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
              <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
              <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </>
        )}
        {sellerAuth && (
            <>
              <h1> {sellerInfo.seller.firstName}</h1>
              <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
              <LogoutButtonLogout onClick={handleSellerLogout}>Log Out</LogoutButtonLogout>
              <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </>
          )
        }

        {adminAuth && (
            <>
              <h1>{adminInfo.admin.firstName}</h1>
              <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
              <LogoutButtonLogout onClick={handleAdminLogout}>Log Out</LogoutButtonLogout>
              <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </>
          )}

    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #8966c666;
  color: black;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
  &:hover {
    background-color: #770000;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #0505ba;
  &:hover {
    background-color: rgb(10, 2, 69);
  }
`;
