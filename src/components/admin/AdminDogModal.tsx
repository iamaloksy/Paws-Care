
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DogType } from "./AdminDogsList";

interface AdminDogModalProps {
  dog: DogType;
  mode: "view" | "edit" | "add";
  onClose: () => void;
  onSave: (dog: DogType) => void;
}

const AdminDogModal = ({ dog, mode, onClose, onSave }: AdminDogModalProps) => {
  const [formData, setFormData] = useState<DogType>(dog);
  const [errors, setErrors] = useState<Partial<Record<keyof DogType, string>>>({});

  useEffect(() => {
    // Close modal with escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

    // Clear error when field is updated
    if (errors[name as keyof DogType]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<Record<keyof DogType, string>> = {};
    let hasErrors = false;
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }
    
    if (!formData.breed.trim()) {
      newErrors.breed = "Breed is required";
      hasErrors = true;
    }
    
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
      hasErrors = true;
    }
    
    if (!formData.size.trim()) {
      newErrors.size = "Size is required";
      hasErrors = true;
    }
    
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
      hasErrors = true;
    }
    
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
      hasErrors = true;
    }
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      hasErrors = true;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  const isViewOnly = mode === "view";
  const title = mode === "add" ? "Add New Dog" : mode === "edit" ? "Edit Dog" : "View Dog Details";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-medium">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="breed" className="block text-sm font-medium">
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              />
              {errors.breed && <p className="mt-1 text-xs text-red-500">{errors.breed}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="age" className="block text-sm font-medium">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              />
              {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium">
                Size
              </label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              >
                <option value="">Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              {errors.size && <p className="mt-1 text-xs text-red-500">{errors.size}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              disabled={isViewOnly}
              className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
            />
            {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={isViewOnly}
              className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
            />
            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              disabled={isViewOnly}
              className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              disabled={isViewOnly}
              className="h-4 w-4 rounded border-gray-300 text-pawscare-500 focus:ring-pawscare-500"
            />
            <label htmlFor="featured" className="ml-2 block text-sm">
              Feature this dog on the homepage
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              {isViewOnly ? "Close" : "Cancel"}
            </button>
            
            {!isViewOnly && (
              <button
                type="submit"
                className="rounded-lg bg-pawscare-500 px-4 py-2 text-sm font-medium text-white hover:bg-pawscare-600"
              >
                {mode === "add" ? "Add Dog" : "Save Changes"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDogModal;
