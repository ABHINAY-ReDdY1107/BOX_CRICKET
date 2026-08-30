// Ground Details & Mock Initial Data for Vikarabad Box Cricket

export const GROUND_DETAILS = {
  name: "Vikarabad Box Cricket",
  shortName: "VBC Turf",
  tagline: "Premier Day & Night Box Cricket Turf",
  location: "Beside HP Petrol Pump, Ananthagiri Hills Road, Vikarabad, Telangana 501101",
  landmark: "2 Mins from Ananthagiri Hills X-Road",
  phone: "+91 98480 22334",
  altPhone: "+91 94401 55667",
  pricePerHour: 600,
  currency: "₹",
  rating: 4.9,
  totalReviews: 248,
  timing: "6:00 AM – 11:00 PM (Everyday)",
  specs: {
    dimensions: "100 ft × 55 ft × 28 ft Height",
    turfType: "50mm Pro FIFA-Grade Monofilament AstroTurf",
    lights: "8x 200W Stadium-Grade LED Floodlights (Shadow-free)",
    pitchType: "Specially prepared batting strip with true bounce",
  },
  amenities: [
    { icon: "Zap", name: "High-Lux Floodlights", desc: "Crystal clear night matches" },
    { icon: "Shield", name: "Heavy Duty Box Netting", desc: "No lost balls, fast play" },
    { icon: "Armchair", name: "Pavilion & Dugout Seating", desc: "Cooler lounge for 20+ players" },
    { icon: "Droplets", name: "Chilled RO Water", desc: "Free unlimited hydration" },
    { icon: "Sparkles", name: "Bats & Balls Included", desc: "English/Kashmir willow & tennis balls" },
    { icon: "Volume2", name: "Bluetooth Sound System", desc: "Play your team's match anthem" },
    { icon: "Car", name: "Dedicated 2W & 4W Parking", desc: "Safe on-site parking space" },
    { icon: "Camera", name: "HD Live Match Recording", desc: "Get your sixes on camera" },
  ],
  rules: [
    "Please arrive 10 minutes prior to your booked slot.",
    "Non-marking sports shoes or turf trainers only (No metal spikes).",
    "Max 14-16 active players inside the playing turf box.",
    "Hard tennis & soft tennis balls are complimentary with your slot.",
  ],
};

// Available slot templates throughout the day (6 AM to 11 PM)
export const TIME_SLOTS = [
  { id: "slot-06-07", time: "6:00 AM – 7:00 AM", period: "morning", label: "Early Bird", price: 600 },
  { id: "slot-07-08", time: "7:00 AM – 8:00 AM", period: "morning", label: "Morning Prime", price: 600 },
  { id: "slot-08-09", time: "8:00 AM – 9:00 AM", period: "morning", label: "Morning Prime", price: 600 },
  { id: "slot-09-10", time: "9:00 AM – 10:00 AM", period: "morning", label: "Morning Regular", price: 600 },
  { id: "slot-10-11", time: "10:00 AM – 11:00 AM", period: "morning", label: "Morning Regular", price: 600 },
  { id: "slot-11-12", time: "11:00 AM – 12:00 PM", period: "morning", label: "Noon Slot", price: 600 },
  { id: "slot-15-16", time: "3:00 PM – 4:00 PM", period: "afternoon", label: "Afternoon Warmup", price: 600 },
  { id: "slot-16-17", time: "4:00 PM – 5:00 PM", period: "afternoon", label: "Late Afternoon", price: 600 },
  { id: "slot-17-18", time: "5:00 PM – 6:00 PM", period: "evening", label: "Twilight Match", price: 600 },
  { id: "slot-18-19", time: "6:00 PM – 7:00 PM", period: "evening", label: "Floodlight Prime ⚡", price: 600 },
  { id: "slot-19-20", time: "7:00 PM – 8:00 PM", period: "evening", label: "Floodlight Prime ⚡", price: 600 },
  { id: "slot-20-21", time: "8:00 PM – 9:00 PM", period: "evening", label: "Super Night Prime 🌟", price: 600 },
  { id: "slot-21-22", time: "9:00 PM – 10:00 PM", period: "night", label: "Late Night Smash", price: 600 },
  { id: "slot-22-23", time: "10:00 PM – 11:00 PM", period: "night", label: "Midnight Showdown", price: 600 },
];

// Helper to generate dynamic dates starting from today
export const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`; // YYYY-MM-DD
    
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const formattedDisplay = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const fullDateDisplay = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    dates.push({
      dateStr,
      dayName,
      formattedDisplay,
      fullDateDisplay,
      isToday: i === 0,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    });
  }
  return dates;
};

// Initial realistic bookings for demonstration
export const getInitialBookings = (dates) => {
  const todayStr = dates[0]?.dateStr || "2026-08-30";
  const tomorrowStr = dates[1]?.dateStr || "2026-08-31";
  const dayAfterStr = dates[2]?.dateStr || "2026-09-01";

  return [
    // Today's Bookings
    {
      id: "BXC-1011",
      date: todayStr,
      slotId: "slot-06-07",
      time: "6:00 AM – 7:00 AM",
      customerName: "Vikram Reddy",
      customerPhone: "98480 XXXXX",
      rawPhone: "9848011223",
      playersCount: 10,
      matchType: "Hard Tennis Ball",
      amount: 600,
      status: "Completed",
      createdAt: "Today, 5:30 AM",
      notes: "Early morning regular group",
    },
    {
      id: "BXC-1015",
      date: todayStr,
      slotId: "slot-07-08",
      time: "7:00 AM – 8:00 AM",
      customerName: "Karthik Varma",
      customerPhone: "94401 XXXXX",
      rawPhone: "9440188776",
      playersCount: 12,
      matchType: "Soft Tennis Ball",
      amount: 600,
      status: "Completed",
      createdAt: "Yesterday, 9:00 PM",
      notes: "Collage Friends League",
    },
    {
      id: "BXC-1018",
      date: todayStr,
      slotId: "slot-17-18",
      time: "5:00 PM – 6:00 PM",
      customerName: "Suresh Kumar",
      customerPhone: "99887 XXXXX",
      rawPhone: "9988712345",
      playersCount: 10,
      matchType: "Hard Tennis Ball",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 10:15 AM",
      notes: "Office match vs Tech Team",
    },
    {
      id: "BXC-1020",
      date: todayStr,
      slotId: "slot-18-19",
      time: "6:00 PM – 7:00 PM",
      customerName: "Arjun Rao",
      customerPhone: "99XXXXXX42",
      rawPhone: "9959142890",
      playersCount: 14,
      matchType: "Floodlight Hard Tennis",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 11:45 AM",
      notes: "Tournament warmup match",
    },
    // Note: 7:00 PM - 8:00 PM is deliberately left AVAILABLE for Rahul's demo booking!
    {
      id: "BXC-1022",
      date: todayStr,
      slotId: "slot-20-21",
      time: "8:00 PM – 9:00 PM",
      customerName: "Mahesh Yadav",
      customerPhone: "91772 XXXXX",
      rawPhone: "9177299881",
      playersCount: 12,
      matchType: "Floodlight Tennis",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 1:20 PM",
      notes: "Requested 2 extra balls",
    },
    {
      id: "BXC-1025",
      date: todayStr,
      slotId: "slot-21-22",
      time: "9:00 PM – 10:00 PM",
      customerName: "Sai Krishna",
      customerPhone: "97XXXXXX12",
      rawPhone: "9701234512",
      playersCount: 14,
      matchType: "Super League Night Match",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 12:05 PM",
      notes: "Vikarabad Strikers Club",
    },
    {
      id: "BXC-1027",
      date: todayStr,
      slotId: "slot-22-23",
      time: "10:00 PM – 11:00 PM",
      customerName: "Naveen Goud",
      customerPhone: "89190 XXXXX",
      rawPhone: "8919022334",
      playersCount: 10,
      matchType: "Midnight Match",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 2:10 PM",
      notes: "Birthday celebration match",
    },

    // Tomorrow's Bookings
    {
      id: "BXC-1030",
      date: tomorrowStr,
      slotId: "slot-06-07",
      time: "6:00 AM – 7:00 AM",
      customerName: "Praveen Kumar",
      customerPhone: "90001 XXXXX",
      rawPhone: "9000188990",
      playersCount: 10,
      matchType: "Hard Tennis Ball",
      amount: 600,
      status: "Confirmed",
      createdAt: "Yesterday",
      notes: "Morning Fitness Squad",
    },
    {
      id: "BXC-1033",
      date: tomorrowStr,
      slotId: "slot-18-19",
      time: "6:00 PM – 7:00 PM",
      customerName: "Anand Shinde",
      customerPhone: "98661 XXXXX",
      rawPhone: "9866177443",
      playersCount: 12,
      matchType: "Floodlight Tennis",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 9:00 AM",
      notes: "Advance booking",
    },
    {
      id: "BXC-1036",
      date: tomorrowStr,
      slotId: "slot-19-20",
      time: "7:00 PM – 8:00 PM",
      customerName: "Chandra Sekhar",
      customerPhone: "97045 XXXXX",
      rawPhone: "9704511223",
      playersCount: 14,
      matchType: "Floodlight Tennis",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 10:30 AM",
      notes: "Bank Employees team",
    },
    {
      id: "BXC-1038",
      date: tomorrowStr,
      slotId: "slot-20-21",
      time: "8:00 PM – 9:00 PM",
      customerName: "Manoj Teja",
      customerPhone: "95500 XXXXX",
      rawPhone: "9550066778",
      playersCount: 12,
      matchType: "Floodlight Tennis",
      amount: 600,
      status: "Confirmed",
      createdAt: "Today, 11:15 AM",
      notes: "Weekend derby",
    },

    // Day After Tomorrow's Bookings
    {
      id: "BXC-1042",
      date: dayAfterStr,
      slotId: "slot-19-20",
      time: "7:00 PM – 8:00 PM",
      customerName: "Rakesh Patel",
      customerPhone: "93901 XXXXX",
      rawPhone: "9390144556",
      playersCount: 12,
      matchType: "Floodlight Tennis",
      amount: 600,
      status: "Confirmed",
      createdAt: "Yesterday",
      notes: "Advance slot booking",
    },
  ];
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New Booking Confirmed",
    message: "Sai Krishna booked 9:00 PM – 10:00 PM slot (ID: BXC-1025)",
    time: "15 mins ago",
    read: false,
    type: "booking",
  },
  {
    id: "notif-2",
    title: "New Booking Confirmed",
    message: "Mahesh Yadav booked 8:00 PM – 9:00 PM slot (ID: BXC-1022)",
    time: "45 mins ago",
    read: false,
    type: "booking",
  },
  {
    id: "notif-3",
    title: "Slot Completed",
    message: "Karthik Varma finished 7:00 AM – 8:00 AM morning match",
    time: "5 hours ago",
    read: true,
    type: "status",
  },
];
