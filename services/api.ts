import axios from "axios";
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

export { api, getChars, createUser, confirmationUser };
