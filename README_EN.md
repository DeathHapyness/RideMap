<div align="center">

# 🛹 RideMap

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=667EEA&center=true&vCenter=true&width=940&lines=Find+the+Best+Skate+Parks;Collaborative+Platform+for+Skaters;Build+Your+Community!" alt="Typing SVG" />

**Collaborative platform for skaters to find and share skate parks across Brazil**

[![Status](https://img.shields.io/badge/status-in%20development-yellow?style=for-the-badge)](https://github.com/DeathHapyness/ridemap)
[![Node](https://img.shields.io/badge/node-16+-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/mysql-8.0-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-orange?style=for-the-badge)](LICENSE)

**Languages:** [🇧🇷 Português](README.md) | 🇺🇸 **English**

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-features">Features</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-how-to-use">How to Use</a> •
  <a href="#-license">License</a>
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">

</div>

---

## 📖 About the Project

<img align="right" src="https://user-images.githubusercontent.com/74038190/212748842-9fcbad5b-6173-4175-8a61-521f3dbb7514.gif" width="250">

**RideMap** is a full-stack web application that connects the skater community, allowing them to discover new parks, share locations, and build a collaborative map of spots across Brazil.

With a robust moderation system, real-time notifications, and an intuitive interface, RideMap ensures quality content and a professional experience for all users.

<br clear="right"/>

### 🎯 Problem It Solves

<table>
<tr>
<td width="50%">

**Skaters' Challenges:**
- 🔍 Difficulty finding new parks
- ❓ Lack of information about difficulty levels
- 🤝 No platform to share discoveries
- ⚠️ Unreliable information about spots

</td>
<td width="50%">

**Our Solution:**
- 🗺️ Centralized interactive map
- 📊 Detailed and verified information
- 👥 Active and engaged community
- ✅ Quality moderation system

</td>
</tr>
</table>

---

## ✨ Features

<details open>
<summary><b>👤 For Regular Users</b></summary>
<br>

- 🗺️ **Interactive Map**
  - View all approved parks using Leaflet.js
  - Responsive and user-friendly interface
  
- ➕ **Add Parks**
  - Detailed name and description
  - Precise location (click on map)
  - Type: skateboard, inline skates, or both
  - Difficulty level (easy, medium, hard)
  - City and state
  
- 🔔 **Real-Time Notifications**
  - Alerts when your park is approved
  - Rejection notification with reason
  - Badge shows unread notifications
  - Auto-update every 5 seconds
  - Modern design with orange gradients
  
- 👤 **Customizable Profile**
  - Custom avatar with Cloudinary upload
  - Image upload with automatic validation
  - Smart resizing (300x300px)
  - Auto-crop focusing on face
  - Editable personal information
  - Secure password change
  - Modern and responsive modal
  
- 📍 **View Details**
  - Complete information for each park
  - Rating system (coming soon)

</details>

<details>
<summary><b>🛡️ For Administrators</b></summary>
<br>

- ✅ **Moderation System**
  - Complete panel for park analysis
  - Intuitive approval/rejection interface
  
- 📊 **Administrative Dashboard**
  - Real-time statistics
  - Engagement metrics
  
- 🎯 **Approve/Reject Parks**
  - Mandatory justification for rejections
  - Moderation history
  
- 🔔 **Automatic Notifications**
  - System sends automatic feedback
  - Transparent communication with users
  
- 👥 **User Management**
  - Permission and role control
  - Anti-spam system
  
- 📈 **Detailed Metrics**
  - Total approved/rejected/pending parks
  - Platform growth analysis

</details>

---

## 🚀 Technologies Used

<div align="center">

### Frontend

<img src="https://skillicons.dev/icons?i=html,css,js,bootstrap" alt="Frontend Stack" />

| Technology | Description |
|------------|-------------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Application structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Custom styling |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Client-side logic |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white) | CSS framework |
| ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white) | Interactive maps |
| ![Handlebars](https://img.shields.io/badge/Handlebars-000000?style=flat&logo=handlebarsdotjs&logoColor=white) | Template engine |
| ![Animate.css](https://img.shields.io/badge/Animate.css-FF6B35?style=flat) | CSS Animations |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-7952B3?style=flat) | Beautiful alerts |

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express,mysql,cloudinary" alt="Backend Stack" />

| Technology | Description |
|------------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Runtime environment |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Web framework |
| ![MySQL](https://img.shields.io/badge/MySQL_8.0-4479A1?style=flat&logo=mysql&logoColor=white) | Database |
| ![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=flat) | Password encryption |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Image upload |
| ![Multer](https://img.shields.io/badge/Multer-FF6B35?style=flat) | File processing |

</div>

### 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│          Complete MVC Pattern               │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌────────┐  ┌──────────┐     │
│  │  Model  │  │  View  │  │Controller│     │
│  └─────────┘  └────────┘  └──────────┘     │
├─────────────────────────────────────────────┤
│  • REST API                                 │
│  • Session-based Authentication             │
│  • Role-based Access Control (RBAC)         │
│  • Real-time Notifications                  │
│  • Cloud Image Storage (Cloudinary)         │
│  • Responsive Design with Animations        │
└─────────────────────────────────────────────┘
```

---

## 🎨 Interface Updates

### 🆕 Modern Design with Orange Gradients

RideMap now features a completely renewed interface:

- **🎨 Color Palette**
  - Vibrant orange gradients (#FF6B35 → #F7931E)
  - Consistent theme across the application
  - Smooth and professional hover effects
  
- **✨ Integrated Animations**
  - RideMap logo with continuous gradient animation
  - Shine effect passing through text
  - Smooth bounce on hover
  - Light pulse around the logo
  
- **📱 Enhanced Sidebar**
  - Modern orange gradient background
  - Menu items with hover effects
  - Aligned and organized icons
  - Custom scrollbar
  
- **🔔 Renovated Notification System**
  - Animated badge with pulse effect
  - Dropdown with orange header
  - Smooth opening animation
  - Interactive hover items

### 🖼️ Avatar Upload System

- **☁️ Cloudinary Integration**
  - Direct cloud upload
  - Automatically optimized images
  - Smart resizing (300x300px)
  - Auto-crop focusing on face
  - Secure and permanent URLs
  
- **✅ Automatic Validations**
  - 5MB limit per image
  - Only image formats accepted
  - Instant visual feedback
  - User-friendly error handling
  
- **🎯 User Experience**
  - Instant image preview
  - Animated loading during upload
  - Visual success confirmation
  - Responsive modern modal

---

## 📦 Installation and Setup

### Prerequisites

<table>
<tr>
<td>

```bash
📌 Node.js 16+
📌 MySQL 8.0+
📌 Git
📌 Cloudinary Account (free)
```

</td>
<td>

[![Node](https://img.shields.io/badge/Download-Node.js-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Download-MySQL-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Git](https://img.shields.io/badge/Download-Git-orange?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![Cloudinary](https://img.shields.io/badge/Sign_Up-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

</td>
</tr>
</table>

### 🚀 Step by Step

<details open>
<summary><b>Click to expand instructions</b></summary>

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/DeathHapyness/ridemap.git
cd ridemap
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Configure the database

Enter MySQL:
```bash
mysql -u root -p
```

Execute the commands:
```sql
CREATE DATABASE ridemap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ridemap;

-- Users table (UPDATED)
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    avatar_url VARCHAR(500),
    avatar_public_id VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Parks table
CREATE TABLE pistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    tipo ENUM('skate','patins','ambos') NOT NULL,
    dificuldade ENUM('facil','medio','dificil') NOT NULL,
    descricao TEXT,
    usuario_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    motivo_rejeicao TEXT,
    data_moderacao DATETIME,
    moderador_id INT,
    ativa TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    INDEX idx_status (status),
    INDEX idx_cidade (cidade),
    INDEX idx_tipo (tipo),
    INDEX idx_dificuldade (dificuldade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Notifications table
CREATE TABLE notificacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario_lida (usuario_id, lida),
    INDEX idx_data (data_criacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### 4️⃣ Configure environment variables

Create a `.env` file:
```bash
touch .env
```

Add the content:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ridemap

# Server
PORT=3000

# Sessions
SESSION_SECRET=your_super_secret_here_12345

# Cloudinary (NEW)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 5️⃣ Configure Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com/) and create a free account
2. On Dashboard, copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Paste this information in the `.env` file

#### 6️⃣ Start the server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

#### 7️⃣ Access the application

Open your browser at:
```
http://localhost:3000
```

</details>

---

## 📖 How to Use

### 👤 For Users

<details open>
<summary><b>User Instructions</b></summary>

#### 1️⃣ Create Account
1. Go to `http://localhost:3000/cadastro`
2. Fill in: **Name**, **Email** and **Password**
3. Click **"Sign Up"**

#### 2️⃣ Customize Profile
1. Log in to your account
2. Click on **profile** icon in sidebar
3. Click **"Change Photo"**
4. Select an image (max. 5MB)
5. Wait for upload (automatic processing)
6. Your photo will be optimized and saved in cloud
7. Edit name and other information
8. Click **"Save Changes"**

#### 3️⃣ Add Park
1. On map, click **"Add Spot"**
2. Fill all required fields
3. **Click on map** to mark location
4. Click **"Submit for Approval"**
5. Wait for approval/rejection notification

#### 4️⃣ View Notifications
1. Click on **bell** icon 🔔
2. Badge shows number of unread
3. Click to mark as read
4. Automatic updates every 5s

</details>

### 🛡️ For Administrators

<details>
<summary><b>Moderation Instructions</b></summary>

#### 1️⃣ Access Admin Panel
1. Login with admin account
2. Click **"Administration"**
3. Go to `http://localhost:3000/admin/dashboard`

#### 2️⃣ Moderate Parks
1. See list of **"Parks Awaiting Moderation"**
2. Analyze details
3. Click **"Approve"** or **"Reject"**
4. If rejecting, provide reason
5. User receives automatic notification

</details>

---

## 📁 Project Structure

```
ridemap/
├── 📁 config/
│   ├── cloudinary.js       # Cloudinary Configuration (NEW)
│   └── multer.js           # File Upload
├── 📁 db/
│   └── config.js           # MySQL Connection
├── 📁 static/
│   ├── 📁 css/
│   │   ├── style.css       # Main Style (UPDATED)
│   │   ├── sidebar.css     # Menu Styles (NEW)
│   │   ├── profile.css     # Profile Styles (NEW)
│   │   ├── profile.css     # Global Style (New and Updated)
│   │   ├── admin-dashboard.css # Admin Panel Style
│   │   ├── login.css       # Login Dashboard Style
│   │   ├── dashboard.css   # Main Sidebar Dashboard Style
│   │   ├── adicionar-pista.css # Spot Addition Interface Style (Updated)
│   │   └── dashboard-perfil.css # Dashboard Styles
│   ├── 📁 js/
│   │   ├── dashboard.js    # Dashboard Logic
│   │   ├── admin.js        # Admin Logic
│   │   ├── profile-view.js # Profile Logic (NEW)
│   │   ├── script.js       # Basic Animation Logic
│   │   ├── recuperacao-senha.js # Password Recovery Logic with Email
│   │   └── map.js          # Map Logic
│   └── 📁 img/
│       ├── png_c0jcq.png        # Main Logo
│       ├── wheel(1).png         # Browser Tab Logo
│       └── default-avatar.png  # Default Avatar (NEW)
├── 📁 views/
│   ├── 📁 layouts/
│   │   └── main.hbs        # Stores All Necessary Links
│   ├── 📁 partials/
│   │   ├── sidebar.hbs     # Sidebar Menu (UPDATED)
│   │   ├── profile-view.hbs # Profile Modal (NEW)
│   │   ├── login-modal.hbs  # Login Modal
│   │   └── add-spot-modal.hbs # Add Spot Modal
│   ├── 404.hbs             # 404 Error Page
│   ├── add-spot.hbs        # Add Spot Page
│   ├── home.hbs            # Home Page
│   ├── dashboard.hbs       # User Dashboard
│   ├── error.hbs           # Unexpected Errors Page
│   └── admin-dashboard.hbs # Admin Panel and Administration
├── 📄 routes.js            # Application Routes (UPDATED)
├── 📄 server.js            # Main Server
├── 📄 email.js             # Responsible for Email Sending
├── 📄 .env                 # Environment Variables (UPDATED)
├── 📄 .gitignore
├── 📄 package.json
├── 📄 README_EN.md
└── 📄 README.md
```  

---

## 🔐 Security

RideMap implements multiple security layers:

<table>
<tr>
<td>

- ✅ **Encrypted passwords** (bcrypt)
- ✅ **Secure sessions** (express-session)
- ✅ **Input validation**
- ✅ **Secure upload** (Cloudinary)

</td>
<td>

- ✅ **SQL Injection protection**
- ✅ **Access control (RBAC)**
- ✅ **Sensitive variables** (.env)
- ✅ **File validation** (type/size)

</td>
</tr>
</table>

---

## 🗺️ Roadmap

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="100">
</div>

### ✅ Completed

- [x] Complete authentication system
- [x] Interactive map with Leaflet
- [x] CRUD for parks
- [x] Moderation system
- [x] Real-time notifications
- [x] Administrative panel
- [x] Avatar upload with Cloudinary ✨ **NEW**
- [x] Role system (user/admin)
- [x] Modern interface with gradients 
- [x] Logo animations 
- [x] Responsive profile modal 
- [x] "My Parks" - view submitted parks ✨ **NEW**

### 🚧 In Development

- [ ] Multiple photo upload per park
- [ ] Rating system (stars/comments)
- [ ] Edit rejected parks

### 📋 Planned

- [ ] Advanced filters (type, difficulty, distance)
- [ ] Favorites system
- [ ] Social sharing
- [ ] Custom routes/trails
- [ ] Dark mode

### 🌟 In the Future

- [ ] Events and championships
- [ ] Mobile version (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Offline mode
- [ ] Social media integration
- [ ] Gamification (badges, rankings)
- [ ] Interactive image cropper


---

## 🤝 Contributing

<img align="right" src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="200">

Contributions are very welcome! This project follows open-source standards for non-commercial use.

### How to Contribute

1. **Fork** the project
2. Create a **branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### 📋 Guidelines

- ✅ Follow existing code patterns
- ✅ Write clear commit messages
- ✅ Comment complex code
- ✅ Test your changes
- ✅ Update documentation

### 🐛 Report Bugs

Open an [issue](https://github.com/DeathHapyness/ridemap/issues) with:
- Clear problem description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment (OS, browser, Node version)

---

## 📝 Available Scripts

```bash
# Install dependencies
npm install

# Development server (with auto-reload)
npm run dev

# Production server
npm start

# Check code errors
npm run lint

# Format code
npm run format
```

---

## 📄 License

<div align="center">

### Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International

[![CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-orange.svg?style=for-the-badge)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

</div>

This project is licensed under **CC BY-NC-SA 4.0**. This means:

<table>
<tr>
<td width="50%" valign="top">

### ✅ You Can

- 🔄 **Share** - Copy and redistribute
- 🔧 **Adapt** - Remix and create derivatives
- 📚 **Use for educational purposes**
- 👨‍💻 **Use for personal projects**

</td>
<td width="50%" valign="top">

### ⚠️ Conditions

- 📝 **Attribution** - Give appropriate credit
- 🚫 **Non-Commercial** - No commercial use
- 🔄 **Share Alike** - Same license
- ⚖️ **No warranties** - Provided "as is"

</td>
</tr>
</table>

### 💼 Commercial Use

To use this project commercially (resell, integrate in paid product, etc.), **contact us**:

📧 **Email:** henrique.dev2@gmail.com

See full license: [LICENSE](LICENSE)

---

## 👨‍💻 Authors

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/DeathHapyness">
        <img src="https://github.com/DeathHapyness.png" width="120px;" style="border-radius: 50%;" alt="Henrique's Photo"/><br>
        <sub>
          <b>Henrique</b>
        </sub>
      </a>
      <br>
      <a href="https://github.com/DeathHapyness">
        <img src="https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github" alt="GitHub">
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/izlzy">
        <img src="https://github.com/izlzy.png" width="120px;" style="border-radius: 50%;" alt="João's Photo"/><br>
        <sub>
          <b>João</b>
        </sub>
      </a>
      <br>
      <a href="https://github.com/izlzy">
        <img src="https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github" alt="GitHub">
      </a>
    </td>
  </tr>
</table>

📧 **Contact:** henrique.dev2@gmail.com

</div>

---

## 🙏 Acknowledgments

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" width="100">
</div>

- 🛹 Skater community that inspired this project
- 🗺️ [Leaflet.js](https://leafletjs.com/) for interactive maps
- 🎨 [Bootstrap](https://getbootstrap.com/) for CSS framework
- 💫 [SweetAlert2](https://sweetalert2.github.io/) for beautiful alerts
- ☁️ [Cloudinary](https://cloudinary.com/) for image storage
- ✨ [Animate.css](https://animate.style/) for animations
- 🤝 All future contributors

---

## 📊 Project Status

```
Overall Progress: █████████░ 85%

Core Features:      ██████████ 100%
Frontend:           █████████░  90%
Backend:            █████████░  92%
Image Upload:       ██████████ 100% ✨
Tests:              ██░░░░░░░░  20%
Documentation:      █████████░  85%
```

---

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">

### ⭐ If this project helped you, leave a star!

### 🛹 Made with ❤️ by skaters, for skaters

[![GitHub Stars](https://img.shields.io/github/stars/DeathHapyness/ridemap?style=social)](https://github.com/DeathHapyness/ridemap/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/DeathHapyness/ridemap?style=social)](https://github.com/DeathHapyness/ridemap/network/members)
[![GitHub Watchers](https://img.shields.io/github/watchers/DeathHapyness/ridemap?style=social)](https://github.com/DeathHapyness/ridemap/watchers)

**[⬆ Back to top](#-ridemap)**

</div>
