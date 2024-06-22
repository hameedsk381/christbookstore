import React from 'react'
import ProductGrid from './ProductGrid'
import { songcategories } from '../data/categories'
import { useQuery } from 'react-query';
import { serverUrl } from '../apis/serverapi';
import axios from 'axios';
import { offers } from '../data/offers';
import Navbar from './Navbar';
import SongActions from './SongActions';

const SongStore = () => {
       // Fetch inventory items using React Query
   const { isLoading, isError, data: inventoryItems } = useQuery('inventoryItems', async () => {
    const response = await axios.get(`${serverUrl}/api/inventory`);
    return response.data;
});

  return (
  <>
  <Navbar/>
  <ProductGrid categories={songcategories} products={inventoryItems} banners={offers} loading={isLoading} error={isError} songActions={<SongActions/>}/>
  </>
  )
}

export default SongStore