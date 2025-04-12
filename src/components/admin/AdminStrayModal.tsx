
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { StrayDogType } from "./AdminStraysList";

interface AdminStrayModalProps {
  stray: StrayDogType;
  mode: "view" | "edit" | "add";
  onClose: () => void;
  onSave: (stray: StrayDogType) => void;
}

const AdminStrayModal = ({ stray, mode, onClose, onSave }: AdminStrayModalProps) => {
  const [formData, setFormData] = useState<StrayDogType>(stray);
  const [errors, setErrors] = useState<Partial<Record<keyof StrayDogType, string>>>({});

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
    if (errors[name as keyof StrayDogType]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<Record<keyof StrayDogType, string>> = {};
    let hasErrors = false;
    
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
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
    
    if (!formData.reporter.trim()) {
      newErrors.reporter = "Reporter contact is required";
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
  };

  const isViewOnly = mode === "view";
  const title = mode === "add" ? "Add New Stray Dog Report" : mode === "edit" ? "Edit Stray Dog Report" : "View Stray Dog Report";

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
              placeholder="e.g. Main Street near the library"
            />
            {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Date Reported
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
              <option value="reported">Reported</option>
              <option value="rescued">Rescued</option>
              <option value="addressed">Addressed</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              disabled={isViewOnly}
              className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              placeholder="Describe the dog, its behavior, condition, etc."
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Image URL (optional)
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

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="reporter" className="block text-sm font-medium">
                Reporter Email
              </label>
              <input
                type="email"
                id="reporter"
                name="reporter"
                value={formData.reporter}
                onChange={handleChange}
                disabled={isViewOnly}
                className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500 disabled:opacity-70"
              />
              {errors.reporter && <p className="mt-1 text-xs text-red-500">{errors.reporter}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number (optional)
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

export default AdminStrayModal;
