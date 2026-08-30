import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  Clock,
  CheckCircle2,
  Lock,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const SlotGrid = ({ selectedSlotId, onSelectSlot, onBookedSlotClick }) => {
  const { slots, selectedDate, isSlotBooked, getSlotBooking, ground } = useBooking();
  const [filterPeriod, setFilterPeriod] = useState('all'); // 'all' | 'morning' | 'afternoon' | 'evening'

  // Filter slots
  const filteredSlots = slots.filter((slot) => {
    if (filterPeriod === 'all') return true;
    if (filterPeriod === 'morning') return slot.period === 'morning';
    if (filterPeriod === 'afternoon') return slot.period === 'afternoon';
    if (filterPeriod === 'evening') return slot.period === 'evening' || slot.period === 'night';
    return true;
  });

  const getPeriodIcon = (period) => {
    switch (period) {
      case 'morning':
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case 'afternoon':
        return <Sun className="w-3.5 h-3.5 text-orange-400" />;
      case 'evening':
        return <Sunset className="w-3.5 h-3.5 text-pink-400" />;
      case 'night':
        return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-[#c4a96d]" />;
    }
  };

  return (
    <div className="w-full mt-6">
      {/* Step Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#8b7340]/20">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c4a96d]" />
            <span className="text-xs uppercase font-bold tracking-[0.16em] text-[#c4a96d]">
              Step 2: Choose Available Match Slot
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on any <span className="text-emerald-400 font-bold">AVAILABLE</span> slot to proceed with booking
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#1a1814] rounded-xl border border-[#8b7340]/25 self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              filterPeriod === 'all'
                ? 'bg-[#c4a96d] text-dark shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Slots ({slots.length})
          </button>
          <button
            onClick={() => setFilterPeriod('morning')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              filterPeriod === 'morning'
                ? 'bg-[#c4a96d] text-dark shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Morning
          </button>
          <button
            onClick={() => setFilterPeriod('afternoon')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              filterPeriod === 'afternoon'
                ? 'bg-[#c4a96d] text-dark shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Afternoon
          </button>
          <button
            onClick={() => setFilterPeriod('evening')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              filterPeriod === 'evening'
                ? 'bg-[#c4a96d] text-dark shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Floodlight Prime ⚡
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs py-3 border-b border-[#8b7340]/15 text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
          <span className="font-semibold text-emerald-400">Available (Click to Book)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
          <span className="text-slate-400">Booked (Unavailable)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c4a96d] shadow-sm shadow-[#c4a96d]/50"></span>
          <span className="text-[#c4a96d] font-semibold">Selected</span>
        </div>
      </div>

      {/* Slot Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mt-4">
        {filteredSlots.map((slot) => {
          const booked = isSlotBooked(slot.id, selectedDate);
          const bookingInfo = booked ? getSlotBooking(slot.id, selectedDate) : null;
          const isSelected = selectedSlotId === slot.id;

          if (booked) {
            return (
              <div
                key={slot.id}
                onClick={() => onBookedSlotClick && onBookedSlotClick(slot, bookingInfo)}
                className="slot-card booked relative overflow-hidden group hover:border-rose-500/40 transition-all cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {getPeriodIcon(slot.period)}
                    {slot.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-rose-400/90 border border-rose-500/20 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    BOOKED
                  </span>
                </div>

                <div className="my-2.5">
                  <div className="text-base font-serif font-bold text-slate-400">
                    {slot.time}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between mt-1">
                    <span>Reserved ({bookingInfo?.customerName || 'Customer'})</span>
                    <span>₹{ground.pricePerHour}</span>
                  </div>
                </div>

                {/* Double Booking Prevention Warning tooltip on hover */}
                <div className="pt-2 border-t border-slate-800 text-[10px] text-rose-400/80 flex items-center gap-1 font-sans">
                  <ShieldAlert className="w-3 h-3 shrink-0" />
                  Slot locked · Prevents clash
                </div>
              </div>
            );
          }

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelectSlot(slot)}
              className={`slot-card ${isSelected ? 'selected' : 'available'} text-left w-full`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#c4a96d] uppercase tracking-wider">
                  {getPeriodIcon(slot.period)}
                  {slot.label}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#c4a96d] text-dark shadow-sm'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {isSelected ? 'SELECTED' : 'AVAILABLE'}
                </span>
              </div>

              <div className="my-2.5">
                <div className="text-base font-serif font-bold text-white group-hover:text-[#c4a96d]">
                  {slot.time}
                </div>
                <div className="text-xs text-slate-300 flex items-center justify-between mt-1">
                  <span className="text-emerald-400 font-semibold">1 Hour Match</span>
                  <span className="font-serif font-bold text-[#c4a96d] text-sm">
                    ₹{ground.pricePerHour}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#8b7340]/20 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Floodlights included</span>
                <span
                  className={`font-bold ${
                    isSelected ? 'text-[#c4a96d]' : 'text-emerald-400'
                  }`}
                >
                  {isSelected ? 'Ready to Book →' : 'Select Slot →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
