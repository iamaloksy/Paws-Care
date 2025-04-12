
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-36">
      {/* Background elements */}
      <div className="absolute -top-24 left-0 right-0 z-0">
        <div className="h-64 w-full bg-gradient-to-b from-pawscare-50 to-transparent"></div>
      </div>
      <div className="absolute -right-32 top-0 z-0 h-72 w-72 rounded-full bg-pawscare-100 opacity-60 blur-3xl"></div>
      <div className="absolute -left-32 top-40 z-0 h-72 w-72 rounded-full bg-pawscare-200 opacity-60 blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="animate-fade-in font-serif text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Find Your Perfect <span className="text-pawscare-500">Furry</span> Companion
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-muted-foreground">
            Every dog deserves a loving home. Browse through our adoptable dogs and give a rescued 
            dog a second chance at happiness.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/adopt"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-pawscare-500 px-6 py-3 font-medium text-white transition-all hover:bg-pawscare-600 sm:w-auto"
            >
              Find Dogs to Adopt
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
            </Link>
            <Link
              to="/report-stray"
              className="w-full rounded-full border border-pawscare-200 bg-white px-6 py-3 font-medium text-foreground transition-all hover:bg-pawscare-50 sm:w-auto"
            >
              Report a Stray Dog
            </Link>
          </div>
        </div>
        
        <div className="mt-16 animate-slide-up">
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Happy dog being adopted"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white md:p-8">
              <p className="font-serif text-xl font-medium md:text-2xl">
                Over 500 dogs found their forever homes last year
              </p>
              <p className="mt-2 text-sm text-white/80 md:text-base">
                Join us in our mission to rescue and rehome dogs in need
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-20 bg-pawscare-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="animate-fade-in">
              <h3 className="font-serif text-3xl font-medium text-pawscare-500">500+</h3>
              <p className="mt-2 text-sm text-muted-foreground">Dogs Adopted</p>
            </div>
            <div className="animate-fade-in [animation-delay:200ms]">
              <h3 className="font-serif text-3xl font-medium text-pawscare-500">300+</h3>
              <p className="mt-2 text-sm text-muted-foreground">Rescues Complete</p>
            </div>
            <div className="animate-fade-in [animation-delay:400ms]">
              <h3 className="font-serif text-3xl font-medium text-pawscare-500">50+</h3>
              <p className="mt-2 text-sm text-muted-foreground">Volunteer Members</p>
            </div>
            <div className="animate-fade-in [animation-delay:600ms]">
              <h3 className="font-serif text-3xl font-medium text-pawscare-500">10+</h3>
              <p className="mt-2 text-sm text-muted-foreground">Partner Shelters</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
