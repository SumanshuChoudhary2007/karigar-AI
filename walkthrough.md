# Karigar AI - Prototype Walkthrough (SIH26090)

"Turn Your Craft Into a Digital Business."

## Accomplished Features

### 1. Simple, Artisan-Centered Mobile UI
- **Light Craftsman Design**: Warm Craftsman Amber (`#D97706`) accents, clean white cards, large readable fonts, high-contrast rounded touch targets, zero complex enterprise sidebars.
- **Role Switching**: Instant demo login buttons for **Artisan (Gurpreet Kaur)** and **Buyer (Punjab Handicrafts / Delhi Gift Co)**.

---

### 2. Main 8 Mobile Screens & Buyer Portal

1. **Login**: Phone/Password + 1-tap **Login as Artisan** & **Login as Buyer** buttons.
2. **Artisan Home**: Greeting `"Hello, Gurpreet 👋"`, 3 key metrics (Sales: ₹38,400 | Orders: 24 | Products: 8), 3 big quick buttons (`+ Add Product`, `Find Buyers`, `My Orders`), AI Suggestion card, and bottom navigation (`Home | Products | Orders | Profile`).
3. **Add Product (Main Demo Screen)**:
   - **Step 1**: Photo upload with simulated AI cleaning, background removal, and lighting visual feedback.
   - **Step 2**: Voice input with Punjabi (`"Eh handmade Phulkari bag hai..."`), Hindi, or English language selector and speech-to-text transcript output.
4. **Product Result**: Multilingual catalog preview with interactive **English**, **Hindi (हिंदी)**, and **Punjabi (ਪੰਜਾਬੀ)** tabs, editable title/description, and pricing link.
5. **Pricing**: Itemized production cost form (Material ₹450, Labour ₹300, Packaging ₹50, Shipping ₹100, Other ₹50 => Total Cost ₹950) with mathematical cost calculation + AI price range (₹1,250 – ₹1,450, 78% confidence, ₹300 – ₹500 profit).
6. **Buyers**: B2B buyer cards with match percentage (92% Punjab Handicraft Retailer), itemized match reasons checklist, and 1-tap **Contact Buyer**.
7. **Orders**: My Orders list with detailed tracking modal showing 6 delivery timeline stages (`Placed -> Confirmed -> Packed -> Picked Up -> In Transit -> Delivered`) with tracking ID `TRK-PK-984210`.
8. **Profile**: Artisan info, experience, product count, and AI-refined heritage story (`"My Craft Story"`).
9. **Buyer Section**: Buyer requirement creation form (`500 bags, ₹1,500 budget`), AI match results (`Gurpreet Handicrafts 92%`), and **Send Enquiry** action.

---

## Verification & Test Results

- **Express Backend API**: Running on `http://localhost:5000`
- **Vite React Frontend**: Compiled and running on `http://localhost:3000`
- **Database**: SQLite database initialized with Prisma ORM and seeded with sample craft data (`dev.db`).
