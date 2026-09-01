import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  PhoneOff,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  IndianRupee,
  MessageCircle,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const BusinessValueSection = () => {
  const { setActiveView, simulateRahulBookingDemo, ground } = useBooking();

  return (
    <div className="min-h-screen bg-[#110f0c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main Pitch Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center text-xs text-[#c4a96d]">
            EXECUTIVE VALUE PROPOSITION FOR BOX CRICKET OWNERS
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mt-2">
            "Stop Answering 50 Phone Calls A Day."
          </h1>
          <p className="text-base text-slate-300 mt-4 leading-relaxed font-light">
            Instead of customers repeatedly calling during dinner and match hours to ask <span className="text-[#c4a96d] font-semibold">"Boss, 7 PM slot open unda?"</span>, they open this digital portal, see live slots, and book instantly.
          </p>
        </div>

        {/* Before vs After Transformation Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BEFORE: The Pain of Phone Calls */}
          <div className="p-8 rounded-3xl bg-[#1e1914] border border-rose-500/25 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-6">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold uppercase tracking-wider text-xs">
                <XCircle className="w-5 h-5" />
                <span>The Old Manual Way (Phone Calls & Diary)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                Stressful & Prone to Clashes
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <strong className="text-white">40 to 60 repetitive phone calls daily</strong> asking which slots are free for night matches.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <strong className="text-white">Dangerous Double Bookings:</strong> Two friends book the same 8:00 PM slot, causing arguments at the ground entrance.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <strong className="text-white">Pen & paper / WhatsApp diary chaos:</strong> Difficult to check who booked which day when you are away from the turf.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </div>
                <div>
                  <strong className="text-white">Lost Revenue from idle slots:</strong> Customers don't know morning or weekday slots are open, leaving ground empty.
                </div>
              </li>
            </ul>
          </div>

          {/* AFTER: The Digital Solution */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#282116] to-[#1a1610] border border-[#c4a96d]/40 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#8b7340]/25 mb-6">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                <CheckCircle2 className="w-5 h-5" />
                <span>The Digital Box Cricket Booking Portal</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                100% Automated
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong className="text-white">Zero Phone Calls for Slot Checking:</strong> Players simply tap the link on WhatsApp, see real-time availability, and book.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong className="text-white">Zero Double Bookings:</strong> The moment Rahul books 7:00 PM, the slot locks permanently across all devices.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong className="text-white">Live Owner Command Center:</strong> See today's total revenue, upcoming matches, and player details from anywhere on your mobile.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <strong className="text-white">Automated WhatsApp Match Passes:</strong> Customers receive instant digital tickets with match guidelines and timing.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits Grid (Customer vs Owner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Customer Experience */}
          <div className="p-6 rounded-3xl bg-[#1c1813] border border-[#8b7340]/25">
            <div className="text-xs uppercase font-bold tracking-wider text-[#c4a96d] mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              What Customers Experience
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              Effortless Match Booking
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#252018] border border-[#8b7340]/15">
                <div className="font-bold text-emerald-400">✓ 30-Second Slot Booking</div>
                <div className="text-slate-400 mt-0.5">No waiting for owner callback or busy phone line.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#252018] border border-[#8b7340]/15">
                <div className="font-bold text-emerald-400">✓ Clear Live Ground Schedule</div>
                <div className="text-slate-400 mt-0.5">See exactly which night floodlight slots are open for the entire week.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#252018] border border-[#8b7340]/15">
                <div className="font-bold text-emerald-400">✓ Verified Booking Pass (#BXC-1024)</div>
                <div className="text-slate-400 mt-0.5">Share with team squad on WhatsApp group so everyone arrives on time.</div>
              </div>
            </div>
          </div>

          {/* Owner Experience */}
          <div className="p-6 rounded-3xl bg-[#1c1813] border border-[#8b7340]/25">
            <div className="text-xs uppercase font-bold tracking-wider text-[#c4a96d] mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              What Ground Owners Get
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              Complete Control with Peace of Mind
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#252018] border border-[#8b7340]/15">
                <div className="font-bold text-[#c4a96d]">✓ 100% Clashes Prevented</div>
                <div className="text-slate-400 mt-0.5">System acts as a full-time digital manager that never makes human mistakes.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#252018] border border-[#8b7340]/15">
                <div className="font-bold text-[#c4a96d]">✓ Instant Revenue Tracking</div>
                <div className="text-slate-400 mt-0.5">Know exact daily collections (e.g. ₹4,200/day) with zero manual calculations.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#252018] border border-[#8b7340]/15">
                <div className="font-bold text-[#c4a96d]">✓ Add Offline Phone Calls in 2 Taps</div>
                <div className="text-slate-400 mt-0.5">If a regular customer still calls, enter their name and the slot is locked for everyone else.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Demo Call to Action */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#2e261a] to-[#1c1711] border border-[#c4a96d]/40 text-center space-y-4 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5" />
            READY FOR THE LIVE MEETING DEMO
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">
            Demonstrate the Rahul Booking Scenario
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Click below to simulate Rahul booking the 7:00 PM – 8:00 PM slot right now and watch the system block any duplicate attempts instantly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                simulateRahulBookingDemo();
                setActiveView('split');
              }}
              className="button button-primary gap-2 text-xs py-3 px-6 shadow-xl"
            >
              <Zap className="w-4 h-4 text-dark" />
              Launch Live Split-Screen Demo →
            </button>

            <button
              onClick={() => setActiveView('customer')}
              className="button button-ghost gap-2 text-xs py-3 px-6"
            >
              Open Customer Booking Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
