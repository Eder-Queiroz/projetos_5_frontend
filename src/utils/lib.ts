import { LockDto } from "./dtos/locks.dto";
import { UserDto } from "./dtos/users.dto";
import { UserLockDto } from "./dtos/userlock.dto";

export const findUserName = (id: string, users: UserDto[]) => {
  const user = users.find((user: any) => user.id === id);
  return user ? user.name : "Desconhecido";
};

export const findLockName = (id: string, locks: LockDto[]) => {
  const lock = locks.find((lock: any) => lock.id === id);
  return lock ? lock.name : "Desconhecido";
};

export const findUserLock = (
  id: number,
  userLocks: UserLockDto[],
  users: UserDto[],
  locks: LockDto[]
) => {
  const userLock = userLocks.find((userLock: any) => userLock.id === id);
  return userLock
    ? {
        user: findUserName(userLock.user, users),
        lock: findLockName(userLock.lock, locks),
      }
    : { user: "Desconhecido", lock: "Desconhecido" };
};
