import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import hbtDeluxe from "../../../../../assets/images/Habitacion-1/h-1.jpg"
import hbtEjecutiva from "../../../../../assets/images/Habitacion-2/h-1.jpg"
import hbtPresidencial from "../../../../../assets/images/Habitacion-3/h-1.jpg"

const rooms = [
  {
    id: 1,
    name: "Habitación Deluxe",
    description: "Espaciosa habitación con vistas panorámicas, cama king-size y baño de lujo.",
    price: 199,
    rating: 4.8,
    image: hbtDeluxe,
    features: ["Cama King-size", "Vista panorámica", "Baño de mármol", "Minibar premium"],
  },
  {
    id: 2,
    name: "Suite Ejecutiva",
    description: "Suite elegante con sala de estar separada, perfecta para viajes de negocios o placer.",
    price: 299,
    rating: 4.9,
    image: hbtEjecutiva,
    features: ["Sala de estar separada", "Escritorio de trabajo", "Bañera de hidromasaje", "Servicio de mayordomo"],
  },
  {
    id: 3,
    name: "Suite Presidencial",
    description: "Nuestra suite más exclusiva con vistas impresionantes, jacuzzi privado y servicios VIP.",
    price: 499,
    rating: 5.0,
    image: hbtPresidencial,
    features: ["Terraza privada", "Jacuzzi", "Comedor privado", "Servicios VIP"],
  },
];

export default function Rooms() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const currentRoom = rooms[currentIndex];

  return (
    <section className="!py-16 bg-purple-90/10 " id="habitaciones">
      <div className="container !mx-auto !px-4">
        <div className="text-center !mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 !mb-4">
            Nuestras Habitaciones
          </h2>
          <p className="text-foreground/70 max-w-2xl !mx-auto">
            Descubre nuestras lujosas habitaciones y suites diseñadas para ofrecerte el máximo confort y elegancia.
          </p>
        </div>

        <div className="relative max-w-5xl !mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 !gap-8 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-md">
              <img
                src={currentRoom.image}
                alt={currentRoom.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />

              <div className="absolute inset-0 flex items-center justify-between !p-4">
                <button
                  onClick={prevSlide}
                  className="bg-black/50 hover:bg-black/70 text-white !p-2 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-black/50 hover:bg-black/70 text-white !p-2 rounded-full transition-colors cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center !space-x-2">
                {rooms.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-purple-500" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-purple-900/50 !p-8 rounded-xl border-gray-200  shadow-none">
              <div className="flex justify-between items-start !mb-4">
                <h3 className="text-2xl font-bold  text-purple-400">{currentRoom.name}</h3>
                <div className="flex items-center  bg-purple-900/50 !px-3 !py-1 rounded-full">
                  <Star size={16} className=" text-purple-400 !mr-1" />
                  <span>{currentRoom.rating}</span>
                </div>
              </div>

              <div className="!mb-4">
                <span className="text-2xl font-bold">${currentRoom.price}</span>
                <span className="text-foreground/70 text-sm"> / noche</span>
              </div>

              <p className="text-foreground/80 !mb-6">{currentRoom.description}</p>

              <div className="!mb-6">
                <h4 className="text-lg font-semibold !mb-3">Características</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 !gap-2">
                  {currentRoom.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-foreground/80">
                      <svg
                        className="h-4 w-4  text-purple-400 !mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white !py-2 rounded-lg">
                Reservar Esta Habitación
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
