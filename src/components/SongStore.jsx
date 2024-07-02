import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductGrid from './ProductGrid';
import { songcategories } from '../data/categories';
import { offers } from '../data/offers';
import Navbar from './Navbar';
import SongActions from './SongActions';
import Footer from './Footer';
import { fetchSongs } from '../redux/actions/songActions';

const SongStore = () => {
  const dispatch = useDispatch();
  const { loading, error, songs } = useSelector(state => state.songsData);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ProductGrid
        songs
        alphabets
        categories={songcategories}
        products={songs}
        banners={offers}
        loading={loading}
        error={error}
        songActions={<SongActions />}
      />
      <Footer />
    </>
  );
};

export default SongStore;
