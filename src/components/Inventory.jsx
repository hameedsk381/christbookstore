import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from 'react-query';
import { serverUrl } from '../apis/serverapi';
import BookForm from './BookForm'; // Ensure this import path matches your file structure
import { Edit } from '@mui/icons-material';

const API_BASE_URL = `${serverUrl}/api`;

const fetchInventory = async () => {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
};

function Inventory() {
    const { data: books, isLoading, isError, error, refetch } = useQuery('inventory', fetchInventory);
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState({
        language:'',stock:'',category:'', title: '', author: '', coAuthors: [], publisher: '', mrp: '', price: '', offer: '', bookType: '', publicationYear: '', isbn: '', description: '', imageUrl: ''
    });

    const handleClickOpen = (book = {}) => {
        const emptyBookDetails = {
            language:'',stock:'',category:'', title: '', author: '', coAuthors: [], publisher: '', mrp: '', price: '', offer: '', bookType: '', publicationYear: '', isbn: '', description: '', imageUrl: ''
        };
        setCurrentBook({ ...emptyBookDetails, ...book });
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async (bookDetails) => {
        try {
            const url = `${API_BASE_URL}/inventory/${bookDetails.id || ''}`;
            const method = bookDetails.id ? 'put' : 'post';
            await axios[method](url, bookDetails);
            refetch();
            console.log(bookDetails)
            setOpen(false);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/inventory/${id}`);
            refetch();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography variant="body1" color="error">Error: {error.message}</Typography>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Inventory Management</Typography>
            <Button sx={{ my: 3 }} startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => handleClickOpen({})}>
                Add New Book
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map(book => (
                            <TableRow key={book._id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>${book.price}</TableCell>
                                <TableCell>{book.stock}</TableCell>
                                <TableCell>{book.category}</TableCell>
                                <TableCell>{book.language}</TableCell>
                                <TableCell>
                                    <img src={book.imageUrl} alt={book.title} style={{ width: 100 }} />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleClickOpen(book)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(book._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <BookForm
                open={open}
                handleClose={handleClose}
                handleSave={handleSave}
                bookDetails={currentBook}
                setBookDetails={setCurrentBook}
            />
        </div>
    );
}

export default Inventory;
