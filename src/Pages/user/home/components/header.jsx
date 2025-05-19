import { useState } from "react";
import { Menu, X, User } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container !mx-auto !px-4 !py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              HOTEL
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex !space-x-8">
              {["Inicio", "Habitaciones", "Servicios", "Testimonios", "Contacto"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center !space-x-4">
            <button className="text-foreground">🌗</button> {/* ThemeToggle Placeholder */}
            <button
              className="border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 !py-1 !px-3 rounded"
            >
              <User size={16} className="inline !mr-2" />
              Iniciar Sesión
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white !py-1 !px-3 rounded">
              Reservar Ahora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center !space-x-2 md:hidden">
            <button className="text-foreground">🌗</button> {/* ThemeToggle Placeholder */}
            <button className="text-foreground" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden !mt-4 !pb-4">
            <ul className="flex flex-col !space-y-4">
              {["Inicio", "Habitaciones", "Servicios", "Testimonios", "Contacto"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block text-foreground/80 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="!pt-2 flex flex-col !space-y-2">
                <button
                  className="border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 !py-1 !px-3 rounded w-full"
                >
                  <User size={16} className="inline mr-2" />
                  Iniciar Sesión
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white !py-1 !px-3 rounded w-full">
                  Reservar Ahora
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
