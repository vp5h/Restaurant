import { API } from "../../backend";



export const getEmployees = (userId, token) => {
    return fetch(`${API}/employees/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };