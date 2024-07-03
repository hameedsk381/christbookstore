import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Tabs,
  Tab,
  Container,
  useMediaQuery,
  IconButton,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import Orders from './Orders';
import SongsPanel from './SongsPanel';
import { useDispatch, useSelector } from 'react-redux';
import api from '../apis/api';
import Messages from './Messages';
import WordDataGrid from './WordDataGrid';
import logo from '../assets/logo2.jpeg'
import PromotionDataGrid from './PromotionDataGrid';
const drawerWidth = 240;

function Admin() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    // Save the current tab to session storage
    sessionStorage.setItem('currentTab', newValue);
  };

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState('user');

  useEffect(() => {
    // Retrieve the current tab from session storage
    const storedTab = parseInt(sessionStorage.getItem('currentTab'), 10);
    if (storedTab !== null) {
      setSelectedTab(storedTab);
    }
    api.get(`/userProfile/${user.userId}`)
      .then((response) => {
        console.log('User Profile:', response.data.role);
        setRole(response.data.role);
      })
      .catch((error) => {
        console.error('Failed to fetch profile:', error);
      });
  }, [dispatch]);

  if (role === 'user') {
    return (
      <Container>
        <Typography>You are not permitted to view this page</Typography>
      </Container>
    );
  }

  const drawer = (
    <Box mt={4}>
      <Toolbar />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dashboard" />
        <Tab label="Inventory" />
        <Tab label="Orders" />
        <Tab label="Songs" />
        <Tab label="Bible Messages" />
        <Tab label="Word for the day " />
        <Tab label="Promotion posters" />
      </Tabs>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color='inherit' elevation={0} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,borderBottom:'1px solid black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar variant='square' src={logo} alt="Logo" sx={{ width: 56, height: 56 }} />
          <Typography  sx={{ mx: 4, flexGrow: 1 }}>
            The Telugu Christian Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {selectedTab === 0 && <Dashboard />}
        {selectedTab === 1 && <Inventory />}
        {selectedTab === 2 && <Orders />}
        {selectedTab === 3 && <SongsPanel />}
        {selectedTab === 4 && <Messages/> }
        {selectedTab === 5 && <WordDataGrid/> }
        {selectedTab === 6 && <PromotionDataGrid/> }
      </Box>
    </Box>
  );
}

export default Admin;
