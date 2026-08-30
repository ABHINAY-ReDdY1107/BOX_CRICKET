import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, ChevronRight } from 'lucide-react';

export const DateSelector = () => {
  const { dates, selectedDate, setSelectedDate, getDayMetrics } = useBooking();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#c4a96d]" />
          <span className="text-xs uppercase font-bold tracking-[0.16em] text-[#c4a96d]">
            Step 1: Select Match Date
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Showing available slots for upcoming 7 days
        </span>
      </div>

      {/* Horizontal Scrollable Date Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {dates.map((d) => {
          const isSelected = d.dateStr === selectedDate;
          const dayMetrics = getDayMetrics(d.dateStr);
          const isFull = dayMetrics.availableCount === 0;

          return (
            <button
              key={d.dateStr}
              onClick={() => setSelectedDate(d.dateStr)}
              className={`flex-shrink-0 min-w-[125px] sm:min-w-[140px] p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-[#2e2920] to-[#1e1b15] border-[#c4a96d] shadow-lg shadow-[#c4a96d]/15 scale-[1.02]'
                  : 'bg-[#221e17]/60 border-[#8b7340]/20 hover:border-[#c4a96d]/40 hover:bg-[#28231a]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-[#c4a96d]' : 'text-slate-400'
                  }`}
                >
                  {d.dayName}
                </span>
                {d.isToday && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    LIVE
                  </span>
                )}
              </div>

              <div className="text-lg font-serif font-bold text-white leading-tight">
                {d.formattedDisplay}
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                {isFull ? (
                  <span className="text-rose-400 font-semibold">Housefull</span>
                ) : (
                  <span
                    className={`font-semibold ${
                      isSelected ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {dayMetrics.availableCount} slots open
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
