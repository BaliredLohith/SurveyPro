# SurveyPro - ISP Site Survey Management System
## Backend Architecture & Database Design

### 🏗️ **PROJECT MODULES ANALYSIS**

#### **1. Authentication Module**
- User login/logout
- Role-based access (Admin, Surveyor, Manager)
- JWT token management
- Session management

#### **2. Dashboard Module**
- Real-time statistics
- Survey completion trends
- Operational overview
- Recent activity timeline
- System alerts

#### **3. Properties Management**
- CRUD operations for properties
- Property hierarchy (Properties → Buildings → Floors → Spaces)
- Property type classification
- Location management

#### **4. Buildings Management**
- Building technical specifications
- Floor plan management
- Network readiness assessment
- Power availability tracking

#### **5. Surveys Management**
- Survey creation and assignment
- Survey status tracking
- Survey responses management
- Completion analytics

#### **6. Users Management**
- User profile management
- Role and permission management
- Team assignment
- Activity tracking

#### **7. Reports Module**
- Survey analytics
- KPI dashboards
- Export functionality
- Historical data

#### **8. Settings Module**
- System configuration
- Form templates
- Notification preferences
- Data management

#### **9. Floor Plan Editor**
- Interactive floor plan tools
- Marker placement
- Space annotation
- Export capabilities

---

### 🗄️ **DATABASE DESIGN**

#### **Core Tables Structure:**

```sql
-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'surveyor') DEFAULT 'surveyor',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Properties Table
CREATE TABLE properties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    type ENUM('commercial', 'residential', 'industrial', 'mixed') NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    total_area DECIMAL(10,2),
    description TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    owner_name VARCHAR(100),
    owner_contact VARCHAR(20),
    status ENUM('active', 'inactive', 'under_maintenance') DEFAULT 'active',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Buildings Table
CREATE TABLE buildings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    type ENUM('office', 'residential', 'warehouse', 'retail', 'mixed') NOT NULL,
    floors_count INT DEFAULT 1,
    total_area DECIMAL(10,2),
    year_built INT,
    construction_type ENUM('concrete', 'steel', 'wood', 'mixed'),
    power_availability ENUM('available', 'limited', 'unavailable') DEFAULT 'unavailable',
    fiber_readiness ENUM('ready', 'partial', 'not_ready') DEFAULT 'not_ready',
    last_survey_date DATE,
    next_survey_date DATE,
    status ENUM('active', 'inactive', 'under_construction') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Floors Table
CREATE TABLE floors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    building_id INT NOT NULL,
    floor_number INT NOT NULL,
    name VARCHAR(100),
    total_area DECIMAL(10,2),
    layout_type ENUM('open', 'partitioned', 'mixed') DEFAULT 'open',
    ceiling_height DECIMAL(5,2),
    has_elevator BOOLEAN DEFAULT FALSE,
    has_stairs BOOLEAN DEFAULT TRUE,
    floor_plan_image VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
    UNIQUE KEY unique_floor (building_id, floor_number)
);

-- Spaces Table
CREATE TABLE spaces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    floor_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    type ENUM('office', 'retail', 'storage', 'common', 'technical') NOT NULL,
    area DECIMAL(8,2),
    capacity INT,
    current_usage VARCHAR(100),
    network_points INT DEFAULT 0,
    power_outlets INT DEFAULT 0,
    coordinates JSON, -- For floor plan positioning
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (floor_id) REFERENCES floors(id) ON DELETE CASCADE
);

-- Surveys Table
CREATE TABLE surveys (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    building_id INT,
    floor_id INT,
    space_id INT,
    survey_type ENUM('site_assessment', 'network_survey', 'power_survey', 'comprehensive') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    assigned_to INT,
    assigned_by INT,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled', 'issues_found') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    scheduled_date DATE,
    start_date DATETIME,
    completion_date DATETIME,
    estimated_duration INT, -- in hours
    actual_duration INT, -- in hours
    findings JSON,
    recommendations JSON,
    attachments JSON,
    completion_percentage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (building_id) REFERENCES buildings(id),
    FOREIGN KEY (floor_id) REFERENCES floors(id),
    FOREIGN KEY (space_id) REFERENCES spaces(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (assigned_by) REFERENCES users(id)
);

-- Survey Responses Table
CREATE TABLE survey_responses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    survey_id INT NOT NULL,
    question_id VARCHAR(50) NOT NULL,
    question_text TEXT NOT NULL,
    response_type ENUM('text', 'number', 'boolean', 'choice', 'file') NOT NULL,
    response_value TEXT,
    response_file VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);

-- Survey Templates Table
CREATE TABLE survey_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    type ENUM('site_assessment', 'network_survey', 'power_survey', 'comprehensive') NOT NULL,
    description TEXT,
    questions JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Activities Table (For Dashboard Timeline)
CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type ENUM('property', 'building', 'floor', 'space', 'survey', 'user') NOT NULL,
    entity_id INT NOT NULL,
    description TEXT NOT NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- System Alerts Table
CREATE TABLE system_alerts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('info', 'warning', 'error', 'success') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    entity_type ENUM('property', 'building', 'floor', 'space', 'survey', 'user', 'system'),
    entity_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

-- Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);
```

---

### 🔧 **BACKEND API ENDPOINTS**

#### **Authentication Endpoints**
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/profile
PUT  /api/auth/profile
```

#### **Users Management**
```
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/roles
```

#### **Properties Management**
```
GET    /api/properties
POST   /api/properties
GET    /api/properties/:id
PUT    /api/properties/:id
DELETE /api/properties/:id
GET    /api/properties/:id/buildings
GET    /api/properties/stats
```

#### **Buildings Management**
```
GET    /api/buildings
POST   /api/buildings
GET    /api/buildings/:id
PUT    /api/buildings/:id
DELETE /api/buildings/:id
GET    /api/buildings/:id/floors
GET    /api/buildings/stats
```

#### **Floors Management**
```
GET    /api/floors
POST   /api/floors
GET    /api/floors/:id
PUT    /api/floors/:id
DELETE /api/floors/:id
GET    /api/floors/:id/spaces
```

#### **Spaces Management**
```
GET    /api/spaces
POST   /api/spaces
GET    /api/spaces/:id
PUT    /api/spaces/:id
DELETE /api/spaces/:id
```

#### **Surveys Management**
```
GET    /api/surveys
POST   /api/surveys
GET    /api/surveys/:id
PUT    /api/surveys/:id
DELETE /api/surveys/:id
POST   /api/surveys/:id/assign
PUT    /api/surveys/:id/status
GET    /api/surveys/:id/responses
POST   /api/surveys/:id/responses
GET    /api/surveys/stats
GET    /api/surveys/calendar
```

#### **Dashboard & Analytics**
```
GET /api/dashboard/stats
GET /api/dashboard/trends
GET /api/dashboard/activities
GET /api/dashboard/alerts
GET /api/analytics/kpi
GET /api/analytics/reports
```

#### **Reports**
```
GET  /api/reports
GET  /api/reports/:id
POST /api/reports/generate
GET  /api/reports/export/:type
```

#### **Settings**
```
GET /api/settings
PUT /api/settings
GET /api/settings/public
```

---

### 🚀 **BACKEND TECHNOLOGY STACK**

#### **Core Technologies**
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Authentication**: JWT + bcrypt
- **Validation**: Joi
- **File Upload**: Multer
- **Documentation**: Swagger/OpenAPI

#### **Development Tools**
- **Environment**: dotenv
- **Logging**: Winston
- **Testing**: Jest + Supertest
- **Linting**: ESLint + Prettier
- **Security**: Helmet, CORS, Rate Limiting

#### **Production Ready**
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt
- **Monitoring**: Health checks, metrics
- **Backup**: Automated MySQL backups

---

### 📋 **IMPLEMENTATION PHASES**

#### **Phase 1: Core Infrastructure**
1. Database setup and migrations
2. Authentication system
3. Basic CRUD operations
4. API documentation

#### **Phase 2: Business Logic**
1. Property hierarchy management
2. Survey workflow
3. User role management
4. Activity tracking

#### **Phase 3: Advanced Features**
1. Analytics and reporting
2. File management
3. Notifications system
4. Floor plan integration

#### **Phase 4: Production Ready**
1. Security hardening
2. Performance optimization
3. Monitoring and logging
4. Deployment setup

---

### 🔐 **SECURITY CONSIDERATIONS**

1. **Authentication**: JWT tokens with refresh mechanism
2. **Authorization**: Role-based access control
3. **Data Validation**: Input sanitization and validation
4. **SQL Injection**: Parameterized queries via ORM
5. **XSS Protection**: Input escaping and CSP headers
6. **Rate Limiting**: API endpoint protection
7. **File Upload**: Type and size validation
8. **Password Security**: bcrypt hashing with salt rounds
