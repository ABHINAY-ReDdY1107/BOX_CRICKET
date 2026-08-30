import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { CustomerBookingPage } from './components/CustomerView/CustomerBookingPage';
import { OwnerDashboard } from './components/OwnerDashboard/OwnerDashboard';
import { SplitView } from './components/SplitView';
import { BusinessValueSection } from './components/BusinessValueSection';
import { LiveNotificationToast } from './components/LiveNotificationToast';
import { Footer } from './components/Footer';

const AppContent = () => {
  const { activeView } = useBooking();

  return (
    <div className="min-h-screen bg-[#12100d] text-white flex flex-col font-sans selection:bg-[#c4a96d] selection:text-[#1a1814]">
      {/* Top Fixed Header Navigation */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {activeView === 'customer' && <CustomerBookingPage />}
        {activeView === 'owner' && <OwnerDashboard />}
        {activeView === 'split' && <SplitView />}
        {activeView === 'pitch' && <BusinessValueSection />}
      </main>

      {/* Live Toast alert for owner notifications */}
      <LiveNotificationToast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
