import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/superheroes`;

export const getSuperheroes = (page = 1) =>
  axios.get(`${API_URL}?page=${page}`);

export const getSuperhero = (id) => axios.get(`${API_URL}/${id}`);

export const createSuperhero = (superheroData, images) => {
  const formData = new FormData();

  Object.entries(superheroData).forEach(([key, value]) => {
    if (key === "superpowers" && Array.isArray(value)) {
      value.forEach((power) => formData.append("superpowers", power));
    } else {
      formData.append(key, value);
    }
  });

  if (images) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateSuperhero = (id, superheroData, images = []) => {
  const formData = new FormData();

  Object.entries(superheroData).forEach(([key, value]) => {
    if (key === "superpowers" && Array.isArray(value)) {
      value.forEach((power) => formData.append("superpowers", power));
    } else {
      formData.append(key, value);
    }
  });

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSuperhero = (id) => axios.delete(`${API_URL}/${id}`);

export const deleteSuperheroImage = (id, imageName) =>
  axios.delete(`${API_URL}/${id}/images/${imageName}`);
