
import { useState } from "react";
import { Edit, Eye, Trash, Plus } from "lucide-react";
import { toast } from "sonner";
import AdminDogModal from "./AdminDogModal";

// Sample data for adoptable dogs
const initialDogs = [
  {
    id: "dog1",
    name: "Luna",
    breed: "Labrador Retriever",
    age: "2 years",
    size: "Large",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "San Francisco, CA",
    description: "Friendly and energetic lab who loves to play fetch and swim.",
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
    description: "Intelligent and loyal shepherd looking for an active family.",
    featured: false,
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
    description: "Sweet and gentle golden who loves everyone she meets.",
    featured: false,
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
    description: "Energetic husky who needs lots of exercise and outdoor time.",
    featured: false,
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
    description: "Curious and friendly beagle who loves to explore.",
    featured: false,
  },
];

export type DogType = {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: string;
  gender: string;
  image: string;
  location: string;
  description: string;
  featured: boolean;
};

const AdminDogsList = () => {
  const [dogs, setDogs] = useState<DogType[]>(initialDogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDog, setCurrentDog] = useState<DogType | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");

  const handleOpenModal = (dog: DogType | null, mode: "view" | "edit" | "add") => {
    setCurrentDog(dog);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDog(null);
  };

  const handleDeleteDog = (id: string) => {
    if (window.confirm("Are you sure you want to delete this dog?")) {
      setDogs(dogs.filter(dog => dog.id !== id));
      toast.success("Dog deleted successfully");
    }
  };

  const handleSaveDog = (dog: DogType) => {
    if (modalMode === "add") {
      setDogs([...dogs, { ...dog, id: `dog${Date.now()}` }]);
      toast.success("Dog added successfully");
    } else if (modalMode === "edit") {
      setDogs(dogs.map(d => d.id === dog.id ? dog : d));
      toast.success("Dog updated successfully");
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-serif text-2xl font-medium">Adoptable Dogs</h2>
        <button
          onClick={() => handleOpenModal({
            id: "",
            name: "",
            breed: "",
            age: "",
            size: "",
            gender: "",
            image: "",
            location: "",
            description: "",
            featured: false
          }, "add")}
          className="flex items-center gap-2 rounded-full bg-pawscare-500 px-4 py-2 text-white hover:bg-pawscare-600"
        >
          <Plus size={16} />
          Add New Dog
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">Image</th>
              <th className="px-4 py-3 text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-sm font-medium">Breed</th>
              <th className="px-4 py-3 text-sm font-medium">Age</th>
              <th className="px-4 py-3 text-sm font-medium">Size</th>
              <th className="px-4 py-3 text-sm font-medium">Gender</th>
              <th className="px-4 py-3 text-sm font-medium">Location</th>
              <th className="px-4 py-3 text-sm font-medium">Featured</th>
              <th className="px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr key={dog.id} className="border-t border-muted hover:bg-muted/50">
                <td className="px-4 py-3">
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{dog.name}</td>
                <td className="px-4 py-3">{dog.breed}</td>
                <td className="px-4 py-3">{dog.age}</td>
                <td className="px-4 py-3">{dog.size}</td>
                <td className="px-4 py-3">{dog.gender}</td>
                <td className="px-4 py-3">{dog.location}</td>
                <td className="px-4 py-3">
                  {dog.featured ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Yes
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      No
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(dog, "view")}
                      className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
                      aria-label="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenModal(dog, "edit")}
                      className="rounded-full p-1.5 text-blue-500 hover:bg-blue-100"
                      aria-label="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteDog(dog.id)}
                      className="rounded-full p-1.5 text-red-500 hover:bg-red-100"
                      aria-label="Delete"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentDog && (
        <AdminDogModal
          dog={currentDog}
          mode={modalMode}
          onClose={handleCloseModal}
          onSave={handleSaveDog}
        />
      )}
    </div>
  );
};

export default AdminDogsList;
