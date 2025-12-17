import React, { useState } from 'react';
import { Layout } from '../components/Layout';

const FAQ = [
    { question: 'How do I submit an assignment?', answer: 'Go to the Assignments tab, select the assignment you want to submit, and click the "Upload Submission" button. You can upload PDF, DOCX, or ZIP files.' },
    { question: 'Can I join a live class from my mobile?', answer: 'Yes! CampusSync is mobile-first. You can join live classes directly from the app or mobile browser with full functionality.' },
    { question: 'How do I contact my professor?', answer: 'You can find contact details in the Department section under Faculty Directory. Alternatively, you can message them directly in the Doubt Clearing channel if they are online.' },
    { question: 'What if I miss a live class?', answer: 'All live classes are automatically recorded. You can find the recordings in the "Materials" section under the specific course folder.' },
];

const Help: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Layout>
            <div className="max-w-3xl mx-auto p-6 md:p-12 pb-24">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center size-16 rounded-full bg-surface-border mb-4 text-primary">
                        <span className="material-symbols-outlined text-4xl">support_agent</span>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2">How can we help?</h1>
                    <p className="text-text-secondary text-lg">Search for answers or contact our support team.</p>
                </div>

                <div className="relative mb-12">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">search</span>
                    <input type="text" placeholder="Describe your issue..." className="w-full bg-surface-dark border border-surface-border rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-lg shadow-lg" />
                </div>

                <div className="flex flex-col gap-8">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {FAQ.map((item, index) => (
                                <div key={index} className="bg-surface-dark border border-surface-border rounded-xl overflow-hidden transition-all">
                                    <button 
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex justify-between items-center p-5 text-left text-white font-bold hover:bg-surface-border/50 transition-colors"
                                    >
                                        {item.question}
                                        <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>expand_more</span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="p-5 pt-0 text-text-secondary leading-relaxed">{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-primary/10 to-surface-dark border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
                            <p className="text-text-secondary">Our academic support team is available 24/7.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none bg-surface-dark hover:bg-surface-border text-white font-bold py-3 px-6 rounded-xl border border-surface-border transition-colors">
                                Email Support
                            </button>
                            <button className="flex-1 md:flex-none bg-primary hover:bg-primary-hover text-background-dark font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-primary/20">
                                Live Chat
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Help;