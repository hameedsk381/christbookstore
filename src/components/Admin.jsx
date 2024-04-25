import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Tabs, Tab, Container } from '@mui/material';
import Dashboard from './Dashboard';
import Inventory from './Inventory'; // Assume this component is created
import Orders from './Orders'; // Assume this component is created
import { useDispatch, useSelector } from 'react-redux';
import api from '../apis/api';

const drawerWidth = 240;

function Admin() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [role,setRole] = useState('user');
    useEffect(() => {
        api.get(`/userProfile/${user.userId}`)
        .then(response => {
            console.log('User Profile:', response.data.role);
            setRole(response.data.role);
        })
        .catch(error => {
            console.error('Failed to fetch profile:', error);
        });
    }, [dispatch]);
   if(role === 'user'){
    return <Container>
        <Typography>You are not permitted to view this page</Typography>
    </Container>
   }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Bookstore Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
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
                </Tabs>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {selectedTab === 0 && <Dashboard />}
                {selectedTab === 1 && <Inventory />}
                {selectedTab === 2 && <Orders />}
            </Box>
        </Box>
    );
}

export default Admin;
