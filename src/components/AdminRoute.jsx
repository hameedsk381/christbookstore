import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import api from '../apis/api';

const AdminRoute = ({ component: Component, roleRequired }) => {
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
   
    if (!role || (roleRequired && role !== roleRequired)) {
        console.log('Role:', role, 'Role Required:', roleRequired);
        return <Navigate to="/" replace />;
    }

    return <Component />;
};

export default AdminRoute;
