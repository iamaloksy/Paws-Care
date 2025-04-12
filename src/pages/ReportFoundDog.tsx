
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Camera, Check, MapPin, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

const ReportFoundDog = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    dateFound: "",
    currentLocation: "",
  });
  
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your found dog report has been submitted successfully", {
        description: "We'll help find the owner of this pet.",
      });
      setSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        description: "",
        dateFound: "",
        currentLocation: "",
      });
      setPreview(null);
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      <main className="pb-16 pt-32">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <header className="mb-8 text-center">
              <h1 className="font-serif text-3xl font-medium md:text-4xl">Report a Found Dog</h1>
              <p className="mt-2 text-muted-foreground">
                Help reunite a lost dog with their family by providing information about a dog you've found.
              </p>
            </header>
            
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8 rounded-xl bg-pawscare-50 p-5">
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium">
                  <Check size={20} className="text-pawscare-500" />
                  Found Dog Report Information
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for helping this lost pet. Your report will be shared with our community to help find the owner.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location Where Found*
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      placeholder="Enter address or describe the location where you found the dog"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-lg border-0 bg-muted p-3 pl-10 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="dateFound" className="block text-sm font-medium">
                      Date Found*
                    </label>
                    <input
                      type="date"
                      id="dateFound"
                      name="dateFound"
                      required
                      value={formData.dateFound}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="currentLocation" className="block text-sm font-medium">
                      Current Location of Dog*
                    </label>
                    <input
                      type="text"
                      id="currentLocation"
                      name="currentLocation"
                      required
                      placeholder="Where is the dog now?"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium">
                    Dog Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    placeholder="Describe the dog's appearance, breed, size, color, any distinctive marks, collar, behavior, etc."
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">
                    Upload Photos of the Dog (highly recommended)
                  </label>
                  <div className="mt-1">
                    <label
                      htmlFor="photo-upload"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted p-6 transition-all hover:border-pawscare-500/50"
                    >
                      {preview ? (
                        <div className="relative w-full">
                          <img
                            src={preview}
                            alt="Preview"
                            className="mx-auto h-48 rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setPreview(null)}
                            className="absolute right-0 top-0 rounded-full bg-white p-1 shadow-md"
                            aria-label="Remove image"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                            <Camera className="h-6 w-6 text-pawscare-500" />
                          </div>
                          <div className="flex flex-col items-center text-center">
                            <UploadCloud className="mb-1 h-6 w-6 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Drag and drop or click to upload
                            </span>
                            <span className="mt-1 text-xs text-muted-foreground">
                              Supports JPG, PNG (Max 5MB)
                            </span>
                          </div>
                        </>
                      )}
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-sm text-secondary-foreground">
                    <strong>Note:</strong> If the dog appears injured or in distress, please also
                    contact your local animal control or emergency services for immediate assistance.
                  </p>
                </div>
                
                <div className="flex items-center justify-center pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-pawscare-500 py-3 font-medium text-white transition-all hover:bg-pawscare-600 disabled:opacity-70 md:w-auto md:px-12"
                  >
                    {submitting ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ReportFoundDog;
