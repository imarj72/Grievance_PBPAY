import React, { useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { FitScreen, Menu as MenuIcon } from '@mui/icons-material'; 

const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); 

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: isMobile ? 'white' : 'transparent', 
        boxShadow: isMobile ? '0 2px 10px rgba(0,0,0,0.1)' : 'none', 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        {isMobile && (
          <IconButton
            color="primary"
            aria-label="menu"
            onClick={() => toggleDrawer(true)} 
            sx={{ color: '#0065FF' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          flexGrow:1,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-start',
          alignItems: 'center',
          paddingLeft:isMobile?'0px':'70px',
          paddingTop:isMobile?'0px':'20px',
        }}
      >
        <Typography variant="h6">
          <span style={{ color: '#0065FF' }}>
            <img src="/Logo/Layer_1.svg" alt="PBpay" style={{ maxWidth: '100%' }} />
          </span>
        </Typography>
      </Box>

      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            // backgroundColor: "#172B4D1F", 
            // padding: "6px 16px 6px 12px",
            // borderRadius: "100px",
            // fontSize: "14px",
            // fontWeight: "500",
            marginRight: '70px',
            marginTop: '20px'
          }}
        >
          {/* <img src="/Icons/Vector.svg" alt="Call Icon" style={{ width: "16px", height: "16px" }} />
          <span style={{ color: "#2E2E2E" }}>Need help?</span>
          <a href="#contact" style={{ color: "#007BFF", textDecoration: "none" }}>
            Contact us
          </a> */}
           <div class="gradient-button"><a id="modal_trigger" href="https://qaonboarding.pbpay.com/login" class="active">Login/Signup</a></div>
        </Box>
      )}
    </Box>
  );
};

export default Nav;
