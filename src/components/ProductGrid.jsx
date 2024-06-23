import React, { useState } from 'react';
import { Grid, Typography, Container, Stack, Chip, useMediaQuery, Box, Alert } from '@mui/material';
import SearchBar from './SearchBar';
import OffersPoster from './OffersPoster';
import BlinkingComponentSwitcher from './BlinkingComponentSwitcher';
import MediaCover from './MediaCover';
import SongCard from './SongCard';
import BookCard from './Bookcard';
import { teluguAlphabets } from '../data/alphabets';

function ProductGrid({ products, banners, categories, loading, error, songActions, alphabets, songs, book }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedAlphabets, setCheckedAlphabets] = useState([]);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const filteredProducts = products?.filter(product =>
    (checkedCategories.length === 0 || checkedCategories.includes(product.category)) &&
    (checkedAlphabets.length === 0 || checkedAlphabets.some(alphabet => product.title.startsWith(alphabet))) &&
    Object.values(product).some(field =>
      typeof field === 'string' && field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCategoryChange = (category) => {
    setCheckedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const handleAlphabetChange = (alphabet) => {
    setCheckedAlphabets(prev => prev.includes(alphabet) ? prev.filter(a => a !== alphabet) : [...prev, alphabet]);
  };

  const groupedProducts = filteredProducts?.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <Container sx={{ pb: 6 }} maxWidth="lg">
      <Stack spacing={2} justifyContent="center" direction={{ xs: 'column', md: 'row' }}>
        <SearchBar onSearch={(e) => setSearchTerm(e.target.value)} searchvalue={searchTerm} />
        {songActions}
      </Stack>
      {searchTerm === '' && checkedCategories.length === 0 && checkedAlphabets.length === 0 && (
        isMobile ? (
          <Container sx={{ height: 220, mt: 2 }}>
            <BlinkingComponentSwitcher components={banners.map(offer => (
              <MediaCover
                key={offer.imageUrl}
                imageUrl={offer.imageUrl}
                navigateTo={offer.navigateUrl}
              />
            ))} />
          </Container>
        ) : (
          <OffersPoster offers={banners} />
        )
      )}
      {categories && (
        <Stack direction="row" display={{ xs: 'none', md: 'flex' }} spacing={1} my={3} justifyContent="flex-start" flexWrap="wrap" px={2}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              onClick={() => handleCategoryChange(category)}
              sx={{
                my: 2,
                backgroundColor: checkedCategories.includes(category) ? 'primary.main' : 'default',
                color: checkedCategories.includes(category) ? 'white' : 'default',
                '&:hover': {
                  backgroundColor: checkedCategories.includes(category) ? 'primary.dark' : 'grey.300',
                },
              }}
            />
          ))}
        </Stack>
      )}
      {alphabets && (
        <Stack direction="row" spacing={1} my={3} justifyContent="flex-start" flexWrap="wrap">
          {teluguAlphabets.map((alphabet) => (
            <Chip
              key={alphabet}
              label={alphabet}
              clickable
              onClick={() => handleAlphabetChange(alphabet)}
              sx={{
                marginBottom: 2,
                backgroundColor: checkedAlphabets.includes(alphabet) ? 'primary.main' : 'default',
                color: checkedAlphabets.includes(alphabet) ? 'white' : 'default',
                '&:hover': {
                  backgroundColor: checkedAlphabets.includes(alphabet) ? 'primary.dark' : 'grey.300',
                },
              }}
            />
          ))}
        </Stack>
      )}
      {filteredProducts.length === 0 && <Alert severity='info' color='info'>No results found for "{searchTerm ? searchTerm : checkedAlphabets}"</Alert>}
      {groupedProducts && Object.keys(groupedProducts).map(category => (
        <Container key={category} sx={{ my: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{category}</Typography>
          <Grid container spacing={2} sx={{
            overflowX: 'auto',
            py: 2,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}>
            {groupedProducts[category].map(product => (
              <Grid item xs={12} sm={6}  key={product._id} sx={{ maxWidth: 500 }}>
                {songs && <SongCard song={product} />}
                {book && <BookCard product={product} />}
              </Grid>
            ))}
          </Grid>
        </Container>
      ))}
    </Container>
  );
}

export default ProductGrid;
