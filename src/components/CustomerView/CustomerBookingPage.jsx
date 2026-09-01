import React, { useState, useRef } from 'react';
import { useBooking } from '../../context/BookingContext';
import { HeroBanner } from './HeroBanner';
import { DateSelector } from './DateSelector';
import { SlotGrid } from './SlotGrid';
import { BookingModal } from './BookingModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { ClashAlertModal } from '../ClashAlertModal';
import { GroundInfoSection } from './GroundInfoSection';
import { CalendarCheck, ShieldCheck, Zap } from 'lucide-react';

export const CustomerBookingPage = () => {
  const { lastConfirmedBooking, setLastConfirmedBooking, clashError, setClashError } = useBooking();
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState(null);
  const bookingSectionRef = useRef(null);

  const scrollToBooking = () => {
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlotForBooking(slot);
  };

  const handleBookedSlotClick = (slot, bookingInfo) => {
    setClashError({
      slotId: slot.id,
      message: `Sorry, this ${slot.time} slot has already been booked by ${bookingInfo?.customerName || 'another customer'}. Please select an available slot.`,
    });
  };

  const handleBookingSuccess = (booking) => {
    setSelectedSlotForBooking(null);
    setLastConfirmedBooking(booking);
  };

  return (
    <div className="min-h-screen bg-[#12100d] text-white">
      {/* Hero Section */}
      <HeroBanner onBookClick={scrollToBooking} />

      {/* Marquee Ticker */}
      <div className="marquee">
        <div className="marquee-track">
          <span>BOX CRICKET BOOKING</span>
          <i></i>
          <span>LIVE SLOT BOOKING</span>
          <i></i>
          <span>ZERO PHONE CALLS</span>
          <i></i>
          <span>INSTANT CLASH PREVENTION</span>
          <i></i>
          <span>8X STADIUM FLOODLIGHTS</span>
          <i></i>
          <span>₹600 / HOUR</span>
          <i></i>
          <span>FIFA-GRADE 50MM TURF</span>
          <i></i>
          <span>BOX CRICKET BOOKING</span>
          <i></i>
          <span>LIVE SLOT BOOKING</span>
          <i></i>
          <span>ZERO PHONE CALLS</span>
          <i></i>
          <span>INSTANT CLASH PREVENTION</span>
          <i></i>
        </div>
      </div>

      {/* Customer Booking Interactive Section */}
      <section ref={bookingSectionRef} className="py-12 px-4 max-w-6xl mx-auto">
        {/* Step Guide Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#241f17] to-[#1a1713] border border-[#c4a96d]/25 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="eyebrow text-xs text-[#c4a96d] mb-1">
                ONLINE MATCH SCHEDULER
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Book Your Cricket Match Online
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select your preferred date and time slot below to secure your ground in seconds.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Double Booking Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector (Step 1) */}
        <DateSelector />

        {/* Slot Grid (Step 2) */}
        <SlotGrid
          selectedSlotId={selectedSlotForBooking?.id}
          onSelectSlot={handleSelectSlot}
          onBookedSlotClick={handleBookedSlotClick}
        />
      </section>

      {/* Ground Specifications & Amenities */}
      <GroundInfoSection />

      {/* Booking Form Modal */}
      {selectedSlotForBooking && (
        <BookingModal
          slot={selectedSlotForBooking}
          onClose={() => setSelectedSlotForBooking(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Booking Confirmation Pass Modal */}
      {lastConfirmedBooking && (
        <BookingConfirmationModal
          booking={lastConfirmedBooking}
          onClose={() => setLastConfirmedBooking(null)}
        />
      )}

      {/* Clash Prevention Alert Modal */}
      {clashError && (
        <ClashAlertModal
          error={clashError}
          onClose={() => setClashError(null)}
        />
      )}

      {/* Mobile Sticky Book Bar — only visible on small screens */}
      <div className="mobile-book-bar md:hidden">
        <button
          onClick={scrollToBooking}
          className="button button-primary w-full gap-2 text-sm shadow-xl"
          style={{ minHeight: '48px' }}
        >
          <CalendarCheck className="w-4 h-4 text-dark" />
          BOOK A SLOT — ₹600/HR
        </button>
      </div>
    </div>
  );
};
