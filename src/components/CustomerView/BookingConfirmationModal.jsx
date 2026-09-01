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
  QrCode,
  Sparkles,
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
      `💰 *Amount Paid:* ₹${booking.amount}\n\n` +
      `⚠️ *Note:* Please arrive 10 minutes before your slot. Metal spikes not allowed.\n` +
      `Thank you for booking! 🏏`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-5 sm:p-7 max-w-lg border-[#c4a96d]/40">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Steps Indicator */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8b7340]/20 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1 text-emerald-400">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px]">✓</span>
            <span className="hidden sm:inline">01</span> Slot
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-emerald-500/40"></div>

          <div className="flex items-center gap-1 text-emerald-400">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px]">✓</span>
            <span className="hidden sm:inline">02</span> Details
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-emerald-500/40"></div>

          <div className="flex items-center gap-1 text-emerald-400">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px]">✓</span>
            <span className="hidden sm:inline">03</span> Paid
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-emerald-500/40"></div>

          <div className="flex items-center gap-1 text-[#c4a96d]">
            <span className="w-4 h-4 rounded-full bg-[#c4a96d] text-dark flex items-center justify-center text-[9px]">4</span>
            <span className="hidden sm:inline">04</span> Confirmed
          </div>
        </div>

        {/* Success Header with Green Pulse */}
        <div className="text-center pb-5 border-b border-[#8b7340]/25">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2.5 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20 check-animate">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-xs uppercase font-bold tracking-[0.2em] text-emerald-400">
            Slot Reserved & Verified
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Booking Confirmed
          </h2>
          <div className="text-xs font-semibold text-[#c4a96d] mt-0.5">
            BOX CRICKET MATCH PASS
          </div>
        </div>

        {/* Digital Sports Pass Ticket */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#252018] to-[#1a1713] border border-[#c4a96d]/35 relative overflow-hidden shadow-inner">
          {/* Top Notch styling */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#8b7340]/20">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#c4a96d]" />
              <span className="text-xs text-white uppercase tracking-wider font-bold">
                SPORTS PASS
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#c4a96d]/20 text-[#c4a96d] font-mono font-bold text-xs border border-[#c4a96d]/40">
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
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Player / Captain</div>
                <div className="font-bold text-white mt-0.5">{booking.customerName}</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Mobile</div>
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
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Status</div>
                <div className="font-serif font-bold text-emerald-400 text-sm mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ₹{booking.amount} PAID
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder + Arrival Note */}
          <div className="mt-4 pt-3 border-t border-dashed border-[#8b7340]/30 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Show this pass at ground entry.</span>
            </div>
            <div className="p-1 rounded bg-[#1a1713] border border-[#8b7340]/30" title="Entry QR Pass">
              <QrCode className="w-6 h-6 text-[#c4a96d]" />
            </div>
          </div>
        </div>

        {/* Arrival Advisory Notice */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2 mb-5">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold">
            Please arrive 10 minutes before your slot for warm-up and equipment pickup.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/50 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Share Pass on WhatsApp
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full border border-[#8b7340]/30 text-xs font-semibold text-slate-300 hover:text-white hover:border-[#c4a96d] transition-colors cursor-pointer"
            >
              Book Another Slot
            </button>

            {/* Switch to Owner Command Center to show live reflection */}
            <button
              onClick={() => {
                onClose();
                setActiveView('owner');
              }}
              className="w-full py-2.5 rounded-full bg-[#c4a96d] hover:bg-[#d4b978] text-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Owner View →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
