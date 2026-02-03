import React from 'react';
import {
  Box,
  Skeleton,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

// Card skeleton loader
export const CardSkeleton = ({ height = 200 }) => (
  <Card>
    <CardContent>
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={height} />
    </CardContent>
  </Card>
);

// Table skeleton loader
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Box>
    {/* Header */}
    <Box display="flex" mb={2}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} variant="text" width="20%" height={40} />
      ))}
    </Box>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Box display="flex" key={rowIndex} mb={1}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width="20%" height={36} />
        ))}
      </Box>
    ))}
  </Box>
);

// Dashboard cards skeleton
export const DashboardSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={48} sx={{ mt: 1 }} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// List skeleton loader
export const ListSkeleton = ({ items = 5 }) => (
  <Box>
    {Array.from({ length: items }).map((_, index) => (
      <Box key={index} display="flex" alignItems="center" py={2} borderBottom="1px solid #eee">
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box flex={1}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 0.5 }} />
        </Box>
        <Skeleton variant="rectangular" width={80} height={32} />
      </Box>
    ))}
  </Box>
);

// Form skeleton loader
export const FormSkeleton = ({ fields = 4 }) => (
  <Box>
    {Array.from({ length: fields }).map((_, index) => (
      <Box key={index} mb={3}>
        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={56} />
      </Box>
    ))}
    <Skeleton variant="rectangular" width={120} height={36} />
  </Box>
);

// Property hierarchy skeleton
export const PropertyHierarchySkeleton = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={3}>
      <Card>
        <CardContent>
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={3}>
      <Card>
        <CardContent>
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={3}>
      <Card>
        <CardContent>
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={3}>
      <Card>
        <CardContent>
          <Skeleton variant="text" width="80%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

// Survey cards skeleton
export const SurveyCardsSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from({ length: 6 }).map((_, index) => (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="70%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="50%" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2 }} />
            <Box display="flex" gap={1}>
              <Skeleton variant="rectangular" width={80} height={32} />
              <Skeleton variant="rectangular" width={80} height={32} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default {
  CardSkeleton,
  TableSkeleton,
  DashboardSkeleton,
  ListSkeleton,
  FormSkeleton,
  PropertyHierarchySkeleton,
  SurveyCardsSkeleton,
};
