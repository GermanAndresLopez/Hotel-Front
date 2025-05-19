import Header from "../components/header"
import Hero from "./sections/hero"
import Features from "./sections/features"
import Rooms from "./sections/rooms"
import Amenities from "./sections/amenities"
import Testimonials from "./sections/testimonials"
import BookingCTA from "./sections/booking-cta"
import Contact from "./sections/contact"
import Footer from "../components/footer"

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/*<Header />*/}
      <main className="flex-grow">
        <Hero />
        <Features />
        <Rooms />
        <Amenities />
        <Testimonials />
        <BookingCTA />
        <Contact />
      </main>
      {/*<Footer />*/}
    </div>
  )
}
