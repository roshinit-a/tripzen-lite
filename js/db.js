// =============================================
// TripZen Lite — localStorage "Database"
// No Java. No MySQL. Just JavaScript!
// =============================================

const DB = {

  // ---------- KEY NAMES ----------
  KEYS: {
    USERS:    'tz_users',
    SESSION:  'tz_session',
    BOOKINGS: 'tz_bookings',
    PAYMENTS: 'tz_payments',
    DESTS:    'tz_destinations',
    HOTELS:   'tz_hotels',
    PACKAGES: 'tz_packages',
  },

  // ---------- GENERIC HELPERS ----------
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  nextId(arr) {
    return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
  },

  // ---------- SEED DEFAULT DATA ----------
  seed() {
    if (localStorage.getItem('tz_seeded_v2')) return; // already seeded

    // Default admin + demo user
    this.set(this.KEYS.USERS, [
      { id: 1, name: 'Admin User',  email: 'admin@tripzen.com', password: 'admin123', role: 'ADMIN', phone: '9000000000', createdAt: '2024-01-01' },
      { id: 2, name: 'Demo User',   email: 'user@tripzen.com',  password: 'user123',  role: 'USER',  phone: '9876543210', createdAt: '2024-01-10' },
    ]);

    // Destinations
    this.set(this.KEYS.DESTS, [
      { id:1, name:'Goa',        country:'India', state:'Goa',              description:'Beautiful beaches, vibrant nightlife and Portuguese heritage.',          imageUrl:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=60', bestTime:'October – March' },
      { id:2, name:'Manali',     country:'India', state:'Himachal Pradesh', description:'Snow-capped mountains, adventure sports and scenic Himalayan valleys.',  imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=60', bestTime:'April – June'    },
      { id:3, name:'Jaipur',     country:'India', state:'Rajasthan',        description:'The Pink City with royal palaces, forts and rich Rajasthani culture.',  imageUrl:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=60', bestTime:'November – February' },
      { id:4, name:'Kerala',     country:'India', state:'Kerala',           description:"God's own country — backwaters, spice gardens and Ayurveda.",           imageUrl:'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=60', bestTime:'September – March' },
      { id:5, name:'Darjeeling', country:'India', state:'West Bengal',      description:'Tea gardens, the iconic toy train and stunning Kanchenjunga views.',    imageUrl:'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=60', bestTime:'March – May'     },
      { id:6, name:'Udaipur',    country:'India', state:'Rajasthan',        description:'City of Lakes with stunning palaces and romantic sunset boat rides.',   imageUrl:'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=60', bestTime:'October – March' },
    ]);

    // Hotels
    this.set(this.KEYS.HOTELS, [
      { id:1, name:'The Grand Goa Resort',       location:'Baga Beach, North Goa',   pricePerNight:4500, rating:4.5, rooms:8,  destId:1, description:'Luxury beachside resort with infinity pool and ocean views.',           imageUrl:'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=60' },
      { id:2, name:'Sunshine Beach Inn',         location:'Calangute, Goa',          pricePerNight:2200, rating:3.8, rooms:15, destId:1, description:'Budget-friendly hotel 5 minutes walk from the beach.',                  imageUrl:'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=60' },
      { id:3, name:'Manali Snow Peak Hotel',     location:'Mall Road, Manali',       pricePerNight:3200, rating:4.2, rooms:12, destId:2, description:'Cozy mountain hotel with panoramic Himalayan views.',                   imageUrl:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=60'  },
      { id:4, name:'Jaipur Palace Inn',          location:'Civil Lines, Jaipur',     pricePerNight:2800, rating:4.0, rooms:20, destId:3, description:'Heritage hotel with rooftop restaurant and palace views.',              imageUrl:'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=400&q=60' },
      { id:5, name:'Kerala Backwater Villa',     location:'Alleppey, Kerala',        pricePerNight:5500, rating:4.8, rooms:5,  destId:4, description:'Premium villa with direct backwater access and Ayurvedic spa.',         imageUrl:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=60' },
      { id:6, name:'Darjeeling Tea Garden Stay', location:'Darjeeling Hills',        pricePerNight:3800, rating:4.3, rooms:10, destId:5, description:'Surrounded by lush tea gardens with stunning mountain views.',          imageUrl:'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=400&q=60' },
    ]);

    // Travel Packages
    this.set(this.KEYS.PACKAGES, [
      { id:1, name:'Goa Beach Explorer',      destId:1, destName:'Goa',        days:4, price:15000, description:'4 days of sun, sand and seafood in beautiful Goa. Visit Baga, Calangute and Anjuna beaches. Experience the vibrant nightlife and explore Portuguese churches.',      inclusions:'Hotel Stay (3★),Daily Breakfast,Airport Transfer,Beach Tour,Water Sports,Sightseeing Guide', maxPersons:10, imageUrl:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=60', active:true },
      { id:2, name:'Goa Premium Escape',      destId:1, destName:'Goa',        days:6, price:30000, description:'Luxury 6-day Goa holiday with 5-star resort stay, private beach cabana, sunset cruise and candlelight dinner.',                                                   inclusions:'5-Star Hotel,All Meals,Sunset Cruise,Beach Cabana,Spa Session,Airport Transfer',            maxPersons:6,  imageUrl:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=60', active:true },
      { id:3, name:'Manali Snow Adventure',   destId:2, destName:'Manali',     days:5, price:20000, description:'5 days of adventure in snow-clad mountains. Experience skiing, snowboarding and river rafting. Visit Rohtang Pass, Solang Valley and Hadimba Temple.',               inclusions:'Hotel Stay (4★),All Meals,Skiing,River Rafting,Rohtang Pass,Hadimba Temple',                maxPersons:8,  imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=60', active:true },
      { id:4, name:'Jaipur Royal Heritage',   destId:3, destName:'Jaipur',     days:3, price:12000, description:'3 days exploring the Pink City palaces and vibrant Rajasthani culture. Visit Amber Fort, City Palace, Hawa Mahal and enjoy a cultural show.',                       inclusions:'Hotel Stay,Breakfast,Amber Fort,City Palace Tour,Cultural Show,Desert Safari',              maxPersons:12, imageUrl:'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=60', active:true },
      { id:5, name:'Kerala Backwater Bliss',  destId:4, destName:'Kerala',     days:6, price:25000, description:'Cruise through serene backwaters, enjoy Ayurvedic spa and relish authentic Kerala cuisine. Includes houseboat stay on Alleppey backwaters.',                        inclusions:'Houseboat Stay,All Meals,Backwater Cruise,Ayurvedic Spa,Kathakali Show,Spice Plantation',   maxPersons:8,  imageUrl:'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=60', active:true },
      { id:6, name:'Darjeeling Tea Trail',    destId:5, destName:'Darjeeling', days:4, price:18000, description:'4 days of tea gardens, toy train ride, Kanchenjunga sunrise and colonial Darjeeling charm.',                                                                        inclusions:'Hotel Stay,Breakfast,Toy Train Ride,Tea Garden Tour,Tiger Hill Sunrise,Himalayan Museum',    maxPersons:10, imageUrl:'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=60', active:true },
      { id:7, name:'Udaipur Lake Romance',    destId:6, destName:'Udaipur',    days:3, price:14000, description:'Romantic 3-day getaway in the City of Lakes with heritage hotel, palace boat ride and stunning sunset views.',                                                       inclusions:'Heritage Hotel,Breakfast,Boat Ride on Lake Pichola,City Palace Tour,Cultural Dinner',       maxPersons:8,  imageUrl:'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=60', active:true },
    ]);

    if (!localStorage.getItem(this.KEYS.BOOKINGS)) this.set(this.KEYS.BOOKINGS, []);
    if (!localStorage.getItem(this.KEYS.PAYMENTS)) this.set(this.KEYS.PAYMENTS, []);
    localStorage.setItem('tz_seeded_v2', '1');
  },

  // ---------- USER METHODS ----------
  getUsers()   { return this.get(this.KEYS.USERS); },
  saveUsers(u) { this.set(this.KEYS.USERS, u); },

  registerUser(name, email, password, phone = '') {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) throw new Error('Email already registered!');
    const user = { id: this.nextId(users), name, email, password, role: 'USER', phone, createdAt: new Date().toISOString().split('T')[0] };
    users.push(user);
    this.saveUsers(users);
    return user;
  },

  loginUser(email, password) {
    const user = this.getUsers().find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password!');
    this.set(this.KEYS.SESSION, user);
    return user;
  },

  logout()          { localStorage.removeItem(this.KEYS.SESSION); },
  getSession()      { try { return JSON.parse(localStorage.getItem(this.KEYS.SESSION)); } catch { return null; } },
  isLoggedIn()      { return !!this.getSession(); },
  isAdmin()         { const s = this.getSession(); return s && s.role === 'ADMIN'; },

  deleteUser(id)  {
    this.saveUsers(this.getUsers().filter(u => u.id !== id));
  },

  // ---------- DESTINATION METHODS ----------
  getDests()          { return this.get(this.KEYS.DESTS); },
  addDest(d)          { const arr = this.getDests(); d.id = this.nextId(arr); arr.push(d); this.set(this.KEYS.DESTS, arr); return d; },
  updateDest(id, d)   { const arr = this.getDests().map(x => x.id === id ? { ...x, ...d, id } : x); this.set(this.KEYS.DESTS, arr); },
  deleteDest(id)      { this.set(this.KEYS.DESTS, this.getDests().filter(x => x.id !== id)); },

  // ---------- HOTEL METHODS ----------
  getHotels()         { return this.get(this.KEYS.HOTELS); },
  addHotel(h)         { const arr = this.getHotels(); h.id = this.nextId(arr); arr.push(h); this.set(this.KEYS.HOTELS, arr); return h; },
  updateHotel(id, h)  { const arr = this.getHotels().map(x => x.id === id ? { ...x, ...h, id } : x); this.set(this.KEYS.HOTELS, arr); },
  deleteHotel(id)     { this.set(this.KEYS.HOTELS, this.getHotels().filter(x => x.id !== id)); },

  // ---------- PACKAGE METHODS ----------
  getPackages(activeOnly = true) {
    const p = this.get(this.KEYS.PACKAGES);
    return activeOnly ? p.filter(x => x.active) : p;
  },
  addPackage(p)       { const arr = this.get(this.KEYS.PACKAGES); p.id = this.nextId(arr); p.active = true; arr.push(p); this.set(this.KEYS.PACKAGES, arr); return p; },
  updatePackage(id,p) { const arr = this.get(this.KEYS.PACKAGES).map(x => x.id === id ? { ...x, ...p, id } : x); this.set(this.KEYS.PACKAGES, arr); },
  deletePackage(id)   { const arr = this.get(this.KEYS.PACKAGES).map(x => x.id === id ? { ...x, active:false } : x); this.set(this.KEYS.PACKAGES, arr); },

  // ---------- BOOKING METHODS ----------
  getBookings()       { return this.get(this.KEYS.BOOKINGS); },
  getMyBookings(uid)  { return this.getBookings().filter(b => b.userId === uid); },

  createBooking(userId, packageId, travelDate, persons, specialRequests = '') {
    const pkg = this.get(this.KEYS.PACKAGES).find(p => p.id === packageId);
    if (!pkg) throw new Error('Package not found!');
    const totalPrice = pkg.price * persons;
    const bookings = this.getBookings();
    const booking = {
      id: this.nextId(bookings), userId, packageId,
      packageName: pkg.name, destName: pkg.destName,
      travelDate, persons, totalPrice,
      status: 'PENDING',
      specialRequests,
      bookedAt: new Date().toISOString()
    };
    bookings.push(booking);
    this.set(this.KEYS.BOOKINGS, bookings);
    return booking;
  },

  cancelBooking(id, userId) {
    const arr = this.getBookings();
    const b = arr.find(x => x.id === id);
    if (!b) throw new Error('Booking not found!');
    if (b.userId !== userId) throw new Error('Not your booking!');
    if (b.status === 'CONFIRMED') throw new Error('Cannot cancel a confirmed booking!');
    b.status = 'CANCELLED';
    this.set(this.KEYS.BOOKINGS, arr);
    return b;
  },

  updateBookingStatus(id, status) {
    const arr = this.getBookings();
    const b = arr.find(x => x.id === id);
    if (b) { b.status = status; this.set(this.KEYS.BOOKINGS, arr); }
  },

  // ---------- PAYMENT METHODS ----------
  getPayments()     { return this.get(this.KEYS.PAYMENTS); },

  processPayment(bookingId, method) {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found!');
    if (booking.status === 'CANCELLED') throw new Error('Cannot pay for a cancelled booking!');

    const txnId = 'TXN-' + Math.random().toString(36).substring(2,10).toUpperCase();
    const payments = this.getPayments();
    const payment = {
      id: this.nextId(payments), bookingId,
      amount: booking.totalPrice,
      method, status: 'SUCCESS',
      transactionId: txnId,
      paidAt: new Date().toISOString()
    };
    payments.push(payment);
    this.set(this.KEYS.PAYMENTS, payments);

    // Confirm booking
    booking.status = 'CONFIRMED';
    this.set(this.KEYS.BOOKINGS, bookings);

    return payment;
  },

  // ---------- DASHBOARD STATS ----------
  getStats() {
    const bookings = this.getBookings();
    const confirmed = bookings.filter(b => b.status === 'CONFIRMED');
    return {
      totalUsers:    this.getUsers().filter(u => u.role === 'USER').length,
      totalPackages: this.get(this.KEYS.PACKAGES).filter(p => p.active).length,
      totalBookings: bookings.length,
      totalRevenue:  confirmed.reduce((s, b) => s + b.totalPrice, 0)
    };
  }
};

// ---------- UTILITY FUNCTIONS ----------
function formatCurrency(n) {
  return '₹' + Number(n).toLocaleString('en-IN');
}
function formatDate(str) {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' });
}
function getStatusBadge(s) {
  const cls = { CONFIRMED:'badge-success', PENDING:'badge-warning', CANCELLED:'badge-danger' };
  return `<span class="badge ${cls[s]||'badge-primary'}">${s}</span>`;
}
function showAlert(id, msg, type='success') {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 4000);
}
function renderStars(r) {
  r = parseFloat(r) || 4;
  return '★'.repeat(Math.floor(r)) + (r%1>=0.5?'½':'') + '☆'.repeat(5-Math.floor(r)-(r%1>=0.5?1:0));
}

function updateNavbar() {
  const user = DB.getSession();
  const loginLink  = document.getElementById('navLogin');
  const registerLink = document.getElementById('navRegister');
  const userMenu   = document.getElementById('navUser');
  if (user && loginLink)    loginLink.style.display = 'none';
  if (user && registerLink) registerLink.style.display = 'none';
  if (user && userMenu) {
    userMenu.style.display = 'flex';
    userMenu.innerHTML = `
      <span style="color:#555;font-weight:600;font-size:0.9rem">👋 ${user.name}</span>
      ${user.role==='ADMIN'
        ? '<a href="admin/admin-dashboard.html"><button class="btn btn-primary" style="padding:7px 15px;font-size:0.82rem">Admin Panel</button></a>'
        : '<a href="my-bookings.html" style="color:#555;font-weight:500">My Bookings</a>'}
      <button class="btn btn-outline" style="padding:7px 15px;font-size:0.82rem" onclick="DB.logout();location.href='index.html'">Logout</button>
    `;
  }
}

// Seed data + update navbar on every page load
DB.seed();
document.addEventListener('DOMContentLoaded', updateNavbar);
