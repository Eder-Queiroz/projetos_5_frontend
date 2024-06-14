import { motion } from "framer-motion";
import Link from "next/link";

interface NavigationProps {
  path: string;
}

export const Navigation = ({ path }: NavigationProps) => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                href="/"
                className={`flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 ${
                  path === "/" ? "font-bold" : ""
                }`}
              >
                Usuários
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                href="/locks"
                className={`flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 ${
                  path === "/locks" ? "font-bold" : ""
                }`}
              >
                Fechaduras
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                href="/userlocks"
                className={`flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 ${
                  path === "/userlocks" ? "font-bold" : ""
                }`}
              >
                Fechaduras-Usuários
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <a
                href="/logs"
                className={`flex items-center py-5 px-2 text-gray-700 hover:text-gray-900 ${
                  path === "/logs" ? "font-bold" : ""
                }`}
              >
                Logs
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};
