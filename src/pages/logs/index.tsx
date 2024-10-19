"use client";

import RootLayout from "@/app/layout";
import { Table } from "@/components/table";
import { getLogs, getUsers, getLocks, getUserLock } from "@/services/apiClient";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { findLockName, findUserName, findUserLock } from "@/utils/lib";

export default function Logs({ initialLogs, users, locks, userLocks }: any) {
  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getLogs();
        setLogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <>
      <Navigation path="/logs" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <main className="flex flex-wrap justify-center my-5">
            <div className="w-full p-4">
              <h2 className="text-2xl font-bold mb-2">Historico de Entradas</h2>
              <Table
                columns={[
                  { label: "Usuário", key: "user" },
                  { label: "Fechadura", key: "lock" },
                  { label: "Data e Hora", key: "date" },
                ]}
                data={logs.map((log: any) => {
                  const { user, lock } = findUserLock(
                    log.userLock,
                    userLocks,
                    users,
                    locks
                  );
                  return {
                    user: <div className="text-center">{user}</div>,
                    lock: <div className="text-center">{lock}</div>,
                    date: (
                      <div className="text-center">
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    ),
                  };
                })}
                withPagination
                pagination={{
                  page: 1,
                  limit: 1000,
                  total: logs.length,
                  setPage: () => {},
                }}
              ></Table>
            </div>
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

Logs.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const initialLogs = await getLogs();
  const users = await getUsers();
  const locks = await getLocks();
  const userLocks = await getUserLock();

  return {
    props: {
      initialLogs,
      users,
      locks,
      userLocks,
    },
  };
};
