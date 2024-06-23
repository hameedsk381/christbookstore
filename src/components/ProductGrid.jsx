import React, { useState } from 'react';
import { Grid, Typography, Container, Stack, Chip, useMediaQuery, Box } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { serverUrl } from '../apis/serverapi';
import SearchBar from './SearchBar';
import OffersPoster from './OffersPoster';
import BlinkingComponentSwitcher from './BlinkingComponentSwitcher';
import { offers } from '../data/offers';

import MediaCover from './MediaCover';
import { teluguAlphabets } from '../data/alphabets';
import SongCard from './SongCard';
import Bookcard from './Bookcard';

function ProductGrid({products,banners,categories,loading,error,songActions,alphabets ,songs,book}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedAlphabets, setCheckedAlphabets] = useState([]);
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

 

    // Filter products based on search term, category, and price range
    let filteredProducts = products?.filter(product =>
        (checkedCategories.length === 0 || checkedCategories.includes(product.category)) &&
        (checkedAlphabets.length === 0 || checkedAlphabets.some(alphabet => product.title.includes(alphabet))) && 
        Object.values(product).some(field =>
            typeof field === 'string' && field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    const handleCategoryChange = (category) => {
        if (checkedCategories.includes(category)) {
            setCheckedCategories(checkedCategories.filter(c => c !== category));
        } else {
            setCheckedCategories([...checkedCategories, category]);
        }
    };

    const handleAlphabetChange = (alphabet) => {
        if (checkedAlphabets.includes(alphabet)) {
            setCheckedAlphabets(checkedAlphabets.filter(a => a !== alphabet));
        } else {
            setCheckedAlphabets([...checkedAlphabets, alphabet]);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
 // Group filtered products by category
 const groupedProducts = filteredProducts?.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
        groups[category] = [];
    }
    groups[category].push(product);
    return groups;
}, {});
    return (
        <Container sx={{ pb: 6 }} maxWidth='lg'>
            <Stack spacing={2} justifyContent={'center'} direction={{ xs: 'column', md: 'row' }}>
                <SearchBar onSearch={(e) => setSearchTerm(e.target.value)} searchvalue={searchTerm} />
                {songActions}
            </Stack>
            {searchTerm === '' && checkedCategories.length === 0 && checkedAlphabets.length === 0 && (
                isMobile ? (
                    <Container sx={{height:220,mt:2}}>
                        <BlinkingComponentSwitcher components={banners.map(offer => (
                        <MediaCover 
                        imageUrl={offer.imageUrl}
                        navigateTo={offer.navigateUrl}
                       
                      />
                    ))} />
                    </Container>
                ) : (
                    <OffersPoster offers={banners} />
                )
            )}
           
          
          
           {categories &&  <Stack direction={'row'} display={{xs:"none",md:'flex'}} spacing={1} my={3} justifyContent="flex-start" flexWrap="wrap" px={2}>
              
                {categories.map((category) => (
                    <Chip size='medium' variant='filled'
                        key={category}
                        label={category}
                        clickable
                        onClick={() => handleCategoryChange(category)}
                        sx={{
                            my:2, // Add margin bottom for spacing between lines
                            backgroundColor: checkedCategories.includes(category) ? 'primary.main' : 'default',
                            color: checkedCategories.includes(category) ? 'white' : 'default',
                            '&:hover': {
                                backgroundColor: checkedCategories.includes(category) ? 'primary.dark' : 'grey.300',
                            }
                        }}
                    />
                ))}
            </Stack>}
           {alphabets &&  <Stack direction={'row'} spacing={1} my={3} justifyContent="flex-start" flexWrap="wrap">
                {teluguAlphabets && teluguAlphabets.map((alphabet) => (
                    <Chip size='small' variant='outlined'
                        key={alphabet}
                        label={alphabet}
                        clickable
                        onClick={() => handleAlphabetChange(alphabet)}
                        sx={{
                            marginBottom: 2,  // Add margin bottom for spacing between lines
                            backgroundColor: checkedAlphabets.includes(alphabet) ? 'primary.main' : 'default',
                            color: checkedAlphabets.includes(alphabet) ? 'white' : 'default',
                            '&:hover': {
                                backgroundColor: checkedAlphabets.includes(alphabet) ? 'primary.dark' : 'grey.300',
                            }
                        }}
                    />
                ))}
            </Stack>}

            {groupedProducts && Object.keys(groupedProducts).map(category => (
                <Container key={category} sx={{ my: 4 }}>
                    <Typography variant='h6' sx={{ mb: 2 }}>{category}</Typography>
                  
                    <Box sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 2,
                        py: 2,
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'
                    }}>
                        {groupedProducts[category].map(product => (
                            <Box key={product._id} sx={{ minWidth: 250 }}>
                              {songs &&   <SongCard song={product}  />}
                              {book &&   <Bookcard product={product}  />}
                            </Box>
                        ))}
                    </Box>
                </Container>
            ))}
           
        </Container>
    );
}

export default ProductGrid;
