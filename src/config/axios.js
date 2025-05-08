import axios from "axios";
const api =axios.create({
    baseURL:"https://hotel-back-vgip.onrender.com",
    withCredentials:true,
});
export default api;