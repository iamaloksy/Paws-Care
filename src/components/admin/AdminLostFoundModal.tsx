
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { LostFoundDogType } from "./AdminLostFoundList";

interface AdminLostFoundModalProps {
  dog: LostFoundDogType;
  mode: "view" | "edit" | "add";
  onClose: () => void;
  onSave: (dog: LostFoundDogType) => void;
}

const AdminLostFoundModal = ({ dog, mode, onClose, onSave }: AdminLostFoundModalProps) => {
  const [formData, setFormData] = useState<LostFoundDogType>(dog);
  const [errors, setErrors] = useState<Partial<Record<keyof LostFoundDogType, string>>>({});

  useEffect(() => {
    // Close modal with escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is updated
    if (errors[name as keyof LostFoundDogType]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<Record<keyof LostFoundDogType, string>> = {};
    let hasErrors = false;
    
    if (!formData.type) {
      newErrors.type = "Type is required";
      hasErrors = true;
    }
    
    if (!formData.breed.trim()) {
      newErrors.breed = "Breed is required";
      hasErrors = true;
    }
    
    if (!formData.lastSeen.trim()) {
      newErrors.lastSeen = "Last seen location is required";
      hasErrors = true;
    }
    
    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
      hasErrors = true;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      hasErrors = true;
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact email is required";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  const isViewOnly = mode === "view";
  const title = mode === "add" ? "Add New Report" : mode === "edit" ? "Edit Report" : "View Report Details";

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
              <label htmlFor="type" className="block text-sm font-medium">
                Report Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              >
                <option value="lost">Lost Dog</option>
                <option value="found">Found Dog</option>
              </select>
              {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              >
                <option value="open">Open</option>
                <option value="reunited">Reunited</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Dog Name (if known)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
                placeholder="Unknown if not known"
              />
            </div>

            <div>
              <label htmlFor="breed" className="block text-sm font-medium">
                Breed (or closest guess)
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

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="age" className="block text-sm font-medium">
                Age (approximate)
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
                <option value="">Unknown</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="lastSeen" className="block text-sm font-medium">
              {formData.type === "lost" ? "Last Seen Location" : "Found Location"}
            </label>
            <input
              type="text"
              id="lastSeen"
              name="lastSeen"
              value={formData.lastSeen}
              onChange={handleChange}
              disabled={isViewOnly}
              className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
            />
            {errors.lastSeen && <p className="mt-1 text-xs text-red-500">{errors.lastSeen}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              {formData.type === "lost" ? "Date Lost" : "Date Found"}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isViewOnly}
              className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
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

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium">
                Contact Email
              </label>
              <input
                type="email"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              />
              {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              />
            </div>
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
                {mode === "add" ? "Add Report" : "Save Changes"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLostFoundModal;
