import React, { useEffect, useState } from "react";
import { createCidade } from "../api/internalAPI/cidade";
import { getAllPaises } from "../api/internalAPI/pais";

export default function CreateCidadeForm() {
  const [formData, setFormData] = useState({
    nome: "",
    populacao: 0,
    latitude: 0,
    longitude: 0,
    id_pais: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [paises, setPaises] = useState<{ id: number; nome: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllPaises(1, 100)
      .then(res => setPaises(res.data))
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.nome) newErrors.nome = "City name is required";
    if (formData.populacao <= 0) newErrors.populacao = "Population must be positive";
    if (!formData.id_pais || formData.id_pais <= 0) newErrors.id_pais = "Country selection is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await createCidade(formData);
      alert("City created successfully!");
      setFormData({ nome: "", populacao: 0, latitude: 0, longitude: 0, id_pais: 0 });
      setErrors({});
    } catch (err: any) {
      alert("Failed to create city: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5 p-6 bg-white border border-gray-300 rounded-2xl shadow-md
        w-full 
        max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl 
        mx-auto
      "
    >
      <h2 className="text-xl font-bold text-center text-black mb-3">
        Create New City
      </h2>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Citys Name</label>
        <input
          type="text"
          placeholder="Enter city name"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
        {errors.nome && <p className="text-red-600 text-sm">{errors.nome}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Population</label>
        <input
          type="number"
          placeholder="Enter population"
          value={formData.populacao}
          onChange={(e) => setFormData({ ...formData, populacao: Number(e.target.value) })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
        {errors.populacao && <p className="text-red-600 text-sm">{errors.populacao}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Latitude</label>
        <input
          type="number"
          placeholder="Enter latitude"
          value={formData.latitude}
          onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Longitude</label>
        <input
          type="number"
          placeholder="Enter longitude"
          value={formData.longitude}
          onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Country</label>
        <select
          value={formData.id_pais}
          onChange={(e) => setFormData({ ...formData, id_pais: Number(e.target.value) })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        >
          <option value={0}>Select a country</option>
          {paises.map((pais) => (
            <option key={pais.id} value={pais.id}>{pais.nome}</option>
          ))}
        </select>
        {errors.id_pais && <p className="text-red-600 text-sm">{errors.id_pais}</p>}
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
        {isSubmitting ? "Creating..." : "Create City"}
      </button>
    </form>
  );
}
