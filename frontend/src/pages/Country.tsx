import { useState } from "react";
import { deletePais, updatePais, getPaisById } from "../api/internalAPI/pais";
import { PaisTable } from "../components/PaisTable";
import Sidebar from "../components/Sidebar";

export default function Country() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    populacao: 0,
    idioma_oficial: "",
    moeda: "",
    id_continente: 0,
    url_bandeira: "",
    pib_per_capita: 0,
    inflacao: 0,
  });

  // Abre modal e carrega dados do país
  const handleUpdate = async (id: number) => {
    setCurrentId(id);
    setIsModalOpen(true);

    try {
      const data = await getPaisById(id);
      setFormData({
        nome: data.nome,
        populacao: data.populacao,
        idioma_oficial: data.idioma_oficial,
        moeda: data.moeda,
        id_continente: data.id_continente,
        url_bandeira: data.url_bandeira ?? "",
        pib_per_capita: data.pib_per_capita ?? 0,
        inflacao: data.inflacao ?? 0,
      });
    } catch (err) {
      console.error(err);
      alert("Error loading country data.");
    }
  };

  // Submete atualização
  const submitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentId) return;

    try {
      await updatePais(currentId, formData);
      alert("Country updated successfully!");
      setIsModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update country.");
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this country?")) return;

    deletePais(id)
      .then(() => {
        alert("Country deleted successfully!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Sidebar>
        <main className="ml-8 md:ml-16 mr-8 md:mr-64">
          <h1 className="text-3xl font-bold mt-4 mb-6">Countries</h1>

          <PaisTable onUpdate={handleUpdate} onDelete={handleDelete} />

          {/* Modal de Atualização */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Update Country</h2>
                <form onSubmit={submitUpdate} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Population"
                    value={formData.populacao}
                    onChange={(e) =>
                      setFormData({ ...formData, populacao: Number(e.target.value) })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Official Language"
                    value={formData.idioma_oficial}
                    onChange={(e) =>
                      setFormData({ ...formData, idioma_oficial: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Currency"
                    value={formData.moeda}
                    onChange={(e) =>
                      setFormData({ ...formData, moeda: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Continent ID"
                    value={formData.id_continente}
                    onChange={(e) =>
                      setFormData({ ...formData, id_continente: Number(e.target.value) })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Flag URL"
                    value={formData.url_bandeira}
                    onChange={(e) =>
                      setFormData({ ...formData, url_bandeira: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="GDP per Capita"
                    value={formData.pib_per_capita}
                    onChange={(e) =>
                      setFormData({ ...formData, pib_per_capita: Number(e.target.value) })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Inflation"
                    value={formData.inflacao}
                    onChange={(e) =>
                      setFormData({ ...formData, inflacao: Number(e.target.value) })
                    }
                    className="w-full p-2 border rounded"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    >
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
