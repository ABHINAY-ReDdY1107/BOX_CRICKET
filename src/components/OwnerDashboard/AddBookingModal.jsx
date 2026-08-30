import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  X,
  PlusCircle,
  Calendar,
  Clock,
  User,
  Phone,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AddBookingModal = ({ defaultSlot, defaultDate, onClose }) => {
  const { slots, dates, bookSlot, isSlotBooked, ground } = useBooking();

  const [date, setDate] = useState(defaultDate || dates[0]?.dateStr || '');
  const [slotId, setSlotId] = useState(defaultSlot?.id || slots[0]?.id || '');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [playersCount, setPlayersCount] = useState(10);
  const [matchType, setMatchType] = useState('Hard Tennis Ball');
  const [notes, setNotes] = useState('Offline phone call booking added by owner');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter caller name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (isSlotBooked(slotId, date)) {
      setFormError('This slot is already booked for this date.');
      return;
    }

    const result = bookSlot({
      slotId,
      date,
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      playersCount: Number(playersCount),
      matchType,
      notes: notes.trim(),
      bookedBy: 'owner',
    });

    if (result.success) {
      onClose();
    } else {
      setFormError(result.message || 'Error booking slot');
    }
  };

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-6 sm:p-8 max-w-lg border-[#c4a96d]/40">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="eyebrow flex items-center gap-1 text-xs text-[#c4a96d]">
            <PlusCircle className="w-3.5 h-3.5" />
            OWNER MANUAL ENTRY
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mt-1">
            Record Phone Call / Walk-In
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add a customer match directly to block the slot and avoid double bookings.
          </p>
        </div>

        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Date
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#c4a96d]"
              >
                {dates.map((d) => (
                  <option key={d.dateStr} value={d.dateStr}>
                    {d.dayName} ({d.formattedDisplay})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Time Slot
              </label>
              <select
                value={slotId}
                onChange={(e) => setSlotId(e.target.value)}
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#c4a96d]"
              >
                {slots.map((s) => {
                  const booked = isSlotBooked(s.id, date);
                  return (
                    <option key={s.id} value={s.id} disabled={booked}>
                      {s.time} {booked ? '(Already Booked)' : '(Available)'}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Customer Name / Team Captain *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Anand Shinde / Police Boys"
              className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Customer Mobile Number *
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="10-digit phone number (e.g. 9848011223)"
              className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Players Count
              </label>
              <select
                value={playersCount}
                onChange={(e) => setPlayersCount(e.target.value)}
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#c4a96d]"
              >
                <option value={10}>10 Players</option>
                <option value={12}>12 Players</option>
                <option value={14}>14 Players</option>
                <option value={16}>16 Players</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Match Type
              </label>
              <select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 px-3 text-white focus:outline-none focus:border-[#c4a96d]"
              >
                <option value="Hard Tennis Ball">Hard Tennis</option>
                <option value="Soft Tennis Ball">Soft Tennis</option>
                <option value="Leather Ball Match">Leather Ball</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Advance paid ₹200 or requested 2 extra bats"
              className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d]"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button-primary gap-2 text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-dark" />
              Save Booking (₹{ground.pricePerHour})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
