import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Avatar } from './avatar';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '../controllers/useUsersContext';
import { LogoutComponent } from '../services/logoutService';
import { EVariantLogout } from '../types/User';
// import { mutationService } from '../services/mutationService';

export const DropdownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useUsersContext();
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };

  const handleClose = () => {
    setAnchorEl(null); 
  };

  const handleProfileClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = async() => {
    handleClose(); 
  };

  return (
    <div>
      <div className="flex items-center" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <Avatar size={40} source={currentUser?.avatar || 'https://i.imgur.com/aX3x1wT.png'} altText='avatar'/>
        <p>{`${currentUser?.name} ${currentUser?.surname}`}</p>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ marginTop: '30px' }}
      >
        <MenuItem onClick={handleProfileClick} style={{paddingInline: "35px"}}>Profile</MenuItem>
        <MenuItem onClick={handleClose} style={{paddingInline: "35px"}}>Settings</MenuItem>
        <LogoutComponent variant={EVariantLogout.Menu} handleClick={handleLogout}/>
      </Menu>
    </div>
  );
};

