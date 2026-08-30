import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  GROUND_DETAILS,
  TIME_SLOTS,
  getAvailableDates,
  getInitialBookings,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

const BookingContext = createContext();

const STORAGE_KEY = 'vbc_bookings_state_v1';

export const BookingProvider = ({ children }) => {
  const dates = getAvailableDates();
  const [selectedDate, setSelectedDate] = useState(dates[0]?.dateStr || '');
  const [activeView, setActiveView] = useState('customer'); // 'customer' | 'owner' | 'split' | 'pitch'
  
  // Bookings state initialized from localStorage if present
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved bookings:', e);
    }
    return getInitialBookings(dates);
  });

  // Notifications for the owner dashboard
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [unreadNotifCount, setUnreadNotifCount] = useState(2);

  // Latest active booking confirmation (for customer success screen)
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState(null);
  
  // Flash clash modal state
  const [clashError, setClashError] = useState(null);

  // Real-time live toast alert for owner
  const [liveToast, setLiveToast] = useState(null);

  // Save to localStorage on booking updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings:', e);
    }
  }, [bookings]);

  // Check if a specific slot is booked on a specific date
  const isSlotBooked = (slotId, date = selectedDate) => {
    return bookings.some(
      (b) => b.slotId === slotId && b.date === date && b.status !== 'Cancelled'
    );
  };

  // Get booking object for a slot
  const getSlotBooking = (slotId, date = selectedDate) => {
    return bookings.find(
      (b) => b.slotId === slotId && b.date === date && b.status !== 'Cancelled'
    );
  };

  // Get metrics for a specific date
  const getDayMetrics = (date = selectedDate) => {
    const totalSlots = TIME_SLOTS.length;
    const dayBookings = bookings.filter((b) => b.date === date && b.status !== 'Cancelled');
    const bookedCount = dayBookings.length;
    const availableCount = Math.max(0, totalSlots - bookedCount);
    const revenue = dayBookings.reduce((sum, b) => sum + (b.amount || GROUND_DETAILS.pricePerHour), 0);
    const occupancyRate = Math.round((bookedCount / totalSlots) * 100);

    return {
      totalSlots,
      bookedCount,
      availableCount,
      revenue,
      occupancyRate,
      dayBookings,
    };
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#a3e635', '#38bdf8', '#fbbf24'],
      });
    } catch (err) {
      console.log('Confetti not available:', err);
    }
  };

  // Book a slot (customer or owner action)
  const bookSlot = ({
    slotId,
    date = selectedDate,
    customerName,
    customerPhone,
    playersCount = 10,
    matchType = 'Hard Tennis Ball',
    notes = '',
    bookedBy = 'customer',
  }) => {
    // 1. CLASH DETECTION: Check if already booked
    const existing = isSlotBooked(slotId, date);
    if (existing) {
      const errorMsg = 'Sorry, this slot has just been booked by another customer.';
      setClashError({
        slotId,
        date,
        message: errorMsg,
      });
      return { success: false, clash: true, message: errorMsg };
    }

    const slotInfo = TIME_SLOTS.find((s) => s.id === slotId);
    const slotTime = slotInfo ? slotInfo.time : 'Selected Time';
    const nextNum = 1020 + bookings.length + 1;
    const bookingId = `BXC-${nextNum}`;

    // Format masked phone for customer display
    const cleanPhone = customerPhone.replace(/\D/g, '');
    const maskedPhone =
      cleanPhone.length >= 10
        ? `${cleanPhone.slice(0, 2)}XXXXXX${cleanPhone.slice(-2)}`
        : customerPhone;

    const newBooking = {
      id: bookingId,
      date,
      slotId,
      time: slotTime,
      customerName: customerName.trim(),
      customerPhone: maskedPhone,
      rawPhone: cleanPhone || customerPhone,
      playersCount: Number(playersCount) || 10,
      matchType: matchType || 'Hard Tennis Ball',
      amount: GROUND_DETAILS.pricePerHour,
      status: 'Confirmed',
      createdAt: 'Just now',
      notes: notes || 'Booked online via web portal',
      bookedBy,
    };

    // Update bookings
    setBookings((prev) => [newBooking, ...prev]);
    setLastConfirmedBooking(newBooking);

    // Create live notification for owner
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'New Online Booking 🏏',
      message: `${customerName} booked ${slotTime} (${bookingId})`,
      time: 'Just now',
      read: false,
      type: 'booking',
      bookingId,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadNotifCount((prev) => prev + 1);

    // Show live toast banner for the owner / split screen
    setLiveToast({
      title: '⚡ Live Booking Received!',
      customerName: customerName,
      time: slotTime,
      date: date,
      bookingId: bookingId,
      amount: GROUND_DETAILS.pricePerHour,
    });

    // Auto dismiss live toast after 6 seconds
    setTimeout(() => {
      setLiveToast(null);
    }, 6000);

    triggerConfetti();

    return { success: true, booking: newBooking };
  };

  // Owner action: Update booking status
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  // Owner action: Cancel booking (frees up slot)
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
  };

  // Owner action: Delete permanently
  const deleteBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Requirement 15: Special Quick Demo Scenario for the meeting!
  // "Start with an available slot (e.g. Today 7:00 PM – 8:00 PM). Book it as 'Rahul'. Return to customer page and show it is now BOOKED and cannot be selected."
  const simulateRahulBookingDemo = () => {
    const todayStr = dates[0]?.dateStr;
    setSelectedDate(todayStr);

    // Check if 7-8 PM is already booked, if so free it up first
    const slot78 = 'slot-19-20';
    setBookings((prev) => prev.filter((b) => !(b.slotId === slot78 && b.date === todayStr)));

    // Perform Rahul booking
    setTimeout(() => {
      bookSlot({
        slotId: slot78,
        date: todayStr,
        customerName: 'Rahul',
        customerPhone: '9876543210',
        playersCount: 12,
        matchType: 'Floodlight Hard Tennis',
        notes: 'Sales Demo Booking',
      });
    }, 300);
  };

  // Reset demo to default state
  const resetDemoData = () => {
    const fresh = getInitialBookings(dates);
    setBookings(fresh);
    setNotifications(INITIAL_NOTIFICATIONS);
    setUnreadNotifCount(2);
    setLastConfirmedBooking(null);
    setClashError(null);
    setLiveToast(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        ground: GROUND_DETAILS,
        slots: TIME_SLOTS,
        dates,
        selectedDate,
        setSelectedDate,
        activeView,
        setActiveView,
        bookings,
        isSlotBooked,
        getSlotBooking,
        getDayMetrics,
        bookSlot,
        updateBookingStatus,
        cancelBooking,
        deleteBooking,
        notifications,
        setNotifications,
        unreadNotifCount,
        setUnreadNotifCount,
        lastConfirmedBooking,
        setLastConfirmedBooking,
        clashError,
        setClashError,
        liveToast,
        setLiveToast,
        simulateRahulBookingDemo,
        resetDemoData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
