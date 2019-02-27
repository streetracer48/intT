import axios from "axios";
import AuthService from './authService/'


export const getList = () => {
  return axios
    .get("http://localhost:5000/api/tasks", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
  /*.then(data => {
      console.log(data);
    });*/
};


export const loginUser = user => {  axios
    .post(
      "http://localhost:5000/api/auth",{...user},
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      AuthService.saveToken(response.data)
      console.log(response.data);
    });
};


export const addToList = data => {
  console.log('data', data )
  return axios
    .post(
      "http://localhost:5000/api/task",
      {
        title: data,
        isDone: false
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};

export const deleteItem = data => {
  axios
    .delete(`http://localhost:5000/api/task/${data}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const updateItem = (data, id) => {
  return axios
    .put(
      `http://localhost:5000/api/task/${id}`,
      {
        title: data,
        isDone: false
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};
