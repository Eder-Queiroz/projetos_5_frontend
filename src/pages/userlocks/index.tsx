"use client";

import RootLayout from "@/app/layout";
import { Table } from "@/components/table";
import {
  getLocks,
  getUsers,
  postUserLock,
  getUserLock,
} from "@/services/apiClient";
import { FormEvent, use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { UserLockDto } from "@/utils/dtos/userlock.dto";
import { findLockName, findUserName } from "@/utils/lib";

export default function UserLocks({ data, dataUsers, dataUserLocks }: any) {
  const [form, setForm] = useState({});
  const [locks, setLocks] = useState(data);
  const [users, setUsers] = useState(dataUsers);
  const [userLocks, setUserLocks] = useState(dataUserLocks);

  const handleChange = (e: HTMLSelectElement) => {
    setForm((prev) => {
      return { ...prev, [e.name]: e.value };
    });
  };

  const handleUpdateUserLock = async () => {
    const data = await getUserLock();
    setUserLocks(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postUserLock(form as UserLockDto);
      await handleUpdateUserLock();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation path="/userlocks" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <main className="flex flex-wrap justify-center my-5">
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-2">
                Relacionamento Fechaduras e Usuarios
              </h2>
              <h3 className="text-xl mb-4">Listagem de Fechaduras</h3>
              <Table
                columns={[
                  { label: "Usuário", key: "user" },
                  { label: "Fechadura", key: "lock" },
                ]}
                data={userLocks.map((userLocks: any) => {
                  return {
                    user: findUserName(userLocks.user, users),
                    lock: findLockName(userLocks.lock, locks),
                  };
                })}
                withPagination
                pagination={{
                  page: 1,
                  limit: 10,
                  total: locks.length,
                  setPage: () => {},
                }}
              ></Table>
            </div>
            <div className="w-full md:w-1/2 h-screen p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[90%]">
                <h2 className="text-2xl font-bold mb-2">
                  Atribuir Fechadura ao Usuário
                </h2>
                <h3 className="text-xl mb-4">
                  Selecione o usuário e a fechadura
                </h3>
                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <label
                      htmlFor="user"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Usuário
                    </label>
                    <select
                      id="user"
                      name="user"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
                      onChange={(e) => handleChange(e.target)}
                      required
                    >
                      <option value="">Selecione um usuário</option>
                      {users.map((user: any) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="lock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fechadura
                    </label>
                    <select
                      id="lock"
                      name="lock"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
                      onChange={(e) => handleChange(e.target)}
                      required
                    >
                      <option value="">Selecione uma fechadura</option>
                      {locks.map((lock: any) => (
                        <option key={lock.id} value={lock.id}>
                          {lock.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Atribuir
                  </button>
                </form>
              </div>
            </div>
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

UserLocks.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const data = await getLocks();
  const dataUsers = await getUsers();
  const dataUserLocks = await getUserLock();

  return {
    props: {
      data,
      dataUsers,
      dataUserLocks,
    },
  };
};
