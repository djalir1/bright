import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Trash2 } from "lucide-react";

const AdminAcademy = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchData = async () => {
    const { data } = await supabase.from("academy_applications").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("academy_applications").update({ status }).eq("id", id);
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await supabase.from("academy_applications").delete().eq("id", id);
    fetchData();
  };

  const filtered = filter === "all" ? items : items.filter(i => i.program_type === filter);

  const exportCSV = () => {
    const headers = ["Date", "Type", "Program", "Name", "Email", "Phone", "Country", "Status", "Message"];
    const rows = filtered.map(e => [
      new Date(e.created_at).toLocaleDateString(), e.program_type, e.program_name,
      e.full_name, e.email, e.phone || "", e.country || "", e.status, e.message || ""
    ]);
    const csv = [headers, ...rows].map(r => r.map((c: any) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "academy-applications.csv"; a.click();
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">Academy Applications</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-accent transition-colors">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {["all", "candidat_libre", "internship"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-body text-xs tracking-wider uppercase transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"}`}>
            {f === "all" ? "All" : f === "candidat_libre" ? "Candidat Libre" : "Internship"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground font-body">No applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {["Date", "Type", "Program", "Name", "Email", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-body text-xs tracking-wider uppercase text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-body text-sm">{new Date(e.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-body text-sm capitalize">{e.program_type.replace("_", " ")}</td>
                  <td className="py-3 px-4 font-body text-sm">{e.program_name}</td>
                  <td className="py-3 px-4 font-body text-sm font-medium">{e.full_name}</td>
                  <td className="py-3 px-4 font-body text-sm text-muted-foreground">{e.email}</td>
                  <td className="py-3 px-4">
                    <select value={e.status} onChange={(ev) => updateStatus(e.id, ev.target.value)} className="px-3 py-1.5 rounded-lg border border-border bg-background font-body text-xs">
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => deleteItem(e.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"><Trash2 size={16} /></button>
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

export default AdminAcademy;
