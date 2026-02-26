import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit, Save, X, Upload } from "lucide-react";

const emptyDest = { name: "", slug: "", description: "", location: "", cultural_significance: "", image_url: "", sort_order: 0 };

const AdminDestinations = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  const fetchData = async () => {
    const { data } = await supabase.from("destinations").select("*").order("sort_order");
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const { id, created_at, updated_at, ...rest } = editing;
    if (isNew) {
      await supabase.from("destinations").insert(rest);
    } else {
      await supabase.from("destinations").update(rest).eq("id", id);
    }
    setEditing(null); setIsNew(false); fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this destination?")) return;
    await supabase.from("destinations").delete().eq("id", id);
    fetchData();
  };

  const uploadImage = async (file: File) => {
    const fileName = `destinations/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) { alert("Upload failed"); return null; }
    const { data: { publicUrl } } = supabase.storage.from("uploads").getPublicUrl(data.path);
    return publicUrl;
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">Manage Destinations</h1>
        <button onClick={() => { setEditing({ ...emptyDest }); setIsNew(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-accent transition-colors">
          <Plus size={16} /> Add Destination
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">{isNew ? "Add Destination" : "Edit Destination"}</h2>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Name" className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
              <input value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} placeholder="Slug" className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
              <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm resize-none" />
              <input value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} placeholder="Location" className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
              <textarea value={editing.cultural_significance} onChange={e => setEditing({ ...editing, cultural_significance: e.target.value })} placeholder="Cultural Significance" rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm resize-none" />
              <div className="flex items-center gap-3">
                <input value={editing.image_url} onChange={e => setEditing({ ...editing, image_url: e.target.value })} placeholder="Image URL" className="flex-1 px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                <label className="px-4 py-2 rounded-lg bg-muted text-foreground font-body text-sm cursor-pointer hover:bg-secondary transition-colors">
                  <Upload size={16} className="inline mr-1" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) { const url = await uploadImage(file); if (url) setEditing({ ...editing, image_url: url }); }
                  }} />
                </label>
              </div>
              <button onClick={handleSave} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors">
                <Save size={16} className="inline mr-2" />{isNew ? "Create" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((d) => (
          <div key={d.id} className="bg-card border border-border rounded-xl overflow-hidden">
            {d.image_url && <img src={d.image_url} alt={d.name} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">{d.name}</h3>
              <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">{d.description}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(d); setIsNew(false); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-muted text-foreground font-body text-xs hover:bg-secondary transition-colors"><Edit size={14} /> Edit</button>
                <button onClick={() => deleteItem(d.id)} className="px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDestinations;
