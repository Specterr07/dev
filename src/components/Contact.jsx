import React from "react";

export default function Contact() {
    return (
        <section id="contact" className="max-w-2xl mx-auto px-6 py-20">
            
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Let's Connect</h2>
                <p className="text-slate-600 mt-4">
                    I am currently open to full-time opportunities and freelance work.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
                
                <a href="https://www.linkedin.com/in/vivek-patel-v7/" target="_blank" 
                className="flex items-center justify-center gap-2 bg-[#0077b5] text-white py-4 rounded-xl font-bold hover:bg-[#006396] transition shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/></svg>
                    Connect on LinkedIn
                </a>

                <a href="Vivek_Patel_Software_Developer.pdf" target="_blank" 
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 py-4 rounded-xl font-bold hover:border-slate-900 hover:text-slate-900 transition shadow-sm hover:shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    View Resume
                </a>

            </div>

            <div className="relative flex py-5 items-center mb-10">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR SEND AN EMAIL</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form action="https://formspree.io/f/xwvpoveq" method="POST" className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition" placeholder="John Doe"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition" placeholder="john@example.com"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <textarea name="message" rows="4" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition" placeholder="Tell me about your project..."></textarea>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition transform hover:-translate-y-1">
                    Send Message
                </button>

            </form>

        </section>
    );
};