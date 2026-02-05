# 🌐 VERCEL ENVIRONMENT VARIABLES SETUP

## 📋 **REQUIRED ENVIRONMENT VARIABLES**

### 🎯 **ADD THESE IN VERCEL DASHBOARD:**

**Go to Vercel Dashboard → Project → Settings → Environment Variables**

---

## 🔧 **PRIMARY ENVIRONMENT VARIABLES**

### **1. REACT_APP_API_BASE_URL**
```
Name: REACT_APP_API_BASE_URL
Value: https://your-backend-url.com/api
Environment: Production
```

**⚠️ IMPORTANT**: Replace `https://your-backend-url.com/api` with your actual backend URL

---

## 🎛️ **OPTIONAL ENVIRONMENT VARIABLES**

### **2. REACT_APP_ENVIRONMENT**
```
Name: REACT_APP_ENVIRONMENT
Value: production
Environment: Production
```

### **3. REACT_APP_DEMO_MODE**
```
Name: REACT_APP_DEMO_MODE
Value: false
Environment: Production
```

### **4. REACT_APP_LOG_LEVEL**
```
Name: REACT_APP_LOG_LEVEL
Value: error
Environment: Production
```

---

## 🚀 **QUICK SETUP (RECOMMENDED)**

### **MINIMAL SETUP (Just add these 2):**
```
1. REACT_APP_API_BASE_URL = https://your-backend-url.com/api
2. REACT_APP_ENVIRONMENT = production
```

### **FULL SETUP (Add all):**
```
1. REACT_APP_API_BASE_URL = https://your-backend-url.com/api
2. REACT_APP_ENVIRONMENT = production
3. REACT_APP_DEMO_MODE = false
4. REACT_APP_LOG_LEVEL = error
```

---

## 📝 **EXAMPLE VALUES**

### **FOR TESTING (if no backend yet):**
```
REACT_APP_API_BASE_URL = https://jsonplaceholder.typicode.com
```

### **FOR PRODUCTION (replace with your backend):**
```
REACT_APP_API_BASE_URL = https://api.yourapp.com/api
```

### **FOR RENDER BACKEND:**
```
REACT_APP_API_BASE_URL = https://your-app.onrender.com/api
```

---

## ✅ **VERIFICATION**

### **AFTER ADDING ENVIRONMENT VARIABLES:**
1. **Save** the environment variables
2. **Redeploy** the application
3. **Check** that API calls work
4. **Test** login functionality

---

## 🔍 **HOW IT WORKS**

### **FRONTEND CODE EXPECTS:**
- **REACT_APP_API_BASE_URL**: For API calls
- **REACT_APP_ENVIRONMENT**: To select environment config
- **REACT_APP_DEMO_MODE**: To enable/disable demo mode
- **REACT_APP_LOG_LEVEL**: For logging configuration

### **FALLBACK BEHAVIOR:**
- **If REACT_APP_API_BASE_URL missing**: Uses localhost:5000/api
- **If REACT_APP_ENVIRONMENT missing**: Uses NODE_ENV (production)
- **If variables missing**: Uses default values from environments.js

---

## 🎯 **STEP-BY-STEP SETUP**

### **1. Go to Vercel Dashboard**
- Visit: https://vercel.com/dashboard
- Select your project (`final`)
- Go to Settings → Environment Variables

### **2. Add Environment Variables**
- Click "Add New"
- Enter Name and Value
- Select Environment: Production
- Click "Save"
- Repeat for each variable

### **3. Redeploy**
- Go to Deployments tab
- Click "Redeploy" or wait for auto-redeploy
- Clear cache if needed

---

## 🚨 **COMMON MISTAKES TO AVOID**

### **❌ DON'T:**
- Use `API_BASE_URL` (must be `REACT_APP_API_BASE_URL`)
- Forget `REACT_APP_` prefix
- Use staging values in production
- Set environment to "Development"

### **✅ DO:**
- Always use `REACT_APP_` prefix
- Set Environment to Production
- Use HTTPS URLs for production
- Test after deployment

---

## 📊 **CURRENT FRONTEND CONFIGURATION**

### **Environment Detection:**
```javascript
// The app looks for these variables:
process.env.REACT_APP_API_BASE_URL     // Required
process.env.REACT_APP_ENVIRONMENT     // Optional
process.env.REACT_APP_DEMO_MODE       // Optional
process.env.REACT_APP_LOG_LEVEL       // Optional
```

### **Default Values (if not set):**
```javascript
API_BASE_URL: 'https://api.sitesurvey.com/api'
DEMO_MODE: 'false'
LOG_LEVEL: 'error'
```

---

## 🎉 **READY TO DEPLOY**

### **✅ CHECKLIST:**
- [ ] **REACT_APP_API_BASE_URL** set to your backend URL
- [ ] **REACT_APP_ENVIRONMENT** set to production
- [ ] **Environment** set to Production in Vercel
- [ ] **Variables saved** in Vercel Dashboard
- [ ] **Application redeployed**

### **✅ EXPECTED RESULT:**
- **Build**: Success
- **API Calls**: Working
- **Login**: Functional
- **App**: Live on Vercel

---

**🚀 ADD THESE ENVIRONMENT VARIABLES IN VERCEL DASHBOARD AND DEPLOY!**
