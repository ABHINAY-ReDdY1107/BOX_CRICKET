import React from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  Share2,
  CalendarCheck,
  Star,
  Users,
} from 'lucide-react';

export const HeroBanner = ({ onBookClick }) => {
  const { ground, getDayMetrics, selectedDate } = useBooking();
  const metrics = getDayMetrics(selectedDate);

  const handleShareTurf = () => {
    const shareText = `🏏 *${ground.name}*\n⚡ ₹${ground.pricePerHour}/hour slot\nCheck live slots & book directly: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: ground.name,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  return (
    <section className="hero">
      {/* Orbital animated concentric lines */}
      <div className="orbital-lines">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="hero-shell max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Hero Copy & Actions */}
        <div className="lg:col-span-7 z-10">
          <div className="eyebrow flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE SLOT BOOKING · INSTANT DOUBLE-BOOKING PREVENTION
          </div>

          <h1 className="hero-title mt-2">
            Book Your Best Match at <span className="text-[#c4a96d]">{ground.name}</span>
          </h1>

          <p className="hero-copy mt-4 max-w-xl">
            Reserve slots online in real-time without phone calls. Instant double-booking prevention, 8x floodlit night arena, FIFA-grade 50mm turf, and complimentary match gear.
          </p>

          {/* Quick Ground Highlights Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#28231a]/80 border border-[#8b7340]/20">
              <div className="w-8 h-8 rounded-lg bg-[#c4a96d]/15 text-[#c4a96d] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">8x Floodlights</div>
                <div className="text-[10px] text-slate-400">Day & Night Match</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#28231a]/80 border border-[#8b7340]/20">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">50mm Pro Turf</div>
                <div className="text-[10px] text-slate-400">True Bounce Pitch</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#28231a]/80 border border-[#8b7340]/20 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">₹{ground.pricePerHour}/Hour</div>
                <div className="text-[10px] text-emerald-400 font-semibold">Gear Included</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onBookClick}
              className="button button-primary gap-2 text-sm shadow-xl"
            >
              <CalendarCheck className="w-4 h-4 text-dark" />
              Check Available Slots & Book
            </button>

            <button
              onClick={handleShareTurf}
              className="button button-ghost gap-2 text-xs"
            >
              <Share2 className="w-4 h-4" />
              Share Ground with Team
            </button>

            <a
              href={`tel:${ground.phone}`}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#c4a96d] transition-colors ml-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Turf Desk: {ground.phone}
            </a>
          </div>
        </div>

        {/* Right Column: Hero Studio Card with Live Ground Status */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="hero-studio-card w-full">
            <div className="studio-card-top flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <strong className="text-emerald-400">TURF LIVE STATUS</strong>
              </span>
              <span className="text-[11px] text-[#c4a96d]">{ground.timing}</span>
            </div>

            {/* Stadium Visual Preview Card */}
            <div className="studio-rings my-4 relative rounded-xl overflow-hidden border border-[#c4a96d]/25 bg-gradient-to-b from-[#1b2b1e] to-[#0f1712] p-4 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {metrics.availableCount} SLOTS OPEN TODAY
                </span>
                <span className="text-xs font-serif text-[#c4a96d]">
                  ₹{ground.pricePerHour}/hr
                </span>
              </div>

              {/* Pitch Illustration */}
              <div className="relative my-2 py-3 border-y border-emerald-500/20 text-center">
                <div className="text-base font-serif font-bold text-white tracking-wide">
                  {ground.name}
                </div>
                <div className="text-[11px] text-slate-300 flex items-center justify-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#c4a96d]" />
                  {ground.landmark}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Box Size: 100 × 55 ft</span>
                <span className="text-emerald-400 font-semibold">10-16 Players</span>
              </div>
            </div>

            {/* Quick Live Ground Specs List */}
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between py-1.5 border-t border-[#8b7340]/15">
                <span className="text-slate-400">Double-Booking Guard:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Automated
                </span>
              </li>
              <li className="flex items-center justify-between py-1.5 border-t border-[#8b7340]/15">
                <span className="text-slate-400">Evening Match Prime:</span>
                <span className="text-[#c4a96d] font-semibold">5:00 PM – 11:00 PM</span>
              </li>
              <li className="flex items-center justify-between py-1.5 border-t border-[#8b7340]/15">
                <span className="text-slate-400">Equipment Provided:</span>
                <span className="text-white">Tennis Bats & Balls Included</span>
              </li>
            </ul>

            <button
              onClick={onBookClick}
              className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c4a96d] to-[#8b7340] text-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
            >
              Select Your Match Slot →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
