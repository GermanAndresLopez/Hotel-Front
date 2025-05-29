import { Button } from "../../components/ui/button"

export default function BookingCTA() {
  return (
    <section className="!py-16 bg-purple-900/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 to-transparent"></div>
      </div>

      <div className="container  !mx-auto !px-4 relative">
        <div className="max-w-3xl !mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Reserva Tu Experiencia de <span className=" text-purple-400">Lujo</span>
          </h2>
          <p className="text-foreground/80 !mb-8 text-lg">
            Disfruta de tarifas exclusivas, beneficios especiales y la mejor experiencia reservando directamente con
            nosotros.
          </p>

          <div className="bg-purple-800/10 !p-8 rounded-xl border-purple-900/50 !mb-8 shadow-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 !mb-6">
              <div className="text-center !p-4 bg-purple-950/50 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 !mb-2">Habitación Deluxe</h3>
                <p className="text-2xl font-bold !mb-1">$199</p>
                <p className="text-sm text-foreground/70">por noche</p>
              </div>

              <div className="text-center !p-4 bg-purple-950/50 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 !mb-2">Suite Ejecutiva</h3>
                <p className="text-2xl font-bold mb-1">$299</p>
                <p className="text-sm text-foreground/70">por noche</p>
              </div>

              <div className="text-center !p-4 bg-purple-950/50 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 !mb-2">Suite Presidencial</h3>
                <p className="text-2xl font-bold !mb-1">$499</p>
                <p className="text-sm text-foreground/70">por noche</p>
              </div>
            </div>

            <ul className="flex flex-wrap justify-center !gap-x-8 !gap-y-2 !mb-8 text-foreground/80">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-purple-400 !mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Desayuno incluido
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-purple-400 !mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cancelación gratuita
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-purple-400 !mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Wi-Fi gratis
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-purple-400 !mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Acceso al spa
              </li>
            </ul>

            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg !px-8 cursor-pointer">
              Reservar Ahora
            </Button>
          </div>

          <p className="text-foreground/70 text-sm">
            ¿Necesitas ayuda con tu reserva? Llámanos al{" "}
            <span className="text-purple-600 dark:text-purple-400">+123 456 7890</span> o escríbenos a{" "}
            <span className="text-purple-600 dark:text-purple-400">reservas@luxuryhotel.com</span>
          </p>
        </div>
      </div>
    </section>
  )
}
