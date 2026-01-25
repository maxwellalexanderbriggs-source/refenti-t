
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { getNews, saveNews } from '../constants';

const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NewsItem>>({ title: '', category: '', date: '', excerpt: '', image: '' });

  useEffect(() => { setNews(getNews()); }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    let updated: NewsItem[];
    if (editingId) {
      updated = news.map(n => n.id === editingId ? { ...n, ...formData } as NewsItem : n);
    } else {
      updated = [...news, { ...formData, id: 'n' + Date.now() } as NewsItem];
    }
    setNews(updated);
    saveNews(updated);
    resetForm();
  };

  const handleEdit = (n: NewsItem) => { setEditingId(n.id); setFormData(n); };
  const handleDelete = (id: string) => { if (confirm('Delete news story?')) { const u = news.filter(n => n.id !== id); setNews(u); saveNews(u); } };
  const resetForm = () => { setEditingId(null); setFormData({ title: '', category: '', date: '', excerpt: '', image: '' }); };

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-16 pb-40">
      <header className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px]">Journal Management</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-refenti-charcoal uppercase leading-none">Editorial <span className="text-refenti-gold italic">Feed</span></h1>
        </div>
        <button onClick={resetForm} className="bg-refenti-charcoal text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase hover:bg-refenti-gold transition-all shadow-lg">New Story</button>
      </header>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Editor Form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-xl space-y-10 sticky top-28">
            <h2 className="font-display text-3xl uppercase italic text-refenti-charcoal border-b border-gray-50 pb-6">
              {editingId ? 'Modify Story' : 'New Story'}
            </h2>
            <form onSubmit={handleSave} className="space-y-10">
              {[
                { label: 'Article Headline', key: 'title', placeholder: 'The Future of Addis Architecture' },
                { label: 'Journal Category', key: 'category', placeholder: 'Architecture, Investment' },
                { label: 'Publishing Date', key: 'date', placeholder: 'Nov 12, 2024' },
                { label: 'Hero Cover (URL)', key: 'image', placeholder: 'https://...' },
              ].map(field => (
                <div key={field.key} className="space-y-2 group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold group-focus-within:text-refenti-charcoal transition-colors">
                    {field.label}
                  </label>
                  <input 
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof NewsItem] as string} 
                    onChange={e => setFormData({...formData, [field.key]: e.target.value})} 
                    className="w-full border-b-2 border-gray-100 py-3 text-refenti-charcoal font-medium text-xl focus:outline-none focus:border-refenti-gold transition-all bg-transparent placeholder:text-gray-200" 
                  />
                </div>
              ))}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold">Article Excerpt</label>
                <textarea 
                  placeholder="Short, high-impact summary for the feed..." 
                  value={formData.excerpt} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                  rows={4} 
                  className="w-full bg-refenti-offwhite/50 p-6 rounded-[2rem] text-refenti-charcoal text-base font-medium focus:outline-none border-2 border-transparent focus:border-refenti-gold transition-all placeholder:text-gray-200 leading-relaxed" 
                />
              </div>

              <button type="submit" className="w-full bg-refenti-charcoal text-white py-6 rounded-[2rem] text-[10px] font-bold uppercase tracking-ultra hover:bg-refenti-gold transition-all shadow-2xl active:scale-[0.98]">
                {editingId ? 'Confirm Editorial' : 'Publish Story'}
              </button>
            </form>
          </div>
        </div>

        {/* List View */}
        <div className="lg:col-span-7 grid gap-8">
          {news.length === 0 ? (
            <div className="bg-white p-32 rounded-[4rem] text-center border-2 border-dashed border-gray-100">
               <p className="text-gray-300 font-display text-3xl italic">Editorial feed empty.</p>
            </div>
          ) : (
            news.map(n => (
              <div key={n.id} className="bg-white p-10 rounded-[3.5rem] border border-gray-50 flex items-center justify-between group hover:shadow-2xl transition-all duration-700">
                <div className="flex items-center gap-10">
                  <div className="w-28 h-28 rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex-shrink-0">
                    <img src={n.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="max-w-md space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-refenti-gold text-[9px] font-bold uppercase tracking-ultra">{n.category}</span>
                      <span className="w-4 h-[1px] bg-gray-100" />
                      <span className="text-gray-300 text-[9px] font-bold uppercase tracking-ultra">{n.date}</span>
                    </div>
                    <h3 className="font-display text-3xl text-refenti-charcoal leading-tight">{n.title}</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleEdit(n)} className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold hover:underline bg-refenti-offwhite/50 px-6 py-3 rounded-xl transition-all hover:bg-white border border-transparent hover:border-gray-100">Edit</button>
                  <button onClick={() => handleDelete(n.id)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 px-6 py-3 transition-all">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
