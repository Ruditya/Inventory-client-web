import axios from 'axios';

export default axios.create({
  baseURL: `https://us-central1-inventory-api-70328.cloudfunctions.net/app/api`,
});