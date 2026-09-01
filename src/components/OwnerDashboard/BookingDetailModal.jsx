import React from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  X,
  User,
  Phone,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Check,
  MessageCircle,
  Trash2,
  Trophy,
} from 'lucide-react';

export const BookingDetailModal = ({ booking, onClose }) => {
  const { updateBookingStatus, cancelBooking, deleteBooking, ground, dates } = useBooking();

  if (!booking) return null;

  const dateObj = dates.find((d) => d.dateStr === booking.date);
  const displayDate = dateObj ? dateObj.fullDateDisplay : booking.date;

  const handleWhatsAppReminder = () => {
    const text = `🏏 *BOX CRICKET — MATCH REMINDER*\n\n` +
      `Hello ${booking.customerName},\n` +
      `This is a quick reminder for your upcoming match:\n\n` +
      `📅 *Date:* ${displayDate}\n` +
      `⏰ *Time Slot:* ${booking.time}\n` +
      `🎟️ *Booking ID:* ${booking.id}\n\n` +
      `Please ensure your squad arrives 10 minutes prior. See you on the turf! 🏏`;

    window.open(`https://wa.me/91${booking.rawPhone || '9876543210'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-6 sm:p-8 max-w-lg border-[#c4a96d]/40">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#8b7340]/25">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c4a96d] to-[#8b7340] text-dark flex items-center justify-center font-serif font-bold text-lg">
            {booking.customerName.charAt(0)}
          </div>
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-[#c4a96d]">
              Booking Management
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              {booking.customerName}
            </h3>
            <div className="text-xs text-slate-400 font-mono">
              Pass ID: {booking.id} · {booking.status}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="my-5 p-4 rounded-2xl bg-[#252018] border border-[#8b7340]/20 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Match Date</div>
              <div className="font-bold text-white text-sm mt-0.5">{displayDate}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Time Slot</div>
              <div className="font-bold text-emerald-400 text-sm mt-0.5">{booking.time}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#8b7340]/15">
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Contact Phone</div>
              <div className="font-mono text-white text-sm mt-0.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c4a96d]" />
                {booking.rawPhone || booking.customerPhone}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Total Amount</div>
              <div className="font-serif font-bold text-[#c4a96d] text-base mt-0.5">
                ₹{booking.amount} (Pay at Turf)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#8b7340]/15">
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Squad Size</div>
              <div className="text-white mt-0.5">{booking.playersCount} Players</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Match Type</div>
              <div className="text-white mt-0.5">{booking.matchType}</div>
            </div>
          </div>

          {booking.notes && (
            <div className="pt-2 border-t border-[#8b7340]/15 text-[11px] text-slate-300">
              <span className="text-slate-400 font-semibold">Notes:</span> {booking.notes}
            </div>
          )}
        </div>

        {/* Owner Action Buttons */}
        <div className="space-y-2.5">
          <div className="text-[11px] uppercase font-bold tracking-wider text-[#c4a96d] mb-1">
            Owner Controls
          </div>

          {/* Quick WhatsApp & Call Actions */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleWhatsAppReminder}
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              WhatsApp Reminder
            </button>

            <a
              href={`tel:${booking.rawPhone || '9848022334'}`}
              className="py-2.5 px-3 rounded-xl bg-[#2d271e] hover:bg-[#3d3529] border border-[#8b7340]/30 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c4a96d]" />
              Call Customer
            </a>
          </div>

          {/* Status Updates */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => {
                updateBookingStatus(booking.id, 'Confirmed');
                onClose();
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                booking.status === 'Confirmed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#252018] text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              Confirm
            </button>

            <button
              onClick={() => {
                updateBookingStatus(booking.id, 'Completed');
                onClose();
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                booking.status === 'Completed'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-[#252018] text-slate-300 border border-slate-700 hover:text-white'
              }`}
            >
              Completed
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel this booking? This will free up the slot immediately.')) {
                  cancelBooking(booking.id);
                  onClose();
                }
              }}
              className="py-2 px-2 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all"
            >
              Cancel Slot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
