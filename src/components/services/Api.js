import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29314229-ace3923ce808763a4f54eb251';
const SEARCH_SETTINGS = '&image_type=photo&orientation=horizontal&per_page=12';
export const fetchImages = async ({ searchQuery = '', currentPage = 1 }) => {
  try {
    const URL = `${BASE_URL}?q=${searchQuery}&page${currentPage}&key${API_KEY}${SEARCH_SETTINGS}`;
    const data = await axios.get(URL);
    return data;
  } catch (error) {
    console.log(error);
  }
};
