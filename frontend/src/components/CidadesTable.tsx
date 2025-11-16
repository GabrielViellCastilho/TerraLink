import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllCidades } from "../api/internalAPI/cidade";
import { getAllPaises } from "../api/internalAPI/pais";
import { getAllContinentes } from "../api/internalAPI/continente";
import { getContinenteById } from "../api/internalAPI/continente";
import type { Pais } from "../types/paisTypes";
import type { Continente } from "../types/continenteTypes";
import type { Cidade } from "../types/cidadeType";

interface CityTableProps {
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const CityTable: React.FC<CityTableProps> = ({ onUpdate, onDelete }) => {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [continentes, setContinentes] = useState<Continente[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContinent, setSelectedContinent] = useState<number | undefined>(undefined);
  const [selectedPais, setSelectedPais] = useState<number | undefined>(undefined);

  const ITEMS_PER_PAGE = 7;

  const loadContinentes = async () => {
    try {
      const res = await getAllContinentes(1, 100);
      setContinentes(res.data);
    } catch (error) {
      console.error("Failed to load continents:", error);
    }
  };

  const loadPaises = async () => {
    try {
      if (!selectedContinent) {
        setPaises([]);
        return;
      }
      const res = await getAllPaises(1, 100, { id_continente: selectedContinent });
      setPaises(res.data);
    } catch (error) {
      console.error("Failed to load countries:", error);
    }
  };

  const loadCidades = async () => {
    try {
      const res = await getAllCidades(page, ITEMS_PER_PAGE, selectedPais, selectedContinent);

      const cidadesComContinente = await Promise.all(
        res.data.map(async (cidade) => {
          if (!cidade.pais.continente) {
            try {
              const continente = await getContinenteById(cidade.pais.id_continente);
              return {
                ...cidade,
                pais: {
                  ...cidade.pais,
                  continente,
                },
              };
            } catch {
              return cidade;
            }
          }
          return cidade;
        })
      );

      setCidades(cidadesComContinente);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error("Failed to load cities:", error);
    }
  };

  useEffect(() => {
    loadContinentes();
  }, []);

  useEffect(() => {
    setSelectedPais(undefined);
    loadPaises();
  }, [selectedContinent]);

  useEffect(() => {
    loadCidades();
  }, [page, selectedPais, selectedContinent]);

  return (
    <div className="w-full bg-white shadow rounded-xl p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border rounded p-2 w-full md:w-auto"
          value={selectedContinent ?? ""}
          onChange={(e) =>
            setSelectedContinent(e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">All Continents</option>
          {continentes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome ?? "-"}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2 w-full md:w-auto"
          value={selectedPais ?? ""}
          onChange={(e) =>
            setSelectedPais(e.target.value ? Number(e.target.value) : undefined)
          }
          disabled={!selectedContinent}
        >
          <option value="">All Countries</option>
          {paises.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome ?? "-"}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-black">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2 border border-white">ID</th>
              <th className="p-2 border border-white">Name</th>
              <th className="p-2 border border-white">Population</th>
              <th className="p-2 border border-white">Country</th>
              <th className="p-2 border border-white">Continent</th>
              <th className="p-2 border border-white">Latitude</th>
              <th className="p-2 border border-white">Longitude</th>
              <th className="p-2 border border-white text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cidades.map((cidade) => (
              <tr
                key={cidade.id}
                className="border border-black odd:bg-white even:bg-gray-100"
              >
                <td className="p-2 border border-black">{cidade.id ?? "-"}</td>
                <td className="p-2 border border-black">{cidade.nome ?? "-"}</td>
                <td className="p-2 border border-black">{cidade.populacao?.toLocaleString() ?? "-"}</td>
                <td className="p-2 border border-black">{cidade.pais?.nome ?? "-"}</td>
                <td className="p-2 border border-black">{cidade.pais?.continente?.nome ?? "-"}</td>
                <td className="p-2 border border-black">{cidade.latitude ?? "-"}</td>
                <td className="p-2 border border-black">{cidade.longitude ?? "-"}</td>
                <td className="p-2 border border-black">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onUpdate(cidade.id ?? 0)}
                      className="p-2 rounded bg-black text-white hover:bg-gray-800 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(cidade.id ?? 0)}
                      className="p-2 rounded border border-black text-black hover:bg-black hover:text-white transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cidades.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No cities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
            page === 1
              ? "opacity-40 cursor-not-allowed border-gray-400"
              : "border-black hover:bg-black hover:text-white"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold text-black bg-gray-100 px-4 py-2 rounded-xl shadow">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
            page === totalPages
              ? "opacity-40 cursor-not-allowed border-gray-400"
              : "border-black hover:bg-black hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
