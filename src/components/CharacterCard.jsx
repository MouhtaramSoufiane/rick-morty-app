import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/character/${character.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="300"
          image={character.image}
          alt={character.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h5" component="div">
              {character.name}
            </Typography>
            <IconButton onClick={handleFavoriteClick} aria-label="add to favorites">
              {isFavorite(character.id) ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Status: {character.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Species: {character.species}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gender: {character.gender}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CharacterCard; 