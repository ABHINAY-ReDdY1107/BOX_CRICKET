import React from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Eye,
  Check,
  XCircle,
  Sparkles,
} from 'lucide-react';

export const ScheduleTimeline = ({
  targetDate,
  onSelectBooking,
  onAddBookingForSlot,
}) => {
  const { slots, isSlotBooked, getSlotBooking, updateBookingStatus, ground } = useBooking();

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.16em] text-[#c4a96d]">
            Timeline & Match Ledger
          </div>
          <h3 className="text-xl font-serif font-bold text-white">
            Daily Slot Schedule
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          Showing all {slots.length} daily time blocks (6:00 AM – 11:00 PM)
        </div>
      </div>

      {/* Schedule Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[#8b7340]/25 bg-[#1e1b15]/90 shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#8b7340]/20 bg-[#28231a] text-[#c4a96d] uppercase tracking-wider text-[10px] font-bold">
              <th className="py-3.5 px-4">Time Slot</th>
              <th className="py-3.5 px-4">Customer / Team</th>
              <th className="py-3.5 px-4">Contact Phone</th>
              <th className="py-3.5 px-4">Match Details</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#8b7340]/15">
            {slots.map((slot) => {
              const booked = isSlotBooked(slot.id, targetDate);
              const booking = booked ? getSlotBooking(slot.id, targetDate) : null;

              if (booked && booking) {
                const isCompleted = booking.status === 'Completed';

                return (
                  <tr
                    key={slot.id}
                    className="hover:bg-[#28231a]/60 transition-colors group"
                  >
                    {/* Time Slot */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#c4a96d]" />
                        <span className="font-serif font-bold text-white text-sm">
                          {slot.time}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {slot.label}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#c4a96d]" />
                        {booking.customerName}
                      </div>
                      <div className="text-[10px] text-[#c4a96d] font-mono mt-0.5">
                        ID: {booking.id}
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{booking.customerPhone}</span>
                      </div>
                    </td>

                    {/* Details */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{booking.playersCount} Players</div>
                      <div className="text-[10px] text-slate-400">
                        {booking.matchType}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-bold text-[#c4a96d] text-sm">
                        ₹{booking.amount || ground.pricePerHour}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        {isCompleted ? 'Paid at Turf' : 'Pay at Turf'}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {isCompleted ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 inline-flex items-center gap-1">
                          <Check className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Confirmed
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectBooking(booking)}
                          className="px-2.5 py-1 rounded-lg bg-[#2d271e] text-[#c4a96d] hover:bg-[#c4a96d] hover:text-dark transition-all text-xs font-semibold flex items-center gap-1 border border-[#8b7340]/30"
                        >
                          <Eye className="w-3 h-3" /> Details
                        </button>
                        {!isCompleted && (
                          <button
                            onClick={() =>
                              updateBookingStatus(booking.id, 'Completed')
                            }
                            title="Mark Match as Completed"
                            className="p-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }

              // Open / Available Slot
              return (
                <tr
                  key={slot.id}
                  className="hover:bg-[#201d17]/40 transition-colors bg-[#181612]/30"
                >
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-serif font-semibold text-slate-300 text-sm">
                        {slot.time}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {slot.label}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 italic">
                    Open for Booking
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    ----------
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    Floodlight Ready
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-slate-400 font-serif">
                      ₹{ground.pricePerHour}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Available
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onAddBookingForSlot(slot)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-dark transition-all text-xs font-semibold inline-flex items-center gap-1 border border-emerald-500/30"
                    >
                      <Plus className="w-3 h-3" /> Add Phone Booking
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
