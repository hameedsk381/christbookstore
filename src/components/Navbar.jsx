
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Drawer, Container, useMediaQuery } from '@mui/material';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess, loginUser, logout, registerSuccess, registerUser} from '../redux/actions/authActions';
import CartPage from './CartPage';
import Login from './Login';
import SignUp from './SignUp';
import { Church } from '@mui/icons-material';

function Navbar() {
    const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isSignupOpen, setSignupOpen] = useState(false);
    const loginSuccess = useSelector(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items);
    const isMobile = useMediaQuery('(max-width:600px)');
    const toggleCartDrawer = () => setCartDrawerOpen(!isCartDrawerOpen);
    const toggleLoginDialog = () => setLoginOpen(!isLoginOpen);
    const toggleSignupDialog = () => setSignupOpen(!isSignupOpen);

    const handleLogin = (loginDetails) => {
        setLoginOpen(false);
    };

    const handleSignup = (userDetails) => {
        setSignupOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');  // Optionally clear user data from local storage
        dispatch(logout());
    };

    return (
        <AppBar position="static" color="transparent">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography component={Link} to={'/'} variant="h6">
                   <Church/> 
                </Typography>
                <div>
                    {loginSuccess ? (
                        <>
                            {isMobile ? (
                                <IconButton color="inherit" onClick={toggleCartDrawer}>
                                    <Badge badgeContent={cartItems.length} color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </IconButton>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                                    <IconButton color="inherit" onClick={() => navigate('/profile')}>
                                        <AccountCircle />
                                    </IconButton>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={toggleLoginDialog}>Login</Button>
                            <Button color="inherit" onClick={toggleSignupDialog}>Sign Up</Button>
                            <IconButton color="inherit" onClick={toggleCartDrawer}>
                                <Badge badgeContent={cartItems.length} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </IconButton>
                        </>
                    )}
                </div>
            </Toolbar>

            {/* Login Dialog */}
            <Dialog open={isLoginOpen} onClose={toggleLoginDialog}>
              <Login handleLogin={handleLogin}/>
            </Dialog>

            {/* Signup Dialog */}
            <Dialog open={isSignupOpen} onClose={toggleSignupDialog}>
                <SignUp handleSignup={handleSignup}/>
            </Dialog>
            <Drawer anchor="top" open={isCartDrawerOpen} onClose={toggleCartDrawer}>
               <Container sx={{p:4}}>
               <CartPage/>
            { cartItems.length !== 0 &&   <Button variant="contained" color="primary" onClick={()=>{navigate('/checkout');toggleCartDrawer();}}>Proceed to Checkout</Button>}
               </Container>
            </Drawer>
        </AppBar>
    );
}

export default Navbar;
