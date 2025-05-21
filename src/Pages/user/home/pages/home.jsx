import Header from '../components/header';
import Hero from './sections/hero';
import Features from './sections/features';
import Rooms from './sections/rooms';
import Amenities from './sections/amenities';
import Testimonials from './sections/testimonials';
import BookingCTA from './sections/booking-cta';
import Contact from './sections/contact';

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Rooms />
        <Amenities />
        <Testimonials />
        <BookingCTA />
        <Contact />
      </main>
    </div>
  );
};
