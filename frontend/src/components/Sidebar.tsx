import Hamburger from "hamburger-react";
import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import logo from "../assets/logo.png";

interface SideBarProps {
  children?: ReactNode;
}

export default function SidebarLayout({ children }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-black text-white w-64 p-4 fixed top-0 left-0 h-screen transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative flex flex-col justify-between`}
      >
        <div>
          <center>
            <a href="/">
                TerraLink
              <img src={logo} alt="Project Logo" className="w-20 h-auto rounded-2xl" />
            </a>
          </center>
          <nav>
            <ul className="pt-4 space-y-2">
              <a href="/">
                <li className="p-2 hover:bg-gray-800 rounded">Home</li>
              </a>
              <a href="/continent">
                <li className="p-2 hover:bg-gray-800 rounded">Continent</li>
              </a>
              <a href="/country">
                <li className="p-2 hover:bg-gray-800 rounded">Countries</li>
              </a>
              <a href="/city">
                <li className="p-2 hover:bg-gray-800 rounded">Cities</li>
              </a>
              <a href="/register">
                <li className="p-2 hover:bg-gray-800 rounded">Register</li>
              </a>
            </ul>
          </nav>
        </div>

        <div className="mt-4 text-center text-sm opacity-80">
          <p>© 2025 - TerraLink</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Navbar */}
        <div className="bg-gray-950 frontend/public/logo.png text-white p-4 shadow-md flex justify-between items-center md:hidden">
              <img src={logo} alt="Project Logo" className="w-20 h-auto rounded-2xl" />
          <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
            <Hamburger toggled={isOpen} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-0 bg-gray-100 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}