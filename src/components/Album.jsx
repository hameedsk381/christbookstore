import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Album = () => {
  const { id: category } = useParams();
  const songs = useSelector(state => state.songs.filter(song => song.category.name === category));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      // Assuming there's a function to fetch songs from Redux or a similar state management system
      // fetchSongsFromRedux(category).then(data => setSongs(data));
      // For demonstration, we'll directly use the useSelector hook to get the songs
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [category]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        songs.map((song) => (
          <div key={song._id.$oid}>{song.title}</div>
        ))
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Album;
