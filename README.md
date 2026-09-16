# Karigar AI (ਸਾਨ੍ਹੂ ਆਪਣਾ ਕੰਮ, ਆਪਣਾ ਵਪਾਰ)

> **SIH 2026 Problem Statement SIH26090**: AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans
> **Tagline**: *"Turn Your Craft Into a Digital Business."*

---

## 🌟 Overview & Key Features

**Karigar AI** is a simple, clean, full-width mobile & desktop web application designed for marginalized artisans with low digital literacy. It allows artisans to:
1. **Take a Product Photo & AI Clean**: Remove background and improve lighting automatically.
2. **Speak in Local Languages**: Speak in Punjabi, Hindi, or English; Whisper AI transcribes the description.
3. **Multilingual Catalog Generation**: Generate professional catalogs in English, Hindi (हिंदी), and Punjabi (ਪੰਜਾਬੀ).
4. **Deterministic Cost-Plus Pricing**: Input production costs (Material, Labour, Packaging, Shipping) to calculate mathematical totals and AI market price suggestions.
5. **B2B Buyer Matching**: Connect directly with verified wholesale buyers (e.g. Punjab Handicraft Retailer, Delhi Gift Co) matching budget, location, and capacity.
6. **Order Delivery Tracker**: Simple 6-step order tracking timeline.

---

## 🗄️ Connecting to XAMPP MySQL Database

The application is configured to connect directly to **XAMPP MySQL** out of the box (`mysql://root:@localhost:3306/karigar_ai`).

### Steps to connect XAMPP MySQL:
1. Open **XAMPP Control Panel** on Windows.
2. Click **Start** next to **MySQL** (and optionally **Apache**).
3. Push database schema & seed sample craft data:
   ```bash
   cd server
   npx prisma db push --schema=../prisma/schema.prisma
   npm run seed
   cd ..
   ```

*(Note: The server also includes a fallback mode so the frontend prototype works out-of-the-box even if XAMPP is currently paused).*

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, JavaScript, Tailwind CSS, React Router, Lucide React icons
- **Backend**: Node.js, Express.js
- **Database**: Prisma ORM with XAMPP MySQL
- **Authentication**: JWT, bcrypt, Role-based access (ARTISAN, BUYER, ADMIN)
- **AI Services**: Extensible mock AI pipeline (`aiService.js`, `catalogService.js`, `pricingService.js`, `matchingService.js`)

---

## 🚀 Quick Start & Installation

### 1. Install Dependencies
```bash
# Install root, server, and client dependencies
npm run setup
```

### 2. Run Development Servers
```bash
# Run both Frontend (Vite port 3000) and Backend (Express port 5000) concurrently
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📱 Quick Demo Credentials

| Role | Phone | Password | Fast Demo Button |
| :--- | :--- | :--- | :--- |
| **Artisan (Gurpreet)** | `9876543210` | `password123` | **Login as Artisan** |
| **Buyer (Punjab Handicrafts)** | `9123456789` | `password123` | **Login as Buyer** |

---

## 🎯 Demonstration Workflow

1. **LOGIN**: Tap **"Login as Artisan"** on the home screen.
2. **ARTISAN HOME**: See 3 top numbers (Sales ₹38,400, Orders 24, Products 8) and tap **[ + Add Product ]**.
3. **ADD PRODUCT**:
   - **Step 1**: Upload a photo & tap **[ Enhance Photo ]** (see ✓ Photo cleaned, ✓ Background removed).
   - **Step 2**: Select Punjabi/Hindi/English and tap **🎙 Speak** to simulate voice transcript ("Eh handmade Phulkari bag hai..."), then tap **[ Create Product ]**.
4. **PRODUCT RESULT**: Preview the AI-generated multilingual catalog. Toggle **English | Hindi | Punjabi** tabs. Tap **[ Continue to Pricing ]**.
5. **PRICING**: Modify costs (Material ₹450, Labour ₹300, Packaging ₹50, Shipping ₹100, Other ₹50 => Total ₹950). View AI Price Suggestion (₹1,250 – ₹1,450, 78% confidence). Tap **[ Save Product ]**.
6. **FIND BUYERS**: View AI-matched B2B buyers (92% Punjab Handicraft Retailer). Tap **[ Contact Buyer ]**.
7. **MY ORDERS**: Tap order **#KAR1024** to view the 6-stage order tracking progress timeline.
8. **BUYER PORTAL**: Log in as Buyer, tap **[ Create Requirement ]** (500 bags, ₹1,500 budget), and view **"AI Found 3 Matches"**.
