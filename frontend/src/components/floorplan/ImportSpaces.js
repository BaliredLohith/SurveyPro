import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const ImportSpaces = ({ open, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
        setImportResult(null);
      } else {
        setError('Please select a CSV file');
      }
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Mock import result - replace with actual API call
      setTimeout(() => {
        setImportResult({
          totalRows: 25,
          successfulImports: 22,
          failedImports: 3,
          errors: [
            { rowNumber: 5, name: 'Space 5', error: 'Invalid coordinates' },
            { rowNumber: 12, name: 'Space 12', error: 'Duplicate name' },
            { rowNumber: 18, name: 'Space 18', error: 'Missing type' }
          ]
        });
        setImporting(false);
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to import spaces');
      setImporting(false);
    }
  };

  const handleClose = () => {
    if (importResult?.successfulImports > 0) {
      onSuccess();
    }
    setFile(null);
    setImportResult(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Import Spaces from CSV</DialogTitle>
      
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!importResult ? (
          <Box>
            <Typography variant="body1" gutterBottom>
              Upload a CSV file to import spaces. The CSV should contain columns for:
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Chip label="name" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="type" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="area" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="xCoord" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="yCoord" size="small" sx={{ mr: 1, mb: 1 }} />
              <Chip label="floorId" size="small" sx={{ mr: 1, mb: 1 }} />
            </Box>

            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'grey.50'
                }
              }}
              component="label"
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                {file ? file.name : 'Choose CSV file or drag and drop'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CSV files only
              </Typography>
            </Box>

            {importing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Importing spaces...
                </Typography>
                <LinearProgress />
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Import Results
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Chip 
                icon={<CheckCircleIcon />}
                label={`${importResult.successfulImports} successful`}
                color="success"
                sx={{ mr: 1 }}
              />
              <Chip 
                icon={<ErrorIcon />}
                label={`${importResult.failedImports} failed`}
                color="error"
                sx={{ mr: 1 }}
              />
              <Chip 
                icon={<DescriptionIcon />}
                label={`${importResult.totalRows} total rows`}
                variant="outlined"
              />
            </Box>

            {importResult.errors.length > 0 && (
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Row</TableCell>
                      <TableCell>Space Name</TableCell>
                      <TableCell>Error</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {importResult.errors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell>{error.rowNumber}</TableCell>
                        <TableCell>{error.name}</TableCell>
                        <TableCell>
                          <Chip 
                            label={error.error} 
                            size="small" 
                            color="error" 
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose}>
          {importResult ? 'Done' : 'Cancel'}
        </Button>
        {!importResult && (
          <Button 
            onClick={handleImport} 
            variant="contained" 
            disabled={!file || importing}
          >
            {importing ? 'Importing...' : 'Import'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ImportSpaces;
