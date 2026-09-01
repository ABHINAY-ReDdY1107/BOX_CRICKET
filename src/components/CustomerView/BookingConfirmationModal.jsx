import React from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  Share2,
  X,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Trophy,
} from 'lucide-react';

export const BookingConfirmationModal = ({ booking, onClose }) => {
  const { ground, setActiveView, dates } = useBooking();

  if (!booking) return null;

  const dateObj = dates.find((d) => d.dateStr === booking.date);
  const displayDate = dateObj ? dateObj.fullDateDisplay : booking.date;

  const handleWhatsAppShare = () => {
    const text = `🏏 *BOX CRICKET — BOOKING CONFIRMED* ✅\n\n` +
      `🎟️ *Booking ID:* ${booking.id}\n` +
      `👤 *Captain:* ${booking.customerName}\n` +
      `📅 *Date:* ${displayDate}\n` +
      `⏰ *Time Slot:* ${booking.time}\n` +
      `👥 *Players:* ${booking.playersCount} Players (${booking.matchType})\n` +
      `💰 *Amount:* ₹${booking.amount}\n\n` +
      `⚠️ *Note:* Please arrive 10 minutes before your slot. Metal spikes not allowed.\n` +
      `Thank you for booking! 🏏`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-6 sm:p-8 max-w-lg border-[#c4a96d]/40">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header with Green Pulse */}
        <div className="text-center pb-6 border-b border-[#8b7340]/25">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="text-xs uppercase font-bold tracking-[0.2em] text-emerald-400">
            Slot Reserved & Confirmed
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mt-1">
            Booking Confirmed
          </h2>
          <div className="text-sm font-semibold text-[#c4a96d] mt-1">
            BOX CRICKET
          </div>
        </div>

        {/* Digital Ticket Pass */}
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-b from-[#252018] to-[#1a1713] border border-[#c4a96d]/30 relative overflow-hidden">
          {/* Booking ID Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#8b7340]/20">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Pass / Booking ID
            </span>
            <span className="px-3 py-1 rounded-full bg-[#c4a96d]/20 text-[#c4a96d] font-mono font-bold text-sm border border-[#c4a96d]/40">
              {booking.id}
            </span>
          </div>

          {/* Ticket Body */}
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Match Date</div>
                <div className="font-bold text-white text-sm mt-0.5">{displayDate}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Time Slot</div>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{booking.time}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#8b7340]/15">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Captain Name</div>
                <div className="font-bold text-white mt-0.5">{booking.customerName}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Phone Number</div>
                <div className="font-mono text-slate-300 mt-0.5">{booking.customerPhone}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#8b7340]/15">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Players & Ball</div>
                <div className="text-slate-200 mt-0.5">
                  {booking.playersCount} Players · {booking.matchType}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Total Fee</div>
                <div className="font-serif font-bold text-[#c4a96d] text-base mt-0.5">
                  ₹{booking.amount} (Pay at Turf)
                </div>
              </div>
            </div>
          </div>

          {/* Arrival Note */}
          <div className="mt-4 pt-3 border-t border-dashed border-[#8b7340]/30 flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Present this pass at the ground. Arrive 10 mins early.</span>
          </div>
        </div>

        {/* Arrival Advisory Notice */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2 mb-6">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold">
            Please arrive 10 minutes before your slot to warm up and collect your match balls.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/50 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Share Booking on WhatsApp
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full border border-[#8b7340]/30 text-xs font-semibold text-slate-300 hover:text-white hover:border-[#c4a96d] transition-colors"
            >
              Book Another Slot
            </button>

            {/* Switch to Owner Command Center to show live reflection */}
            <button
              onClick={() => {
                onClose();
                setActiveView('owner');
              }}
              className="w-full py-2.5 rounded-full bg-[#c4a96d] hover:bg-[#d4b978] text-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              Owner View →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
