import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Trophy,
  Calendar,
  LayoutDashboard,
  Columns,
  Sparkles,
  RotateCcw,
  Bell,
  CheckCircle2,
  PhoneCall,
  Zap,
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    notifications,
    unreadNotifCount,
    setUnreadNotifCount,
    simulateRahulBookingDemo,
    resetDemoData,
    ground,
  } = useBooking();

  const [showNotifs, setShowNotifs] = useState(false);

  const handleOpenNotifs = () => {
    setShowNotifs(!showNotifs);
    if (!showNotifs) {
      setUnreadNotifCount(0);
    }
  };

  return (
    <header className="site-header">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveView('customer')}
          className="brand flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c4a96d] to-[#8b7340] flex items-center justify-center text-dark shadow-md">
            <Trophy className="w-5 h-5 text-[#1a1814]" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              VIKARABAD <span className="text-[#c4a96d]">BOX CRICKET</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a96d]/80 -mt-1 font-sans">
              Slot Booking & Management Portal
            </div>
          </div>
        </button>
      </div>

      {/* Main Navigation Views */}
      <nav className="hidden md:flex items-center gap-2 bg-[#221e17]/80 p-1.5 rounded-full border border-[#8b7340]/25 backdrop-blur-md">
        <button
          onClick={() => setActiveView('customer')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeView === 'customer'
              ? 'bg-[#c4a96d] text-[#1a1814] shadow-md shadow-[#c4a96d]/20'
              : 'text-slate-300 hover:text-[#c4a96d]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Customer Booking
        </button>

        <button
          onClick={() => setActiveView('owner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all relative ${
            activeView === 'owner'
              ? 'bg-[#c4a96d] text-[#1a1814] shadow-md shadow-[#c4a96d]/20'
              : 'text-slate-300 hover:text-[#c4a96d]'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Owner Dashboard
          {unreadNotifCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => setActiveView('split')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeView === 'split'
              ? 'bg-[#c4a96d] text-[#1a1814] shadow-md shadow-[#c4a96d]/20'
              : 'text-slate-300 hover:text-[#c4a96d]'
          }`}
        >
          <Columns className="w-3.5 h-3.5" />
          Live Split Demo
        </button>

        <button
          onClick={() => setActiveView('pitch')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeView === 'pitch'
              ? 'bg-[#c4a96d] text-[#1a1814] shadow-md shadow-[#c4a96d]/20'
              : 'text-slate-300 hover:text-[#c4a96d]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Business Value
        </button>
      </nav>

      {/* Quick Sales Action Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Requirement 15: Special Quick Demo Scenario for the meeting */}
        <button
          onClick={() => {
            simulateRahulBookingDemo();
            setActiveView('customer');
          }}
          title="Simulate Rahul booking 7:00 PM - 8:00 PM slot to demonstrate clash prevention"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all cursor-pointer shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
          Demo: Book as Rahul (7 PM)
        </button>

        {/* Reset Demo button */}
        <button
          onClick={resetDemoData}
          title="Reset sample bookings and demo state"
          className="p-2 rounded-full border border-[#8b7340]/25 text-slate-300 hover:text-[#c4a96d] hover:border-[#c4a96d] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={handleOpenNotifs}
            className="relative p-2 rounded-full border border-[#8b7340]/25 text-slate-300 hover:text-[#c4a96d] hover:border-[#c4a96d] transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-dark flex items-center justify-center">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#1e1b15] border border-[#c4a96d]/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#8b7340]/20 mb-3">
                <div className="text-xs uppercase font-bold tracking-wider text-[#c4a96d]">
                  Owner Live Alerts
                </div>
                <div className="text-[11px] text-slate-400">
                  {notifications.length} recent events
                </div>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-[#28231a] border border-[#8b7340]/15 hover:border-[#c4a96d]/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white">
                          {n.title}
                        </div>
                        <div className="text-[12px] text-slate-300 leading-snug mt-0.5">
                          {n.message}
                        </div>
                        <div className="text-[10px] text-[#c4a96d]/70 mt-1">
                          {n.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#8b7340]/20 mt-3 text-center">
                <button
                  onClick={() => {
                    setActiveView('owner');
                    setShowNotifs(false);
                  }}
                  className="text-xs font-bold text-[#c4a96d] hover:underline"
                >
                  Open Full Owner Command Center →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
