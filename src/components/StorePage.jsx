import React from 'react'
import Navbar from './Navbar'
import ProductGrid from './ProductGrid'
import { bookcategories } from '../data/categories';
import { useQuery } from 'react-query'
import { offers } from '../data/offers'
import axios from 'axios'
import { serverUrl } from '../apis/serverapi'
import Footer from './Footer';
const StorePage = () => {
   // Fetch inventory items using React Query
   const { isLoading, isError, data: inventoryItems } = useQuery('inventoryItems', async () => {
    const response = await axios.get(`${serverUrl}/api/inventory`);
    return response.data;
});

  return (
<>
<Navbar cart header/>
<ProductGrid book categories={bookcategories} products={inventoryItems} banners={offers} loading={isLoading} error={isError}/>
<Footer/>
</>

  )
}

export default StorePage