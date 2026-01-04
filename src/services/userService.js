// import axios from "axios";
import axios from "../setup/axios";


const registerNewUser = (userData) => {
    return axios.post("/api/v1/register", userData);
}

const loginUser = (loginData) => {
    return axios.post("/api/v1/login", loginData);
}

const fetchAllUsers = (page, limit) => {
  return axios.get(
    `/api/v1/user/show?page=${page}&limit=${limit}`
  );
};

const deleteUser = (userId) => {
  console.log("Deleting user with ID:", userId);
  return axios.delete(`/api/v1/user/delete/${userId}`);
}

const fetchGroups = () => {
    return axios.get("/api/v1/group/show");
}

const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", userData);
}

const updateUser = (userData) => {
  return axios.put("/api/v1/user/edit", userData);
}

const userService = {
    registerNewUser,
    loginUser,
    fetchAllUsers,
    deleteUser,
    fetchGroups,
    createNewUser,
    updateUser,
};

export default userService;