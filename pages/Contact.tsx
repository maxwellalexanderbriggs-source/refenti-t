
import React, { useEffect, useState } from 'react';
import { getInquiries, saveInquiries } from '../constants';
import { Inquiry } from '../types';

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Property Acquisition', message: '' });
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newInquiry: Inquiry = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const current = getInquiries();
    saveInquiries([...current, newInquiry]);
    
    setIsSent(true);
    setFormData({ name: '', email: '', type: 'Property Acquisition', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-8 md:space-y-12 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-4">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Direct Engagement</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light text-refenti-charcoal tracking-tight leading-none uppercase">Connect</h1>
          </div>
        </div>
      </section>

      <div className="py-12 md:py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            
            {/* Details */}
            <div className="md:col-span-5 space-y-8 md:space-y-12 reveal">
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-display text-4xl md:text-5xl font-light text-refenti-charcoal uppercase">Inquiries</h2>
                <p className="text-refenti-gold font-display font-bold uppercase tracking-widest text-[10px] md:text-xs">The Refenti Group Experience</p>
              </div>
              
              <div className="space-y-8 md:space-y-10">
                {[
                  { label: 'Email', val: 'info@refenti.com' },
                  { label: 'Phone', val: '+251 986 1986 86' },
                  { label: 'Location', val: 'CBD, Addis Ababa, Ethiopia' }
                ].map(item => (
                  <div key={item.label} className="space-y-1 md:space-y-2 group reveal">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.label}</p>
                    <p className="text-xl md:text-2xl font-light group-hover:text-refenti-gold transition-colors break-words">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7 bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-50 reveal">
              {isSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                   <div className="w-20 h-20 bg-refenti-gold/10 rounded-full flex items-center justify-center">
                     <svg className="w-10 h-10 text-refenti-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <h3 className="font-display text-4xl text-refenti-charcoal">Engaged.</h3>
                   <p className="text-gray-400 font-light">Your inquiry has been encrypted and sent to our executive team. We will reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3 md:space-y-4 reveal">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Identity</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light bg-transparent"
                      />
                    </div>
                    <div className="space-y-3 md:space-y-4 reveal">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Reach</label>
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light bg-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4 reveal">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Nature of Inquiry</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light appearance-none bg-transparent"
                    >
                      <option>Property Acquisition</option>
                      <option>Exclusive Leasing</option>
                      <option>Institutional Investment</option>
                    </select>
                  </div>

                  <div className="space-y-3 md:space-y-4 reveal">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Detailed Request</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your architectural requirements..." 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light resize-none bg-transparent"
                    />
                  </div>

                  <button className="w-full bg-refenti-charcoal text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-sans font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-refenti-gold transition-all duration-500 shadow-2xl reveal">
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
