import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const categories = ['Dystopian', 'Classic', 'Sci-Fi', 'Fantasy', 'Biography', 'Children', 'Educational', 'Magical Realism'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese'];
const bookTypes = ['Hardcover', 'Paperback'];

function BookForm({ open, handleClose, handleSave, bookDetails, setBookDetails }) {
    const handleChange = (field, value) => {
        setBookDetails(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>{bookDetails?.id ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    value={bookDetails.title}
                    onChange={e => handleChange('title', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="Author"
                    type="text"
                    fullWidth
                    value={bookDetails.author}
                    onChange={e => handleChange('author', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="Co-Authors"
                    type="text"
                    fullWidth
                    value={bookDetails && bookDetails.coAuthors.join(',')}
                    onChange={e => handleChange('coAuthors', e.target.value.split(','))}
                    variant="outlined"
                    helperText="Separate multiple co-authors with commas"
                />
                <TextField
                    margin="dense"
                    label="Publisher"
                    type="text"
                    fullWidth
                    value={bookDetails.publisher}
                    onChange={e => handleChange('publisher', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="MRP"
                    type="number"
                    fullWidth
                    value={bookDetails.mrp}
                    onChange={e => handleChange('mrp', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="Our Price"
                    type="number"
                    fullWidth
                    value={bookDetails.price}
                    onChange={e => handleChange('price', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="Offer"
                    type="text"
                    fullWidth
                    value={bookDetails.offer}
                    onChange={e => handleChange('offer', e.target.value)}
                    variant="outlined"
                />
                 <TextField
                    margin="dense"
                    label="Stock"
                    type="number"
                    fullWidth
                    value={bookDetails.stock}
                    onChange={e => handleChange('stock', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    select
                    label="Category"
                    value={bookDetails.category}
                    onChange={e => handleChange('category', e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Language"
                    value={bookDetails.language}
                    onChange={e => handleChange('language', e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                >
                    {languages.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <FormControl component="fieldset" margin="dense" fullWidth>
                    <FormLabel component="legend">Book Type</FormLabel>
                    <RadioGroup
                        aria-label="book-type"
                        name="bookType"
                        value={bookDetails.bookType}
                        onChange={e => handleChange('bookType', e.target.value)}
                        row
                    >
                        {bookTypes.map((option) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Publication Year"
                    type="number"
                    fullWidth
                    value={bookDetails.publicationYear}
                    onChange={e => handleChange('publicationYear', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="ISBN"
                    type="text"
                    fullWidth
                    value={bookDetails.isbn}
                    onChange={e => handleChange('isbn', e.target.value)}
                    variant="outlined"
                    helperText="Optional"
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={bookDetails.description}
                    onChange={e => handleChange('description', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    margin="dense"
                    label="ImageUrl"
                    type="text"
                    fullWidth
                    value={bookDetails.imageUrl}
                    onChange={e => handleChange('imageUrl', e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleSave(bookDetails)} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookForm;
