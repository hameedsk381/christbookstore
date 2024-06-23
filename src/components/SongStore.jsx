import React from 'react'
import ProductGrid from './ProductGrid'
import { songcategories } from '../data/categories'
import { useQuery } from 'react-query';
import { serverUrl } from '../apis/serverapi';
import axios from 'axios';
import { offers } from '../data/offers';
import Navbar from './Navbar';
import SongActions from './SongActions';
import Footer from './Footer';

const SongStore = () => {

const { isLoading, isError, data: songs } = useQuery('songs', async () => {
  const response = await axios.get(`${serverUrl}/songs`);
  return response.data;
});
  return (
  <>
  <Navbar/>
  <ProductGrid songs alphabets categories={songcategories} products={songs} banners={offers} loading={isLoading} error={isError} songActions={<SongActions/>}/>
  <Footer/>
  </>
  )
}

export default SongStore