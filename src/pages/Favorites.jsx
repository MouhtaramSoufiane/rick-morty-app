import { useState } from 'react';
import { Container, Grid, Box, Typography, Pagination } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import CharacterCard from '../components/CharacterCard';

const ITEMS_PER_PAGE = 6;

const Favorites = () => {
  const { favorites } = useFavorites();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedFavorites = favorites.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);

  if (favorites.length === 0) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h5">No favorite characters yet</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Favorite Characters ({favorites.length})
        </Typography>
        <Grid container spacing={3}>
          {paginatedFavorites.map((character) => (
            <Grid item xs={12} sm={6} md={4} key={character.id}>
              <CharacterCard character={character} />
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Favorites; 