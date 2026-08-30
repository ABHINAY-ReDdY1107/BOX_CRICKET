import React from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  Zap,
  Shield,
  Armchair,
  Droplets,
  Sparkles,
  Volume2,
  Car,
  Camera,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export const GroundInfoSection = () => {
  const { ground } = useBooking();

  const iconMap = {
    Zap: <Zap className="w-5 h-5 text-[#c4a96d]" />,
    Shield: <Shield className="w-5 h-5 text-[#c4a96d]" />,
    Armchair: <Armchair className="w-5 h-5 text-[#c4a96d]" />,
    Droplets: <Droplets className="w-5 h-5 text-[#c4a96d]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#c4a96d]" />,
    Volume2: <Volume2 className="w-5 h-5 text-[#c4a96d]" />,
    Car: <Car className="w-5 h-5 text-[#c4a96d]" />,
    Camera: <Camera className="w-5 h-5 text-[#c4a96d]" />,
  };

  return (
    <section className="py-12 border-t border-[#8b7340]/20 bg-[#161410]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="eyebrow justify-center">TURF SPECIFICATIONS & AMENITIES</div>
          <h2 className="section-title text-3xl sm:text-4xl text-white">
            Built for Serious Box Cricket Matches
          </h2>
          <p className="section-copy text-sm text-slate-400 mt-2">
            Top-tier facility with international-standard AstroTurf, floodlights for night tournaments, and complimentary playing gear.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {ground.amenities.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#221e17]/80 border border-[#8b7340]/20 hover:border-[#c4a96d]/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2d271e] border border-[#8b7340]/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                {iconMap[item.icon] || <Sparkles className="w-5 h-5 text-[#c4a96d]" />}
              </div>
              <div className="text-sm font-bold text-white group-hover:text-[#c4a96d] transition-colors">
                {item.name}
              </div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Ground Location & Contact Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-gradient-to-br from-[#241f17] to-[#181511] border border-[#c4a96d]/25">
          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#c4a96d] tracking-wider">
              <MapPin className="w-4 h-4" /> Ground Address
            </div>
            <div className="text-base font-bold text-white font-serif">
              {ground.name}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {ground.location}
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold">
              📍 Landmark: {ground.landmark}
            </div>
          </div>

          {/* Timings & Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#c4a96d] tracking-wider">
              <Clock className="w-4 h-4" /> Operating Hours & Rate
            </div>
            <div className="text-sm font-bold text-white">
              Open Daily: {ground.timing}
            </div>
            <div className="text-2xl font-serif font-bold text-[#c4a96d]">
              ₹{ground.pricePerHour} <span className="text-xs font-sans text-slate-400">/ Hour</span>
            </div>
            <p className="text-xs text-slate-400">
              Includes turf access, floodlights, 2 bats, and match tennis balls.
            </p>
          </div>

          {/* Contact Support */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#c4a96d] tracking-wider">
              <Phone className="w-4 h-4" /> Ground Manager / Desk
            </div>
            <div className="text-sm font-bold text-white">
              Direct Phone Support
            </div>
            <div className="text-sm font-mono text-emerald-400 font-bold">
              {ground.phone} / {ground.altPhone}
            </div>
            <a
              href={`tel:${ground.phone}`}
              className="inline-block mt-2 px-4 py-2 rounded-full bg-[#c4a96d] text-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            >
              Call Ground Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
