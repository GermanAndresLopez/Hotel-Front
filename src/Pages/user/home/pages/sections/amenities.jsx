import { Dumbbell, Waves, Utensils, Car, SpadeIcon as Spa, WineIcon as WineGlass } from "lucide-react"

const amenities = [
  {
    icon: <Spa className="h-10 w-10 :text-purple-400" />,
    title: "Spa & Bienestar",
    description: "Relájate con nuestros tratamientos exclusivos y masajes rejuvenecedores.",
  },
  {
    icon: <Dumbbell className="h-10 w-10 text-purple-400" />,
    title: "Gimnasio Completo",
    description: "Mantén tu rutina de ejercicios con nuestro moderno gimnasio abierto 24/7.",
  },
  {
    icon: <Waves className="h-10 w-10 text-purple-400" />,
    title: "Piscina Infinita",
    description: "Disfruta de nuestra piscina con vistas panorámicas a la ciudad.",
  },
  {
    icon: <Utensils className="h-10 w-10 text-purple-400" />,
    title: "Restaurantes Gourmet",
    description: "Saborea la exquisita gastronomía en nuestros restaurantes de alta cocina.",
  },
  {
    icon: <Car className="h-10 w-10 text-purple-400" />,
    title: "Servicio de Transporte",
    description: "Traslados privados desde y hacia el aeropuerto y principales atracciones.",
  },
  {
    icon: <WineGlass className="h-10 w-10 text-purple-400" />,
    title: "Bar & Lounge",
    description: "Disfruta de cócteles exclusivos y una selección premium de vinos y licores.",
  },
]

export default function Amenities() {
  return (
    <section id="servicios" className="!py-16 bg-background">
      <div className="container !mx-auto !px-4">
        <div className="text-center !mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 !mb-4">
            Servicios & Comodidades
          </h2>
          <p className="text-foreground/70 max-w-2xl !mx-auto">
            Disfruta de nuestras instalaciones y servicios exclusivos diseñados para hacer tu estancia inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="!p-6 bg-secondary border border-border hover:border-purple-500/50 transition-colors rounded-lg shadow-sm dark:shadow-none"
            >
              <div className="flex flex-col items-center text-center">
                <div className="!mb-4 bg-purple-100 dark:bg-purple-900/50 !p-4 rounded-full">{amenity.icon}</div>
                <h3 className="text-xl font-semibold !mb-2">{amenity.title}</h3>
                <p className="text-foreground/70">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
