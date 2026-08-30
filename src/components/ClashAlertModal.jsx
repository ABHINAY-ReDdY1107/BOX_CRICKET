import React from 'react';
import { ShieldAlert, X, Calendar, Clock, RefreshCw } from 'lucide-react';

export const ClashAlertModal = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-6 sm:p-8 max-w-md border-rose-500/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="text-xs uppercase font-bold tracking-widest text-rose-400">
            Booking Clash Prevented
          </div>

          <h3 className="text-2xl font-serif font-bold text-white mt-1">
            Slot Just Booked!
          </h3>

          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {error.message ||
              'Sorry, this slot has just been booked by another customer.'}
          </p>

          <div className="my-5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div className="font-semibold text-white mb-1">
              Why did this happen?
            </div>
            The system updates in real-time. Another team finalized this slot a moment ago, automatically blocking duplicate bookings.
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#c4a96d] hover:bg-[#d4b978] text-dark font-bold text-xs uppercase tracking-wider transition-all"
          >
            Choose Another Available Slot →
          </button>
        </div>
      </div>
    </div>
  );
};
