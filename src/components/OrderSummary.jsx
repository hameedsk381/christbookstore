import { Container, Typography, Box, Card, CardContent, Button, Divider, List, ListItem, ListItemText, CardMedia, Avatar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
    const cartItems = useSelector(state => state.cart.items);
    const total = useSelector(state =>
        state.cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    );

    const handlePlaceOrder = () => {
        console.log('Order data:', cartItems, 'Total:', total);
        // Add logic to handle placing the order
    };

    return (
        <Container maxWidth="md" sx={{mb:4}}>
            <Card variant="outlined">
                <CardContent>
                
                    <List >
                        {cartItems.map(item => (
                            <React.Fragment key={item._id}>
                                <ListItem>
                                    <Avatar variant='rounded'
                                        sx={{ width: 100, height: 100,m:3 }}
                                        alt={item.title}
                                        src={item.imageUrl}
                                    />
                                    <ListItemText primary={item.title} secondary={`Quantity: ${item.quantity}`} />
                                    <Typography variant="body2">
                                        {item.price.toFixed(2)} ₹
                                    </Typography>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                        <ListItem>
                            <ListItemText primary="Shipping" />
                            <Typography variant="body2">Free</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Subtotal" />
                            <Typography variant="body2">{total.toFixed(2)} ₹</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Service fees" />
                            <Typography variant="body2">0 ₹</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Total" />
                            <Typography variant="body2">{(total + 0).toFixed(2)} ₹</Typography>
                        </ListItem>
                    </List>
                    
                   
                </CardContent>
            </Card>
        </Container>
    );
};

export default OrderSummary;
