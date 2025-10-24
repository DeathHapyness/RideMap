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
  
- 👤 **Customizable Profile**
  - Custom avatar
  - Editable personal information
  
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

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express,mysql" alt="Backend Stack" />

| Technology | Description |
|------------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Runtime environment |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Web framework |
| ![MySQL](https://img.shields.io/badge/MySQL_8.0-4479A1?style=flat&logo=mysql&logoColor=white) | Database |
| ![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=flat) | Password encryption |

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
└─────────────────────────────────────────────┘
```

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
```

</td>
<td>

[![Node](https://img.shields.io/badge/Download-Node.js-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Download-MySQL-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Git](https://img.shields.io/badge/Download-Git-orange?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

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

-- Users table
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
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

# Session (generate a secure random string)
SESSION_SECRET=your_super_secure_secret_here_123456

# Environment
NODE_ENV=development
```

#### 5️⃣ Start the server

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

#### 6️⃣ Access the application

🌐 Open your browser at: **http://localhost:3000**

</details>

---

## 🎮 How to Use

### 📱 For Users

<table>
<tr>
<td width="50%">

#### 1️⃣ Create an Account
1. Go to `http://localhost:3000`
2. Click on **"Sign Up"**
3. Fill in name, email, and password
4. Login with your credentials

#### 2️⃣ Add a Park
1. On dashboard, click **"Add Park"**
2. Fill in the information:
   - Park name
   - City and State
   - Type and Difficulty
   - Detailed description
3. **Click on the map** for location
4. Click **"Save"**
5. Wait for admin approval

</td>
<td width="50%">

#### 3️⃣ View Notifications
1. Bell icon 🔔 shows your notifications
2. Click to open dropdown
3. Click notification to mark as read

#### 4️⃣ Edit Profile
1. Click **"Profile"** in menu
2. Change name or avatar
3. Click **"Save Changes"**

</td>
</tr>
</table>

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
│   └── multer.js           # File upload config
├── 📁 db/
│   └── config.js           # MySQL connection
├── 📁 public/
│   ├── 📁 css/
│   │   ├── style.css       # Global styles
│   │   └── dashboard.css   # Dashboard styles
│   ├── 📁 js/
│   │   ├── dashboard.js    # Dashboard logic
│   │   ├── admin.js        # Admin logic
│   │   └── map.js          # Map logic
│   └── 📁 img/             # Static images
├── 📁 views/
│   ├── 📁 partials/
│   │   ├── sidebar.hbs     # Side menu
│   │   ├── profile-view.hbs
│   │   └── add-spot-modal.hbs
│   ├── home.hbs            # Home page
│   ├── dashboard.hbs       # User dashboard
│   └── admin-dashboard.hbs # Admin panel
├── 📄 routes.js            # Application routes
├── 📄 server.js            # Main server
├── 📄 .env                 # Environment variables
├── 📄 .gitignore
├── 📄 package.json
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

</td>
<td>

- ✅ **SQL Injection protection**
- ✅ **Access control (RBAC)**
- ✅ **Sensitive variables** (.env)

</td>
</tr>
</table>

---

## 🗺️ Roadmap

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="600">
</div>

### ✅ Completed

- [x] Complete authentication system
- [x] Interactive map with Leaflet
- [x] CRUD for parks
- [x] Moderation system
- [x] Real-time notifications
- [x] Administrative panel
- [x] Avatar upload
- [x] Role system (user/admin)

### 🚧 In Development

- [ ] Multiple photo upload per park
- [ ] Rating system (stars/comments)
- [ ] "My Parks" - view submitted parks
- [ ] Edit rejected parks

### 📋 Planned

- [ ] Advanced filters (type, difficulty, distance)
- [ ] Favorites system
- [ ] Social sharing
- [ ] Custom routes/trails
- [ ] Events and competitions
- [ ] Mobile version (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Offline mode
- [ ] Social media integration
- [ ] Gamification (badges, rankings)

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

See the full license: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

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
<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" width="600">
</div>

- 🛹 Skater community that inspired this project
- 🗺️ [Leaflet.js](https://leafletjs.com/) for interactive maps
- 🎨 [Bootstrap](https://getbootstrap.com/) for CSS framework
- 💫 [SweetAlert2](https://sweetalert2.github.io/) for beautiful alerts
- 🤝 All future contributors

---

## 📊 Project Status

```
Overall Progress: ████████░░ 80%

Core Features:      ██████████ 100%
Frontend:           ████████░░  85%
Backend:            █████████░  90%
Tests:              ██░░░░░░░░  20%
Documentation:      ████████░░  80%
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
