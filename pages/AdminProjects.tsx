
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { getProjects, saveProjects } from '../constants';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
    }
  };

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-12">
      <header className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div className="space-y-2">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px]">Portfolio Management</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-refenti-charcoal uppercase leading-none">Global <span className="text-refenti-gold italic">Assets</span></h1>
        </div>
        <button 
          onClick={() => navigate('/admin/projects/new')}
          className="bg-refenti-charcoal text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-refenti-gold transition-all"
        >
          New Project
        </button>
      </header>

      <div className="grid gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 flex items-center justify-between group hover:shadow-xl transition-all duration-700">
            <div className="flex items-center gap-10">
              <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
                <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
              </div>
              <div>
                <h3 className="font-display text-3xl text-refenti-charcoal leading-none mb-2">{p.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">{p.location} • {p.type}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate(`/admin/projects/edit/${p.id}`)}
                className="bg-gray-50 px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-refenti-gold hover:text-white transition-all"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(p.id)}
                className="bg-red-50 text-red-400 px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-red-400 hover:text-white transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
