import axios, { AxiosResponse } from "axios";
import { EventDatabase } from "../types/database/Event";
import { CreateMeetDatabase } from "../types/database/Meet";
import { CreateUser } from "../types/database/User";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    csrf: `${process.env.NEXT_PUBLIC_SECRET}`,
  },
});

const setToken = (token: string) => ({
  headers: { authorization: `Bearer ${token}` },
});

const getChars = async () => (await api.get("/chars")).data;

const createUser = async (body: CreateUser) => await api.post("/users", body);

const confirmationUser = async (token: string, email: string) =>
  await api.get(`/users/confirmation/${email}/${token}`);

const createSession = async (email: string, password: string) =>
  await api.post("/session", { email, password });

const getCurrentUserByToken: (
  token: string
) => Promise<AxiosResponse<any, any>> = async (token) => {
  try {
    const res = await api.get("/session", setToken(token));
    return res;
  } catch (error) {
    console.log("get session error = ", error);

    const res: AxiosResponse<any, any> = {
      data: "",
      status: 300,
      statusText: "unauthorized",
      headers: {},
      config: {},
    };

    return res;
  }
};

const getEvents: (token: string) => Promise<AxiosResponse<any, any>> = async (
  token
) => await api.get("/events", setToken(token));

const getEvent: (
  token: string,
  id: string
) => Promise<AxiosResponse<any, any>> = async (token, id) => {
  try {
    const res = await api.get(`/events/${id}`, setToken(token));

    return res;
  } catch (error) {
    const res: AxiosResponse<any, any> = {
      config: {},
      data: {},
      headers: {},
      status: 300,
      statusText: "unauthorized",
    };
    return res;
  }
};

const createEvent: (
  token: string,
  data: EventDatabase
) => Promise<AxiosResponse<any, any>> = async (token, data) =>
  await api.post("/events", data, setToken(token));

const createMeet: (
  token: string,
  data: CreateMeetDatabase
) => Promise<AxiosResponse<any, any>> = async (token, data) =>
  await api.post("/meetings", data, setToken(token));

const getCharMeetings: (
  token: string,
  charId: string
) => Promise<AxiosResponse<any, any>> = async (token, charId) => {
  try {
    const res = await api.get(`chars/${charId}/meetings`, setToken(token));
    return res;
  } catch (error) {
    console.log(" get char meetings = ", error);
    return {
      config: {},
      data: {},
      headers: {},
      status: 300,
      statusText: `get char meetings = ${error}`,
    };
  }
};
const getMeetings: (token: string) => Promise<AxiosResponse<any, any>> = async (
  token
) => {
  try {
    const res = await api.get(`/meetings`, setToken(token));
    return res;
  } catch (error) {
    console.log(" get meetings = ", error);
    return {
      config: {},
      data: {},
      headers: {},
      status: 300,
      statusText: `get meetings = ${error}`,
    };
  }
};

const getMeetChars: (
  token: string,
  meetId: string
) => Promise<AxiosResponse<any, any>> = async (token, meetId) => {
  try {
    const res = await api.get(`meetings/${meetId}/chars`, setToken(token));
    return res;
  } catch (error) {
    return {
      config: {},
      data: {},
      headers: {},
      status: 300,
      statusText: `get meet chars = ${error}`,
    };
  }
};

export {
  api,
  getChars,
  getCharMeetings,
  getMeetChars,
  getMeetings,
  getEvents,
  getEvent,
  createMeet,
  createEvent,
  createUser,
  confirmationUser,
  createSession,
  getCurrentUserByToken,
};
