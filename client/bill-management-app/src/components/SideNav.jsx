import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Box, Drawer, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidenav = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Hamburger Menu Icon for Small Screens */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, p: 1 }}>
        <IconButton onClick={toggleDrawer} color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Temporary Drawer for Small Screens */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 250 },
        }}
      >
        <List>
          <ListItem button component={NavLink} to="/customers" onClick={toggleDrawer}>
            <ListItemText primary="Customers List" />
          </ListItem>
          <ListItem button component={NavLink} to="/bill-generator" onClick={toggleDrawer}>
            <ListItemText primary="Bill Generator" />
          </ListItem>
        </List>
      </Drawer>

      {/* Permanent Drawer for Larger Screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: 250,
            height: '100vh',
            bgcolor: '#f4f4f4',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Dashboard
          </Typography>
          <List>
            <ListItem button component={NavLink} to="/customers">
              <ListItemText primary="Customers List" />
            </ListItem>
            <ListItem button component={NavLink} to="/bill-generator">
              <ListItemText primary="Bill Generator" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidenav;
