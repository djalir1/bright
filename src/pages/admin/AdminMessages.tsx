import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download, Trash2, Eye } from "lucide-react";

const AdminMessages = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ status: "read" }).eq("id", id);
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setSelected(null);
    fetchData();
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Subject", "Message", "Status"];
    const rows = items.map(e => [
      new Date(e.created_at).toLocaleDateString(), e.full_name, e.email, e.phone || "",
      e.subject || "", e.message, e.status
    ]);
    const csv = [headers, ...rows].map(r => r.map((c: any) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "messages.csv"; a.click();
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">Contact Messages</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-accent transition-colors">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {["Date", "Name", "Subject", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-body text-xs tracking-wider uppercase text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id} className={`border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${m.status === "unread" ? "font-semibold" : ""}`} onClick={() => { setSelected(m); markRead(m.id); }}>
                  <td className="py-3 px-4 font-body text-sm">{new Date(m.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-body text-sm">{m.full_name}</td>
                  <td className="py-3 px-4 font-body text-sm">{m.subject || "—"}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-body ${m.status === "unread" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={(e) => { e.stopPropagation(); deleteItem(m.id); }} className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">{selected.full_name}</h3>
            <p className="font-body text-sm text-muted-foreground mb-1">{selected.email}</p>
            {selected.phone && <p className="font-body text-sm text-muted-foreground mb-3">{selected.phone}</p>}
            {selected.subject && <p className="font-body text-sm font-medium text-foreground mb-2">{selected.subject}</p>}
            <p className="font-body text-sm text-foreground whitespace-pre-wrap">{selected.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
