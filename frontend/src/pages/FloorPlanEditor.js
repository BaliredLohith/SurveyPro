import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stage, Layer, Image as KonvaImage, Circle, Rect, Line, Text } from 'react-konva';
import { useImage } from 'react-konva';
import { 
  Wifi, Router, Zap, Wind, Package, Cable, WifiOff, AlertTriangle,
  Upload, ZoomIn, ZoomOut, Move, Trash2, Save, Download, Settings,
  ChevronLeft, Plus, X, Check, AlertCircle
} from 'lucide-react';

const FloorPlanEditor = () => {
  const { propertyId, buildingId, floorId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const stageRef = useRef(null);
  
  const [floorPlanImage, setFloorPlanImage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [showProperties, setShowProperties] = useState(true);
  const [showTools, setShowTools] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [savedStatus, setSavedStatus] = useState('saved');

  // Marker types configuration
  const markerTypes = {
    'access-point': { icon: Wifi, color: '#3B82F6', glow: '#60A5FA', name: 'Access Point' },
    'router': { icon: Router, color: '#10B981', glow: '#34D399', name: 'Router' },
    'power': { icon: Zap, color: '#F59E0B', glow: '#FCD34D', name: 'Power Source' },
    'cooling': { icon: Wind, color: '#06B6D4', glow: '#67E8F9', name: 'Cooling Unit' },
    'rack': { icon: Package, color: '#8B5CF6', glow: '#A78BFA', name: 'Rack/Cabinet' },
    'cable': { icon: Cable, color: '#EC4899', glow: '#F472B6', name: 'Cable Entry' },
    'weak-signal': { icon: WifiOff, color: '#EF4444', glow: '#F87171', name: 'Weak Signal Area' },
    'obstruction': { icon: AlertTriangle, color: '#F97316', glow: '#FB923C', name: 'Obstruction' }
  };

  // Handle floor plan upload
  const handleFloorPlanUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          setFloorPlanImage(img);
          setIsLoading(false);
          setSavedStatus('unsaved');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Add marker to canvas
  const handleCanvasClick = (e) => {
    if (selectedTool === 'select') return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    
    const newMarker = {
      id: Date.now(),
      type: selectedTool,
      x: point.x,
      y: point.y,
      notes: '',
      priority: 'medium',
      signalStrength: 75,
      powerAvailable: true
    };
    
    setMarkers([...markers, newMarker]);
    setSelectedMarker(newMarker);
    setSavedStatus('unsaved');
  };

  // Handle marker drag
  const handleMarkerDragEnd = (e, markerId) => {
    const updatedMarkers = markers.map(marker => {
      if (marker.id === markerId) {
        return {
          ...marker,
          x: e.target.x(),
          y: e.target.y()
        };
      }
      return marker;
    });
    setMarkers(updatedMarkers);
    setSavedStatus('unsaved');
  };

  // Delete marker
  const deleteMarker = (markerId) => {
    setMarkers(markers.filter(m => m.id !== markerId));
    setSelectedMarker(null);
    setSavedStatus('unsaved');
  };

  // Update marker properties
  const updateMarker = (markerId, updates) => {
    const updatedMarkers = markers.map(marker => {
      if (marker.id === markerId) {
        return { ...marker, ...updates };
      }
      return marker;
    });
    setMarkers(updatedMarkers);
    setSavedStatus('unsaved');
  };

  // Zoom controls
  const handleZoomIn = () => setScale(Math.min(scale * 1.2, 5));
  const handleZoomOut = () => setScale(Math.max(scale / 1.2, 0.5));
  const handleResetZoom = () => {
    setScale(1);
    setStagePos({ x: 0, y: 0 });
  };

  // Save floor plan
  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Save to backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSavedStatus('saved');
    setIsLoading(false);
  };

  // Export floor plan
  const handleExport = () => {
    const dataStr = JSON.stringify({
      propertyId,
      buildingId,
      floorId,
      markers,
      timestamp: new Date().toISOString()
    }, null, 2);
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `floor-plan-${propertyId}-${buildingId}-${floorId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-gray-50 hover:shadow-blue-200/50 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Floor Plan Editor</h1>
            <p className="text-gray-500">Property {propertyId} • Building {buildingId} • Floor {floorId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-blue-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:shadow-blue-200/50 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Workspace Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-6 hover:shadow-blue-200/50 transition-all duration-300"
      >
        <div className="flex gap-6">
          {/* Left Sidebar - Tools */}
          <AnimatePresence>
            {showTools && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-20 bg-white border-2 border-blue-200 rounded-xl p-3 hover:shadow-blue-200/50 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Select Tool */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedTool('select')}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                      selectedTool === 'select' 
                        ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]' 
                        : 'bg-gray-100 hover:bg-indigo-100 hover:shadow-[0_0_10px_rgba(99,102,241,0.4)] text-gray-700'
                    }`}
                  >
                    <Move className="w-5 h-5" />
                  </motion.button>
                  
                  {/* Marker Tools */}
                  {Object.entries(markerTypes).map(([type, config]) => {
                    const Icon = config.icon;
                    return (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedTool(type)}
                        className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                          selectedTool === type 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]' 
                            : 'bg-gray-100 hover:bg-indigo-100 hover:shadow-[0_0_10px_rgba(99,102,241,0.4)] text-gray-700'
                        }`}
                        title={config.name}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-white border-2 border-blue-200 text-gray-700 hover:bg-gray-50 hover:shadow-blue-200/50 transition-all duration-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-white border-2 border-blue-200 text-gray-700 hover:bg-gray-50 hover:shadow-blue-200/50 transition-all duration-200"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-lg bg-white border-2 border-blue-200 text-gray-700 hover:bg-gray-50 hover:shadow-blue-200/50 transition-all duration-200"
            >
              <span className="text-xs text-gray-600">100%</span>
            </button>
          </div>

          {/* Canvas */}
          <div className="w-full h-full flex items-center justify-center p-8">
            {!floorPlanImage ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-all duration-300">
                  <Upload className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Floor Plan</h3>
                <p className="text-gray-500 mb-6">Upload a JPG, PNG, or PDF file to get started</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300"
                >
                  Choose File
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFloorPlanUpload}
                  className="hidden"
                />
              </motion.div>
            ) : (
              <Stage
                ref={stageRef}
                width={window.innerWidth - (showTools ? 320 : 160)}
                height={window.innerHeight - 160}
                scaleX={scale}
                scaleY={scale}
                x={stagePos.x}
                y={stagePos.y}
                onWheel={(e) => {
                  e.evt.preventDefault();
                  const scaleBy = 1.1;
                  const stage = e.target.getStage();
                  const oldScale = stage.scaleX();
                  const pointer = stage.getPointerPosition();
                  
                  const mousePointTo = {
                    x: pointer.x / oldScale - stage.x() / oldScale,
                    y: pointer.y / oldScale - stage.y() / oldScale,
                  };
                  
                  const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
                  
                  setScale(Math.min(Math.max(newScale, 0.5), 5));
                }}
                onClick={handleCanvasClick}
              >
                <Layer>
                  {/* Floor Plan Image */}
                  <KonvaImage
                    image={floorPlanImage}
                    width={floorPlanImage.width}
                    height={floorPlanImage.height}
                  />
                  
                  {/* Markers */}
                  {markers.map((marker) => {
                    const config = markerTypes[marker.type];
                    const isSelected = selectedMarker?.id === marker.id;
                    
                    return (
                      <React.Fragment key={marker.id}>
                        {/* Glow Effect */}
                        <Circle
                          x={marker.x}
                          y={marker.y}
                          radius={isSelected ? 25 : 20}
                          fill={config.glow}
                          opacity={0.3}
                          shadowBlur={isSelected ? 20 : 10}
                          shadowColor={config.glow}
                        />
                        
                        {/* Main Marker */}
                        <Circle
                          x={marker.x}
                          y={marker.y}
                          radius={12}
                          fill={config.color}
                          stroke={isSelected ? '#fff' : 'transparent'}
                          strokeWidth={isSelected ? 2 : 0}
                          draggable={selectedTool === 'select'}
                          onDragEnd={(e) => handleMarkerDragEnd(e, marker.id)}
                          onClick={(e) => {
                            e.cancelBubble = true;
                            setSelectedMarker(marker);
                          }}
                        />
                        
                        {/* Status Indicator */}
                        {marker.powerAvailable && (
                          <Circle
                            x={marker.x + 8}
                            y={marker.y - 8}
                            radius={4}
                            fill="#10B981"
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </Layer>
              </Stage>
            )}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <AnimatePresence>
          {showProperties && selectedMarker && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="w-80 bg-white border-2 border-blue-200 rounded-xl p-6 overflow-y-auto shadow-lg hover:shadow-blue-200/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Marker Properties</h3>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedMarker && (
                <div className="space-y-4">
                  {/* Marker Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                           style={{ backgroundColor: markerTypes[selectedMarker.type].color }}>
                        {React.createElement(markerTypes[selectedMarker.type].icon, { 
                          className: 'w-4 h-4 text-white' 
                        })}
                      </div>
                      <span className="text-gray-700">{markerTypes[selectedMarker.type].name}</span>
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
                    <select
                      value={selectedMarker.priority}
                      onChange={(e) => updateMarker(selectedMarker.id, { priority: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white text-gray-700 border-2 border-blue-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Signal Strength */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Signal Strength: {selectedMarker.signalStrength}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedMarker.signalStrength}
                      onChange={(e) => updateMarker(selectedMarker.id, { signalStrength: parseInt(e.target.value) })}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  {/* Power Available */}
                  <div>
                    <label className="flex items-center space-x-3 text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedMarker.powerAvailable}
                        onChange={(e) => updateMarker(selectedMarker.id, { powerAvailable: e.target.checked })}
                        className="w-4 h-4 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-2"
                      />
                      <span>Power Available</span>
                    </label>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Notes</label>
                    <textarea
                      value={selectedMarker.notes}
                      onChange={(e) => updateMarker(selectedMarker.id, { notes: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-white text-gray-700 border-2 border-blue-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                      placeholder="Add notes..."
                    />
                  </div>

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => deleteMarker(selectedMarker.id)}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center space-x-2 text-white transition-all duration-200 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Marker</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </div>
  );
};

export default FloorPlanEditor;
