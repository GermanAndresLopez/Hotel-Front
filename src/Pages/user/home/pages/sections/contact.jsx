"use client"

import React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert("Mensaje enviado. En un sistema real, esto enviaría tu mensaje al hotel.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section id="contacto" className="!py-16 bg-background">
      <div className="container !mx-auto !px-4">
        <div className="text-center !mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-400 !mb-4">Contáctanos</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Estamos aquí para responder tus preguntas y ayudarte a planificar tu estancia perfecta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 !gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-black/50 !p-8 rounded-xl border-gray-100  shadow-none">
            <h3 className="text-2xl font-bold !mb-6">Envíanos un Mensaje</h3>

            <form onSubmit={handleSubmit} className="!space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="!space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className="bg-background/50 border-border"
                  />
                </div>

                <div className="!space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className="bg-background/50 border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="!space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+123 456 7890"
                    className="bg-background/50 border-border"
                  />
                </div>

                <div className="!space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Asunto de tu mensaje"
                    required
                    className="bg-background/50 border-border"
                  />
                </div>
              </div>

              <div className="!space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="¿Cómo podemos ayudarte?"
                  rows={5}
                  required
                  className="bg-background/50 border-border resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4 !mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>

          {/* Map and Contact Info */}
          <div className="!space-y-8">
            {/* Map */}
            <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-sm dark:shadow-none">
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.723923098516!2d-73.25163228573587!3d10.47424499251745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8a2e6d5f835d85%3A0xb73b4c9fa1cb3f3!2sValledupar%2C%20Cesar%2C%20Colombia!5e0!3m2!1ses!2sco!4v1716133123000!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>

            </div>

            {/* Contact Info */}
            <div className="bg-black/50 !p-8 rounded-xl border-gray-100 shadow-sm dark:shadow-none">
              <h3 className="text-2xl font-bold !mb-6">Información de Contacto</h3>

              <div className="!space-y-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mr-4">
                    <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Dirección</h4>
                    <p className="text-foreground/70">Av. Principal 123, Ciudad, País</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mr-4">
                    <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Teléfono</h4>
                    <p className="text-foreground/70">+123 456 7890</p>
                    <p className="text-foreground/70">+123 456 7891</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/50 !p-3 rounded-full !mr-4">
                    <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Email</h4>
                    <p className="text-foreground/70">info@luxuryhotel.com</p>
                    <p className="text-foreground/70">reservas@luxuryhotel.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
