import React, { useState, useEffect } from 'react';
import { getFavorites } from '../services/favoriteService';
import './FavoritesPage.css';

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFavoriteIds = async () => {
      try {
        setError(null);
        setLoading(true);
        const ids = await getFavorites();
        setFavoriteIds(ids);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching your favorites.');
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteIds();
    
  }, []);
  if (loading) {
    return <div className="favorites-status">Loading your favorite recipes...</div>;
  }
  if (error) {
    return <div className="favorites-status error">{error}</div>;
  }

  return (
    <div className="favorites-page-container">
      <h1>My Favorite Recipes</h1>
      
      {favoriteIds.length === 0 ? (
        <p>You haven't saved any favorite recipes yet. Start exploring!</p>
      ) : (
        <div>
          <p>You have {favoriteIds.length} favorite recipes.</p>
          <div className="debug-ids-list">
            <h3>(For Debugging) Your Favorite Recipe IDs:</h3>
            <ul>
              {favoriteIds.map(id => <li key={id}>{id}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;