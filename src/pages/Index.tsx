
import Hero from "@/components/home/Hero";
import FeaturedDogs from "@/components/home/FeaturedDogs";
import { Link } from "react-router-dom";
import { ArrowRight, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedDogs />
        
        {/* How It Works Section */}
        <section className="section-padding bg-pawscare-50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                How PawsCare Works
              </h2>
              <p className="mt-3 text-muted-foreground">
                We make the adoption process simple and straightforward so you can focus on 
                finding your perfect companion.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pawscare-100">
                  <MapPin className="h-8 w-8 text-pawscare-500" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Browse Dogs</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore our database of dogs available for adoption, filter by breed, age, 
                  and other criteria to find your match.
                </p>
              </div>
              
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pawscare-100">
                  <HeartHandshake className="h-8 w-8 text-pawscare-500" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Meet & Greet</h3>
                <p className="mt-2 text-muted-foreground">
                  Schedule a meeting with the dog you're interested in adopting, get to know 
                  their personality and see if you're a good match.
                </p>
              </div>
              
              <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pawscare-100">
                  <ShieldCheck className="h-8 w-8 text-pawscare-500" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium">Adoption Process</h3>
                <p className="mt-2 text-muted-foreground">
                  Complete the adoption application, go through a home check, and finalize the
                  adoption. We'll guide you every step of the way.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link
                to="/adopt"
                className="group inline-flex items-center gap-2 rounded-full bg-pawscare-500 px-6 py-3 font-medium text-white transition-all hover:bg-pawscare-600"
              >
                Start Your Adoption Journey
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Success Stories Preview */}
        <section className="section-padding">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                Success Stories
              </h2>
              <p className="mt-3 text-muted-foreground">
                Heartwarming tales from families who've found their perfect companions through PawsCare.
              </p>
            </div>
            
            <div className="mt-12">
              <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-pawscare-50 to-pawscare-100">
                <div className="grid md:grid-cols-2">
                  <div className="order-2 p-6 md:order-1 md:p-12">
                    <h3 className="font-serif text-2xl font-medium">
                      Max Found His Forever Family
                    </h3>
                    <p className="mt-4 text-muted-foreground">
                      "After losing our previous dog, we weren't sure if we were ready for another. 
                      But when we met Max at PawsCare, it was love at first sight. He's brought so much 
                      joy and energy into our lives. The adoption process was smooth, and the staff 
                      was incredibly helpful. Max is now an irreplaceable member of our family."
                    </p>
                    <p className="mt-4 font-medium">- The Johnson Family</p>
                    <Link
                      to="/success-stories"
                      className="group mt-6 flex items-center gap-2 text-pawscare-500 transition-all hover:text-pawscare-600"
                    >
                      Read more stories
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                  <div className="order-1 md:order-2">
                    <img
                      src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Max and his new family"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-pawscare-500 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-medium md:text-4xl">
                Ready to Make a Difference?
              </h2>
              <p className="mt-4 text-white/90">
                Whether you're looking to adopt, report a stray, or contribute to our mission, 
                your involvement helps us save more dogs in need.
              </p>
              
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/adopt"
                  className="w-full rounded-full bg-white px-6 py-3 font-medium text-pawscare-500 transition-all hover:bg-pawscare-50 sm:w-auto"
                >
                  Find a Dog
                </Link>
                <Link
                  to="/report-stray"
                  className="w-full rounded-full border border-white/30 bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white/10 sm:w-auto"
                >
                  Report a Stray
                </Link>
                <Link
                  to="/contact"
                  className="w-full rounded-full border border-white/30 bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white/10 sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
