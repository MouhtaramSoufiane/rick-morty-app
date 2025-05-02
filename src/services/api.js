import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getCharacters = async (page = 1, filters = {}) => {
  const params = new URLSearchParams({
    page,
    ...filters,
  });
  
  const response = await api.get(`/character?${params}`);
  return response.data;
};

export const getCharacterById = async (id) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
}; 