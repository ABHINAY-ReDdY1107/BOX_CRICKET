import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { StatsOverview } from './StatsOverview';
import { ScheduleTimeline } from './ScheduleTimeline';
import { BookingDetailModal } from './BookingDetailModal';
import { AddBookingModal } from './AddBookingModal';
import {
  LayoutDashboard,
  Calendar,
  Plus,
  Zap,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Users,
} from 'lucide-react';

export const OwnerDashboard = () => {
  const {
    dates,
    selectedDate,
    setSelectedDate,
    ground,
    simulateRahulBookingDemo,
    resetDemoData,
  } = useBooking();

  const [inspectDate, setInspectDate] = useState(selectedDate);
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState(null);
  const [addBookingSlot, setAddBookingSlot] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const activeDateObj = dates.find((d) => d.dateStr === inspectDate);

  const handleAddBookingForSlot = (slot) => {
    setAddBookingSlot(slot);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#14110d] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#241f17] via-[#1d1913] to-[#161410] border border-[#c4a96d]/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="eyebrow flex items-center gap-2 text-xs text-[#c4a96d]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                GROUND OWNER COMMAND CENTER
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
                {ground.name} <span className="text-[#c4a96d]">Operations</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Real-time booking ledger, slot clash guardian, customer management, and automated daily revenue tracking.
              </p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#14120f] border border-[#8b7340]/30">
                <Calendar className="w-4 h-4 text-[#c4a96d] ml-2" />
                <select
                  value={inspectDate}
                  onChange={(e) => {
                    setInspectDate(e.target.value);
                    setSelectedDate(e.target.value);
                  }}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none pr-3 py-1 cursor-pointer"
                >
                  {dates.map((d) => (
                    <option key={d.dateStr} value={d.dateStr} className="bg-[#1e1b15] text-white">
                      {d.dayName} ({d.formattedDisplay})
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Phone Call Booking */}
              <button
                onClick={() => {
                  setAddBookingSlot(null);
                  setIsAddModalOpen(true);
                }}
                className="button button-primary gap-2 text-xs py-2 shadow-lg"
              >
                <Plus className="w-4 h-4 text-dark" />
                Record Phone Call / Walk-In
              </button>

              {/* Instant Rahul Demo Trigger */}
              <button
                onClick={simulateRahulBookingDemo}
                title="Trigger simulated live customer booking"
                className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Daily Stats Overview */}
        <StatsOverview targetDate={inspectDate} />

        {/* 2. Slot Schedule & Timeline */}
        <ScheduleTimeline
          targetDate={inspectDate}
          onSelectBooking={(b) => setSelectedBookingForDetail(b)}
          onAddBookingForSlot={handleAddBookingForSlot}
        />

        {/* Business Transformation Insight Box */}
        <div className="p-6 rounded-3xl bg-[#1d1914] border border-[#8b7340]/25 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white mb-1">0% Booking Clashes</div>
              <p className="text-slate-400 leading-relaxed">
                Every booked slot is locked immediately. Two customers can never reserve the same time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#c4a96d]/15 text-[#c4a96d] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Zero Repetitive Phone Calls</div>
              <p className="text-slate-400 leading-relaxed">
                Players open the link on WhatsApp, see live open slots for the whole week, and self-book.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white mb-1">Customer WhatsApp Reminders</div>
              <p className="text-slate-400 leading-relaxed">
                Send 1-click WhatsApp match passes and arrival reminders directly from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBookingForDetail && (
        <BookingDetailModal
          booking={selectedBookingForDetail}
          onClose={() => setSelectedBookingForDetail(null)}
        />
      )}

      {/* Manual Add Booking Modal */}
      {isAddModalOpen && (
        <AddBookingModal
          defaultSlot={addBookingSlot}
          defaultDate={inspectDate}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};
