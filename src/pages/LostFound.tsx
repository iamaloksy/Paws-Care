
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Info, ArrowRight, MapPin, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type PetStatus = "lost" | "found";

interface Pet {
  id: string;
  name: string;
  status: PetStatus;
  breed: string;
  color: string;
  lastSeen: string;
  location: string;
  date: string;
  description: string;
  contact: string;
  image: string;
}

// Sample data for lost and found pets
const petsData: Pet[] = [
  {
    id: "1",
    name: "Rex",
    status: "lost",
    breed: "German Shepherd",
    color: "Black and Tan",
    lastSeen: "Central Park",
    location: "New York, NY",
    date: "June 15, 2023",
    description: "Rex is a friendly German Shepherd with a red collar. He went missing near Central Park and responds to his name.",
    contact: "john@example.com",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Unknown",
    status: "found",
    breed: "Labrador Mix",
    color: "Golden",
    lastSeen: "Lincoln Park",
    location: "Chicago, IL",
    date: "June 18, 2023",
    description: "Found a friendly Labrador mix in Lincoln Park. No collar but appears well-cared for. Currently at Chicago Animal Shelter.",
    contact: "chicago_shelter@example.com",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Bella",
    status: "lost",
    breed: "Poodle",
    color: "White",
    lastSeen: "Mission District",
    location: "San Francisco, CA",
    date: "June 20, 2023",
    description: "Bella is a small white poodle with a pink collar. She got scared during fireworks and ran away from home.",
    contact: "maria@example.com",
    image: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Unknown",
    status: "found",
    breed: "Beagle",
    color: "Tri-color",
    lastSeen: "Memorial Park",
    location: "Houston, TX",
    date: "June 22, 2023",
    description: "Found a male beagle wandering in Memorial Park. Has a blue collar but no tags. Very friendly and good with people.",
    contact: "houston_rescue@example.com",
    image: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "Max",
    status: "lost",
    breed: "Border Collie",
    color: "Black and White",
    lastSeen: "Piedmont Park",
    location: "Atlanta, GA",
    date: "June 25, 2023",
    description: "Max is a 3-year-old Border Collie who escaped from our backyard. He has a microchip and a green collar.",
    contact: "david@example.com",
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Unknown",
    status: "found",
    breed: "Shih Tzu",
    color: "Brown and White",
    lastSeen: "Balboa Park",
    location: "San Diego, CA",
    date: "June 28, 2023",
    description: "Found a Shih Tzu near Balboa Park. The dog appears to be well-groomed and is very friendly. No collar or visible identification.",
    contact: "sandiego_rescue@example.com",
    image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const LostFound = () => {
  const [activeTab, setActiveTab] = useState<PetStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter pets based on active tab and search term
  const filteredPets = petsData.filter((pet) => {
    // Filter by tab
    if (activeTab !== "all" && pet.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (
      searchTerm &&
      !pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !pet.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !pet.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });
  
  const PetCard = ({ pet }: { pet: Pet }) => {
    const [showDetails, setShowDetails] = useState(false);
    
    return (
      <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="relative h-52">
          <img
            src={pet.image}
            alt={pet.name !== "Unknown" ? pet.name : `${pet.status.toUpperCase()} ${pet.breed}`}
            className="h-full w-full object-cover"
          />
          <div
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-white",
              pet.status === "lost" ? "bg-destructive" : "bg-emerald-500"
            )}
          >
            {pet.status}
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-white"
            aria-label="Toggle details"
          >
            <Info size={16} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="font-serif text-lg font-medium">
              {pet.name !== "Unknown" ? pet.name : `${pet.status === "lost" ? "Lost" : "Found"} ${pet.breed}`}
            </h3>
            <span className="text-sm text-muted-foreground">{pet.breed}</span>
          </div>
          
          <div className="mb-3 space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="flex-shrink-0" />
              <span>{pet.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={14} className="flex-shrink-0" />
              <span>{pet.date}</span>
            </div>
          </div>
          
          {showDetails && (
            <div className="mt-4 space-y-3 rounded-lg bg-pawscare-50 p-3">
              <p className="text-sm text-muted-foreground">{pet.description}</p>
              <div className="pt-2">
                <a
                  href={`mailto:${pet.contact}`}
                  className="text-sm font-medium text-pawscare-500 hover:text-pawscare-600"
                >
                  Contact: {pet.contact}
                </a>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex w-full items-center justify-center gap-1 rounded-full border border-pawscare-100 bg-white px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-pawscare-50"
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <Navbar />
      <main className="pb-16 pt-32">
        <div className="container">
          <header className="mb-10 text-center">
            <h1 className="font-serif text-3xl font-medium md:text-4xl">
              Lost & Found Dogs
            </h1>
            <p className="mt-2 text-muted-foreground">
              Help reunite lost pets with their owners or find the owners of dogs you've found.
            </p>
          </header>
          
          <div className="mx-auto mb-6 flex justify-center gap-2 rounded-full bg-muted p-1 md:w-fit">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeTab === "all"
                  ? "bg-white shadow-sm"
                  : "text-muted-foreground hover:bg-white/50"
              )}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("lost")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeTab === "lost"
                  ? "bg-white shadow-sm"
                  : "text-muted-foreground hover:bg-white/50"
              )}
            >
              Lost Pets
            </button>
            <button
              onClick={() => setActiveTab("found")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeTab === "found"
                  ? "bg-white shadow-sm"
                  : "text-muted-foreground hover:bg-white/50"
              )}
            >
              Found Pets
            </button>
          </div>
          
          <div className="mx-auto mb-10 md:max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by breed, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-0 bg-white px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-pawscare-500"
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
            
            {filteredPets.length === 0 && (
              <div className="col-span-full rounded-xl bg-muted p-8 text-center">
                <h3 className="font-serif text-lg font-medium">No Matches Found</h3>
                <p className="mt-2 text-muted-foreground">
                  No {activeTab !== "all" ? activeTab : ""} pets matching your search criteria.
                  Try adjusting your search.
                </p>
              </div>
            )}
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-pawscare-50 p-6">
              <h2 className="font-serif text-xl font-medium">Lost Your Dog?</h2>
              <p className="mt-2 text-muted-foreground">
                If your dog has gone missing, report it here. Provide detailed information
                and a clear photo to increase the chances of finding them.
              </p>
              <Link
                to="/report-lost"
                className="group mt-4 inline-flex items-center gap-2 rounded-full bg-pawscare-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-pawscare-600"
              >
                Report a Lost Dog
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
            
            <div className="rounded-xl bg-secondary p-6">
              <h2 className="font-serif text-xl font-medium">Found a Dog?</h2>
              <p className="mt-2 text-muted-foreground">
                If you've found a dog that appears to be lost, report it here. Your report
                could help reunite a pet with their worried owner.
              </p>
              <Link
                to="/report-found"
                className="group mt-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-5 py-2 text-sm font-medium text-foreground transition-all hover:bg-pawscare-50"
              >
                Report a Found Dog
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
          
          <div className="mt-12 rounded-xl bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-pawscare-100 p-3 text-pawscare-500">
                <Plus size={24} />
              </div>
              <div>
                <h2 className="font-serif text-xl font-medium">Tips for Finding a Lost Dog</h2>
                <ul className="mt-4 space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-medium text-pawscare-500">•</span>
                    Search your immediate neighborhood, especially during early morning or evening.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-medium text-pawscare-500">•</span>
                    Create "lost dog" flyers with a clear photo and your contact information.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-medium text-pawscare-500">•</span>
                    Contact local animal shelters, veterinarians, and animal control offices.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-medium text-pawscare-500">•</span>
                    Post on neighborhood apps and social media groups.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-medium text-pawscare-500">•</span>
                    Leave a familiar scented item (like your clothing) and some food at the location 
                    where the dog was last seen.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LostFound;
