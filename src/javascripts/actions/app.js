import axios from 'axios';

export function getLinksByApi() {
  return (dispatch, getState) => {

    axios
      .get('/api/home')
      .then((response) => {
        dispatch({ type: 'FETCHED_LINKS_CRAWLER', payload: response.data });
      });
  }
}