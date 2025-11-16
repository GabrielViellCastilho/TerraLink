import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Continent from "./pages/Continent";
import Register from "./pages/Register";
import Country from "./pages/Country";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/continent" element={<Continent />} />

        <Route path="/country" element={<Country />} />


        <Route path="/register" element={<Register/>}/>

        
        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
