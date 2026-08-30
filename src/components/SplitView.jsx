import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { CustomerBookingPage } from './CustomerView/CustomerBookingPage';
import { OwnerDashboard } from './OwnerDashboard/OwnerDashboard';
import {
  Smartphone,
  Monitor,
  Zap,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const SplitView = () => {
  const { simulateRahulBookingDemo, resetDemoData, ground, selectedDate } = useBooking();

  return (
    <div className="min-h-screen bg-[#0e0c0a] text-white py-6 px-3 sm:px-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Sales Demo Explanation Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#29231a] via-[#1f1a14] to-[#15120e] border border-[#c4a96d]/35 mb-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c4a96d] to-[#8b7340] text-dark flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#c4a96d]">
                    SALES MEETING LIVE DEMONSTRATION MODE
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    Real-Time State Sync Active
                  </span>
                </div>
                <h2 className="text-xl font-serif font-bold text-white mt-0.5">
                  Watch Both Sides Synchronize Instantly
                </h2>
                <p className="text-xs text-slate-300">
                  Book a slot on the left phone view & watch the owner's dashboard on the right update in 0.1s with clash protection!
                </p>
              </div>
            </div>

            {/* Quick Simulation Triggers */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={simulateRahulBookingDemo}
                className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer transition-all"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                ⚡ 1-Click Test: Book as Rahul (7-8 PM)
              </button>

              <button
                onClick={resetDemoData}
                className="px-3 py-2.5 rounded-full border border-[#8b7340]/40 text-slate-300 hover:text-white hover:border-[#c4a96d] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Demo
              </button>
            </div>
          </div>
        </div>

        {/* Side by Side Split Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column: Customer Mobile Screen (5 cols) */}
          <div className="xl:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-3 py-2 mb-2 bg-[#1c1813] rounded-2xl border border-[#8b7340]/25">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c4a96d]">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Customer Mobile View (Smartphone)</span>
              </div>
              <span className="text-[10px] text-slate-400">
                What players see on their phones
              </span>
            </div>

            {/* Mobile Device Mockup Frame */}
            <div className="w-full max-w-md rounded-[36px] border-[6px] border-[#383125] bg-[#12100d] shadow-2xl overflow-hidden relative min-h-[750px] max-h-[850px] overflow-y-auto scrollbar-thin">
              {/* Speaker notch */}
              <div className="sticky top-0 left-0 right-0 h-6 bg-[#1a1713] z-40 flex items-center justify-center">
                <div className="w-20 h-3.5 bg-[#28231b] rounded-full border border-slate-700/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div>
                  <div className="w-6 h-1 rounded-full bg-slate-700"></div>
                </div>
              </div>

              {/* Embed Customer Booking Page */}
              <div className="p-1">
                <CustomerBookingPage />
              </div>
            </div>
          </div>

          {/* Right Column: Owner Command Center (7 cols) */}
          <div className="xl:col-span-7 flex flex-col">
            <div className="w-full flex items-center justify-between px-3 py-2 mb-2 bg-[#1c1813] rounded-2xl border border-[#8b7340]/25">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c4a96d]">
                <Monitor className="w-4 h-4 text-[#c4a96d]" />
                <span>Owner Dashboard (Tablet / Laptop Command Center)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Live Synced
              </span>
            </div>

            <div className="rounded-3xl border border-[#8b7340]/30 bg-[#16130f] shadow-2xl overflow-hidden max-h-[850px] overflow-y-auto scrollbar-thin">
              <OwnerDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
