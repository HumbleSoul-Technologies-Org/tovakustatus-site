 import { QueryClient, QueryFunction } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Axios instance for GET only
const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // include cookies
});

// ✅ Throws error if response is not OK
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// ✅ Handles POST / PUT / PATCH / DELETE
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<Response> {
  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

// ✅ GET requests now use Axios
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401 }) =>
  async ({ queryKey }) => {
    try {
      // Convert ['messages', 'all'] → "/messages/all"
      const url = `/${queryKey.join("/")}`;

      const response = await axiosClient.get(url);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401 && on401 === "returnNull") {
        return null;
      }

      throw new Error(error.response?.data || error.message);
    }
  };

// ✅ React Query Global Config
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: 5000,
      refetchOnWindowFocus: false,
      staleTime: 10000,
      retry: true,
    },
    mutations: {
      retry: true,
    },
  },
});
