import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit, Save, X, Upload } from "lucide-react";

const emptyTour = {
  title: "", slug: "", description: "", short_summary: "", duration_days: 1,
  max_people: 10, price: 0, tour_type: "Wildlife", location: "", image_url: "", featured: false,
};

const AdminTours = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchData = async () => {
    const { data } = await supabase.from("tours").select("*").order("created_at", { ascending: false });
    setTours(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const { id, created_at, updated_at, ...rest } = editing;

    if (isNew) {
      await supabase.from("tours").insert(rest);
    } else {
      await supabase.from("tours").update(rest).eq("id", id);
    }
    setEditing(null);
    setIsNew(false);
    fetchData();
  };

  const deleteTour = async (id: string) => {
    if (!confirm("Delete this tour and all its itinerary data?")) return;
    await supabase.from("tours").delete().eq("id", id);
    fetchData();
  };

  const uploadImage = async (file: File) => {
    const fileName = `tours/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) { alert("Upload failed: " + error.message); return null; }
    const { data: { publicUrl } } = supabase.storage.from("uploads").getPublicUrl(data.path);
    return publicUrl;
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">Manage Tours</h1>
        <button onClick={() => { setEditing({ ...emptyTour }); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-accent transition-colors">
          <Plus size={16} /> Add Tour
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">{isNew ? "Add Tour" : "Edit Tour"}</h2>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Title</label>
                  <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                </div>
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Slug</label>
                  <input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs text-muted-foreground mb-1">Short Summary</label>
                <input value={editing.short_summary} onChange={e => setEditing({ ...editing, short_summary: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
              </div>
              <div>
                <label className="block font-body text-xs text-muted-foreground mb-1">Description</label>
                <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Duration (days)</label>
                  <input type="number" value={editing.duration_days} onChange={e => setEditing({ ...editing, duration_days: parseInt(e.target.value) || 1 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                </div>
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Max People</label>
                  <input type="number" value={editing.max_people} onChange={e => setEditing({ ...editing, max_people: parseInt(e.target.value) || 1 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                </div>
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Price ($)</label>
                  <input type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Tour Type</label>
                  <select value={editing.tour_type} onChange={e => setEditing({ ...editing, tour_type: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm">
                    {["Wildlife", "Cultural", "Adventure", "Luxury", "Budget"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs text-muted-foreground mb-1">Location</label>
                  <input value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs text-muted-foreground mb-1">Cover Image</label>
                <div className="flex items-center gap-3">
                  <input value={editing.image_url} onChange={e => setEditing({ ...editing, image_url: e.target.value })} placeholder="Image URL" className="flex-1 px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                  <label className="px-4 py-2 rounded-lg bg-muted text-foreground font-body text-sm cursor-pointer hover:bg-secondary transition-colors">
                    <Upload size={16} className="inline mr-1" /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadImage(file);
                        if (url) setEditing({ ...editing, image_url: url });
                      }
                    }} />
                  </label>
                </div>
              </div>
              <label className="flex items-center gap-2 font-body text-sm">
                <input type="checkbox" checked={editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} />
                Featured Tour
              </label>
              <button onClick={handleSave} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors">
                <Save size={16} className="inline mr-2" />{isNew ? "Create Tour" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tours list */}
      {tours.length === 0 ? (
        <p className="text-muted-foreground font-body">No tours yet. Add your first tour.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {t.image_url && <img src={t.image_url} alt={t.title} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{t.title}</h3>
                <p className="font-body text-xs text-muted-foreground mb-2">{t.duration_days} days · ${t.price} · {t.tour_type}</p>
                <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">{t.short_summary}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(t); setIsNew(false); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-muted text-foreground font-body text-xs hover:bg-secondary transition-colors">
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => deleteTour(t.id)} className="px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTours;
