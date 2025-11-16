import CreateContinenteForm from "../components/AddContinentForm";
import Sidebar from "../components/Sidebar";


export default function Register() {

  return (
    <div>
        <Sidebar>
        <main className="ml-8 md:ml-16 mr-8 md:mr-64">

            <h1 className="text-3xl font-bold mt-4">Register</h1>

                <div className="p-6">
                    <CreateContinenteForm/>
                </div>

        </main>
        </Sidebar>
    </div>
  );
}
