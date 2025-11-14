import { Building2, Globe, Map, UserPlus } from "lucide-react";
import { CardsGrid } from "../components/Card";
import Sidebar from "../components/Sidebar";
import { BarChart } from "../components/BarChart";


export default function Home() {
  return (
    <div>
      <Sidebar>
              <main className="ml-8 md:ml-16 mr-8 md:mr-64">
          <h1 className="text-3xl font-bold mt-4">Dashboard TerraLink</h1>
            <CardsGrid
                  cards={[
                    {
                      title: "Countries",
                      value: 195,
                      icon: <Globe size={24} />,
                    },
                    {
                      title: "Continents",
                      value: 7,
                      icon: <Map size={24} />,
                    },
                    {
                      title: "Cities",
                      value: 1280,
                      icon: <Building2 size={24} />,
                    },
                    {
                      title: "New Registrations",
                      value: 42,
                      icon: <UserPlus size={24} />,
                    },
                  ]}
                />
          </main>

          <BarChart
            title="Most Populated Countries"
            data={[
                { name: "China", value: 1412000000 },
                { name: "India", value: 1393000000 },
                { name: "USA", value: 331000000 },
                { name: "Brazil", value: 213000000 },
                { name: "Indonesia", value: 276000000 },
              ]} 
          />

      </Sidebar>
    </div>
  );
}

