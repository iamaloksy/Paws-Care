
import { useState } from "react";
import { Edit, Eye, Trash, Plus } from "lucide-react";
import { toast } from "sonner";
import AdminLostFoundModal from "./AdminLostFoundModal";

// Sample data for lost and found dogs
const initialLostFoundDogs = [
  {
    id: "lost1",
    name: "Charlie",
    type: "lost",
    breed: "Border Collie",
    age: "4 years",
    gender: "Male",
    lastSeen: "Central Park, New York",
    date: "2023-06-15",
    description: "Black and white Border Collie with blue collar. Very friendly.",
    contact: "john.doe@example.com",
    phone: "555-123-4567",
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "open",
  },
  {
    id: "found1",
    name: "Unknown",
    type: "found",
    breed: "Poodle Mix",
    age: "~2 years",
    gender: "Female",
    lastSeen: "Main Street, Boston",
    date: "2023-07-22",
    description: "Small brown poodle mix found wandering near the library. No collar.",
    contact: "sarah.smith@example.com",
    phone: "555-987-6543",
    image: "https://images.unsplash.com/photo-1516371535707-512a1e83566a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "reunited",
  },
  {
    id: "lost2",
    name: "Max",
    type: "lost",
    breed: "Golden Retriever",
    age: "6 years",
    gender: "Male",
    lastSeen: "Riverside Park, Chicago",
    date: "2023-08-05",
    description: "Golden retriever with red collar. Responds to his name.",
    contact: "mike.johnson@example.com",
    phone: "555-456-7890",
    image: "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "open",
  },
];

export type LostFoundDogType = {
  id: string;
  name: string;
  type: "lost" | "found";
  breed: string;
  age: string;
  gender: string;
  lastSeen: string;
  date: string;
  description: string;
  contact: string;
  phone: string;
  image: string;
  status: "open" | "reunited" | "closed";
};

const AdminLostFoundList = () => {
  const [lostFoundDogs, setLostFoundDogs] = useState<LostFoundDogType[]>(initialLostFoundDogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDog, setCurrentDog] = useState<LostFoundDogType | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");

  const handleOpenModal = (dog: LostFoundDogType | null, mode: "view" | "edit" | "add") => {
    setCurrentDog(dog);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDog(null);
  };

  const handleDeleteDog = (id: string) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setLostFoundDogs(lostFoundDogs.filter(dog => dog.id !== id));
      toast.success("Report deleted successfully");
    }
  };

  const handleSaveDog = (dog: LostFoundDogType) => {
    if (modalMode === "add") {
      setLostFoundDogs([...lostFoundDogs, { ...dog, id: `${dog.type}${Date.now()}` }]);
      toast.success("Report added successfully");
    } else if (modalMode === "edit") {
      setLostFoundDogs(lostFoundDogs.map(d => d.id === dog.id ? dog : d));
      toast.success("Report updated successfully");
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-serif text-2xl font-medium">Lost & Found Reports</h2>
        <button
          onClick={() => handleOpenModal({
            id: "",
            name: "",
            type: "lost",
            breed: "",
            age: "",
            gender: "",
            lastSeen: "",
            date: new Date().toISOString().split('T')[0],
            description: "",
            contact: "",
            phone: "",
            image: "",
            status: "open"
          }, "add")}
          className="flex items-center gap-2 rounded-full bg-pawscare-500 px-4 py-2 text-white hover:bg-pawscare-600"
        >
          <Plus size={16} />
          Add New Report
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">Type</th>
              <th className="px-4 py-3 text-sm font-medium">Image</th>
              <th className="px-4 py-3 text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-sm font-medium">Breed</th>
              <th className="px-4 py-3 text-sm font-medium">Last Seen</th>
              <th className="px-4 py-3 text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lostFoundDogs.map((dog) => (
              <tr key={dog.id} className="border-t border-muted hover:bg-muted/50">
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    dog.type === "lost" 
                      ? "bg-amber-100 text-amber-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {dog.type === "lost" ? "Lost" : "Found"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{dog.name}</td>
                <td className="px-4 py-3">{dog.breed}</td>
                <td className="px-4 py-3">{dog.lastSeen}</td>
                <td className="px-4 py-3">{dog.date}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    dog.status === "open"
                      ? "bg-green-100 text-green-800"
                      : dog.status === "reunited"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}>
                    {dog.status.charAt(0).toUpperCase() + dog.status.slice(1)}
                  </span>
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
        <AdminLostFoundModal
          dog={currentDog}
          mode={modalMode}
          onClose={handleCloseModal}
          onSave={handleSaveDog}
        />
      )}
    </div>
  );
};

export default AdminLostFoundList;
