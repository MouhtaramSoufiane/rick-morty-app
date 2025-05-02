import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { getCharacterById } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const CharacterDetails = () => {
  const { id } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data: character, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography color="error">Error loading character details</Typography>
        </Box>
      </Container>
    );
  }

  const handleFavoriteClick = () => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3}>
              <Box p={2}>
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h1" gutterBottom>
                  {character.name}
                </Typography>
                <IconButton onClick={handleFavoriteClick} size="large">
                  {isFavorite(character.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Status</Typography>
                  <Typography variant="body1">{character.status}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Species</Typography>
                  <Typography variant="body1">{character.species}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Gender</Typography>
                  <Typography variant="body1">{character.gender}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Origin</Typography>
                  <Typography variant="body1">{character.origin.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Location</Typography>
                  <Typography variant="body1">{character.location.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Episodes</Typography>
                  <Typography variant="body1">
                    {character.episode.length} episodes
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CharacterDetails; 