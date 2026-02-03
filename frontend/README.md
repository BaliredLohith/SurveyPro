# Site Survey Tool Frontend

React frontend for the Site Survey Tool - ISP Site Survey Management System.

## 🚀 Features

### Authentication
- JWT-based authentication with automatic token refresh
- Role-based access control
- Protected routes with role validation
- Login/logout functionality

### Dashboard
- Real-time statistics from backend APIs
- Property hierarchy overview
- Survey progress tracking
- User activity monitoring

### Floor Plan Management
- Hierarchical property/building/floor selection
- Floor plan upload with progress tracking
- CSV import for spaces
- Interactive floor plan canvas

### Survey Management
- Create and manage surveys
- Checklist template integration
- Survey status tracking
- Approval workflow

### Settings
- Property management (CRUD)
- Building management (CRUD)
- Floor management (CRUD)
- Space management (CRUD)

## 🛠 Tech Stack

- **React 18** with Hooks
- **Material-UI (MUI)** for components
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### Prerequisites
- Node.js 16+
- npm or yarn

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── floorplan/      # Floor plan components
│   ├── surveys/        # Survey components
│   └── settings/       # Settings components
├── context/            # React Context
│   └── AuthContext.js  # Authentication context
├── hooks/              # Custom hooks
│   └── useApi.js      # API hook
├── pages/              # Page components
│   ├── Dashboard.js
│   ├── FloorPlan.js
│   ├── Login.js
│   ├── Settings.js
│   └── Surveys.js
├── services/           # API services
│   ├── api.js          # Axios configuration
│   ├── authService.js  # Authentication API
│   ├── csvService.js   # CSV import API
│   ├── dashboardService.js
│   ├── floorPlanService.js
│   ├── hierarchyService.js
│   └── surveyService.js
├── App.js              # Main app component
└── index.js            # Entry point
```

## 🔐 Authentication Flow

1. **Login**: User submits credentials to `/auth/login`
2. **Token Storage**: Access token stored in memory, refresh token in localStorage
3. **API Calls**: All requests include Bearer token
4. **Token Refresh**: Automatic refresh when access token expires
5. **Logout**: Clear tokens and redirect to login

## 📡 API Integration

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

### Hierarchy Endpoints
- `GET /hierarchy/properties` - Get properties
- `GET /hierarchy/buildings?propertyId=` - Get buildings
- `GET /hierarchy/floors?buildingId=` - Get floors
- `GET /hierarchy/spaces?floorId=` - Get spaces
- `POST /hierarchy/properties` - Create property
- `POST /hierarchy/buildings` - Create building
- `POST /hierarchy/floors` - Create floor
- `POST /hierarchy/spaces` - Create space

### Floor Plan Endpoints
- `POST /floorplans/upload` - Upload floor plan
- `GET /floorplans/{floorId}` - Get floor plans

### CSV Import Endpoints
- `POST /csv/spaces/import` - Import spaces from CSV
- `GET /csv/spaces/template` - Download CSV template

### Survey Endpoints
- `GET /surveys` - Get surveys
- `POST /surveys` - Create survey
- `POST /surveys/{id}/start` - Start survey
- `POST /surveys/{id}/complete` - Complete survey

### Dashboard Endpoints
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/surveys/status` - Survey status breakdown

## 🎯 Role-Based Access

### ROLE_SUPER_ADMIN
- Full system access
- User management
- All CRUD operations

### ROLE_ORG_ADMIN
- Organization data management
- Property management
- User management within organization

### ROLE_SURVEY_ENGINEER
- Survey creation and management
- Space management
- Floor plan uploads

### ROLE_REVIEWER
- Survey review and approval
- Read-only access to most data

## 🔧 Development

### Adding New API Services

1. Create service file in `src/services/`
2. Use the configured `api` instance
3. Handle errors consistently
4. Return data in expected format

Example:
```javascript
import api from './api';

export const exampleService = {
  async getData() {
    const response = await api.get('/example');
    return response.data;
  },
};
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `App.js`
3. Wrap with `ProtectedRoute` if needed
4. Use `useApi` hook for API calls

### Error Handling

- Global error handler in API interceptor
- Component-level error states
- User-friendly error messages
- Automatic retry on token refresh

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📱 Responsive Design

- Mobile-first approach
- Material-UI responsive grid
- Touch-friendly interactions
- Progressive enhancement

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```env
REACT_APP_API_BASE_URL=https://your-api-domain.com/api
```

## 🔒 Security Considerations

- JWT tokens stored securely
- Automatic token refresh
- Role-based route protection
- Input validation on forms
- XSS prevention
- CSRF protection

## 📈 Performance

- Code splitting with React.lazy
- API request caching
- Optimized re-renders
- Image optimization
- Bundle size optimization

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows frontend origin
2. **Token Issues**: Check localStorage and API configuration
3. **API Errors**: Check network tab and backend logs
4. **Build Issues**: Clear node_modules and reinstall

### Debug Mode
```bash
# Start with debug logging
REACT_APP_DEBUG=true npm start
```

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for new components
3. Add tests for new features
4. Update documentation
5. Follow Git commit conventions

## 📄 License

This project is licensed under the MIT License.
