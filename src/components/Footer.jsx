import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Trophy,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const Footer = () => {
  const { ground, setActiveView, resetDemoData } = useBooking();

  return (
    <footer className="footer border-t border-[#8b7340]/20 bg-[#16130f]">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6">
        {/* Brand info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#c4a96d] flex items-center justify-center text-dark font-bold">
              <Trophy className="w-4 h-4 text-[#1a1814]" />
            </div>
            <span className="text-xl font-bold font-serif text-white">
              BOX <span className="text-[#c4a96d]">CRICKET</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            {ground.tagline} · Real-time online slot booking & turf management for any sports ground.
          </p>
        </div>

        {/* Quick navigation */}
        <div className="flex flex-wrap gap-4 text-xs uppercase font-bold tracking-wider">
          <button
            onClick={() => setActiveView('customer')}
            className="text-slate-300 hover:text-[#c4a96d] transition-colors"
          >
            Book a Slot
          </button>
          <button
            onClick={() => setActiveView('owner')}
            className="text-slate-300 hover:text-[#c4a96d] transition-colors"
          >
            Owner Dashboard
          </button>
          <button
            onClick={() => setActiveView('split')}
            className="text-slate-300 hover:text-[#c4a96d] transition-colors"
          >
            Live Demo
          </button>
          <button
            onClick={() => setActiveView('pitch')}
            className="text-slate-300 hover:text-[#c4a96d] transition-colors"
          >
            Business Value
          </button>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-6xl mx-auto w-full footer-bottom flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 pt-4 border-t border-[#8b7340]/15">
        <div>
          © 2026 Box Cricket Booking Platform. Demo Prototype.
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={resetDemoData}
            className="text-[#c4a96d] hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset Demo
          </button>
          <span>Rate: ₹{ground.pricePerHour}/Hour</span>
        </div>
      </div>
    </footer>
  );
};
