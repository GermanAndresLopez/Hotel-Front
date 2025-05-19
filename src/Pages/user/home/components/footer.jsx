import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-purple-900/30">
      <div className="container mx-auto !px-4 !py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold !mb-4 text-purple-400">LUXURY HOTEL</h3>
            <p className="text-gray-400 !mb-4">
              Ofrecemos una experiencia única de hospedaje con servicios de lujo y atención personalizada para hacer de
              tu estancia un momento inolvidable.
            </p>
            <div className="flex !space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold !mb-4 text-purple-400">Enlaces Rápidos</h3>
            <ul className="!space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <a href="#rooms" className="text-gray-400 hover:text-white transition-colors">
                  Habitaciones
                </a>
              </li>
              <li>
                <a href="#amenities" className="text-gray-400 hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-400 hover:text-white transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold !mb-4 text-purple-400">Contacto</h3>
            <ul className="!space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 !mr-2 !mt-0.5" />
                <span className="text-gray-400">Av. Principal 123, Ciudad, País</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 !mr-2" />
                <span className="text-gray-400">+123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 !mr-2" />
                <span className="text-gray-400">info@luxuryhotel.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold !mb-4 text-purple-400">Suscríbete</h3>
            <p className="text-gray-400 !mb-4">Recibe nuestras últimas ofertas y novedades directamente en tu correo.</p>
            <form className="!space-y-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full !px-4 !py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                required
              />
              <button
                type="submit"
                className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white !py-2 !px-4 rounded-md transition-colors"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 !mt-12 !pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Luxury Hotel. Todos los derechos reservados.</p>
          <div className="!mt-2 !space-x-4">
            <Link to="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
            <Link to="/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
