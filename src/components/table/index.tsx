import { TableHTMLAttributes } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  limit: number;
  page: number;
  total: number;
  setPage: (page: number, limit: number) => void;
}

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  data: any[];
  columns: {
    label: string;
    key: string;
  }[];
  withPagination?: boolean;
  pagination?: PaginationProps;
}

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export const Table = ({
  data,
  columns,
  withPagination,
  pagination,
  ...rest
}: TableProps) => {
  const current = pagination && pagination.page ? pagination.page : 1;
  const pages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1;
  const first = Math.max(current - MAX_LEFT, 1);

  const prePage = () => {
    if (pagination && current !== 1) {
      pagination.setPage(current - 1, pagination.limit);
    }
  };

  const changCurrentPage = (number: number) => {
    if (pagination) {
      pagination.setPage(number, pagination.limit);
    }
  };

  const nextPage = () => {
    if (pagination && current !== pages) {
      pagination.setPage(current + 1, pagination.limit);
    }
  };

  return (
    <>
      <table className="table-auto w-full" {...rest}>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th className="border px-4 py-2" key={i}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              {columns.map((column, i) => (
                <td className="border px-4 py-2" key={i}>
                  {d[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {withPagination && pagination && (
        <div className="flex justify-between my-2">
          <nav className="flex bg-white rounded-lg">
            <button
              className={`flex justify-center items-center h-10 w-10 rounded-l-lg border-2 border-r-0 my-border-gray-300 my-color-gray-700 ${
                current != 1 ? "hover:my-bg-gray-300 hover:text-white" : ""
              } disabled:cursor-not-allowed`}
              onClick={() => prePage()}
              disabled={current === 1}
            >
              <IoIosArrowBack size={16} />
            </button>
            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
              .map((_, index) => index + first)
              .map((currentPage, i) => (
                <button
                  key={i}
                  className={`h-10 w-10 border-2 border-r-0 my-border-gray-300 ${
                    currentPage === pagination.page
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => changCurrentPage(currentPage)}
                >
                  {currentPage}
                </button>
              ))}
            <button
              className={`flex justify-center items-center h-10 w-10 rounded-r-lg border-2 my-border-gray-300 my-color-gray-700 disabled:cursor-not-allowed`}
              onClick={() => nextPage()}
              disabled={current === pages}
            >
              <IoIosArrowForward size={16} />
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
