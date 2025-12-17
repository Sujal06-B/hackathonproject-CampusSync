import React from 'react';
import { Layout } from '../components/Layout';
import { Material } from '../types';

const MATERIALS: Material[] = [
  { id: '1', name: 'Lecture 01 - Intro to Networks.pdf', type: 'pdf', date: '12 Oct 2023', size: '2.4 MB', downloads: 124 },
  { id: '2', name: 'Unit 1 Presentation.pptx', type: 'pptx', date: '10 Oct 2023', size: '5.1 MB', downloads: 89 },
  { id: '3', name: 'Assignment_1_Questions.docx', type: 'docx', date: '08 Oct 2023', size: '450 KB', downloads: 210 },
  { id: '4', name: 'Network_Topology_Diagram.png', type: 'image', date: '05 Oct 2023', size: '1.8 MB', downloads: 56 },
  { id: '5', name: 'Lab_Resources_Bundle.zip', type: 'zip', date: '01 Oct 2023', size: '15.2 MB', downloads: 34 },
];

const getIconForType = (type: string) => {
  switch (type) {
    case 'pdf': return { icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-500/10' };
    case 'pptx': return { icon: 'slideshow', color: 'text-orange-500', bg: 'bg-orange-500/10' };
    case 'docx': return { icon: 'description', color: 'text-blue-500', bg: 'bg-blue-500/10' };
    case 'image': return { icon: 'image', color: 'text-green-500', bg: 'bg-green-500/10' };
    case 'zip': return { icon: 'folder_zip', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    default: return { icon: 'article', color: 'text-gray-500', bg: 'bg-gray-500/10' };
  }
};

const MaterialCard: React.FC<{ item: Material }> = ({ item }) => {
  const style = getIconForType(item.type);
  return (
    <div className="group bg-surface-dark rounded-2xl p-4 border border-surface-border hover:border-primary/50 transition-all flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 z-10">
        <div className={`size-12 rounded-xl ${style.bg} flex items-center justify-center ${style.color}`}>
          <span className="material-symbols-outlined text-2xl">{style.icon}</span>
        </div>
        <button className="text-text-secondary hover:text-white p-1 rounded-full hover:bg-surface-border transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
      <div className="flex-1 mb-4 z-10">
        <h4 className="text-white font-semibold truncate" title={item.name}>{item.name}</h4>
        <p className="text-text-secondary text-xs mt-1">{item.date} • {item.size}</p>
      </div>
      <div className="flex items-center justify-between border-t border-surface-border pt-3 mt-auto z-10">
        <div className="flex items-center gap-1.5 text-text-secondary text-xs font-medium">
          <span className="material-symbols-outlined text-sm">download</span>
          <span>{item.downloads}</span>
        </div>
        <button className="size-8 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-background-dark flex items-center justify-center transition-all">
          <span className="material-symbols-outlined text-lg">download</span>
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

const Materials: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <nav className="flex flex-wrap gap-2 items-center mb-2 text-sm">
              <span className="text-text-secondary">Materials</span>
              <span className="material-symbols-outlined text-text-secondary text-sm">chevron_right</span>
              <span className="text-text-secondary">Computer Networks</span>
              <span className="material-symbols-outlined text-text-secondary text-sm">chevron_right</span>
              <span className="text-white bg-surface-border px-2 py-0.5 rounded-lg">Unit 1</span>
            </nav>
            <h1 className="text-3xl font-bold text-white">Unit 1: Introduction & Physical Layer</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center bg-surface-border rounded-full h-12 px-4 w-full sm:w-64 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <span className="material-symbols-outlined text-text-secondary">search</span>
              <input className="bg-transparent border-none text-white placeholder-text-secondary focus:ring-0 w-full text-sm ml-2 outline-none" placeholder="Search materials..." type="text" />
            </div>
          </div>
        </div>

        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-[#29382f] rounded-2xl opacity-20 group-hover:opacity-50 blur transition duration-500"></div>
           <div className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-surface-border rounded-2xl bg-background-dark hover:bg-surface-dark transition-all cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                 <div className="mb-3 p-3 rounded-full bg-surface-border text-primary group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                 </div>
                 <p className="mb-1 text-sm text-white font-medium">Click to upload or drag and drop</p>
                 <p className="text-xs text-text-secondary">PDF, PPTX, DOCX, JPG (MAX. 10MB)</p>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between">
           <h3 className="text-white font-bold text-lg">Course Files ({MATERIALS.length})</h3>
           <div className="flex gap-2">
              <button className="text-text-secondary hover:text-white text-sm font-medium flex items-center gap-1">
                 Date Added <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
           {MATERIALS.map(item => <MaterialCard key={item.id} item={item} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Materials;