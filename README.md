# ISP Site Survey Tool

A comprehensive web application for ISP (Internet Service Provider) site survey management, built with React and Node.js. This tool helps ISPs manage site surveys, track deployment progress, and generate professional reports.

## 🚀 Features

### Core Functionality
- **User Management**: Role-based access control (Admin, Project Manager, Survey Engineer, Reviewer, Viewer)
- **Property Management**: Manage properties and buildings
- **Survey Management**: Create, assign, and track surveys
- **Report Generation**: Generate professional ISP deployment reports
- **Dashboard Analytics**: Real-time insights and statistics
- **Authentication**: Secure JWT-based authentication

### User Roles
- **Admin**: Full system access and user management
- **Project Manager**: Manage properties, buildings, and assign surveys
- **Survey Engineer**: Conduct and manage assigned surveys
- **Reviewer**: Review and approve survey results
- **Viewer**: Read-only access to all data

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern UI framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MySQL**: Database management
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **PDFKit**: PDF generation

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/AmreenJahan/final.git
cd final
```

### 2. Database Setup

#### Install MySQL and create database:
```sql
CREATE DATABASE info_db;
```

#### The application will automatically create required tables on first run.

### 3. Backend Setup

#### Navigate to backend directory:
```bash
cd backend
```

#### Install dependencies:
```bash
npm install
```

#### Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=info_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
```

#### Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

#### Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔐 Default Login Credentials

### Admin Access
- **Email**: admin@example.com
- **Password**: admin123

### Demo Users
Use the "Login as Demo User" dropdown on the login page for quick access:

- **Project Manager**: pm1@surveypro.com / project123
- **Survey Engineer**: engineer1@surveypro.com / survey123
- **Quality Reviewer**: reviewer1@surveypro.com / review123
- **Report Viewer**: viewer1@surveypro.com / view123

## 📁 Project Structure

```
SiteSurveyToolForISPApp-main/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── routes/            # API routes
│   ├── scripts/           # Database setup scripts
│   └── server.js          # Main server file
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── README.md
└── .gitignore
```

## 🎯 Key Features in Detail

### Property Management
- Add, edit, and delete properties
- Manage multiple buildings per property
- Track property details and locations

### Survey Management
- Create different types of surveys (Network Feasibility, Fiber Check, Site Survey)
- Assign surveys to engineers
- Track survey progress and status
- Set priorities and due dates

### Report Generation
- Generate professional PDF reports
- Include survey data and analytics
- Customizable report templates
- Download and share reports

### User Dashboard
- Role-based dashboards
- Real-time statistics
- Task management
- Activity tracking

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Surveys
- `GET /api/surveys` - Get all surveys (filtered by user role)
- `POST /api/surveys` - Create survey
- `PUT /api/surveys/:id` - Update survey
- `DELETE /api/surveys/:id` - Delete survey

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports/generate` - Generate PDF report

## 🎨 UI/UX Features

### Modern Design
- Clean, professional interface
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation

### Enhanced Login Page
- Beautiful gradient design
- Demo credentials dropdown
- Blue glow effect with subtle animation
- Professional enterprise SaaS appearance

### Colorful Buttons
- Gradient styling throughout the application
- Hover effects and animations
- Consistent color coding for different actions
- Modern, professional appearance

## 🚀 Deployment

### Production Deployment

#### Backend
1. Set up production database
2. Configure environment variables
3. Install dependencies: `npm install --production`
4. Start server: `npm start`

#### Frontend
1. Build for production: `npm run build`
2. Serve static files using nginx or similar
3. Configure reverse proxy for API calls

### Environment Variables
Make sure to set these in production:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET` (use a strong, random string)
- `NODE_ENV=production`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
- Ensure MySQL server is running
- Check database credentials in `.env` file
- Verify database exists and user has permissions

#### Frontend Not Loading
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API endpoints are accessible

#### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET in backend
- Verify user credentials

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify all prerequisites are met
3. Ensure both frontend and backend are running
4. Check database connection

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

**Built with ❤️ for ISP deployment management**
