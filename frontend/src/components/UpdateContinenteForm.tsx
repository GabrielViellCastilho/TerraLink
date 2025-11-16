import { useForm } from "react-hook-form";
import { updateContinente } from "../api/internalAPI/continente";

interface UpdateContinenteFormProps {
  continente: {
    id: number;
    nome: string;
    descricao: string;
  };
  onUpdated: () => void;
}

export default function UpdateContinenteForm({ continente, onUpdated }: UpdateContinenteFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nome: continente.nome,
      descricao: continente.descricao,
    },
  });

  async function onSubmit(data: any) {
    try {
      await updateContinente(continente.id, data);
      alert("Continent updated successfully!");
      onUpdated();
    } catch (error) {
      alert("Error updating continent");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <h2 className="text-xl font-bold mb-2">Update Continent</h2>

      <div>
        <label className="font-semibold">Name</label>
        <input
          className="w-full p-2 border rounded"
          {...register("nome")}
        />
      </div>

      <div>
        <label className="font-semibold">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          {...register("descricao")}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
      >
        Update
      </button>
    </form>
  );
}
