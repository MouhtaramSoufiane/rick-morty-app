import { Box, TextField, MenuItem, Grid } from '@mui/material';

const Filters = ({ filters, onFilterChange }) => {
  const statusOptions = ['', 'alive', 'dead', 'unknown'];
  const speciesOptions = ['', 'Human', 'Alien', 'Humanoid', 'Animal', 'Robot', 'Mythological Creature'];
  const genderOptions = ['', 'Male', 'Female', 'Genderless', 'Unknown'];

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search by name"
            helperText="Search by name"
            value={filters.name || ''}
            onChange={(e) => onFilterChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status || ''}
            helperText="Select your status"
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option || 'All'}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Species"
            helperText="Select your species"
            value={filters.species || ''}
            onChange={(e) => onFilterChange('species', e.target.value)}
          >
            {speciesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option || 'All'}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Gender"
            helperText="Select your gender"
            value={filters.gender || ''}
            onChange={(e) => onFilterChange('gender', e.target.value)}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option || 'All'}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters; 