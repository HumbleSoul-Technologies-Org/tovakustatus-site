import { apiRequest } from "./queryClient";
export const toggleLike = async (id: any, data: any) => {
  const res = await apiRequest("POST", `/blogs/like/${id}`, {
    visitorId: data,
  });
  return res.json();
};
export const setViews = async (id: any, data: any) => {
  const res = await apiRequest("POST", `/blogs/views/${id}`, {
    visitorId: data,
  });
  return res.json();
};
export const setShares = async (id: any, data: any) => {
  const res = await apiRequest("POST", `/blogs/shares/${id}`, {
    visitorId: data,
  });
  return res.json();
};
