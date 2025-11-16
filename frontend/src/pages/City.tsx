import { useEffect, useState } from "react";
import { deleteCidade, updateCidade, getCidadeById } from "../api/internalAPI/cidade";
import { getAllPaises } from "../api/internalAPI/pais";
import { getAllContinentes } from "../api/internalAPI/continente";
import { CityTable } from "../components/CidadesTable";
import Sidebar from "../components/Sidebar";

interface PaisOption {
  id: number;
  nome: string;
}

interface ContinenteOption {
  id: number;
  nome: string;
}

export interface CidadeUpdateForm {
  nome: string;
  populacao: number;
  latitude: number;
  longitude: number;
  id_pais: number;
}

export default function City() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CidadeUpdateForm>({
    nome: "",
    populacao: 0,
    latitude: 0,
    longitude: 0,
    id_pais: 0,
  });
  const [paises, setPaises] = useState<PaisOption[]>([]);
  const [continentes, setContinentes] = useState<ContinenteOption[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const continentesRes = await getAllContinentes(1, 100);
        setContinentes(continentesRes.data);

        const paisesRes = await getAllPaises(1, 100);
        setPaises(paisesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleUpdate = async (id: number) => {
    setCurrentId(id);
    setIsModalOpen(true);

    try {
      const cidade = await getCidadeById(id);
      setFormData({
        nome: cidade.nome,
        populacao: cidade.populacao,
        latitude: cidade.latitude,
        longitude: cidade.longitude,
        id_pais: cidade.pais.id,
      });
    } catch (err) {
      console.error(err);
      alert("Error loading city data.");
    }
  };

  const submitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentId) return;

    try {
      await updateCidade(currentId, formData); 
      alert("City updated successfully!");
      setIsModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update city.");
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this city?")) return;

    deleteCidade(id)
      .then(() => {
        alert("City deleted successfully!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Sidebar>
        <main className="ml-8 md:ml-16 mr-8 md:mr-64">
          <h1 className="text-3xl font-bold mt-4 mb-6">Cities</h1>

          <CityTable onUpdate={handleUpdate} onDelete={handleDelete} />

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Update City</h2>
                <form onSubmit={submitUpdate} className="space-y-4">
                  <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Population</label>
                    <input
                      type="number"
                      value={formData.populacao}
                      onChange={(e) => setFormData({ ...formData, populacao: Number(e.target.value) })}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Latitude</label>
                    <input
                      type="number"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Longitude</label>
                    <input
                      type="number"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Country</label>
                    <select
                      value={formData.id_pais}
                      onChange={(e) => setFormData({ ...formData, id_pais: Number(e.target.value) })}
                      className="w-full p-2 border rounded"
                    >
                      <option value={0}>Select Country</option>
                      {paises.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </Sidebar>
    </div>
  );
}
