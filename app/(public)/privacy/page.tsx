// app/privacy/page.tsx
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 py-16 px-4 md:px-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="relative mb-16 p-8 rounded-3xl bg-[#111] border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
          <div className="absolute top-0 left-10 w-32 h-1 bg-cyan-500"></div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            Privacy <span className="text-cyan-500">Policy</span>
          </h1>
          <p className="text-cyan-500/60 font-mono text-sm uppercase tracking-widest">
            Last updated: October 22, 2024
          </p>
        </header>

        {/* Content Section */}
        <div className="space-y-10 leading-relaxed text-gray-300">
          
          <section className="bg-[#111] p-6 rounded-2xl border border-white/5">
            <p className="mb-4">
              This Privacy Notice for <strong>Trioverse</strong> (doing business as <strong>Uniceps</strong>) ( "we," "us," or "our" ), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-400">
              <li>Download and use our mobile application (Uniceps), or any other application of ours that links to this Privacy Notice</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            <p className="mt-4">
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <span className="text-cyan-500 underline underline-offset-4">unicepse@gmail.com</span>.
            </p>
          </section>

          {/* Key Points Summary */}
          <section className="border-l-2 border-cyan-500/30 pl-6 space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">Summary of Key Points</h2>
            <div className="text-sm space-y-4 text-gray-400">
              <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us...</p>
              <p><strong>Do we process any sensitive personal information?</strong> We may process sensitive personal information when necessary with your consent...</p>
              <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
            </div>
          </section>

          <hr className="border-white/5" />

          {/* Table of Contents */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Table of Contents</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium">
              {[
                "1. WHAT INFORMATION DO WE COLLECT?",
                "2. HOW DO WE PROCESS YOUR INFORMATION?",
                "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
                "4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
                "5. HOW LONG DO WE KEEP YOUR INFORMATION?",
                "6. HOW DO WE KEEP YOUR INFORMATION SAFE?",
                "7. WHAT ARE YOUR PRIVACY RIGHTS?",
                "8. CONTROLS FOR DO-NOT-TRACK FEATURES",
                "9. DO WE MAKE UPDATES TO THIS NOTICE?",
                "10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
                "11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?"
              ].map((text, index) => (
                <div key={index} className="flex items-start gap-2 hover:text-cyan-400 transition-colors cursor-default">
                  <span className="text-cyan-500 leading-none">▹</span> {text}
                </div>
              ))}
            </nav>
          </section>

          {/* Main Clauses */}
          <div className="space-y-12 pt-10">
            
            {/* 1. What Information */}
            <section id="section-1" className="space-y-4">
              <h2 className="text-2xl font-bold text-white uppercase border-b border-cyan-500/20 pb-2 italic tracking-tighter">1. WHAT INFORMATION DO WE COLLECT?</h2>
              <h3 className="text-lg font-bold text-cyan-500">Personal information you disclose to us</h3>
              <p className="bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-lg italic">
                <strong>In Short:</strong> We collect personal information that you provide to us.
              </p>
              <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services...</p>
              <div className="bg-[#111] p-6 rounded-2xl space-y-2">
                <p className="font-bold text-white">Personal Information Provided by You:</p>
                <ul className="list-inside list-disc text-gray-400">
                  <li>Names</li>
                  <li>Phone numbers</li>
                  <li>Email addresses</li>
                </ul>
              </div>

              <h3 className="text-lg font-bold text-cyan-500 mt-6">Sensitive Information</h3>
              <p>When necessary, with your consent or as otherwise permitted by applicable law, we process: <strong>data about a person's sex life or sexual orientation.</strong></p>

              <h3 className="text-lg font-bold text-cyan-500 mt-6">Application Data</h3>
              <p>If you use our application(s), we also may collect the following information:</p>
              <ul className="list-disc ml-6 space-y-4">
                <li><strong>Mobile Device Access:</strong> We may request access to your mobile device's storage and other features.</li>
                <li><strong>Mobile Device Data:</strong> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, IP address, etc.</li>
                <li><strong>Push Notifications:</strong> We may request to send you push notifications regarding your account or certain features.</li>
              </ul>
            </section>

            {/* 2. How we process */}
            <section id="section-2" className="space-y-4">
              <h2 className="text-2xl font-bold text-white uppercase border-b border-cyan-500/20 pb-2 italic tracking-tighter">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
              <p className="bg-cyan-500/5 border border-cyan-500/10 p-4 rounded-lg italic">
                <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
              </p>
              <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "To facilitate account creation and authentication",
                  "To deliver and facilitate delivery of services",
                  "To respond to user inquiries/offer support",
                  "To send administrative information",
                  "To fulfill and manage your orders",
                  "To request feedback",
                  "To protect our Services",
                  "To comply with legal obligations"
                ].map((item, i) => (
                  <li key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 5. Retention */}
            <section id="section-5" className="space-y-4">
              <h2 className="text-2xl font-bold text-white uppercase border-b border-cyan-500/20 pb-2 italic tracking-tighter">5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law.</p>
              <p className="text-cyan-500 font-bold">No purpose in this notice will require us keeping your personal information for longer than twelve (12) months past the termination of the user's account.</p>
            </section>

            {/* Section 11. Deletion */}
            <section id="section-11" className="space-y-6 bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-red-500 uppercase tracking-tighter italic">11. HOW CAN YOU REVIEW, UPDATE, OR DELETE DATA?</h2>
              <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information.</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://trio-verse.com/support/accounts-system" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold text-center transition-all shadow-[0_5px_15px_rgba(239,68,68,0.3)]"
                >
                  Request Deletion
                </a>
                <a 
                  href="mailto:unicepse@gmail.com" 
                  className="border border-white/10 hover:bg-white/5 text-white px-8 py-3 rounded-full font-bold text-center transition-all"
                >
                  Contact Support
                </a>
              </div>
            </section>

          </div>

          <footer className="pt-20 pb-10 text-center border-t border-white/5">
            <p className="text-gray-600 text-sm tracking-widest uppercase font-mono">
              © 2024 TRIOVERSE - UNICEPS. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}