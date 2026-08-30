import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Bell,
  CheckCircle2,
  X,
  Zap,
  ArrowRight,
  Trophy,
} from 'lucide-react';

export const LiveNotificationToast = () => {
  const { liveToast, setLiveToast, setActiveView } = useBooking();

  if (!liveToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#2a241b] to-[#1e1a14] border-2 border-[#c4a96d] shadow-2xl shadow-black/80 relative">
        {/* Close */}
        <button
          onClick={() => setLiveToast(null)}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Zap className="w-5 h-5 fill-emerald-400 animate-pulse" />
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              {liveToast.title}
            </div>
            <div className="text-sm font-serif font-bold text-white mt-0.5">
              {liveToast.customerName}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {liveToast.time} · ID: {liveToast.bookingId}
            </div>
            <div className="text-[11px] text-[#c4a96d] font-semibold mt-1">
              ₹{liveToast.amount} Payable at Turf Desk
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveView('owner');
                  setLiveToast(null);
                }}
                className="text-xs font-bold text-dark bg-[#c4a96d] hover:bg-[#d4b978] px-3 py-1 rounded-full transition-colors inline-flex items-center gap-1"
              >
                View in Dashboard <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
