
import { useState } from "react";
import { Edit, Eye, Trash, Plus } from "lucide-react";
import { toast } from "sonner";
import AdminStrayModal from "./AdminStrayModal";

// Sample data for stray dogs
const initialStrays = [
  {
    id: "stray1",
    location: "Downtown Park, Seattle",
    date: "2023-09-10",
    description: "Medium-sized brown dog with no collar, appears to be a mixed breed. Very skittish but not aggressive.",
    reporter: "michael.brown@example.com",
    phone: "555-111-2222",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "reported",
  },
  {
    id: "stray2",
    location: "Main Street near the Grocery Store, Portland",
    date: "2023-09-15",
    description: "Small white terrier mix with blue collar but no tags. Very friendly and approached people for food.",
    reporter: "jessica.wilson@example.com",
    phone: "555-333-4444",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "rescued",
  },
  {
    id: "stray3",
    location: "Highway 101 near exit 24, San Francisco",
    date: "2023-09-18",
    description: "Large black and tan dog, possibly a German Shepherd mix. Was seen running along the highway shoulder.",
    reporter: "david.martinez@example.com",
    phone: "555-555-6666",
    image: "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    status: "reported",
  },
];

export type StrayDogType = {
  id: string;
  location: string;
  date: string;
  description: string;
  reporter: string;
  phone: string;
  image: string;
  status: "reported" | "rescued" | "addressed";
};

const AdminStraysList = () => {
  const [strays, setStrays] = useState<StrayDogType[]>(initialStrays);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStray, setCurrentStray] = useState<StrayDogType | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");

  const handleOpenModal = (stray: StrayDogType | null, mode: "view" | "edit" | "add") => {
    setCurrentStray(stray);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStray(null);
  };

  const handleDeleteStray = (id: string) => {
    if (window.confirm("Are you sure you want to delete this stray dog report?")) {
      setStrays(strays.filter(stray => stray.id !== id));
      toast.success("Stray dog report deleted successfully");
    }
  };

  const handleSaveStray = (stray: StrayDogType) => {
    if (modalMode === "add") {
      setStrays([...strays, { ...stray, id: `stray${Date.now()}` }]);
      toast.success("Stray dog report added successfully");
    } else if (modalMode === "edit") {
      setStrays(strays.map(s => s.id === stray.id ? stray : s));
      toast.success("Stray dog report updated successfully");
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-serif text-2xl font-medium">Stray Dog Reports</h2>
        <button
          onClick={() => handleOpenModal({
            id: "",
            location: "",
            date: new Date().toISOString().split('T')[0],
            description: "",
            reporter: "",
            phone: "",
            image: "",
            status: "reported"
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
              <th className="px-4 py-3 text-sm font-medium">Image</th>
              <th className="px-4 py-3 text-sm font-medium">Location</th>
              <th className="px-4 py-3 text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-sm font-medium">Reporter</th>
              <th className="px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {strays.map((stray) => (
              <tr key={stray.id} className="border-t border-muted hover:bg-muted/50">
                <td className="px-4 py-3">
                  {stray.image ? (
                    <img
                      src={stray.image}
                      alt="Stray dog"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">No image</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 max-w-xs truncate">{stray.location}</td>
                <td className="px-4 py-3">{stray.date}</td>
                <td className="px-4 py-3">{stray.reporter}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    stray.status === "reported"
                      ? "bg-amber-100 text-amber-800"
                      : stray.status === "rescued"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                  }`}>
                    {stray.status.charAt(0).toUpperCase() + stray.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(stray, "view")}
                      className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
                      aria-label="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenModal(stray, "edit")}
                      className="rounded-full p-1.5 text-blue-500 hover:bg-blue-100"
                      aria-label="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteStray(stray.id)}
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

      {isModalOpen && currentStray && (
        <AdminStrayModal
          stray={currentStray}
          mode={modalMode}
          onClose={handleCloseModal}
          onSave={handleSaveStray}
        />
      )}
    </div>
  );
};

export default AdminStraysList;
