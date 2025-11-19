import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateContinenteDTO } from "../types/continenteTypes";
import { CreateContinenteSchema } from "../schemas/continenteSchema";
import { createContinente } from "../api/internalAPI/continente";
import { toast } from "react-toastify";

export default function CreateContinenteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateContinenteDTO>({
    resolver: zodResolver(CreateContinenteSchema),
  });

  const onSubmit = async (data: CreateContinenteDTO) => {
    try {
      await createContinente({
        ...data,
        paises: [],
      });

      toast.success("Continent created successfully!");
      reset();
    } catch (err) {
      toast.error("Failed to create continent.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        space-y-5 p-6 bg-white border border-gray-300 rounded-2xl shadow-md
        w-full 
        max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl 
        mx-auto
      "
    >
      <h2 className="text-xl font-bold text-center text-black mb-3">
        Create New Continent
      </h2>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Name</label>
        <input
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
          placeholder="Enter continent name"
          {...register("nome")}
        />
        {errors.nome && (
          <p className="text-red-600 text-sm">{errors.nome.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Description</label>
        <textarea
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition h-28 resize-none"
          placeholder="Enter a description"
          {...register("descricao")}
        />
        {errors.descricao && (
          <p className="text-red-600 text-sm">{errors.descricao.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-2.5 text-center bg-black text-white font-semibold rounded-lg 
          shadow hover:bg-gray-900 active:scale-[0.98] transition 
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? "Sending..." : "Create"}
      </button>
    </form>
  );
}

