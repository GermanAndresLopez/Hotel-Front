const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Viajera Frecuente",
    image: "/placeholder.svg",
    quote:
      "Una experiencia increíble. Las habitaciones son espectaculares y el servicio es impecable. Definitivamente volveré en mi próxima visita.",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Empresario",
    image: "/placeholder.svg",
    quote:
      "Perfecto para viajes de negocios. El personal es muy atento y las instalaciones son de primera clase. Lo recomiendo ampliamente.",
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Influencer de Viajes",
    image: "/placeholder.svg",
    quote:
      "Uno de los mejores hoteles en los que me he hospedado. La atención al detalle es excepcional y las vistas son impresionantes.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-purple-100/50 dark:bg-purple-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600 dark:text-purple-400">
            Lo Que Dicen Nuestros Huéspedes
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Descubre las experiencias de quienes ya han disfrutado de nuestro hotel y servicios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-secondary/50 p-6 rounded-lg border border-purple-200 dark:border-purple-900/50 shadow-sm dark:shadow-none"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-purple-500">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="italic mb-4 text-foreground/80">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
