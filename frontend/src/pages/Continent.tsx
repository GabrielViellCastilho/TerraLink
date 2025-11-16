import { useState } from "react";
import { deleteContinente, updateContinente, getContinenteById } from "../api/internalAPI/continente";
import { ContinenteTable } from "../components/ContinenteTable";
import Sidebar from "../components/Sidebar";

export default function Continent() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  async function handleUpdate(id: number) {
    setCurrentId(id);
    setIsModalOpen(true);

    try {
      const data = await getContinenteById(id);
      setFormData({
        nome: data.nome,
        descricao: data.descricao,
      });
    } catch (err) {
      console.error(err);
      alert("Error loading continent data.");
    }
  }

  async function submitUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!currentId) return;

    try {
      await updateContinente(currentId, formData);
      alert("Continent updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update continent.");
    }
  }

  function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this continent?")) return;

    deleteContinente(id)
      .then(() => {
        alert("Continent deleted successfully!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <Sidebar>
        <main className="ml-8 md:ml-16 mr-8 md:mr-64">

          <h1 className="text-3xl font-bold mt-4">Continents</h1>

          <ContinenteTable
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />

          {/* UPDATE MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">

                <h2 className="text-xl font-semibold mb-4">Update Continent</h2>

                <form onSubmit={submitUpdate} className="space-y-4">

                  <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                      className="w-full border p-2 rounded"
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save
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
