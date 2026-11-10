// components/TermsOfService.tsx
import React from 'react';

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 py-16 px-4 md:px-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - Uniceps Style */}
        <header className="relative mb-16 p-8 rounded-3xl bg-[#111] border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)] text-center md:text-left">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 w-32 h-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4]"></div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            Terms of <span className="text-cyan-500">Service</span>
          </h1>
          <p className="text-cyan-500/60 font-mono text-sm uppercase tracking-widest">
            Last updated: December 31, 2025
          </p>
        </header>

        <div className="space-y-10 leading-relaxed text-gray-300">
          
          {/* 1. Agreement */}
          <section className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
              <span className="text-cyan-500">01.</span> Agreement to Terms
            </h2>
            <p className="text-gray-400">
              By accessing our website at <strong className="text-white">uniceps.trio-verse.com</strong> and using the 
              <strong className="text-cyan-500"> Uniceps</strong> application, you agree to be bound by these terms. 
              These services are provided by <strong className="text-white font-semibold">Trioverse</strong>.
            </p>
          </section>

          {/* 2. Health Disclaimer - Warning Style */}
          <section className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors rounded-2xl border border-amber-500/20"></div>
            <div className="relative p-6">
               <h2 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                <span className="text-2xl leading-none">⚠️</span> 02. Health & Fitness Disclaimer
              </h2>
              <p className="text-sm leading-relaxed text-amber-200/70">
                <strong className="text-amber-500 uppercase">Warning:</strong> Uniceps provides fitness routines and tracks physical measurements (weight, height, etc.). 
                Consult a physician before starting any exercise program. You perform these exercises 
                <strong className="text-amber-500"> at your own risk</strong>. Trioverse is not responsible for any physical injury or health complications.
              </p>
            </div>
          </section>

          {/* 3. Account Security */}
          <section className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
              <span className="text-cyan-500">03.</span> Account & Security
            </h2>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your <strong className="text-cyan-500">Entry Code</strong> and account details.
            </p>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-sm italic">
              Each subscription is personal and linked to your phone number and <span className="text-white">SyncID</span>. 
              Sharing access codes with other individuals is <span className="text-red-500 font-bold underline underline-offset-4 uppercase">strictly prohibited</span>.
            </div>
          </section>

          {/* 4. Data Syncing */}
          <section className="bg-[#111] p-6 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
               04. Data Syncing & API
            </h2>
            <p>
              Our services use <code className="bg-black px-2 py-1 rounded text-cyan-400 font-mono text-sm">uniapi.trio-verse.com</code> for data synchronization. 
              You agree not to attempt to access the API through unauthorized means or reverse-engineer the synchronization protocols.
            </p>
          </section>

          {/* 5. Termination */}
          <section className="p-6 border-l-2 border-red-500/30 pl-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
              <span className="text-red-500">05.</span> Termination
            </h2>
            <p className="text-gray-400">
              We reserve the right to suspend accounts that violate these terms, specifically in cases of 
              <span className="text-white font-medium"> data misuse</span> or <span className="text-white font-medium">fraudulent use of gym entry codes</span>.
            </p>
          </section>

          {/* 6. Contact */}
          <footer className="mt-16 pt-10 border-t border-white/5 text-center md:text-left">
            <div className="inline-block bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-lg font-bold text-white mb-2 italic">06. Legal Contact</h2>
              <p className="text-sm text-gray-400">For any legal inquiries regarding these terms, contact:</p>
              <p className="mt-2 text-cyan-500 font-mono font-bold hover:underline cursor-pointer tracking-wider">
                unicepse@gmail.com
              </p>
            </div>
            <p className="mt-12 text-gray-600 text-[10px] tracking-[0.3em] uppercase font-mono">
              © 2025 TRIOVERSE - UNICEPS. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;