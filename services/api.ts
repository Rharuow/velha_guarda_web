import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { EventDatabase } from "../types/database/Event";
import { CreateMeetDatabase } from "../types/database/Meet";
import { CreateUser } from "../types/database/User";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    csrf: `${process.env.NEXT_PUBLIC_SECRET}`,
  },
});

const setToken = async () => {
  const session = await getSession();
  if (session)
    return {
      headers: { authorization: `Bearer ${session.token}` },
    };
  return {};
};

const getChars = async () => {
  const authorization = await setToken();
  return await api.get("/chars", authorization);
};

const getChar = async (id: string) => {
  const authorization = await setToken();
  return await api.get(`/chars/${id}`, authorization);
};

const createUser = async (data: CreateUser) => await api.post("/users", data);

const confirmationUser = async (token: string, email: string) =>
  await api.get(`/users/confirmation/${email}/${token}`);

const createSession = async (email: string, password: string) =>
  await api.post("/session", { email, password });

const getCurrentUserByToken: () => Promise<
  AxiosResponse<any, any>
> = async () => {
  const authorization = await setToken();
  try {
    const res = await api.get("/session", authorization);
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

const getEvents: () => Promise<AxiosResponse<any, any>> = async () => {
  const authorization = await setToken();

  return await api.get("/events", authorization);
};

const getEvent: (id: string) => Promise<AxiosResponse<any, any>> = async (
  id
) => {
  try {
    const authorization = await setToken();

    const res = await api.get(`/events/${id}`, authorization);

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
  data: EventDatabase
) => Promise<AxiosResponse<any, any>> = async (data) => {
  const authorization = await setToken();

  return await api.post("/events", data, authorization);
};

const createMeet: (
  data: CreateMeetDatabase
) => Promise<AxiosResponse<any, any>> = async (data) => {
  const authorization = await setToken();

  return await api.post("/meetings", data, authorization);
};

const getCharMeetings: (
  charId: string
) => Promise<AxiosResponse<any, any>> = async (charId) => {
  try {
    const authorization = await setToken();

    const res = await api.get(`chars/${charId}/meetings`, authorization);
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
const getMeetings: () => Promise<AxiosResponse<any, any>> = async () => {
  try {
    const authorization = await setToken();

    const res = await api.get(`/meetings`, authorization);
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
  meetId: string
) => Promise<AxiosResponse<any, any>> = async (meetId) => {
  try {
    const authorization = await setToken();

    const res = await api.get(`meetings/${meetId}/chars`, authorization);
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
  getChar,
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
