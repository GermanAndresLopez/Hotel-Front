"use client"

import React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Calendar } from "lucide-react"

export default function Booking() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [roomType, setRoomType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar la reserva
    alert("Formulario enviado. En un sistema real, esto procesaría tu reserva.")
  }

  return (
    <section id="booking" className="!py-16 bg-gray-50">
      <div className="container !mx-auto !px-4">
        <div className="text-center !mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 !mb-4">Reserva Tu Estancia</h2>
          <p className="text-gray-600 max-w-2xl !mx-auto">
            Reserva directamente con nosotros para obtener las mejores tarifas y beneficios exclusivos.
          </p>
        </div>

        <div className="max-w-4xl !mx-auto bg-white rounded-lg shadow-lg !p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 !gap-6">
            <div className="!space-y-2">
              <Label htmlFor="check-in">Fecha de Llegada</Label>
              <div className="relative">
                <Input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="!pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="!space-y-2">
              <Label htmlFor="check-out">Fecha de Salida</Label>
              <div className="relative">
                <Input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="!pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="!space-y-2">
              <Label htmlFor="adults">Adultos</Label>
              <select
                id="adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background !px-3 !py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="!space-y-2">
              <Label htmlFor="children">Niños</Label>
              <select
                id="children"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background !px-3 !py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="!space-y-2 md:col-span-2">
              <Label htmlFor="room-type">Tipo de Habitación</Label>
              <select
                id="room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background !px-3 !py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>
                  Selecciona una habitación
                </option>
                <option value="deluxe">Habitación Deluxe</option>
                <option value="executive">Suite Ejecutiva</option>
                <option value="presidential">Suite Presidencial</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                Verificar Disponibilidad
              </Button>
            </div>
          </form>

          <div className="!mt-8 !pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-purple-800">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="font-medium">Teléfono:</p>
                <p>+123 456 7890</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p>reservas@luxuryhotel.com</p>
              </div>
              <div>
                <p className="font-medium">Dirección:</p>
                <p>Av. Principal 123, Ciudad</p>
              </div>
              <div>
                <p className="font-medium">Horario de Atención:</p>
                <p>24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
