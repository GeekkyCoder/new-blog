import axios from "axios";


const BASE_URL = "http://localhost:8000"

const getReqUest = async (url: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const postRequest = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/${url}`, data);
    if (response.status === 201) return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const putRequest = async (url: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${url}`, data);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteRequest = async (url: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${url}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getReqUest, postRequest, putRequest, deleteRequest };
