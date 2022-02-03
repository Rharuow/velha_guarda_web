import axios, { AxiosResponse } from "axios";
import { CreateUser } from "../types/database/User";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    csrf: `${process.env.NEXT_PUBLIC_SECRET}`,
  },
});

const getChars = async () => (await api.get("/chars")).data;

const createUser = async (body: CreateUser) => await api.post("/users", body);

const confirmationUser = async (token: string, email: string) =>
  await api.get(`/users/confirmation/${email}/${token}`);

const createSession = async (email: string, password: string) =>
  await api.post("/session", { email, password });

const getCurrentUserByToken: (
  token: string
) => Promise<AxiosResponse<any, any>> = async (token) =>
  await api.get("/session", { headers: { authorization: `Bearer ${token}` } });

export {
  api,
  getChars,
  createUser,
  confirmationUser,
  createSession,
  getCurrentUserByToken,
};
