# 🏏 Box Cricket — Slot Booking & Turf Management System

A **Box Cricket Slot Booking & Management Platform** created for box cricket turf and sports arena owners. Designed to solve the biggest operational problem turf businesses face: **endless repetitive phone calls and double booking clashes.**

Built with **React**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and the **Auxify Gold & Dark aesthetic design system** (*Cormorant Garamond + DM Sans* typography).

---

## 🎯 The Core Problem Solved

| Before (Phone Calls & Diary) | After (Box Cricket Booking Platform) |
| :--- | :--- |
| ❌ 50+ calls every day asking *"7 PM slot open unda?"* | ✅ Customers open the link, view live slots, and self-book in 30s |
| ❌ Dangerous double-booking arguments at the turf | ✅ **100% automated clash prevention** — slot locks instantly |
| ❌ Pen-and-paper booking mistakes & lost entries | ✅ Complete digital booking ledger with captain details & phone numbers |
| ❌ Manual daily revenue counting | ✅ Real-time daily revenue tracking (e.g. ₹4,200/day) |
| ❌ Customers forget slot timings & arrive late | ✅ WhatsApp match pass with match details & guidelines |

---

## ⚡ The Key Sales Pitch Moment

> **"Instead of customers calling you throughout the day to check and book slots, they can do everything here. You can see every booking in one dashboard, and the system automatically prevents slot clashes."**

### 🎯 2-Minute Sales Demo Flow

1. **Customer View**: Open Customer Booking → Select Today's Date → Pick **7:00 PM – 8:00 PM** (Floodlight Prime) → Enter Name *"Rahul"* & Phone → Review Payment (₹600) → Click **PAY ₹600 & CONFIRM**.
2. **Instant Pass**: View confirmed digital sports pass `#BXC-1024` with WhatsApp share button.
3. **Clash Shield Demo**: Revisit the Customer Booking page. The 7:00 PM slot is now locked as **BOOKED** and cannot be selected by anyone else. If clicked, it shows the clash protection notice.
4. **Owner Command Center**: Switch to the **Owner Dashboard** or **Live Split View**. Watch the new booking reflected immediately with updated revenue (+₹600) and live notifications.

---

## ✨ Features

### 1. 🏏 Customer Booking Portal (Mobile-First)
- **Ground Highlights**: ₹600/hour pricing, 8x stadium floodlights, 50mm AstroTurf specs.
- **7-Day Dynamic Date Strip**: Instant slot availability counters (e.g. *"5 Slots Open"*).
- **Time Slot Matrix (6:00 AM – 11:00 PM)**:
  - Morning (6 AM – 12 PM)
  - Afternoon (3 PM – 5 PM)
  - Floodlight Prime (5 PM – 11 PM)
- **High-Conversion Multi-Step Booking & Payment Flow**:
  - Step 01: Slot selection
  - Step 02: Customer Name, Phone, Players count, and Match ball preference
  - Step 03: Non-editable fixed price summary (₹600) & Payment verification
  - Step 04: Digital Match Pass & 1-click **WhatsApp share**

### 2. 🛡️ Clash Guardian (Double-Booking Prevention)
- Real-time reactive state management.
- Prevents duplicate reservations across all devices and tabs.
- Visual warning dialogs if a slot is already reserved.

### 3. 📊 Owner Command Center
- **Key Metrics**: Total slots, Booked slots, Available slots, and Estimated Revenue.
- **Occupancy Rate Meter**: Visual progress bar of daily turf utilization.
- **Interactive Daily Ledger**: Full timetable with Captain names, phone numbers, match types, payment status, and action buttons.
- **Booking Management Modal**: Confirm, mark completed, cancel (frees up slot), call customer, or send WhatsApp reminder.
- **Record Phone Call / Walk-In**: Easily record offline phone bookings into the system in 2 taps.

### 4. 📱 Live Split Demo Mode
- Side-by-side interactive split view featuring a **Customer Smartphone View** on the left and **Owner Command Center** on the right.
- Demonstrates instant cross-device synchronization in real-time.

---

## 🛠️ Tech Stack & Design System

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Auxify Luxury Gold/Dark Theme
- **Typography**: Cormorant Garamond (Serif Display) + DM Sans (Clean UI)
- **Icons**: Lucide React
- **Animations**: Canvas-confetti celebration, subtle pulses, and glassmorphic overlays
- **Persistence**: LocalStorage with automatic state persistence & 1-click demo reset

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/ABHINAY-ReDdY1107/BOX_CRICKET.git

# Navigate into project folder
cd box-cricket

# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build
```bash
npm run build
```
Generates an optimized production bundle inside the `dist/` directory.

---

© 2026 Box Cricket Booking Platform. Built for sports turf business sales demos.
