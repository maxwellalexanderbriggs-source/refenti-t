
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project, ProjectDetailSection } from '../types';
import { getProjects, saveProjects } from '../constants';

const AdminInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; small?: boolean }> = ({ label, value, onChange, placeholder, small }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold group-focus-within:text-refenti-charcoal transition-colors">
      {label}
    </label>
    <input 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className={`w-full border-b-2 border-gray-200 bg-transparent py-4 focus:outline-none focus:border-refenti-gold text-refenti-charcoal font-medium transition-all placeholder:text-gray-300 ${small ? 'text-base' : 'text-3xl md:text-4xl'}`} 
    />
  </div>
);

const AdminProjectEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    type: 'Sales',
    location: '',
    image: '',
    description: '',
    brochureUrl: '',
    introTitle: '',
    introText: '',
    introImage: '',
    projectFeatures: [],
    detailSections: []
  });

  useEffect(() => {
    if (id) {
      const projects = getProjects();
      const project = projects.find(p => p.id === id);
      if (project) setFormData(project);
    }
  }, [id]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const projects = getProjects();
    let updated: Project[];
    const pid = id || formData.name.toLowerCase().replace(/\s+/g, '-');

    const projectData = { ...formData, id: pid } as Project;

    if (id) {
      updated = projects.map(p => p.id === id ? projectData : p);
    } else {
      updated = [...projects, projectData];
    }

    saveProjects(updated);
    navigate('/admin/projects');
  };

  const addFeature = () => setFormData(prev => ({ ...prev, projectFeatures: [...(prev.projectFeatures || []), ''] }));
  const updateFeature = (i: number, v: string) => {
    const updated = [...(formData.projectFeatures || [])];
    updated[i] = v;
    setFormData(prev => ({ ...prev, projectFeatures: updated }));
  };
  const removeFeature = (i: number) => setFormData(prev => ({ ...prev, projectFeatures: prev.projectFeatures?.filter((_, idx) => idx !== i) }));

  const addDetailSection = () => setFormData(prev => ({ ...prev, detailSections: [...(prev.detailSections || []), { title: '', text: '', image: '' }] }));
  const updateDetailSection = (i: number, field: keyof ProjectDetailSection, v: string) => {
    const updated = [...(formData.detailSections || [])];
    updated[i] = { ...updated[i], [field]: v };
    setFormData(prev => ({ ...prev, detailSections: updated }));
  };
  const removeDetailSection = (i: number) => setFormData(prev => ({ ...prev, detailSections: prev.detailSections?.filter((_, idx) => idx !== i) }));

  return (
    <div className="p-8 md:p-16 max-w-5xl mx-auto pb-40">
      <header className="flex items-center gap-8 mb-16">
        <button 
          onClick={() => navigate('/admin/projects')} 
          className="text-gray-400 hover:text-refenti-charcoal transition-colors uppercase font-bold tracking-widest text-[10px] flex items-center gap-2"
        >
          <span className="text-lg">←</span> Back to Assets
        </button>
        <h1 className="font-display text-5xl font-light uppercase text-refenti-charcoal">Project <span className="text-refenti-gold italic">Editor</span></h1>
      </header>

      <form onSubmit={handleSave} className="space-y-20 bg-white p-10 md:p-20 rounded-[4rem] shadow-xl border border-gray-100">
        {/* Primary Identification */}
        <div className="space-y-12">
          <h2 className="text-[11px] font-bold uppercase tracking-ultra text-gray-300 border-b border-gray-50 pb-4">Identification</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <AdminInput label="Project Name" value={formData.name || ''} onChange={v => setFormData({...formData, name: v})} placeholder="e.g. Bole High-Rise" />
            <AdminInput label="Location" value={formData.location || ''} onChange={v => setFormData({...formData, location: v})} placeholder="e.g. Bole, Addis Ababa" />
          </div>
        </div>

        {/* Media & Resources */}
        <div className="space-y-12">
          <h2 className="text-[11px] font-bold uppercase tracking-ultra text-gray-300 border-b border-gray-50 pb-4">Media & Resources</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <AdminInput label="Hero Banner URL" value={formData.image || ''} onChange={v => setFormData({...formData, image: v})} small placeholder="https://images.unsplash.com/..." />
            <AdminInput label="Brochure URL" value={formData.brochureUrl || ''} onChange={v => setFormData({...formData, brochureUrl: v})} small placeholder="#" />
          </div>
        </div>

        {/* Introductory Content */}
        <div className="space-y-12">
          <h2 className="text-[11px] font-bold uppercase tracking-ultra text-gray-300 border-b border-gray-50 pb-4">Storytelling</h2>
          <AdminInput label="Intro Headline" value={formData.introTitle || ''} onChange={v => setFormData({...formData, introTitle: v})} />
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold">Narrative Description</label>
            <textarea 
              value={formData.introText} 
              onChange={e => setFormData({...formData, introText: e.target.value})} 
              placeholder="Provide a compelling narrative for this project..." 
              rows={6} 
              className="w-full p-8 bg-refenti-offwhite/50 rounded-[2.5rem] focus:outline-none border-2 border-transparent focus:border-refenti-gold text-refenti-charcoal text-lg font-medium transition-all leading-relaxed placeholder:text-gray-300" 
            />
          </div>
        </div>

        {/* Features Pills */}
        <div className="space-y-8 pt-12 border-t border-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-3xl font-light uppercase text-refenti-charcoal">Feature <span className="text-refenti-gold italic">Attributes</span></h2>
            <button type="button" onClick={addFeature} className="text-[10px] font-bold uppercase underline tracking-widest text-refenti-gold hover:text-refenti-charcoal transition-colors">Add Attribute</button>
          </div>
          <div className="flex flex-wrap gap-4">
            {formData.projectFeatures?.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white px-6 py-4 rounded-full border-2 border-gray-100 group focus-within:border-refenti-gold transition-all">
                <input 
                  value={f} 
                  onChange={e => updateFeature(i, e.target.value)} 
                  className="bg-transparent border-none text-[11px] font-bold uppercase tracking-widest focus:ring-0 w-32 text-refenti-charcoal" 
                  placeholder="Feature..."
                />
                <button type="button" onClick={() => removeFeature(i)} className="text-gray-300 hover:text-red-500 font-bold transition-colors">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Sections */}
        <div className="space-y-12 pt-12 border-t border-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-3xl font-light uppercase text-refenti-charcoal">Detailed <span className="text-refenti-gold italic">Showcases</span></h2>
            <button type="button" onClick={addDetailSection} className="text-[10px] font-bold uppercase underline tracking-widest text-refenti-gold hover:text-refenti-charcoal transition-colors">Add Section</button>
          </div>
          <div className="space-y-16">
            {formData.detailSections?.map((s, i) => (
              <div key={i} className="p-10 md:p-16 bg-refenti-offwhite/30 rounded-[4rem] border-2 border-gray-100 relative group space-y-10 hover:border-refenti-gold/20 transition-all">
                <button 
                  type="button" 
                  onClick={() => removeDetailSection(i)} 
                  className="absolute top-10 right-12 text-gray-300 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
                >
                  REMOVE SECTION
                </button>
                <div className="grid md:grid-cols-2 gap-12 pt-8">
                  <AdminInput label="Section Title" value={s.title} onChange={v => updateDetailSection(i, 'title', v)} small placeholder="e.g. Penthouse Interiors" />
                  <AdminInput label="Media Source (URL)" value={s.image} onChange={v => updateDetailSection(i, 'image', v)} small placeholder="https://..." />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-refenti-gold">Section Copy</label>
                  <textarea 
                    placeholder="Describe this specific feature or area..." 
                    value={s.text} 
                    onChange={e => updateDetailSection(i, 'text', e.target.value)} 
                    rows={4} 
                    className="w-full bg-white p-8 rounded-[2rem] border-2 border-transparent shadow-sm text-base text-refenti-charcoal font-medium leading-relaxed focus:border-refenti-gold focus:outline-none transition-all placeholder:text-gray-300" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-refenti-charcoal text-white py-10 rounded-[2.5rem] font-sans font-bold uppercase tracking-ultra hover:bg-refenti-gold transition-all shadow-2xl active:scale-[0.99]"
        >
          Publish Project Updates
        </button>
      </form>
    </div>
  );
};

export default AdminProjectEditor;
