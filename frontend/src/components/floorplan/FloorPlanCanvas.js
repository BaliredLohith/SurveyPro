import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Toolbar,
  IconButton,
  Tooltip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Zoom,
  Fab
} from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  CenterFocusStrong as CenterIcon,
  GridOn as GridIcon,
  GridOff as GridOffIcon,
  Add as AddIcon,
  Square as SquareIcon,
  Rectangle as RectangleIcon,
  Circle as CircleIcon
} from '@mui/icons-material';

const FloorPlanCanvas = ({ floor, spaces, onSpaceSelect, onSpaceCreate }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [drawMode, setDrawMode] = useState('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    drawCanvas();
  }, [scale, offset, spaces, showGrid]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Apply transformations
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    // Draw grid
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height);
    }

    // Draw spaces
    spaces.forEach(space => {
      drawSpace(ctx, space);
    });

    // Restore context state
    ctx.restore();
  };

  const drawGrid = (ctx, width, height) => {
    const gridSize = 20;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    for (let x = 0; x < width / scale; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height / scale);
      ctx.stroke();
    }

    for (let y = 0; y < height / scale; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width / scale, y);
      ctx.stroke();
    }
  };

  const drawSpace = (ctx, space) => {
    ctx.fillStyle = getSpaceColor(space.type);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    if (space.xCoord !== undefined && space.yCoord !== undefined && space.area) {
      // Draw rectangle based on coordinates and area
      const width = Math.sqrt(space.area);
      const height = space.area / width;
      
      ctx.fillRect(space.xCoord, space.yCoord, width, height);
      ctx.strokeRect(space.xCoord, space.yCoord, width, height);

      // Draw space name
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        space.name, 
        space.xCoord + width / 2, 
        space.yCoord + height / 2
      );
    }
  };

  const getSpaceColor = (type) => {
    const colors = {
      'OFFICE': '#e3f2fd',
      'MEETING_ROOM': '#fff3e0',
      'CONFERENCE_ROOM': '#fce4ec',
      'STORAGE': '#f3e5f5',
      'RESTROOM': '#e8f5e8',
      'KITCHEN': '#fff8e1',
      'LOBBY': '#f1f8e9',
      'OTHER': '#fafafa'
    };
    return colors[type] || colors.OTHER;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prevScale => Math.max(0.1, Math.min(5, prevScale * delta)));
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    if (drawMode === 'select') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    } else {
      setIsDrawing(true);
      setDrawStart({ x, y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (isDrawing) {
      // Preview drawing
      drawCanvas();
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - offset.x) / scale;
      const y = (e.clientY - rect.top - offset.y) / scale;
      
      const ctx = canvasRef.current.getContext('2d');
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.scale(scale, scale);
      
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      if (drawMode === 'rectangle') {
        const width = x - drawStart.x;
        const height = y - drawStart.y;
        ctx.strokeRect(drawStart.x, drawStart.y, width, height);
      }
      
      ctx.restore();
    }
  };

  const handleMouseUp = (e) => {
    if (isDrawing) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - offset.x) / scale;
      const y = (e.clientY - rect.top - offset.y) / scale;
      
      if (drawMode === 'rectangle') {
        const width = Math.abs(x - drawStart.x);
        const height = Math.abs(y - drawStart.y);
        const area = width * height;
        
        if (area > 100) { // Minimum area threshold
          onSpaceCreate({
            name: `Space ${spaces.length + 1}`,
            type: 'OFFICE',
            area: Math.round(area),
            xCoord: Math.min(drawStart.x, x),
            yCoord: Math.min(drawStart.y, y),
            floorId: floor?.id
          });
        }
      }
      
      setIsDrawing(false);
      setDrawMode('select');
    }
    
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale(prev => Math.min(5, prev * 1.2));
  const handleZoomOut = () => setScale(prev => Math.max(0.1, prev / 1.2));
  const handleCenter = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar variant="dense">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <Tooltip title="Zoom In">
            <IconButton onClick={handleZoomIn} size="small">
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Zoom Out">
            <IconButton onClick={handleZoomOut} size="small">
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Center">
            <IconButton onClick={handleCenter} size="small">
              <CenterIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={showGrid ? "Hide Grid" : "Show Grid"}>
            <IconButton onClick={() => setShowGrid(!showGrid)} size="small">
              {showGrid ? <GridOffIcon /> : <GridIcon />}
            </IconButton>
          </Tooltip>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Draw Mode</InputLabel>
            <Select
              value={drawMode}
              onChange={(e) => setDrawMode(e.target.value)}
              label="Draw Mode"
            >
              <MenuItem value="select">Select</MenuItem>
              <MenuItem value="rectangle">Rectangle</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Typography variant="body2" sx={{ mr: 2 }}>
          {Math.round(scale * 100)}%
        </Typography>
      </Toolbar>
      
      <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            cursor: drawMode === 'select' ? (isDragging ? 'grabbing' : 'grab') : 'crosshair'
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDragging(false);
            setIsDrawing(false);
          }}
        />
        
        {floor && (
          <Zoom in={true}>
            <Fab
              color="primary"
              size="small"
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16
              }}
              onClick={() => setDrawMode(drawMode === 'select' ? 'rectangle' : 'select')}
            >
              {drawMode === 'select' ? <AddIcon /> : <SquareIcon />}
            </Fab>
          </Zoom>
        )}
      </Box>
    </Paper>
  );
};

export default FloorPlanCanvas;
