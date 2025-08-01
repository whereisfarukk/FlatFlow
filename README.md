# (flatflow) Building Management System Documentation

---

## 🧰 Features

## Overview

This web application is a comprehensive Building Management System designed for residential complexes, featuring role-based access control and multiple modules for efficient building administration.

## Authentication & Access Control

- **Secure Login System**: Protected authentication with role-based access
- **Private Routes**: All main features require authentication
- **Role-Based Permissions**: Different user roles have varying levels of access to features

## Core Features

### 🏠 **Dashboard** (`/dashboard`)

Central hub providing overview of:

- Building statistics and key metrics
- Recent activities and notifications
- Quick access to important functions
- Summary cards for finances, maintenance, and announcements

### 💰 **Financial Management** (`/finances`)

Complete financial oversight including:

- Building revenue and expense tracking
- Monthly/yearly financial reports
- Budget planning and allocation
- Payment history and analytics

### 🧾 **Bills Management** (`/bills`)

Comprehensive billing system for:

- Monthly maintenance fee collection
- Utility bill distribution
- Payment tracking and reminders
- Invoice generation and management

### 🔧 **Maintenance** (`/maintenance`)

Maintenance request and management system:

- Submit and track maintenance requests
- Schedule routine building maintenance
- Vendor coordination and management
- Emergency repair tracking

### 📢 **Announcements** (`/announcements`)

Communication platform for:

- Building-wide notifications
- Important updates and news
- Event announcements
- Emergency communications

### 👥 **Committee Management** (`/committee`)

Committee administration featuring:

- Committee member profiles and contact information
- Role-based responsibilities
- Meeting scheduling and management
- Committee communication tools

### 🏢 **Building Information** (`/building`)

Building data management:

- Property details and specifications
- Resident directory and apartment information
- Building rules and regulations
- Facility information and amenities

### 📄 **Document Management** (`/documents`)

Centralized document repository:

- Important building documents storage
- Meeting minutes and records
- Legal documents and contracts
- Document sharing and access control

### ⚙️ **Settings** (`/settings`)

System configuration options:

- User preferences and notifications
- Building-specific settings
- System administration tools
- Access control management

### 👤 **Profile Management** (`/profile`)

Personal account management:

- User profile information
- Contact details and preferences
- Password and security settings
- Personal notification preferences

## User Roles & Permissions

The system supports different user roles with varying access levels:

- **Admin/President**: Full system access and management capabilities
- **Committee Members**: Access to relevant committee functions and resident data
- **Residents**: Limited access to personal information, bills, and announcements
- **Maintenance Staff**: Access to maintenance requests and building information

## Technical Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live notifications and data synchronization
- **Secure Authentication**: Protected routes with session management
- **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

This system provides a complete solution for modern building management, streamlining communication, financial management, and administrative tasks for residential complexes.

---

## 🧱 Technologies Used

| Technology        | Purpose                  |
| ----------------- | ------------------------ |
| React             | Frontend framework       |
| React Router v6   | Navigation between pages |
| Fetch             | API request handling     |
| Context API       | Global state management  |
| TailwindCSS / CSS | Styling                  |
| MongoDB           | Storing data             |

---

## 🗂️ Folder Structure

```
Book-Management/
├── Clinet/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── ...
│   ├── src/
│   │   ├── assets/
│   │   │   ├── banner-books
│   │   │   ├── profilePic.jpg
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── Admin-dashboard
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── EditBooks.jsx
│   │   │   │   ├── ManageBooks.jsx
│   │   │   │   ├── SideBar.jsx
│   │   │   │   └── UploadBook.jsx
│   │   │   ├── Home
│   │   │   │   ├── Banner
│   │   │   │   ├── BestSellerBooks.jsx
│   │   │   │   ├── BookCards.jsx
│   │   │   │   ├── FavouriteBooks.jsx
│   │   │   │   ├── OtherBooks.jsx
│   │   │   │   ├── PromoBanner.jsx
│   │   │   │   └── Review.jsx
│   │   │   ├── Ui
│   │   │   │   └── Loader.jsx
│   │   │   ├── MyFooter.jsx
│   │   │   └── Navbar.jsx
│   │   ├── contexts/
│   │   │   └── AuthProvider.jsx
│   │   ├── firebase/
│   │   │   └── firebase.config.js
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Logout.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── SingleBook.js
│   │   ├── routers/
│   │   │   ├── guards # private route
│   │   │   │   └── PrivateRoutes.jsx
│   │   │   └── router.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.jsx
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── Server/
│       ├── package-lock.json
│       ├── package.json
│       ├── server.js
│       ├── .gitignore
│       ├── .prettierrc.json
│       ├── controllers/
│       │   ├── announcement.controller.js
│       │   ├── authController.js
│       │   ├── bill.controller.js
│       │   ├── committee.controller.js
│       │   ├── document.controller.js
│       │   ├── financialReport.controller.js
│       │   └── maintenanceController.js
│       ├── helpers/
│       │   └── upload.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── model/
│       │   ├── Announcement.js
│       │   ├── Bill.js
│       │   ├── Document.js
│       │   ├── FinancialRecord.js
│       │   ├── MaintenanceRequest.js
│       │   ├── Meeting.js
│       │   └── User.js
│       ├── route/
│       │   ├── announcement.route.js
│       │   ├── auth.route.js
│       │   ├── bill.route.js
│       │   ├── committee.route.js
│       │   ├── document.route.js
│       │   ├── finances.route.js
│       │   ├── maintenance.route.js
│       │   └── routes.js
│       └── utils/
│           ├── passportAuth.js
│           └── userRole.js
├── .gitignore
├── LICENSE
└── README.md

```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

#### Make sure you have installed the following:

- Node.js (Recommended version: >= 18)
- npm or yarn package manager
- MongoDB or other database, if required by serve

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/whereisfarukk/FlatFlow.git
cd FlatFlow
```

### 3️⃣ Setting Up the Server (Backend)

1.  Navigate to the server directory:

```
cd Server
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The backend should now be running at: http://localhost:3000 (or your configured port)

### 4️⃣ Setting Up the Client (Frontend)

1. Navigate to the client directory:

```
cd Client
```

2. Install dependencies:

```
npm install
```

3. Start the React development server:

```
npm run dev
```

The frontend should now be running at: http://localhost:5173

## 📂 Available Scripts

In `/client`:

- `npm run dev` → Starts React frontend

- `npm run build` → Builds production-ready frontend

In `/server`:

- `npm start` → Starts backend

- `npm run dev` → Starts backend with hot reload (if using `nodemon`)

## 🤝 Contribution

1. Fork the repo

2. Create your feature branch (git checkout -b feature/your-feature)

3. Commit your changes (git commit -m 'Add your feature')

4. Push to the branch (git push origin feature/your-feature)

5. Create a Pull Request

## 🏢 FlatFlow API Documentation

### 🔐 Authentication

FlatFlow uses session-based authentication with Passport.js. Users must log in to access protected routes.

#### Login

- POST `/auth/login`
- Body:

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

- Success Response (200):

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "654e...",
    "name": "John Doe",
    "role": "admin",
    "apartmentNumber": "A101"
  }
}
```

- Error Response (401):

```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

#### Register

- POST `/auth/login`
- Body:

```json
{
  "username": "jane_doe",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "resident",
  "apartmentNumber": "B202"
}
```

- Response (201):

```json
{
  "message": "User created",
  "user": { ... }
}
```

#### Get Current User

- GET `/auth/me`
- Requires Auth: ✅
- Response (200):

```json
{
  "success": true,
  "user": {
    "id": "654e...",
    "name": "John Doe",
    "role": "admin"
  }
}
```

#### Change Password

- POST /auth/change-password
- Requires Auth: ✅
- Body:

```json
{
  "current_password": "oldpass",
  "new_password": "newpass",
  "confirm_new_password": "newpass"
}
```

- Response (200):

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

#### Change Email

- POST `/auth/change-email`
- Requires Auth: ✅
- Body:

```json
{
  "email": "newemail@example.com"
}
```

#### Logout

- POST `/auth/logout`
- Response (200)

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 🛠️ Maintenance Requests

Manage maintenance requests from residents.

#### Create Maintenance Request

- POST /api/maintenance
- Requires Auth: ✅
- Body:

```json
{
  "title": "Leaky Faucet",
  "description": "Kitchen sink is leaking.",
  "priority": "high"
}
```

- Response (201):

```json
{
  "message": "maintenance post created",
  "maintanance_post": {
    "_id": "654e...",
    "title": "Leaky Faucet",
    "submittedBy": "654e...",
    "status": "pending",
    "apartmentNumber": "A101"
  }
}
```

#### Get All Maintenance Requests

- GET `/api/maintenance`
- Requires Auth: ✅
  (Admin sees all, resident sees only their own)

#### Get Maintenance by ID

GET `/api/maintenance/:id`
Coming Soon (Route not fully implemented in current code)

#### Update Maintenance Request

PUT `/api/maintenance/:id`
Coming Soon (Route not implemented)

#### Delete Maintenance Request

DELETE `/api/maintenance/:id`
Coming Soon (Route not implemented)

### 📢 Announcements

Post and manage building-wide announcements.

#### Create Announcement

- POST `/api/announcement`
- Requires Auth: ✅
- Role Required: Admin
- Body:

```json
{
  "title": "Pool Maintenance",
  "content": "Pool will be closed on Saturday for cleaning."
}
```

- Response (201):

```json
{
  "message": "maintenance post created",
  "announcement_post": { ... }
}
```

### 📄 Document Management

Upload and retrieve important documents (e.g., rules, notices, forms).

#### Upload Document

- POST `/api/document`
- Requires Auth: ✅
- Form Data:
  - file: PDF/Document (max 5MB)
  - title: string
  - description: string
  - category: string
- Response (201):

```json
{
  "message": "Document uploaded successfully",
  "document": {
    "title": "Building Rules",
    "fileUrl": "https://res.cloudinary.com/...pdf",
    "uploadedBy": "654e...",
    "accessLevel": "residents"
  }
}
```

#### Get All Documents

- GET `/api/document`
- Requires Auth: ✅
- Response (200)

```json
{
  "success": true,
  "message": "Documents fetched successfully",
  "data": [ ... ]
}
```

### 💵 Financial Records

Track expenses and income.

#### Submit Financial Record

- POST `/api/finances`
- Requires Auth: ✅
- Role Required: `Admin`
- Body:

```json
{
  "description": "Plumbing Repair",
  "amount": 300,
  "category": "Maintenance",
  "date": "2024-10-05"
}
```

#### Response (201):

```json
{
  "message": "Document uploaded successfully",
  "data": { ... }
}
```

### 🗓️ Committee & Meetings

Schedule and manage committee meetings.

#### Schedule Meeting

- POST `/api/committee`
- Requires Auth: ✅
- Role Required: `Admin`
- Body:

```json
{
  "title": "Monthly Meeting",
  "description": "Discuss budget and renovations.",
  "date": "2024-10-15T18:00:00Z",
  "location": "Community Hall"
}
```

- Response (201):

```json
{
  "message": "meeting post created",
  "maintanance_post": { ... }
}
```

### 🧩 Middleware

#### `isAuthenticated`

- Protects routes that require login.
- Returns `401` if user is not logged in.

#### `isAdmin`

- Ensures only users with role: "admin" can access.
- Returns 401 if user is not an admin.

### 📂 Project Structure (Key Folders)

```
/controllers/     - Business logic
/middleware/      - Auth guards
/model/           - Mongoose schemas
/route/           - Route definitions
/utils/           - Helpers (Passport, roles)
/uploads/         - Temp file storage (used by multer)
```
