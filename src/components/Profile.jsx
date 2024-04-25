import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, Card, CardContent, Avatar, Divider, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Button, Container, CircularProgress, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../apis/api';

function Profile() {
    const {userId} = JSON.parse(localStorage.getItem('user'));
   const [user,setUser] = useState(null);
   const [orders,setOrders] = useState([]);
const navigate = useNavigate()
    // Dummy order history data
    const dummyOrders = [
        { id: 1, date: "2022-12-15", total: 50.00 },
        { id: 2, date: "2022-12-10", total: 35.00 },
        { id: 3, date: "2022-12-05", total: 70.00 },
    ];
    const fetchUserProfile = () => {
        api.get(`/userProfile/${userId}`)
            .then(response => {
                console.log('User Profile:', response.data);
                setUser(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch profile:', error);
            });
    };

    const fetchUserOrders = () => {
        api.get(`/orders/user/${userId}`)
            .then(response => {
                console.log('orders', response.data);
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch orders:', error);
            });
    };
    useEffect(() => {
    

        fetchUserProfile();
        fetchUserOrders();
    }, []);
if(!user){
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress/></div>;
}
    return (
       <Container sx={{p:4}} >
       <Button onClick={()=>{navigate('/')}} variant='contained' startIcon={<ArrowBack/>}>Go back</Button>
        <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} md={8}>
                <Typography variant="h4" align="center" gutterBottom>Profile Details</Typography>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Avatar  alt="User Avatar" src={user.avatar} sx={{ width: 100, height: 100 }}>
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{user.username}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Phone Number: {user.phoneNum}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Email: {user.email}</Typography>
                        {/* Other user details */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <Divider sx={{ my: 3 }} />
           {orders.length === 0 ? <Alert severity="info">No orders found </Alert> :  
               <>
                <Typography variant="h4" align="center" gutterBottom>Order History</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order #</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Books</TableCell>
                                <TableCell>payment status</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Shipping Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow component={Card} key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.totalPrice}</TableCell>
                                    <TableCell >
                                        {order.orderItems.map((book, index) => (
                                            <span key={book._id}>{book.product.title}{index !== order.orderItems.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </TableCell>
                                    <TableCell>{order.isPaid ? 'paid' : 'Not paid'}</TableCell>
                                    <TableCell>{order.paymentMethod}</TableCell>
<TableCell align="right">{`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
               </>
            }
            </Grid>
        </Grid>
       </Container>
    );
}

export default Profile;

