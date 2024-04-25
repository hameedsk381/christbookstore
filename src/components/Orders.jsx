import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import axios from 'axios';

const Orders = () => {
  const [ordersData,setOrdersData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrdersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Books</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  {order._id}
                </TableCell>
                <TableCell align="right">{order.shippingAddress.address}</TableCell>
                <TableCell align="right">{order.totalPrice}</TableCell>
                
              <TableCell align="right"><Chip color={order.isDelivered ? 'green' : 'default'} label={order.isDelivered ? 'Delivered' : 'Processing'} /></TableCell>
              <TableCell align="right">
                {order.orderItems.map((book, index) => (
                  <span key={book._id}>{book.product.title}{index !== order.orderItems.length - 1 ? ',' : ''}</span>
                ))}
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
