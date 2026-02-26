import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Upload, X, Save } from "lucide-react";

const AdminGallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", description: "", media_url: "", media_type: "image" });

  const fetchData = async () => {
    const { data } = await supabase.from("gallery_posts").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const uploadFile = async (file: File) => {
    const fileName = `gallery/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("uploads").upload(fileName, file);
    if (error) { alert("Upload failed"); return null; }
    const { data: { publicUrl } } = supabase.storage.from("uploads").getPublicUrl(data.path);
    return publicUrl;
  };

  const handleAdd = async () => {
    if (!newPost.media_url) { alert("Please upload or enter a media URL"); return; }
    await supabase.from("gallery_posts").insert(newPost);
    setShowAdd(false);
    setNewPost({ title: "", description: "", media_url: "", media_type: "image" });
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this gallery post?")) return;
    await supabase.from("gallery_posts").delete().eq("id", id);
    fetchData();
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase.from("gallery_posts").update({ published: !published }).eq("id", id);
    fetchData();
  };

  if (loading) return <p className="text-muted-foreground font-body">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">Gallery</h1>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:bg-accent transition-colors">
          <Plus size={16} /> Add Post
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">Add Gallery Post</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Title (optional)" className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
              <textarea value={newPost.description} onChange={e => setNewPost({ ...newPost, description: e.target.value })} placeholder="Description (optional)" rows={2} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm resize-none" />
              <div className="flex items-center gap-3">
                <input value={newPost.media_url} onChange={e => setNewPost({ ...newPost, media_url: e.target.value })} placeholder="Media URL" className="flex-1 px-3 py-2 rounded-lg border border-border bg-background font-body text-sm" />
                <label className="px-4 py-2 rounded-lg bg-muted text-foreground font-body text-sm cursor-pointer hover:bg-secondary transition-colors">
                  <Upload size={16} className="inline mr-1" /> Upload
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const type = file.type.startsWith("video") ? "video" : "image";
                      const url = await uploadFile(file);
                      if (url) setNewPost({ ...newPost, media_url: url, media_type: type });
                    }
                  }} />
                </label>
              </div>
              {newPost.media_url && <img src={newPost.media_url} alt="Preview" className="h-40 w-full object-cover rounded-lg" />}
              <button onClick={handleAdd} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors">
                <Save size={16} className="inline mr-2" /> Publish
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((p) => (
          <div key={p.id} className="relative bg-card border border-border rounded-xl overflow-hidden group">
            <img src={p.media_url} alt={p.title || ""} className="h-48 w-full object-cover" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button onClick={() => togglePublish(p.id, p.published)} className="px-3 py-1.5 rounded-lg bg-card font-body text-xs">
                {p.published ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => deleteItem(p.id)} className="px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground font-body text-xs">
                <Trash2 size={14} />
              </button>
            </div>
            {p.title && <p className="px-3 py-2 font-body text-sm truncate">{p.title}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
