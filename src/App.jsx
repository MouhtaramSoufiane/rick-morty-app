import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import CharacterDetails from './pages/CharacterDetails';
import Favorites from './pages/Favorites';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Rick & Morty Characters
              </Typography>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ mr: 2 }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/favorites"
                startIcon={<Favorite />}
              >
                Favorites
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ 
            minHeight: 'calc(100vh - 64px)', 
            bgcolor: '#f5f5f5',
            pt: 4,
            pb: 4
          }}>
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character/:id" element={<CharacterDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App; 