
import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { getEvents, saveEvents } from '../constants';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EventItem>>({ title: '', date: '', location: '', image: '', details: '', isFeatured: false });

  useEffect(() => { setEvents(getEvents()); }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    let updated: EventItem[];
    if (editingId) {
      updated = events.map(ev => ev.id === editingId ? { ...ev, ...formData } as EventItem : ev);
    } else {
      updated = [...events, { ...formData, id: Date.now().toString() } as EventItem];
    }
    setEvents(updated);
    saveEvents(updated);
    resetForm();
  };

  const handleEdit = (ev: EventItem) => { setEditingId(ev.id); setFormData(ev); };
  const handleDelete = (id: string) => { if (confirm('Delete engagement?')) { const u = events.filter(e => e.id !== id); setEvents(u); saveEvents(u); } };
  const toggleFeatured = (id: string) => { const u = events.map(e => e.id === id ? { ...e, isFeatured: !e.isFeatured } : e); setEvents(u); saveEvents(u); };
  const resetForm = () => { setEditingId(null); setFormData({ title: '', date: '', location: '', image: '', details: '', isFeatured: false }); };

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-16 pb-40">
      <header className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px]">Engagement Management</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-refenti-charcoal uppercase leading-none">Global <span className="text-refenti-gold italic">Events</span></h1>
        </div>
        <button onClick={resetForm} className="bg-refenti-charcoal text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase hover:bg-refenti-gold transition-all shadow-lg">New Event</button>
      </header>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Editor Form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-xl space-y-10 sticky top-28">
            <h2 className="font-display text-3xl uppercase italic text-refenti-charcoal border-b border-gray-50 pb-6">
              {editingId ? 'Modify Event' : 'Create Event'}
            </h2>
            <form onSubmit={handleSave} className="space-y-10">
              {[
                { label: 'Event Identity', key: 'title', placeholder: 'e.g. Private Investor Gala' },
                { label: 'Calendar Date', key: 'date', placeholder: 'Dec 15, 2024' },
                { label: 'Venue Location', key: 'location', placeholder: 'Refenti Showroom, Bole' },
                { label: 'Media Source (URL)', key: 'image', placeholder: 'https://...' },
              ].map(field => (
                <div key={field.key} className="space-y-2 group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold group-focus-within:text-refenti-charcoal transition-colors">
                    {field.label}
                  </label>
                  <input 
                    placeholder={field.placeholder}
                    value={formData[field.key as keyof EventItem] as string} 
                    onChange={e => setFormData({...formData, [field.key]: e.target.value})} 
                    className="w-full border-b-2 border-gray-100 py-3 text-refenti-charcoal font-medium text-xl focus:outline-none focus:border-refenti-gold transition-all bg-transparent placeholder:text-gray-200" 
                  />
                </div>
              ))}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold">Event Brief</label>
                <textarea 
                  placeholder="Detailed description of the event..." 
                  value={formData.details} 
                  onChange={e => setFormData({...formData, details: e.target.value})} 
                  rows={4} 
                  className="w-full bg-refenti-offwhite/50 p-6 rounded-[2rem] text-refenti-charcoal text-base font-medium focus:outline-none border-2 border-transparent focus:border-refenti-gold transition-all placeholder:text-gray-200 leading-relaxed" 
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-ultra cursor-pointer text-refenti-charcoal group">
                  <input 
                    type="checkbox" 
                    checked={formData.isFeatured} 
                    onChange={e => setFormData({...formData, isFeatured: e.target.checked})} 
                    className="w-5 h-5 rounded border-2 border-gray-200 text-refenti-gold focus:ring-refenti-gold transition-all" 
                  />
                  Featured on Home Page
                </label>
              </div>
              
              <button type="submit" className="w-full bg-refenti-charcoal text-white py-6 rounded-[2rem] text-[10px] font-bold uppercase tracking-ultra hover:bg-refenti-gold transition-all shadow-2xl active:scale-[0.98]">
                {editingId ? 'Confirm Updates' : 'Publish Engagement'}
              </button>
            </form>
          </div>
        </div>

        {/* List view */}
        <div className="lg:col-span-7 grid gap-6">
          {events.length === 0 ? (
            <div className="bg-white p-32 rounded-[4rem] text-center border-2 border-dashed border-gray-100">
               <p className="text-gray-300 font-display text-3xl italic">Engagements list empty.</p>
            </div>
          ) : (
            events.map(ev => (
              <div key={ev.id} className="bg-white p-10 rounded-[3.5rem] border border-gray-50 flex items-center justify-between group hover:shadow-2xl transition-all duration-700">
                <div className="flex items-center gap-10">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex-shrink-0">
                    <img src={ev.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <p className="text-refenti-gold text-[9px] font-bold uppercase tracking-ultra mb-2">{ev.date}</p>
                    <h3 className="font-display text-3xl text-refenti-charcoal leading-none mb-2">{ev.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{ev.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => toggleFeatured(ev.id)} 
                    className={`text-[9px] font-bold uppercase tracking-widest px-6 py-3 rounded-full border-2 transition-all ${ev.isFeatured ? 'bg-refenti-gold text-white border-refenti-gold shadow-lg scale-105' : 'border-gray-100 text-gray-300 hover:border-refenti-gold/40 hover:text-refenti-gold'}`}
                  >
                    {ev.isFeatured ? 'Featured' : 'Regular'}
                  </button>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleEdit(ev)} className="text-[9px] font-bold uppercase tracking-widest text-refenti-gold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(ev.id)} className="text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
