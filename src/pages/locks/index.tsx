"use client";

import RootLayout from "@/app/layout";
import { Table } from "@/components/table";
import { getLocks, postLock } from "@/services/apiClient";
import { LockDto } from "@/utils/dtos/locks.dto";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";

export default function Locks({ data }: any) {
  const [form, setForm] = useState({});
  const [locks, setLocks] = useState(data);

  const handleChange = (e: HTMLInputElement) => {
    setForm((prev) => {
      return { ...prev, [e.name]: e.value };
    });
  };

  const handleUpdateLocks = async () => {
    const data = await getLocks();
    setLocks(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postLock(form as LockDto);
      await handleUpdateLocks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation path="/locks" />
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
                fechaduras Cadastrados
              </h2>
              <h3 className="text-xl mb-4">Listagem de Fechaduras</h3>
              <Table
                columns={[{ label: "Fechaduras", key: "name" }]}
                data={locks.map((lock: any) => {
                  return {
                    name: <div className="text-center">{lock.name}</div>,
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
                  Cadastro de Fechaduras
                </h2>
                <h3 className="text-xl mb-4">Informe a fechadura</h3>
                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fechadura
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="Seu fechadura"
                      onChange={(e) => handleChange(e.target)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Cadastrar
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

Locks.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const data = await getLocks();

  return {
    props: {
      data,
    },
  };
};
