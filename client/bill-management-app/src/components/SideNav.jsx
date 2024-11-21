import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, Box } from '@mui/material';

const Sidenav = () => (
  <Box sx={{ width: 250, height: '100vh', bgcolor: '#f4f4f4', p: 2 }}>
    <List>
      <ListItem button component={NavLink} to="/customers">
        <ListItemText primary="Customers List" />
      </ListItem>
      <ListItem button component={NavLink} to="/bill-generator">
        <ListItemText primary="Bill Generator" />
      </ListItem>
    </List>
  </Box>
);

export default Sidenav;
