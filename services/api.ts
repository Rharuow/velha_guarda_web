import axios, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { CharUpdateParamsDatabase } from "../types/database/Char";
import { EventDatabase } from "../types/database/Event";
import { CreateMeetDatabase } from "../types/database/Meet";
import { CreateUser } from "../types/database/User";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    csrf: `${process.env.NEXT_PUBLIC_SECRET}`,
  },
});

export const setError = (message: string) => {
  return {
    config: {},
    data: {},
    headers: {},
    status: 300,
    statusText: `unauthorized: ${message}`,
  };
};

const setToken = async () => {
  const session = await getSession();
  if (session)
    return {
      headers: { authorization: `Bearer ${session.token}` },
    };
  return {};
};

const getChars: () => Promise<AxiosResponse<any, any>> = async () => {
  try {
    return await api.get("/chars");
  } catch (error) {
    console.log("get chars error = ", error);
    return setError(`get chars error = ${error}`);
  }
};

const getChar = async (id: string) => {
  try {
    const authorization = await setToken();
    return await api.get(`/chars/${id}`, authorization);
  } catch (error) {
    console.log("get char error = ", error);

    return setError(`get char error = ${error}`);
  }
};

const updateChar = async (id: string, char: CharUpdateParamsDatabase) => {
  try {
    const authorization = await setToken();
    return await api.put(`/chars/${id}`, char, authorization);
  } catch (error) {
    throw new Error(`update Char = ${error}`);
  }
};

const createUser = async (data: CreateUser) => {
  try {
    return await api.post("/users", data);
  } catch (error) {
    console.log("create user error = ", error);

    return setError(`create user error = ${error}`);
  }
};

const confirmationUser = async (token: string, email: string) => {
  try {
    return await api.get(`/users/confirmation/${email}/${token}`);
  } catch (error) {
    console.log("confirmation user error = ", error);

    return setError(`confirmation user error = ${error}`);
  }
};

const createSession = async (email: string, password: string) => {
  try {
    return await api.post("/session", { email, password });
  } catch (error) {
    console.log("create session error = ", error);

    return setError(`create session error = ${error}`);
  }
};

const getCurrentUserByToken = async () => {
  try {
    const authorization = await setToken();
    const res = await api.get("/session", authorization);
    return res;
  } catch (error) {
    console.log("get current user by token error = ", error);

    return setError(`get current user by token error = ${error}`);
  }
};

const getEvents = async () => {
  try {
    const authorization = await setToken();

    return await api.get("/events", authorization);
  } catch (error) {
    console.log("get events error = ", error);

    return setError(`get events error = ${error}`);
  }
};

const getEvent = async (id: string) => {
  try {
    const authorization = await setToken();

    const res = await api.get(`/events/${id}`, authorization);

    return res;
  } catch (error) {
    console.log("get event error = ", error);

    return setError(`get event error = ${error}`);
  }
};

const createEvent = async (data: EventDatabase) => {
  try {
    const authorization = await setToken();
    return await api.post("/events", data, authorization);
  } catch (error) {
    console.log("get events error = ", error);
    return setError(`get events error = ${error}`);
  }
};

const createMeet = async (data: CreateMeetDatabase) => {
  try {
    const authorization = await setToken();

    return await api.post("/meetings", data, authorization);
  } catch (error) {
    console.log(`create meet error =  ${error}`);
    return setError(`create meet error =  ${error}`);
  }
};

const getCharMeetings = async (charId: string) => {
  try {
    const authorization = await setToken();

    const res = await api.get(`chars/${charId}/meetings`, authorization);
    return res;
  } catch (error) {
    console.log(" get char meetings = ", error);
    return setError(`get char meetings= ${error}`);
  }
};

const getMeetings = async () => {
  try {
    const authorization = await setToken();

    const res = await api.get(`/meetings`, authorization);
    return res;
  } catch (error) {
    console.log(" get meetings = ", error);
    return setError(`get meetings error = ${error}`);
  }
};

const getMeetChars = async (meetId: string) => {
  try {
    const authorization = await setToken();

    const res = await api.get(`meetings/${meetId}/chars`, authorization);
    return res;
  } catch (error) {
    console.log(`get meet chars error = ${error}`);
    return setError(`get meet chars error = ${error}`);
  }
};

const insertCharMeet = async (charId: string, meetId: string) => {
  try {
    const authorization = await setToken();
    return await api.put(
      `/meetings/${meetId}/chars/${charId}`,
      {},
      authorization
    );
  } catch (error) {
    return setError(`get meet chars = ${error}`);
  }
};

const deleteCharMeet = async (charId: string, meetId: string) => {
  try {
    const authorization = await setToken();
    return await api.delete(
      `/meetings/${meetId}/chars/${charId}`,
      authorization
    );
  } catch (error) {
    return setError(`delete char meet = ${error}`);
  }
};

const deleteMeet = async (meetId: string) => {
  try {
    const authorization = await setToken();
    return await api.delete(`/meetings/${meetId}`, authorization);
  } catch (error) {
    return setError(`delete meet = ${error}`);
  }
};

export {
  api,
  deleteCharMeet,
  getChars,
  getChar,
  updateChar,
  getCharMeetings,
  getCurrentUserByToken,
  getMeetChars,
  getMeetings,
  deleteMeet,
  getEvents,
  getEvent,
  createMeet,
  createEvent,
  createUser,
  confirmationUser,
  createSession,
  insertCharMeet,
};
