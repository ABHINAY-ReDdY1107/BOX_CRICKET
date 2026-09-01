import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Trophy,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  QrCode,
  Sparkles,
  Lock,
} from 'lucide-react';

export const BookingModal = ({ slot, onClose, onBookingSuccess }) => {
  const { selectedDate, dates, bookSlot, ground } = useBooking();

  // Step 2 = Details, Step 3 = Payment
  const [modalStep, setModalStep] = useState('details'); // 'details' | 'payment'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [playersCount, setPlayersCount] = useState(10);
  const [matchType, setMatchType] = useState('Hard Tennis Ball');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'desk'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const activeDateObj = dates.find((d) => d.dateStr === selectedDate);
  const dateFormatted = activeDateObj ? activeDateObj.fullDateDisplay : selectedDate;

  // Validate details and proceed to Payment step
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter customer / team captain name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setModalStep('payment');
  };

  // Process payment and finalize booking
  const handleCompletePayment = () => {
    setIsSubmitting(true);
    setFormError('');

    const cleanPhone = customerPhone.replace(/\D/g, '');

    setTimeout(() => {
      const result = bookSlot({
        slotId: slot.id,
        date: selectedDate,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        playersCount: Number(playersCount),
        matchType,
        notes: `Online booking via ${paymentMethod === 'upi' ? 'UPI / QR' : 'Pay at Turf Desk'}`,
      });

      setIsSubmitting(false);

      if (result.success) {
        onBookingSuccess(result.booking);
      } else {
        // Clash detected!
        setModalStep('details');
        setFormError(result.message || 'Slot is already booked. Please choose another.');
      }
    }, 500);
  };

  return (
    <div className="modal-overlay animate-in fade-in duration-200">
      <div className="modal-content relative p-5 sm:p-7 max-w-lg border-[#c4a96d]/40">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#28231a] text-slate-400 hover:text-white hover:bg-[#383124] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Steps Indicator */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#8b7340]/20 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px]">✓</span>
            <span className="hidden sm:inline">01</span> Slot
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-[#8b7340]/40"></div>

          <div className={`flex items-center gap-1.5 ${modalStep === 'details' ? 'text-[#c4a96d]' : 'text-emerald-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
              modalStep === 'details' ? 'bg-[#c4a96d] text-dark' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {modalStep === 'details' ? '2' : '✓'}
            </span>
            <span className="hidden sm:inline">02</span> Details
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-[#8b7340]/40"></div>

          <div className={`flex items-center gap-1.5 ${modalStep === 'payment' ? 'text-[#c4a96d]' : 'text-slate-500'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
              modalStep === 'payment' ? 'bg-[#c4a96d] text-dark' : 'bg-slate-800 text-slate-400'
            }`}>
              3
            </span>
            <span className="hidden sm:inline">03</span> Payment
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-[#8b7340]/40"></div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px]">4</span>
            <span className="hidden sm:inline">04</span> Confirmed
          </div>
        </div>

        {/* Selected Slot Summary Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#28231a] to-[#1e1b15] border border-[#c4a96d]/30 mb-5">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Date</div>
                <div className="font-bold text-white">{dateFormatted}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-slate-400 text-[10px]">Time Slot</div>
                <div className="font-bold text-white">{slot.time}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Error Banner */}
        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* STEP 2: CUSTOMER DETAILS */}
        {modalStep === 'details' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            <div>
              <div className="eyebrow flex items-center gap-1.5 text-xs text-[#c4a96d] mb-1">
                <Trophy className="w-3.5 h-3.5" />
                CUSTOMER INFORMATION
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Enter Player Details
              </h3>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name / Team Captain *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#c4a96d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul / Vikram Reddy"
                  className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d] focus:ring-1 focus:ring-[#c4a96d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number (For WhatsApp Pass) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#c4a96d] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile (e.g. 9876543210)"
                  className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c4a96d] focus:ring-1 focus:ring-[#c4a96d]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Players
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#c4a96d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={playersCount}
                    onChange={(e) => setPlayersCount(e.target.value)}
                    className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 pl-9 pr-2 text-xs text-white focus:outline-none focus:border-[#c4a96d]"
                  >
                    <option value={8}>8 Players</option>
                    <option value={10}>10 Players</option>
                    <option value={12}>12 Players</option>
                    <option value={14}>14 Players</option>
                    <option value={16}>16 Players</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Ball Type
                </label>
                <select
                  value={matchType}
                  onChange={(e) => setMatchType(e.target.value)}
                  className="w-full bg-[#14120f] border border-[#8b7340]/30 rounded-xl py-2 px-2.5 text-xs text-white focus:outline-none focus:border-[#c4a96d]"
                >
                  <option value="Hard Tennis Ball">Hard Tennis</option>
                  <option value="Soft Tennis Ball">Soft Tennis</option>
                  <option value="Leather Ball Match">Leather Ball</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button button-primary gap-2 text-xs flex-1 sm:flex-none cursor-pointer"
              >
                Continue to Payment
                <ArrowRight className="w-3.5 h-3.5 text-dark" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT SCREEN */}
        {modalStep === 'payment' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <div className="eyebrow flex items-center gap-1.5 text-xs text-[#c4a96d] mb-1">
                <CreditCard className="w-3.5 h-3.5" />
                PAYMENT SUMMARY
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                Review & Complete Payment
              </h3>
            </div>

            {/* Non-Editable Price Summary */}
            <div className="p-4 rounded-2xl bg-[#171410] border border-[#8b7340]/30 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#8b7340]/15">
                <span className="text-slate-400">Turf Venue:</span>
                <span className="font-bold text-white">{ground.name}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#8b7340]/15">
                <span className="text-slate-400">Player / Captain:</span>
                <span className="font-bold text-white">{customerName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#8b7340]/15">
                <span className="text-slate-400">Slot Schedule:</span>
                <span className="font-bold text-emerald-400">{slot.time}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#8b7340]/15">
                <span className="text-slate-400">Slot Rate (Fixed):</span>
                <span className="font-mono text-slate-300">₹{ground.pricePerHour}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 text-sm">
                <span className="font-bold text-white uppercase tracking-wider">Total Amount:</span>
                <span className="font-serif font-bold text-lg text-[#c4a96d]">
                  ₹{ground.pricePerHour}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-[#28231a] border-[#c4a96d] shadow-md'
                      : 'bg-[#1a1713] border-[#8b7340]/20 hover:border-[#8b7340]/40'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#c4a96d] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Instant UPI / QR</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">Auto Verification</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('desk')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'desk'
                      ? 'bg-[#28231a] border-[#c4a96d] shadow-md'
                      : 'bg-[#1a1713] border-[#8b7340]/20 hover:border-[#8b7340]/40'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Pay at Turf Desk</div>
                    <div className="text-[10px] text-slate-400">Guaranteed Slot</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Anti Clash Guarantee */}
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>Slot locks immediately. 100% duplicate protection.</span>
            </div>

            {/* Payment CTA */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setModalStep('details')}
                disabled={isSubmitting}
                className="px-3 py-2.5 rounded-full border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <button
                type="button"
                onClick={handleCompletePayment}
                disabled={isSubmitting}
                className="button button-primary flex-1 gap-2 text-xs py-3 shadow-xl cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-dark border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing & Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-dark" />
                    <span>PAY ₹{ground.pricePerHour} & CONFIRM</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
