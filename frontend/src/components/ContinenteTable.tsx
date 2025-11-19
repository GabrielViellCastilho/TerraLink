import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllContinentes } from "../api/internalAPI/continente";

interface Continente {
  id: number;
  nome: string;
  descricao: string;
  paises: number[];
}

interface ContinenteTableProps {
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ContinenteTable: React.FC<ContinenteTableProps> = ({
  onUpdate,
  onDelete,
}) => {
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 7;


  async function loadData() {
    try {
      const response = await getAllContinentes(page, ITEMS_PER_PAGE);

      setContinentes(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error loading continents: ", error);
    }
  }

  
  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="w-full bg-white shadow rounded-xl p-4">

      <div className="overflow-x-auto">
        <table className="w-full border border-black">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 border border-white">ID</th>
              <th className="p-2 border border-white">Name</th>
              <th className="p-2 border border-white">Description</th>
              <th className="p-2 border border-white">Number of Countries</th>
              <th className="p-2 border border-white text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {continentes.map((item) => (
              <tr
                key={item.id}
                className="border border-black odd:bg-white even:bg-gray-100"
              >
                <td className="p-2 border border-black">{item.id}</td>
                <td className="p-2 border border-black">{item.nome}</td>
                <td className="p-2 border border-black">{item.descricao}</td>
                <td className="p-2 border border-black text-center">
                  {item.paises.length}
                </td>

                <td className="p-2 border border-black">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onUpdate(item.id)}
                      className="p-2 rounded bg-black text-white hover:bg-gray-800 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 rounded border border-black text-black hover:bg-black hover:text-white transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {continentes.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No continents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

{/* PAGINATION */}
<div className="flex items-center justify-center gap-6 mt-6">

  {/* Previous */}
  <button
    disabled={page === 1}
    onClick={() => setPage((p) => p - 1)}
    className={`
      px-4 py-2 rounded-xl border 
      transition-all duration-200
      ${page === 1
        ? "opacity-40 cursor-not-allowed border-gray-400"
        : "border-black hover:bg-black hover:text-white"}
    `}
  >
    Previous
  </button>

  {/* Current Page */}
  <span className="text-lg font-semibold text-black bg-gray-100 px-4 py-2 rounded-xl shadow">
    Page {page} of {totalPages}
  </span>

  {/* Next */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage((p) => p + 1)}
    className={`
      px-4 py-2 rounded-xl border
      transition-all duration-200
      ${page === totalPages
        ? "opacity-40 cursor-not-allowed border-gray-400"
        : "border-black hover:bg-black hover:text-white"}
    `}
  >
    Next
  </button>

</div>

      </div>
  );
};
