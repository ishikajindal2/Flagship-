import { Building2, Mail, Phone, User, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container px-4 py-8">
        {user && (
          <div className="mb-6 p-4 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-3">
              {user.role === "admin" ? (
                <Shield className="h-5 w-5 text-primary" />
              ) : (
                <User className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-semibold text-sm">Logged in as: {user.name}</p>
                <p className="text-xs text-muted-foreground">
                  Role: {user.role === "admin" ? "Administrator" : "User"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">APB Browser</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your corporate portal for all company updates and resources.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@apb.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} APB Browser. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
