
import { ArrowRight } from "lucide-react";
import DogCard from "../ui/DogCard";
import { Link } from "react-router-dom";

// Sample data for featured dogs
const featuredDogs = [
  {
    id: "dog1",
    name: "Luna",
    breed: "Labrador Retriever",
    age: "2 years",
    size: "Large",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "San Francisco, CA",
    featured: true,
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
];

const FeaturedDogs = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-medium md:text-4xl">
              Dogs Looking for a Home
            </h2>
            <p className="mt-3 text-muted-foreground">
              Meet our featured dogs who are ready to find their forever families.
              Each one has a unique personality and story.
            </p>
          </div>
          <Link
            to="/adopt"
            className="group flex items-center gap-2 text-pawscare-500 transition-all hover:text-pawscare-600"
          >
            See all dogs
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDogs.map((dog) => (
            <DogCard key={dog.id} {...dog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDogs;
