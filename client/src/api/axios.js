import axios from "axios";

const api = axios.create({
  baseURL: "https://vocalbill-gesl.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;