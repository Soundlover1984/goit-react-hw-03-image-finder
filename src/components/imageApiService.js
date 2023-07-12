import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchData(searchQuery, page) {
  const API_KEY = '35507797-1d7e5cbb70f4cd108be967f63';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  const response = await axios.get(url);
  if (response.status === 404) {
    Notiflix.Notify.failure('Oops, no pics found. Please try again');
    return Promise.reject();
  }
  return response;
}
