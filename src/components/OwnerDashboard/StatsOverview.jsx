import React from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  IndianRupee,
  TrendingUp,
  Percent,
} from 'lucide-react';

export const StatsOverview = ({ targetDate }) => {
  const { getDayMetrics, dates, ground } = useBooking();
  const metrics = getDayMetrics(targetDate);
  const activeDateObj = dates.find((d) => d.dateStr === targetDate);
  const displayDate = activeDateObj ? activeDateObj.formattedDisplay : targetDate;

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.16em] text-[#c4a96d]">
            Daily Financial & Ground Metrics
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            Schedule Overview for {displayDate}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Standard Slot Fee:</span>
          <span className="font-bold text-[#c4a96d]">₹{ground.pricePerHour}/hr</span>
        </div>
      </div>

      {/* Stats Counter Bar matching Auxify stylesheet */}
      <div className="stats-grid">
        {/* Total Bookings */}
        <div className="stat-item">
          <div className="flex items-center justify-center gap-2 mb-1 text-slate-400 text-xs">
            <CalendarCheck className="w-4 h-4 text-[#c4a96d]" />
            <span>Total Slots</span>
          </div>
          <div className="stat-number">{metrics.totalSlots}</div>
          <span className="stat-label">Total Daily Slots</span>
        </div>

        {/* Booked Slots */}
        <div className="stat-item">
          <div className="flex items-center justify-center gap-2 mb-1 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Booked Slots</span>
          </div>
          <div className="stat-number text-emerald-400">{metrics.bookedCount}</div>
          <span className="stat-label">Confirmed Matches</span>
        </div>

        {/* Available Slots */}
        <div className="stat-item">
          <div className="flex items-center justify-center gap-2 mb-1 text-amber-400 text-xs font-semibold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Available</span>
          </div>
          <div className="stat-number text-amber-400">{metrics.availableCount}</div>
          <span className="stat-label">Open For Booking</span>
        </div>

        {/* Today's Revenue */}
        <div className="stat-item">
          <div className="flex items-center justify-center gap-2 mb-1 text-[#c4a96d] text-xs font-semibold">
            <IndianRupee className="w-4 h-4 text-[#c4a96d]" />
            <span>Estimated Revenue</span>
          </div>
          <div className="stat-number text-[#c4a96d]">
            ₹{metrics.revenue.toLocaleString('en-IN')}
          </div>
          <span className="stat-label">Today's Collections</span>
        </div>
      </div>

      {/* Occupancy Progress Bar */}
      <div className="mt-4 p-4 rounded-2xl bg-[#221e17]/80 border border-[#8b7340]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#c4a96d]/15 text-[#c4a96d] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              Ground Occupancy Rate: {metrics.occupancyRate}%
            </div>
            <div className="text-[11px] text-slate-400">
              {metrics.bookedCount} out of {metrics.totalSlots} match slots booked
            </div>
          </div>
        </div>

        <div className="w-full sm:w-64">
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-[#8b7340] to-[#c4a96d] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(metrics.occupancyRate, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
