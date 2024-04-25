import React, { useState } from 'react';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, CardMedia, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from 'react-query';
import { serverUrl } from '../apis/serverapi';

const API_BASE_URL = `${serverUrl}/api`; // Update with your API base URL

const fetchInventory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching inventory');
    }
};
// Define categories
const categories = ['Dystopian', 'Classic', 'Sci-Fi', 'Fantasy', 'Biography', 'Children', 'Educational', 'Magical Realism'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian'];

function Inventory() {
    const { data: books, isLoading, isError, error, refetch } = useQuery('inventory', fetchInventory);
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState({});

    const handleClickOpen = (book) => {
        setCurrentBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSave = async () => {
        try {
            if (currentBook._id) {
                await axios.put(`${API_BASE_URL}/inventory/${currentBook._id}`, currentBook);
            } else {
                await axios.post(`${API_BASE_URL}/inventory`, currentBook);
            }
            refetch();
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

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Inventory Management
            </Typography>
            <Button sx={{my:3}} startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => handleClickOpen({ id: null, title: '', author: '', price: '', stock: '', category: '', language: '', imageUrl: '' })}>
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
                        {books.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.price}</TableCell>
                                <TableCell>{book.stock}</TableCell>
                                <TableCell>{book.category}</TableCell>
                                <TableCell>{book.language}</TableCell>
                                <TableCell>
                                    <CardMedia
                                        component="img"
                                        alt={book.title}
                                        image={book.imageUrl}
                                        style={{ width: 100 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleClickOpen(book)}>
                                        <EditIcon />
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{currentBook?.id ? 'Edit Book' : 'Add Book'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="title" label="Title" type="text" fullWidth value={currentBook?.title} onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })} />
                    <TextField margin="dense" id="author" label="Author" type="text" fullWidth value={currentBook?.author} onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })} />
                    <TextField margin="dense" id="price" label="Price" type="number" fullWidth value={currentBook?.price} onChange={(e) => setCurrentBook({ ...currentBook, price: e.target.value })} />
                    <TextField margin="dense" id="stock" label="Stock" type="number" fullWidth value={currentBook?.stock} onChange={(e) => setCurrentBook({ ...currentBook, stock: e.target.value })} />
                    <TextField select label="Category" value={currentBook?.category} onChange={(e) => setCurrentBook({ ...currentBook, category: e.target.value })} fullWidth margin="dense">
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Language" value={currentBook?.language} onChange={(e) => setCurrentBook({ ...currentBook, language: e.target.value })} fullWidth margin="dense">
                        {languages.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField margin="dense" id="imageUrl" label="Image URL" type="text" fullWidth value={currentBook?.imageUrl} onChange={(e) => setCurrentBook({ ...currentBook, imageUrl: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Inventory;
