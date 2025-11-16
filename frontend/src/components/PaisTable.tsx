import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllPaises } from "../api/internalAPI/pais";
import { getAllContinentes } from "../api/internalAPI/continente";
import type { Pais } from "../types/paisTypes";
import type { Continente } from "../types/continenteTypes";

interface PaisTableProps {
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PaisTable: React.FC<PaisTableProps> = ({ onUpdate, onDelete }) => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContinent, setSelectedContinent] = useState<number | "">("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const ITEMS_PER_PAGE = 7;

  // Carrega continentes para o filtro
  const loadContinentes = async () => {
    try {
      const response = await getAllContinentes(1, 100); // pega todos
      setContinentes(response.data);
    } catch (error) {
      console.error("Erro ao carregar continentes:", error);
    }
  };

  // Carrega países com filtros
  const loadPaises = async () => {
    try {
      const filters: any = {};
      if (selectedContinent) filters.id_continente = selectedContinent;
      if (selectedLanguage) filters.idioma_oficial = selectedLanguage;

      const response = await getAllPaises(page, ITEMS_PER_PAGE, filters);
      setPaises(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Erro ao carregar países:", error);
    }
  };

  useEffect(() => {
    loadContinentes();
  }, []);

  useEffect(() => {
    loadPaises();
  }, [page, selectedContinent, selectedLanguage]);

  return (
    <div className="w-full bg-white shadow rounded-xl p-4">
      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border rounded p-2 w-full md:w-auto"
          value={selectedContinent}
          onChange={(e) =>
            setSelectedContinent(e.target.value ? Number(e.target.value) : "")
          }
        >
          <option value="">All Continents</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by Language"
          className="border rounded p-2 w-full md:w-auto"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        />
      </div>


      <div className="overflow-x-auto">
        <table className="w-full border border-black">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 border border-white">ID</th>
              <th className="p-2 border border-white">Flag</th>
              <th className="p-2 border border-white">Name</th>
              <th className="p-2 border border-white">Population</th>
              <th className="p-2 border border-white">Language</th>
              <th className="p-2 border border-white">Currency</th>
              <th className="p-2 border border-white">GDP per Capita</th>
              <th className="p-2 border border-white">Inflation (%)</th>
              <th className="p-2 border border-white">Continent</th>
              <th className="p-2 border border-white text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paises.map((item) => (
              <tr
                key={item.id}
                className="border border-black odd:bg-white even:bg-gray-100"
              >
                <td className="p-2 border border-black">{item.id}</td>
                <td className="p-2 border border-black">
                  {item.url_bandeira ? (
                    <img
                      src={item.url_bandeira}
                      alt={`${item.nome} flag`}
                      className="w-12 h-8 object-cover border rounded"
                    />
                  ) : (
                    "No flag"
                  )}
                </td>
                <td className="p-2 border border-black">{item.nome}</td>
                <td className="p-2 border border-black">
                  {item.populacao.toLocaleString()}
                </td>
                <td className="p-2 border border-black">{item.idioma_oficial}</td>
                <td className="p-2 border border-black">{item.moeda}</td>
                <td className="p-2 border border-black">
                  {item.pib_per_capita?.toLocaleString() ?? "-"}
                </td>
                <td className="p-2 border border-black">
                  {item.inflacao !== null && item.inflacao !== undefined
                    ? item.inflacao.toFixed(2)
                    : "-"}
                </td>
                <td className="p-2 border border-black">{item.continente.nome}</td>
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

            {paises.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center p-4 text-gray-500">
                  No countries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-6 mt-6">
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

        <span className="text-lg font-semibold text-black bg-gray-100 px-4 py-2 rounded-xl shadow">
          Page {page} of {totalPages}
        </span>

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
