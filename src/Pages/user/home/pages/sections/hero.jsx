import React from "react"
import { Button } from "../../components/ui/button"
import image from "../../../../../assets/images/HotelWal.jpg"

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden" id="inicio">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Luxury Hotel"
          className="object-cover w-full h-full absolute inset-0"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4! flex flex-col justify-center items-start">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4! text-white">
            <span className="text-purple-400">Lujo</span> y Elegancia en Cada Detalle
          </h1>
          <p className="text-lg md:text-xl mb-8! text-gray-300">
            Disfruta de una estancia inolvidable en nuestro exclusivo hotel con vistas impresionantes y servicios de
            primera clase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
              Reservar Ahora
            </Button>
            <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500/20 cursor-pointer">
              Explorar Habitaciones
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-purple-400">Descubre Más</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-400"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
