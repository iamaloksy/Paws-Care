
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DogCard from "@/components/ui/DogCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

// Sample data for dogs
const allDogs = [
  {
    id: "dog1",
    name: "Luna",
    breed: "Labrador Retriever",
    age: "2 years",
    size: "Large",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "San Francisco, CA",
  },
  {
    id: "dog2",
    name: "Max",
    breed: "German Shepherd",
    age: "3 years",
    size: "Large",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Los Angeles, CA",
  },
  {
    id: "dog3",
    name: "Daisy",
    breed: "Golden Retriever",
    age: "1 year",
    size: "Medium",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Portland, OR",
  },
  {
    id: "dog4",
    name: "Rocky",
    breed: "Siberian Husky",
    age: "4 years",
    size: "Large",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Seattle, WA",
  },
  {
    id: "dog5",
    name: "Bella",
    breed: "Beagle",
    age: "2 years",
    size: "Small",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Denver, CO",
  },
  {
    id: "dog6",
    name: "Charlie",
    breed: "French Bulldog",
    age: "1 year",
    size: "Small",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Chicago, IL",
  },
  {
    id: "dog7",
    name: "Lucy",
    breed: "Poodle",
    age: "5 years",
    size: "Medium",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "New York, NY",
  },
  {
    id: "dog8",
    name: "Cooper",
    breed: "Australian Shepherd",
    age: "2 years",
    size: "Medium",
    gender: "Male",
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Austin, TX",
  },
];

const breedOptions = ["All Breeds", "Labrador Retriever", "German Shepherd", "Golden Retriever", "Siberian Husky", "Beagle", "French Bulldog", "Poodle", "Australian Shepherd"];
const ageOptions = ["All Ages", "Puppy (< 1 year)", "Young (1-3 years)", "Adult (3-7 years)", "Senior (7+ years)"];
const sizeOptions = ["All Sizes", "Small", "Medium", "Large"];
const genderOptions = ["All Genders", "Male", "Female"];

const Adopt = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    breed: "All Breeds",
    age: "All Ages",
    size: "All Sizes",
    gender: "All Genders",
  });
  
  // Filter dogs based on search term and filters
  const filteredDogs = allDogs.filter((dog) => {
    // Search term filter
    if (
      searchTerm &&
      !dog.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Breed filter
    if (filters.breed !== "All Breeds" && dog.breed !== filters.breed) {
      return false;
    }
    
    // Age filter (this is simplified, would need more logic for real implementation)
    if (filters.age !== "All Ages") {
      if (filters.age === "Puppy (< 1 year)" && !dog.age.includes("month") && !dog.age.includes("< 1")) {
        return false;
      } else if (filters.age === "Young (1-3 years)" && !dog.age.includes("1") && !dog.age.includes("2") && !dog.age.includes("3")) {
        return false;
      } else if (filters.age === "Adult (3-7 years)" && !dog.age.includes("4") && !dog.age.includes("5") && !dog.age.includes("6") && !dog.age.includes("7")) {
        return false;
      } else if (filters.age === "Senior (7+ years)" && !dog.age.includes("8") && !dog.age.includes("9") && !dog.age.includes("10")) {
        return false;
      }
    }
    
    // Size filter
    if (filters.size !== "All Sizes" && dog.size !== filters.size) {
      return false;
    }
    
    // Gender filter
    if (filters.gender !== "All Genders" && dog.gender !== filters.gender) {
      return false;
    }
    
    return true;
  });
  
  const resetFilters = () => {
    setFilters({
      breed: "All Breeds",
      age: "All Ages",
      size: "All Sizes",
      gender: "All Genders",
    });
    setSearchTerm("");
  };
  
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-pawscare-50 pt-32">
          <div className="container pb-12 pt-8">
            <h1 className="font-serif text-3xl font-medium md:text-4xl">Adopt a Dog</h1>
            <p className="mt-2 text-muted-foreground">
              Find your perfect canine companion among our adoptable dogs.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by dog name or breed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border-0 bg-white px-5 py-3 pl-12 shadow-sm focus:ring-2 focus:ring-pawscare-500"
                />
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-pawscare-200 bg-white px-5 py-3 font-medium text-foreground transition-all hover:bg-pawscare-50 md:w-auto"
              >
                <SlidersHorizontal size={18} />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
            
            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Breed</label>
                    <select
                      value={filters.breed}
                      onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-2 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    >
                      {breedOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Age</label>
                    <select
                      value={filters.age}
                      onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-2 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    >
                      {ageOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Size</label>
                    <select
                      value={filters.size}
                      onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-2 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    >
                      {sizeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-2 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    >
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/80"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        <section className="section-padding">
          <div className="container">
            <div className="mb-6 flex justify-between">
              <h2 className="font-serif text-xl font-medium">
                {filteredDogs.length} Dog{filteredDogs.length !== 1 ? "s" : ""} Found
              </h2>
            </div>
            
            {filteredDogs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredDogs.map((dog) => (
                  <DogCard key={dog.id} {...dog} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-muted p-12 text-center">
                <h3 className="font-serif text-xl font-medium">No Dogs Found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filters to find more dogs.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 rounded-full bg-pawscare-500 px-6 py-2 text-white transition-all hover:bg-pawscare-600"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Adopt;
