import { commonAPI } from "./commonAPI";

const API_URL = import.meta.env.VITE_API_URL;

export const addVideoAPI = (video) =>
  commonAPI("POST", `${API_URL}/allVideos`, video);

export const getAllVideosAPI = () =>
  commonAPI("GET", `${API_URL}/allVideos?_sort=position&_order=asc`, "");

export const updateVideoAPI = (id, updates) =>
  commonAPI("PATCH", `${API_URL}/allVideos/${id}`, updates);

export const deleteVideoAPI = (id) =>
  commonAPI("DELETE", `${API_URL}/allVideos/${id}`, "");

export const addCategoryAPI = (category) =>
  commonAPI("POST", `${API_URL}/category`, category);

export const getAllCategoriesAPI = () =>
  commonAPI("GET", `${API_URL}/category`, "");

export const deleteCategoryAPI = (id) =>
  commonAPI("DELETE", `${API_URL}/category/${id}`, "");

export const addToWatchHistoryAPI = (video) =>
  commonAPI("POST", `${API_URL}/watchHistory`, {
    ...video,
    watchedAt: new Date().toISOString()
  });

export const getWatchHistoryAPI = () =>
  commonAPI("GET", `${API_URL}/watchHistory?_sort=watchedAt&_order=desc`, "");

export const deleteWatchHistoryAPI = (id) =>
  commonAPI("DELETE", `${API_URL}/watchHistory/${id}`, "");