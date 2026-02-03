import React from 'react';
import { Box } from '@mui/material';
import {
  Business,
  Apartment,
  LocationCity,
  CorporateFare,
  Store,
  Warehouse,
  HomeWork,
  Domain,
} from '@mui/icons-material';

import {
  Assignment,
  Checklist,
  Assessment,
  FactCheck,
  TaskAlt,
  ContentPaste,
  Quiz,
  Description,
} from '@mui/icons-material';

import {
  Map,
  FloorPlan,
  Architecture,
  GridOn,
  ViewInAr,
  CropOriginal,
  AspectRatio,
  Dashboard,
} from '@mui/icons-material';

import {
  BarChart,
  PieChart,
  Timeline,
  TrendingUp,
  Analytics,
  Leaderboard,
  Summarize,
  Insights,
} from '@mui/icons-material';

// Property Icons
export const PropertyIcons = {
  default: Business,
  office: Apartment,
  residential: HomeWork,
  commercial: CorporateFare,
  retail: Store,
  warehouse: Warehouse,
  industrial: Domain,
  mixed: LocationCity,
};

// Survey Icons
export const SurveyIcons = {
  default: Assignment,
  checklist: Checklist,
  assessment: Assessment,
  completed: FactCheck,
  inProgress: TaskAlt,
  draft: ContentPaste,
  template: Quiz,
  report: Description,
};

// Floor Plan Icons
export const FloorPlanIcons = {
  default: Map,
  upload: FloorPlan,
  blueprint: Architecture,
  grid: GridOn,
  view: ViewInAr,
  edit: CropOriginal,
  layout: AspectRatio,
  dashboard: Dashboard,
};

// Dashboard Icons
export const DashboardIcons = {
  default: BarChart,
  chart: PieChart,
  timeline: Timeline,
  trending: TrendingUp,
  analytics: Analytics,
  stats: Leaderboard,
  summary: Summarize,
  insights: Insights,
};

// Helper function to get icon by type
export const getPropertyIcon = (type = 'default') => {
  return PropertyIcons[type] || PropertyIcons.default;
};

export const getSurveyIcon = (type = 'default') => {
  return SurveyIcons[type] || SurveyIcons.default;
};

export const getFloorPlanIcon = (type = 'default') => {
  return FloorPlanIcons[type] || FloorPlanIcons.default;
};

export const getDashboardIcon = (type = 'default') => {
  return DashboardIcons[type] || DashboardIcons.default;
};

// Icon wrapper with consistent styling
export const IconWrapper = ({ children, size = 24, color = 'primary', sx = {} }) => (
  <Box
    sx={{
      color: `${color}.main`,
      fontSize: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx,
    }}
  >
    {children}
  </Box>
);

// Professional icon component
const ProfessionalIcon = ({ type, category, size = 24, color = 'primary', sx = {} }) => {
  let icon;
  
  switch (category) {
    case 'property':
      icon = getPropertyIcon(type);
      break;
    case 'survey':
      icon = getSurveyIcon(type);
      break;
    case 'floorplan':
      icon = getFloorPlanIcon(type);
      break;
    case 'dashboard':
      icon = getDashboardIcon(type);
      break;
    default:
      icon = children;
  }
  
  return (
    <IconWrapper size={size} color={color} sx={sx}>
      {icon}
    </IconWrapper>
  );
};

export default ProfessionalIcon;
