import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Trophy,
} from 'lucide-react';

export const BookingModal = ({ slot, onClose, onBookingSuccess }) => {
  const { selectedDate, dates, bookSlot, ground } = useBooking();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [playersCount, setPlayersCount] = useState(10);
  const [matchType, setMatchType] = useState('Hard Tennis Ball');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const activeDateObj = dates.find((d) => d.dateStr === selectedDate);
  const dateFormatted = activeDateObj ? activeDateObj.fullDateDisplay : selectedDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = bookSlot({
        slotId: slot.id,
        date: selectedDate,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        playersCount: Number(playersCount),
        matchType,
        notes: 'Online slot booking by customer',
      });

      setIsSubmitting(false);

      if (result.success) {
        onBookingSuccess(result.booking);
      } else {
        // Clash detected!
        setFormError(result.message || 'Slot is already booked. Please choose another.');
      }
    }, 400);
  };

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white hover:bg-[#383124] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="eyebrow flex items-center gap-1.5 text-xs text-[#c4a96d]">
            <Trophy className="w-3.5 h-3.5" />
            BOOKING CONFIRMATION STEP
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Reserve Your Match Slot
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fill in your match details below. No advance payment required — pay ₹{ground.pricePerHour} directly at the turf.
          </p>
        </div>

        {/* Selected Slot Summary Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#28231a] to-[#1e1b15] border border-[#c4a96d]/30 mb-6">
          <div className="text-[11px] font-bold text-[#c4a96d] uppercase tracking-wider mb-2">
            Selected Booking Summary
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Match Date</div>
                <div className="font-bold text-white">{dateFormatted}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Match Slot</div>
                <div className="font-bold text-white">{slot.time}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#8b7340]/20 flex items-center justify-between text-xs">
            <span className="text-slate-300">Ground Rate (1 Hour):</span>
            <span className="font-serif font-bold text-base text-[#c4a96d]">
              ₹{ground.pricePerHour}
            </span>
          </div>
        </div>

        {/* Form Error Banner */}
        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Customer / Team Captain Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#c4a96d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Rahul / Vikram Reddy"
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d] focus:ring-1 focus:ring-[#c4a96d]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Mobile Number (For WhatsApp Pass & Entry) *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#c4a96d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                required
                maxLength={10}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number (e.g. 9848011223)"
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d] focus:ring-1 focus:ring-[#c4a96d]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Number of Players
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-[#c4a96d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={playersCount}
                  onChange={(e) => setPlayersCount(e.target.value)}
                  className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#c4a96d]"
                >
                  <option value={8}>8 Players (4 vs 4)</option>
                  <option value={10}>10 Players (5 vs 5)</option>
                  <option value={12}>12 Players (6 vs 6)</option>
                  <option value={14}>14 Players (7 vs 7)</option>
                  <option value={16}>16 Players (Full Squad)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Ball Preference
              </label>
              <select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#c4a96d]"
              >
                <option value="Hard Tennis Ball">Hard Tennis (Heavy)</option>
                <option value="Soft Tennis Ball">Soft Tennis (Nivia/Cosco)</option>
                <option value="Leather Ball Match">Leather Ball Special</option>
              </select>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Instant Slot Locking: Double bookings are automatically blocked.</span>
          </div>

          {/* Submit Actions */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-primary gap-2 text-xs flex-1 sm:flex-none"
            >
              {isSubmitting ? (
                'Securing Slot...'
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-dark" />
                  Confirm Booking (₹{ground.pricePerHour})
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
