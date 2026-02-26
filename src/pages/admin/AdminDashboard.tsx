import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  FileText, Users, Map, Compass, GraduationCap, Mail, Image,
  TrendingUp, Clock, Eye, ArrowRight, Plus
} from "lucide-react";

interface DashboardStats {
  enquiries: number;
  pendingEnquiries: number;
  customRequests: number;
  pendingCustom: number;
  tours: number;
  destinations: number;
  academyApps: number;
  pendingAcademy: number;
  messages: number;
  unreadMessages: number;
  galleryPosts: number;
}

interface RecentItem {
  id: string;
  type: string;
  label: string;
  detail: string;
  date: string;
  status?: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    enquiries: 0, pendingEnquiries: 0, customRequests: 0, pendingCustom: 0,
    tours: 0, destinations: 0, academyApps: 0, pendingAcademy: 0,
    messages: 0, unreadMessages: 0, galleryPosts: 0,
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [enqRes, custRes, tourRes, destRes, acadRes, msgRes, galRes] = await Promise.all([
        supabase.from("enquiries").select("id, full_name, tour_title, status, created_at"),
        supabase.from("custom_itinerary_requests").select("id, full_name, destinations, status, created_at"),
        supabase.from("tours").select("id, title, created_at"),
        supabase.from("destinations").select("id, name, created_at"),
        supabase.from("academy_applications").select("id, full_name, program_name, status, created_at"),
        supabase.from("contact_messages").select("id, full_name, subject, status, created_at"),
        supabase.from("gallery_posts").select("id, title, created_at"),
      ]);

      const enq = enqRes.data || [];
      const cust = custRes.data || [];
      const tours = tourRes.data || [];
      const dests = destRes.data || [];
      const acad = acadRes.data || [];
      const msgs = msgRes.data || [];
      const gal = galRes.data || [];

      setStats({
        enquiries: enq.length,
        pendingEnquiries: enq.filter(e => e.status === "pending").length,
        customRequests: cust.length,
        pendingCustom: cust.filter(e => e.status === "pending").length,
        tours: tours.length,
        destinations: dests.length,
        academyApps: acad.length,
        pendingAcademy: acad.filter(e => e.status === "pending").length,
        messages: msgs.length,
        unreadMessages: msgs.filter(e => e.status === "unread").length,
        galleryPosts: gal.length,
      });

      // Build recent items
      const recent: RecentItem[] = [
        ...enq.map(e => ({ id: e.id, type: "enquiry", label: e.full_name, detail: e.tour_title || "General", date: e.created_at, status: e.status })),
        ...cust.map(e => ({ id: e.id, type: "custom", label: e.full_name, detail: e.destinations || "Custom Trip", date: e.created_at, status: e.status })),
        ...acad.map(e => ({ id: e.id, type: "academy", label: e.full_name, detail: e.program_name, date: e.created_at, status: e.status })),
        ...msgs.map(e => ({ id: e.id, type: "message", label: e.full_name, detail: e.subject || "No subject", date: e.created_at, status: e.status })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

      setRecentItems(recent);
      setLoading(false);
    };

    fetchAll();
  }, []);

  const metricCards = [
    { label: "Tour Enquiries", count: stats.enquiries, pending: stats.pendingEnquiries, icon: FileText, to: "/admin/enquiries", color: "bg-primary/10 text-primary" },
    { label: "Custom Requests", count: stats.customRequests, pending: stats.pendingCustom, icon: Users, to: "/admin/custom-requests", color: "bg-accent/10 text-accent" },
    { label: "Academy Apps", count: stats.academyApps, pending: stats.pendingAcademy, icon: GraduationCap, to: "/admin/academy", color: "bg-primary/10 text-primary" },
    { label: "Messages", count: stats.messages, pending: stats.unreadMessages, icon: Mail, to: "/admin/messages", color: "bg-accent/10 text-accent" },
  ];

  const quickActions = [
    { label: "Add Tour", icon: Plus, to: "/admin/tours", color: "bg-primary text-primary-foreground" },
    { label: "Add Destination", icon: Plus, to: "/admin/destinations", color: "bg-accent text-accent-foreground" },
    { label: "Upload to Gallery", icon: Image, to: "/admin/gallery", color: "bg-primary text-primary-foreground" },
    { label: "View Enquiries", icon: Eye, to: "/admin/enquiries", color: "bg-accent text-accent-foreground" },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending": case "unread": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "confirmed": case "accepted": case "read": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "cancelled": case "rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "enquiry": return <FileText size={14} />;
      case "custom": return <Users size={14} />;
      case "academy": return <GraduationCap size={14} />;
      case "message": return <Mail size={14} />;
      default: return <Clock size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-card rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-muted rounded w-24 mb-3" />
              <div className="h-8 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Dashboard Overview</h1>
          <p className="font-body text-sm text-muted-foreground mt-0.5">Real-time platform insights</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
          <Clock size={14} className="text-primary" />
          <span className="font-body text-xs text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-xs tracking-wider uppercase text-muted-foreground">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon size={18} />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="font-display text-3xl font-bold text-foreground">{card.count}</span>
              {card.pending > 0 && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-body text-xs mb-1">
                  <TrendingUp size={12} />
                  {card.pending} pending
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full" />
          </Link>
        ))}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/tours" className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Map size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-foreground">{stats.tours}</p>
            <p className="font-body text-xs text-muted-foreground">Active Tours</p>
          </div>
        </Link>
        <Link to="/admin/destinations" className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Compass size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-foreground">{stats.destinations}</p>
            <p className="font-body text-xs text-muted-foreground">Destinations</p>
          </div>
        </Link>
        <Link to="/admin/gallery" className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Image size={22} />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-foreground">{stats.galleryPosts}</p>
            <p className="font-body text-xs text-muted-foreground">Gallery Posts</p>
          </div>
        </Link>
      </div>

      {/* Two Column: Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">Recent Activity</h2>
            <span className="font-body text-xs text-muted-foreground">{recentItems.length} items</span>
          </div>
          {recentItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-body text-sm text-muted-foreground">No activity yet. Submissions from the website will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="px-5 py-3 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-foreground truncate">{item.label}</p>
                    <p className="font-body text-xs text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-body text-xs capitalize shrink-0 ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="font-body text-xs text-muted-foreground shrink-0 hidden sm:block">
                    {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-lg font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl ${action.color} hover:opacity-90 transition-opacity`}
              >
                <action.icon size={20} />
                <span className="font-body text-xs font-medium text-center">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Summary Card */}
          <div className="mx-4 mb-4 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="font-body text-xs text-muted-foreground mb-2">Platform Summary</p>
            <div className="space-y-2">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Total Submissions</span>
                <span className="font-semibold text-foreground">{stats.enquiries + stats.customRequests + stats.academyApps + stats.messages}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Pending Actions</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{stats.pendingEnquiries + stats.pendingCustom + stats.pendingAcademy + stats.unreadMessages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
