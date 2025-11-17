import { useEffect, useState } from "react";
import { Building2, Globe, Map, UserPlus } from "lucide-react";
import { CardsGrid } from "../components/Card";
import Sidebar from "../components/Sidebar";
import { BarChart } from "../components/BarChart";

import { 
  getPaisCount, 
  getTop5PibPerCapita, 
  getTop5Inflacao,
  getTotalWorldPopulation
} from "../api/internalAPI/pais";

import { getContinenteCount } from "../api/internalAPI/continente";
import { getCidadeCount } from "../api/internalAPI/cidade";

export default function Home() {
  const [paisCount, setPaisCount] = useState(0);
  const [continenteCount, setContinenteCount] = useState(0);
  const [cidadeCount, setCidadeCount] = useState(0);
  const [worldPopulation, setWorldPopulation] = useState(0);

  const [topPib, setTopPib] = useState([]);
  const [topInflacao, setTopInflacao] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setPaisCount(await getPaisCount());
        setContinenteCount(await getContinenteCount());
        setCidadeCount(await getCidadeCount());
        setWorldPopulation(await getTotalWorldPopulation());

        setTopPib(await getTop5PibPerCapita());
        setTopInflacao(await getTop5Inflacao());

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar>
        <main className="ml-8 md:ml-16 mr-8 md:mr-64">
          <h1 className="text-3xl font-bold mt-4">Dashboard TerraLink</h1>

          <CardsGrid
            cards={[
              {
                title: "Countries",
                value: paisCount,
                icon: <Globe size={24} />,
              },
              {
                title: "Continents",
                value: continenteCount,
                icon: <Map size={24} />,
              },
              {
                title: "Cities",
                value: cidadeCount,
                icon: <Building2 size={24} />,
              },
              {
                title: "World Population",
                value: worldPopulation.toLocaleString("en-US"),
                icon: <UserPlus size={24} />,
              },
            ]}
          />
        </main>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <BarChart
            title="Top 5 Countries - GDP per Capita"
            data={topPib.map((p: any) => ({
              name: p.nome,
              value: p.pib_per_capita
            }))}
          />

          <BarChart
            title="Top 5 Countries - Inflation Rate"
            data={topInflacao.map((p: any) => ({
              name: p.nome,
              value: p.inflacao
            }))}
          />
        </div>
        
      </Sidebar>
    </div>
  );
}
