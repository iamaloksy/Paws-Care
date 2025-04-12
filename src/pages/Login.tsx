
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { Check, LogIn } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Login successful", {
        description: "Welcome back to PawsCare!",
      });
      setSubmitting(false);
      navigate("/adopt");
    }, 1500);
  };
  
  return (
    <>
      <Navbar />
      <main className="pb-16 pt-32">
        <div className="container">
          <div className="mx-auto max-w-md">
            <header className="mb-8 text-center">
              <h1 className="font-serif text-3xl font-medium">Login</h1>
              <p className="mt-2 text-muted-foreground">
                Sign in to your PawsCare account
              </p>
            </header>
            
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6 rounded-xl bg-pawscare-50 p-4">
                <h3 className="flex items-center gap-2 font-serif text-base font-medium">
                  <Check size={18} className="text-pawscare-500" />
                  Member Benefits
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Login to save favorite dogs, track adoption applications, and receive updates.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
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
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-xs text-pawscare-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-pawscare-500 focus:ring-pawscare-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-pawscare-500 py-3 font-medium text-white transition-all hover:bg-pawscare-600 disabled:opacity-70"
                >
                  <LogIn size={18} />
                  {submitting ? "Signing In..." : "Sign In"}
                </button>
                
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium text-pawscare-600 hover:underline">
                    Sign up
                  </Link>
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

export default Login;
