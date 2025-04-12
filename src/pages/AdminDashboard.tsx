
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDogsList from "@/components/admin/AdminDogsList";
import AdminLostFoundList from "@/components/admin/AdminLostFoundList";
import AdminStraysList from "@/components/admin/AdminStraysList";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication for demo purposes
    // In a real app, this would be a backend authentication
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      toast.success("Admin login successful");
      setIsAuthenticated(true);
    } else {
      toast.error("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="pb-16 pt-32">
          <div className="container">
            <div className="mx-auto max-w-md">
              <header className="mb-8 text-center">
                <h1 className="font-serif text-3xl font-medium">Admin Login</h1>
                <p className="mt-2 text-muted-foreground">
                  Sign in to access the admin dashboard
                </p>
              </header>
              
              <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      value={loginForm.username}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={loginForm.password}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border-0 bg-muted p-3 text-foreground focus:ring-2 focus:ring-pawscare-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full rounded-full bg-pawscare-500 py-3 font-medium text-white transition-all hover:bg-pawscare-600"
                  >
                    Sign In
                  </button>
                  
                  <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                      For demo: username: "admin", password: "admin123"
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pb-16 pt-32">
        <div className="container">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-3xl font-medium">Admin Dashboard</h1>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  navigate("/");
                  toast.success("Logged out successfully");
                }}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
              >
                Logout
              </button>
            </div>
            <p className="mt-2 text-muted-foreground">
              Manage all content from this central dashboard
            </p>
          </header>

          <Tabs defaultValue="dogs" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="dogs">Adoptable Dogs</TabsTrigger>
              <TabsTrigger value="lost-found">Lost & Found Dogs</TabsTrigger>
              <TabsTrigger value="strays">Reported Strays</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dogs" className="mt-6">
              <AdminDogsList />
            </TabsContent>
            
            <TabsContent value="lost-found" className="mt-6">
              <AdminLostFoundList />
            </TabsContent>
            
            <TabsContent value="strays" className="mt-6">
              <AdminStraysList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
