import React, { useState } from 'react';
import { Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Box, Container, Paper, Stack, FormControlLabel, Checkbox } from '@mui/material';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';
const categories = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Fantasy', 'Biography', 'Self-Help', 'Cooking', 'History', 'Poetry'];

function ProductGrid() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('latest'); // Default sort by latest

    // Fetch inventory items using React Query
    const { isLoading, isError, data: inventoryItems } = useQuery('inventoryItems', async () => {
        const response = await axios.get(`${serverUrl}/api/inventory`); // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        return response.data;
    });

    // Filter products based on search term, category, and price range
    let filteredProducts = inventoryItems?.filter(product =>
        (checkedCategories.length === 0 || checkedCategories.includes(product.category)) &&
        (parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1]) &&
        Object.values(product).some(field =>
            typeof field === 'string' && field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Sorting logic
    if (filteredProducts) {
        if (sortBy === 'priceLowToHigh') {
            filteredProducts = filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'priceHighToLow') {
            filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortBy === 'name') {
            filteredProducts = filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'latest') {
            filteredProducts = filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
    }

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setCheckedCategories([...checkedCategories, event.target.name]);
        } else {
            setCheckedCategories(checkedCategories.filter(category => category !== event.target.name));
        }
    };
    const handleCategoryChange = (event) => {
        setFilterCategory(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <Container component={Stack} direction={'row'} mb={20} px={10}>
             {/* <Paper variant='outlined'>
                    <Typography bgcolor={'#f5f5f5'} p={2} variant="h5" sx={{ marginBottom: '10px' }}>Price</Typography>
                    <Box sx={{ p: 2 }}>
                        <Slider
                            value={priceRange}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            step={1}
                        />
                        <Stack justifyContent={'space-between'} direction={'row'}>
                            <Typography>$0 </Typography> <Typography>$100</Typography>
                        </Stack>
                    </Box>
                </Paper> */}
          <Box>
          <Stack spacing={2} justifyContent={'space-between'} direction={{ xs: 'column', md: 'row' }} sx={{ pb: 2 }}>
                <TextField
                    size='small'
                    label="Search by name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             <Stack direction={'row'} spacing={2} sx={{ pb: 2 }}>
              
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel  id="sort-by-label">Sort By</InputLabel>
                    <Select
                      variant='standard'
                        labelId="sort-by-label"
                        id="sort-by"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        
                        <MenuItem value="latest">Latest</MenuItem>
                        <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                        <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            </Stack>
           
            {searchTerm !== '' && <Typography variant='body1' my={2}>Showing results for "{searchTerm}"</Typography>}
            <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
    );
}

export default ProductGrid;
