
import React, { useState, useEffect, useRef } from 'react';
import { Inquiry } from '../types';
import { getInquiries, saveInquiries } from '../constants';

type FilterType = 'name' | 'email' | 'type' | 'date';

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<FilterType>('name');
  const [filterValue, setFilterValue] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setInquiries(getInquiries()); 
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Permanently delete this record?')) {
      const u = inquiries.filter(i => i.id !== id);
      setInquiries(u);
      saveInquiries(u);
      if (expandedId === id) setExpandedId(null);
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (!filterValue) return true;
    const search = filterValue.toLowerCase();
    switch (filterBy) {
      case 'name': return i.name.toLowerCase().includes(search);
      case 'email': return i.email.toLowerCase().includes(search);
      case 'type': return i.type.toLowerCase().includes(search);
      case 'date': return i.date.toLowerCase().includes(search);
      default: return true;
    }
  }).reverse();

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'type', label: 'Type' },
    { value: 'date', label: 'Date' },
  ];

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-12 pb-40">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-12 gap-8">
        <div className="space-y-2">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px]">Engagement Portal</p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-none">Global <span className="text-refenti-gold italic">Inquiries</span></h1>
        </div>
        
        {/* Refined Filter System */}
        <div className="flex items-center bg-white rounded-[2rem] shadow-sm border border-gray-200 group focus-within:shadow-xl transition-all h-14 relative">
          <div className="relative h-full" ref={filterRef}>
            <button 
              type="button"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="h-full px-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-refenti-gold hover:bg-refenti-offwhite transition-colors border-r border-gray-200 rounded-l-[2rem]"
            >
              Filter By: <span className="text-refenti-charcoal">{filterOptions.find(o => o.value === filterBy)?.label}</span>
              <svg 
                className={`w-2 h-2 transition-transform duration-500 ${isFilterMenuOpen ? 'rotate-180' : ''}`} 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Custom Dropdown Interface */}
            {isFilterMenuOpen && (
              <div className="absolute top-[calc(100%+0.5rem)] left-0 w-56 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-200 py-3 z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="px-6 py-2 border-b border-gray-100 mb-2">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-gray-500">Select Parameter</p>
                </div>
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFilterBy(option.value);
                      setIsFilterMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all
                      ${filterBy === option.value ? 'text-refenti-gold bg-refenti-offwhite' : 'text-gray-600 hover:text-refenti-charcoal hover:bg-gray-50 hover:pl-10'}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center px-6 flex-1">
            <input 
              type="text"
              placeholder={`Search ${filterBy}...`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full bg-transparent py-3 text-refenti-charcoal font-medium text-xs focus:outline-none placeholder:text-gray-400"
            />
            {filterValue && (
              <button 
                onClick={() => setFilterValue('')} 
                className="ml-2 text-gray-400 hover:text-refenti-gold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white p-32 rounded-[4rem] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-display text-3xl italic">No matching engagement records found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table Headers */}
            <div className="hidden lg:grid grid-cols-12 px-12 py-4 text-[8px] font-bold uppercase tracking-ultra text-gray-500 select-none">
               <div className="col-span-2">Date Received</div>
               <div className="col-span-3">Full Identity</div>
               <div className="col-span-3">Nature of Inquiry</div>
               <div className="col-span-4 text-right">Action</div>
            </div>

            {filteredInquiries.map(i => {
              const isExpanded = expandedId === i.id;
              return (
                <div 
                  key={i.id} 
                  className={`
                    group bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-200 transition-all duration-700 overflow-hidden
                    ${isExpanded ? 'shadow-2xl ring-2 ring-refenti-gold/10 scale-[1.01]' : 'hover:shadow-lg hover:border-gray-300'}
                  `}
                >
                  {/* Summary Line Row */}
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : i.id)}
                    className="px-12 py-7 lg:grid lg:grid-cols-12 items-center gap-4 flex flex-col lg:flex-row text-center lg:text-left cursor-pointer"
                  >
                    <div className="col-span-2 text-[10px] font-bold tracking-widest text-gray-500">{i.date}</div>
                    <div className="col-span-3">
                       <h3 className={`font-display text-2xl transition-colors duration-500 ${isExpanded ? 'text-refenti-gold' : 'text-refenti-charcoal'}`}>
                         {i.name}
                       </h3>
                    </div>
                    <div className="col-span-3">
                       <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${isExpanded ? 'text-refenti-gold' : 'text-gray-600 group-hover:text-refenti-gold'}`}>
                         {i.type}
                       </span>
                    </div>
                    <div className="col-span-4 flex justify-end items-center gap-8 w-full lg:w-auto">
                       <div className={`text-[9px] font-bold uppercase tracking-widest transition-colors py-2 px-6 rounded-full border ${isExpanded ? 'text-refenti-gold bg-refenti-gold/5 border-refenti-gold/20' : 'text-gray-400 border-transparent group-hover:text-refenti-charcoal group-hover:border-gray-200'}`}>
                         {isExpanded ? 'Close Record' : 'View Details'} 
                         <span className="ml-2 inline-block transition-transform duration-700" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}>
                           ▼
                         </span>
                       </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <div className={`
                    overflow-hidden transition-all duration-1000 ease-in-out bg-refenti-offwhite/30
                    ${isExpanded ? 'max-h-[1000px] opacity-100 border-t border-gray-200' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="p-10 md:p-16 space-y-12">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="space-y-6">
                           <div className="space-y-2">
                             <p className="text-[9px] font-bold uppercase tracking-ultra text-gray-500">Correspondence Channel</p>
                             <p className="text-2xl md:text-3xl font-light text-refenti-charcoal break-all">{i.email}</p>
                           </div>
                           <div className="flex items-center gap-6">
                             <div className="w-12 h-px bg-refenti-gold" />
                             <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[9px]">Documented Inquiry</p>
                           </div>
                        </div>
                        <button 
                           onClick={(e) => handleDelete(e, i.id)} 
                           className="bg-white border border-red-200 text-red-500 px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-ultra hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center gap-3"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           Archive Record
                         </button>
                      </div>

                      <div className="space-y-6">
                        <p className="text-[9px] font-bold uppercase tracking-ultra text-gray-500">Narrative Submission</p>
                        <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-inner relative overflow-hidden">
                           <span className="absolute top-8 left-10 text-[12rem] text-refenti-gold opacity-5 font-display select-none">“</span>
                           <p className="text-gray-700 font-display text-2xl md:text-4xl font-light leading-relaxed italic relative z-10 px-4 md:px-8">
                             {i.message}
                           </p>
                           <span className="absolute -bottom-16 -right-10 text-[12rem] text-refenti-gold opacity-5 font-display select-none">”</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
