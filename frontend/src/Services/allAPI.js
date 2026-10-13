import { serverUrl } from "./serverUrl";
import { commonAPI } from "./commonAPI";

export const addVideoAPI = (video) =>
  commonAPI("POST", `${serverUrl}/allVideos`, video);

export const getAllVideosAPI = () =>
  commonAPI("GET", `${serverUrl}/allVideos?_sort=position&_order=asc`, "");

export const updateVideoAPI = (id, updates) =>
  commonAPI("PATCH", `${serverUrl}/allVideos/${id}`, updates);

export const deleteVideoAPI = (id) =>
  commonAPI("DELETE", `${serverUrl}/allVideos/${id}`, "");

export const addCategoryAPI = (category) =>
  commonAPI("POST", `${serverUrl}/category`, category);

export const getAllCategoriesAPI = () =>
  commonAPI("GET", `${serverUrl}/category`, "");

export const deleteCategoryAPI = (id) =>
  commonAPI("DELETE", `${serverUrl}/category/${id}`, "");

export const addToWatchHistoryAPI = (video) =>
  commonAPI("POST", `${serverUrl}/watchHistory`, {
    ...video,
    watchedAt: new Date().toISOString()
  });

export const getWatchHistoryAPI = () =>
  commonAPI("GET", `${serverUrl}/watchHistory?_sort=watchedAt&_order=desc`, "");

export const deleteWatchHistoryAPI = (id) =>
  commonAPI("DELETE", `${serverUrl}/watchHistory/${id}`, "");
