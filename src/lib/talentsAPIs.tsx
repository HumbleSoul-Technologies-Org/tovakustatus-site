import { apiRequest } from "./queryClient";
export const toggleLike = async (id: any, data: any) => {
  const res = await apiRequest("POST", `/talents/like/${id}`, {
    visitorId: data,
  });
  return res.json();
};
export const setViews = async (id: any, data: any) => {
  const res = await apiRequest("POST", `/talents/views/${id}`, {
    visitorId: data,
  });
  return res.json();
};
export const setShares = async (id: any, data: any) => {
  const res = await apiRequest("POST", `/talents/shares/${id}`, {
    visitorId: data,
  });
  return res.json();
};
