"use client";
import RootLayout from "@/app/layout";
import { Table } from "@/components/table";
import { getUsers, postUser } from "@/services/apiClient";
import { UserDto } from "@/utils/dtos/users.dto";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { RfidModal } from "@/components/rfidModal";

export default function Home({ data }: any) {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState(data);
  const [modal, setModal] = useState(false);

  const handleChange = (e: HTMLInputElement) => {
    setForm((prev) => {
      return { ...prev, [e.name]: e.value };
    });
  };

  const handleUpdateUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async () => {
    try {
      await postUser(form as UserDto);
      await handleUpdateUsers();
      setForm({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <>
      <Navigation path="/" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          <main className="flex flex-wrap justify-center my-5">
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-2xl font-bold mb-2">Usuários Cadastrados</h2>
              <h3 className="text-xl mb-4">Listagem de usuários</h3>
              <Table
                columns={[
                  { label: "icone", key: "id" },
                  { label: "CPF", key: "cpf" },
                  { label: "Nome", key: "name" },
                ]}
                data={users.map((user: any) => {
                  return {
                    id: <div className="text-center">👤</div>,
                    name: user.name,
                    cpf: user.cpf,
                  };
                })}
                withPagination
                pagination={{
                  page: 1,
                  total: users.length,
                  limit: 10,
                  setPage: (page: number, limit: number) => {
                    console.log(page, limit);
                  },
                }}
              ></Table>
            </div>
            <div className="w-full md:w-1/2 h-screen p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full">
                <h2 className="text-2xl font-bold mb-2">
                  Cadastro de Usuários
                </h2>
                <h3 className="text-xl mb-4">
                  Preencha os dados para cadastro
                </h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleOpenModal(e)}
                >
                  <div>
                    <label
                      htmlFor="cpf"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CPF
                    </label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="Seu CPF"
                      onChange={(e) => handleChange(e.target)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="Seu nome completo"
                      onChange={(e) => handleChange(e.target)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm"
                      placeholder="Digite uma senha"
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
          <RfidModal
            isOpen={modal}
            onClose={() => {
              setModal(false);
              handleSubmit();
            }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

Home.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps() {
  const data = await getUsers();

  return {
    props: {
      data,
    },
  };
}
