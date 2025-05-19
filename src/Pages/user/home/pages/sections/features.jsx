import { Bed, Coffee, Wifi, Utensils } from "lucide-react"

export default function Features() {
  return (
    <section className="!py-16 bg-background">
      <div className="container !mx-auto !px-4">
        <div className="text-center !mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-600 !mb-4">Por Qué Elegirnos</h2>
          <p className="text-foreground/70 max-w-2xl !mx-auto">
            Ofrecemos una experiencia única con servicios exclusivos para hacer de tu estancia un momento inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-8">
          {/* Feature 1 */}
          <div className="bg-secondary !p-6 rounded-lg border border-border hover:border-purple-500/50 transition-colors flex flex-col items-center text-center shadow-sm dark:shadow-none">
            <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mb-4">
              <Bed className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold !mb-2">Habitaciones de Lujo</h3>
            <p className="text-foreground/70">
              Espaciosas habitaciones con diseño elegante y todas las comodidades para tu descanso.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-secondary !p-6 rounded-lg border border-border hover:border-purple-500/50 transition-colors flex flex-col items-center text-center shadow-sm dark:shadow-none">
            <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mb-4">
              <Utensils className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold !mb-2">Restaurante Gourmet</h3>
            <p className="text-foreground/70">
              Disfruta de nuestra exquisita gastronomía con platos preparados por chefs de renombre.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-secondary !p-6 rounded-lg border border-border hover:border-purple-500/50 transition-colors flex flex-col items-center text-center shadow-sm dark:shadow-none">
            <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mb-4">
              <Wifi className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wi-Fi de Alta Velocidad</h3>
            <p className="text-foreground/70">
              Conexión gratuita de alta velocidad en todas las áreas del hotel para tu comodidad.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-secondary !p-6 rounded-lg border border-border hover:border-purple-500/50 transition-colors flex flex-col items-center text-center shadow-sm dark:shadow-none">
            <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mb-4">
              <Coffee className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Desayuno Incluido</h3>
            <p className="text-foreground/70">
              Comienza tu día con un delicioso desayuno buffet con opciones para todos los gustos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
