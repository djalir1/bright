import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Map, Compass, GraduationCap, Mail, Image, LogOut, Menu, ChevronLeft, FileText, Users, Sun, Moon
} from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, countKey: null },
  { label: "Tour Enquiries", to: "/admin/enquiries", icon: FileText, countKey: "enquiries" },
  { label: "Custom Requests", to: "/admin/custom-requests", icon: Users, countKey: "customRequests" },
  { label: "Tours", to: "/admin/tours", icon: Map, countKey: null },
  { label: "Destinations", to: "/admin/destinations", icon: Compass, countKey: null },
  { label: "Academy Apps", to: "/admin/academy", icon: GraduationCap, countKey: "academyApps" },
  { label: "Messages", to: "/admin/messages", icon: Mail, countKey: "messages" },
  { label: "Gallery", to: "/admin/gallery", icon: Image, countKey: null },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("admin_dark_mode") === "true");
  const [badges, setBadges] = useState<Record<string, number>>({});

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    if (!isAuth) navigate("/admin/login");
  }, [navigate]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("admin_dark_mode", String(darkMode));
  }, [darkMode]);

  // Fetch badge counts
  useEffect(() => {
    const fetchBadges = async () => {
      const [enqRes, custRes, acadRes, msgRes] = await Promise.all([
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("custom_itinerary_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("academy_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "unread"),
      ]);
      setBadges({
        enquiries: enqRes.count || 0,
        customRequests: custRes.count || 0,
        academyApps: acadRes.count || 0,
        messages: msgRes.count || 0,
      });
    };
    fetchBadges();
    const interval = setInterval(fetchBadges, 30000);
    return () => clearInterval(interval);
  }, []);

  const isAuth = localStorage.getItem("admin_authenticated") === "true";
  if (!isAuth) return null;

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!collapsed && <img src={logo} alt="Logo" className="h-10 object-contain drop-shadow-md" />}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hidden lg:block">
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
        <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground lg:hidden">
          <ChevronLeft size={18} />
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-b border-border">
          <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Menu</p>
        </div>
      )}

      <nav className="flex-1 py-2 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = item.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.to);
          const badgeCount = item.countKey ? badges[item.countKey] || 0 : 0;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-all relative ${
                active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-muted"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {badgeCount > 0 && (
                <span className={`min-w-[20px] h-5 flex items-center justify-center rounded-full font-body text-[10px] font-bold px-1.5 ${
                  active ? "bg-primary-foreground text-primary" : "bg-destructive text-destructive-foreground"
                }`}>
                  {badgeCount > 99 ? "99+" : badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-border space-y-0.5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-body text-sm text-foreground hover:bg-muted transition-colors"
          title={collapsed ? "Toggle Theme" : undefined}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-body text-sm text-destructive hover:bg-destructive/10 transition-colors"
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - Desktop */}
      <aside className={`${collapsed ? "w-16" : "w-64"} bg-card border-r border-border flex-col transition-all duration-300 fixed inset-y-0 left-0 z-50 hidden lg:flex`}>
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile */}
      <aside className={`w-72 bg-card border-r border-border flex flex-col fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <main className={`flex-1 ${collapsed ? "lg:ml-16" : "lg:ml-64"} transition-all duration-300`}>
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-card sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground lg:hidden">
              <Menu size={20} />
            </button>
            <h2 className="font-display text-base lg:text-lg font-semibold text-foreground">
              {navItems.find(n => n.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(n.to))?.label || "Admin Panel"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-body text-sm font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
