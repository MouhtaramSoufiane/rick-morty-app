import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Pagination, Box, CircularProgress, Typography } from '@mui/material';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import Filters from '../components/Filters';

const ITEMS_PER_PAGE = 6;

const Home = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', page, filters],
    queryFn: () => getCharacters(page, filters),
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

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
          <Typography color="error">Error loading characters</Typography>
        </Box>
      </Container>
    );
  }

  const paginatedCharacters = data.results.slice(0, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.info.count / ITEMS_PER_PAGE);

  return (
    <Container>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <Grid container spacing={3}>
        {paginatedCharacters.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default Home; 