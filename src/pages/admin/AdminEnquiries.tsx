import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Trash2 } from "lucide-react";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    fetchData();
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Country", "Tour", "Start Date", "Adults", "Children", "Status", "Message"];
    const rows = enquiries.map(e => [
      new Date(e.created_at).toLocaleDateString(), e.full_name, e.email, e.phone || "", e.country || "",
      e.tour_title || "", e.start_date || "", e.adults, e.children, e.status, e.message || ""
    ]);
    const csv = [headers, ...rows].map(r => r.map((c: any) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "enquiries.csv"; a.click();
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">Tour Enquiries</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-accent transition-colors">
          <Download size={16} /> Export CSV
        </button>
      </div>

      {enquiries.length === 0 ? (
        <p className="text-muted-foreground font-body">No enquiries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {["Date", "Name", "Email", "Tour", "Start", "Adults", "Children", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-body text-xs tracking-wider uppercase text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-body text-sm">{new Date(e.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-body text-sm font-medium">{e.full_name}</td>
                  <td className="py-3 px-4 font-body text-sm text-muted-foreground">{e.email}</td>
                  <td className="py-3 px-4 font-body text-sm">{e.tour_title || "—"}</td>
                  <td className="py-3 px-4 font-body text-sm">{e.start_date || "—"}</td>
                  <td className="py-3 px-4 font-body text-sm text-center">{e.adults}</td>
                  <td className="py-3 px-4 font-body text-sm text-center">{e.children}</td>
                  <td className="py-3 px-4">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-border bg-background font-body text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => deleteItem(e.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
