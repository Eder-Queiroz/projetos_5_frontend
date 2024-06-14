import { LockDto } from "@/utils/dtos/locks.dto";
import { setupAPIClient } from "./api";
import { UserDto } from "@/utils/dtos/users.dto";
import { UserLockDto } from "@/utils/dtos/userlock.dto";

export const api = setupAPIClient();

export const getUsers = async () => {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postUser = async (data: UserDto) => {
  try {
    await api.post("/users", data);
  } catch (error) {
    console.error(error);
  }
};

export const getLocks = async () => {
  try {
    const { data } = await api.get("/locks");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postLock = async (data: LockDto) => {
  try {
    await api.post("/locks", data);
  } catch (error) {
    console.error(error);
  }
};

export const postUserLock = async (data: UserLockDto) => {
  try {
    await api.post("/user-lock", data);
  } catch (error) {
    console.error(error);
  }
};

export const getUserLock = async () => {
  try {
    const { data } = await api.get("/user-lock");
    return data;
  } catch (error) {
    console.error(error);
  }
};
