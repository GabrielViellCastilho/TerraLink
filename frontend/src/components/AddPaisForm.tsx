import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCountryData } from "../api/externalAPI/worldBank";
import { createPais } from "../api/internalAPI/pais";
import { getOrCreateContinentId } from "../api/internalAPI/continente";

export type CreatePaisDTO = {
  nome: string;
  populacao: number;
  idioma_oficial: string;
  moeda: string;
  id_continente: number;
  url_bandeira?: string;
  pib_per_capita?: number;
  inflacao?: number;
};

export default function CreatePaisForm() {
  const [loadingCountry, setLoadingCountry] = useState(false);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [flagPreview, setFlagPreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { register, handleSubmit, setValue, watch, reset } = useForm<CreatePaisDTO & { continente_nome?: string }>();

  const nomePais = watch("nome");

  // Buscar dados do país
  const fetchCountryData = async (nome: string) => {
    if (!nome) return;

    setLoadingCountry(true);
    setCountryError(null);

    try {
      const data = await getCountryData(nome);

      if (!data) {
        setCountryError("Country not found");
        setFlagPreview(null);
        return;
      }

      setValue("nome", data.name ?? "");
      setValue("populacao", data.population ?? 0);
      setValue("idioma_oficial", data.language ?? "");
      setValue("moeda", data.currencySymbol ?? "");
      setValue("continente_nome", data.subregion ?? "");
      setValue("url_bandeira", data.flagUrl ?? "");
      setValue("pib_per_capita", data.gdpPerCapita ?? undefined);
      setValue("inflacao", data.inflation ?? undefined);

      if (data.flagUrl) setFlagPreview(data.flagUrl);
    } catch (err) {
      console.error(err);
      setCountryError("Failed to fetch country data");
      setFlagPreview(null);
    } finally {
      setLoadingCountry(false);
    }
  };

  // Validação manual
  const validate = (data: CreatePaisDTO & { continente_nome?: string }) => {
    const errors: Record<string, string> = {};
    if (!data.nome) errors.nome = "O nome do país é obrigatório";
    if (!data.populacao || data.populacao <= 0) errors.populacao = "A população deve ser um número positivo";
    if (!data.idioma_oficial) errors.idioma_oficial = "O idioma oficial é obrigatório";
    if (!data.moeda) errors.moeda = "A moeda é obrigatória";
    if (!data.continente_nome) errors.id_continente = "O continente é obrigatório";
    return errors;
  };

  // Submissão do formulário
  const onSubmit = async (data: CreatePaisDTO & { continente_nome?: string }) => {
    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const continentId = await getOrCreateContinentId(data.continente_nome || "");

      const dto: CreatePaisDTO = {
        nome: data.nome,
        populacao: data.populacao,
        idioma_oficial: data.idioma_oficial,
        moeda: data.moeda,
        id_continente: continentId,
        url_bandeira: data.url_bandeira || undefined,
        pib_per_capita: data.pib_per_capita || undefined,
        inflacao: data.inflacao || undefined,
      };

      await createPais(dto);

      alert("Country created successfully!");
      reset();
      setFlagPreview(null);
      setFormErrors({});
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Failed to create country.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-6 bg-white border border-gray-300 rounded-2xl shadow-md w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-bold text-center text-black mb-3">Create New Country</h2>

      {/* Country Name */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Country Name</label>
        <div className="flex flex-wrap gap-2">
          <input
            {...register("nome")}
            className="flex-1 min-w-[150px] p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
            placeholder="Enter country name"
          />
          <button
            type="button"
            onClick={() => fetchCountryData(nomePais)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-shrink-0"
            disabled={loadingCountry}
          >
            {loadingCountry ? "Loading..." : "Fetch"}
          </button>
        </div>
        {(countryError || formErrors.nome) && (
          <p className="text-red-600 text-sm">{countryError || formErrors.nome}</p>
        )}
      </div>

      {/* Flag Preview */}
      {flagPreview && (
        <div className="flex justify-center">
          <img src={flagPreview} alt="Country Flag" className="w-24 h-16 object-cover border rounded" />
        </div>
      )}

      {/* Official Language */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Official Language</label>
        <input
          {...register("idioma_oficial")}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
        {formErrors.idioma_oficial && <p className="text-red-600 text-sm">{formErrors.idioma_oficial}</p>}
      </div>

      {/* Currency */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Currency</label>
        <input
          {...register("moeda")}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
        {formErrors.moeda && <p className="text-red-600 text-sm">{formErrors.moeda}</p>}
      </div>

      {/* Population */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Population</label>
        <input
          type="number"
          {...register("populacao", { valueAsNumber: true })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
        {formErrors.populacao && <p className="text-red-600 text-sm">{formErrors.populacao}</p>}
      </div>

      {/* GDP per Capita */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">GDP per Capita</label>
        <input
          type="number"
          step="0.01"
          {...register("pib_per_capita", { valueAsNumber: true })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
      </div>

      {/* Inflation */}
      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-sm text-black">Inflation (%)</label>
        <input
          type="number"
          step="0.01"
          {...register("inflacao", { valueAsNumber: true })}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 text-center bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-900 active:scale-[0.98] transition"
      >
        Create
      </button>
    </form>
  );
}
