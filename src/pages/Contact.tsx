
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-pawscare-50 pt-32">
          <div className="container pb-12 pt-8">
            <h1 className="font-serif text-3xl font-medium md:text-4xl">
              Contact Us
            </h1>
            <p className="mt-2 text-muted-foreground">
              Reach out to us with questions, feedback, or to learn more about how you can help.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="font-serif text-2xl font-medium">Get in Touch</h2>
                <p className="mt-3 text-muted-foreground">
                  Have questions about adopting, volunteering, or reporting a stray? 
                  We're here to help you every step of the way.
                </p>
                
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pawscare-100">
                      <MapPin className="h-5 w-5 text-pawscare-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="mt-1 text-muted-foreground">
                        123 Rescue Lane, Pet City, PC 12345
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pawscare-100">
                      <Phone className="h-5 w-5 text-pawscare-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="mt-1 text-muted-foreground">
                        (123) 456-7890
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pawscare-100">
                      <Mail className="h-5 w-5 text-pawscare-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="mt-1 text-muted-foreground">
                        hello@pawscare.com
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium">Hours of Operation</h3>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                <h2 className="font-serif text-2xl font-medium">Send a Message</h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="adoption">Adoption Inquiry</option>
                        <option value="report">Report a Stray</option>
                        <option value="volunteer">Volunteering</option>
                        <option value="donation">Donation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-pawscare-500 px-5 py-3 font-medium text-white transition-all hover:bg-pawscare-600 disabled:opacity-70"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="mt-12">
          <div className="aspect-w-16 aspect-h-9 h-96 w-full bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573186074!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1628793594918!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="PawsCare Location"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
