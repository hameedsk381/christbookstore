import React, { useEffect, useState } from 'react';
import { Container, Alert,Box, Button } from '@mui/material';
import axios from 'axios';
import WordCard from './WordCard';
import { serverUrl } from '../apis/serverapi'; // Ensure this import is correct
import Loader from './Loader';
import logo1 from '../assets/logo1.jpeg'
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const WordForTheDay = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/')
  }
  const fetchWords = async () => {
   
    try {
      const response = await axios.get(`${serverUrl}/words`);
      setWords(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching words:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <>
      {/* <Box
          component="img"
          src={logo1}
          alt="Logo"
          sx={{
            ml: {xs:'5%',md:'30%'},
            maxHeight: { xs: 100, md: 120 },
            width: { xs: 320, md: 520 },
          }}
        /> */}
        <Button size='small' variant='contained' sx={{m:3}} startIcon={<ArrowBack/>} onClick={handleNavigate}>
Go to home
        </Button>
        <Container maxWidth="md">
      {isLoading && <Loader/>}
      {isError && <Alert severity="error">There is some error in fetching the words. Please try again.</Alert>}
      {!isLoading && !isError && words.map(word => (
        <WordCard key={word._id} word={word} />
      ))}
    </Container>
    </>
    
  );
};

export default WordForTheDay;
