import React, { useState, useRef } from 'react';
import { Grid, Typography, Container, Stack, Chip, useMediaQuery, Box, Alert, IconButton, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import SearchBar from './SearchBar';
import OffersPoster from './OffersPoster';
import BlinkingComponentSwitcher from './BlinkingComponentSwitcher';
import MediaCover from './MediaCover';
import SongCard from './SongCard';
import BookCard from './Bookcard';
import { teluguAlphabets } from '../data/alphabets';
import Loader from './Loader';

function ProductGrid({ products, banners, categories, loading, error, songActions, alphabets, songs, book }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedAlphabets, setCheckedAlphabets] = useState([]);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const scrollRefs = useRef({});

  const isNumberSearch = !isNaN(searchTerm);

  const filteredProducts = products?.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchTermNumber = parseInt(searchTerm, 10);

    const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);
    const matchesAlphabet = checkedAlphabets.length === 0 || checkedAlphabets.some(alphabet => product.title.startsWith(alphabet));

    const matchesStringField = Object.values(product).some(field =>
      typeof field === 'string' && field.toLowerCase().includes(searchTermLower)
    );

    const matchesNumberField = Object.values(product).some(field =>
      typeof field === 'number' && field.toString().includes(searchTerm)
    );

    const matchesSongNum = product.songNum === searchTermNumber;

    const matchesSearchTerm = isNumberSearch
      ? matchesSongNum || matchesStringField || matchesNumberField
      : matchesStringField;

    return matchesCategory && matchesAlphabet && matchesSearchTerm;
  });

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

  const handleScroll = (category) => {
    const container = scrollRefs.current[category];
    if (container) {
      container.scrollBy({ left: 760, behavior: 'smooth' });
    }
  };

  if (loading) return <Loader loaderSvg="/path-to-your-loader.svg" />;
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
        <Box key={category} sx={{ my: 5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontSize={{xs:'1.1rem',md:'1.5rem'}} fontWeight={'bold'} >{category}</Typography>
            {searchTerm === '' && <Button size='small' endIcon={<ArrowForward />} onClick={() => handleScroll(category)}>
              See more
            </Button>}
          </Stack>
          <Box
            ref={el => (scrollRefs.current[category] = el)} // Assign the ref
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              py: 2,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
            flexDirection={searchTerm !== '' && 'row-reverse'}
          >
            {groupedProducts[category].map(product => (
              <Box key={product._id} sx={{ minWidth: 380 }}>
                {songs && <SongCard song={product} />}
                {book && <BookCard product={product} />}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
}

export default ProductGrid;
