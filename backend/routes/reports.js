const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();

// GET /api/reports/generate - Generate ISP Site Survey Report PDF
router.get('/generate', (req, res) => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      }
    });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="ISP_Network_Site_Survey_Report.pdf"');

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add custom font for better appearance
    doc.font('Helvetica');

    // ========== 1. HEADER SECTION ==========
    doc.fontSize(20).font('Helvetica-Bold').text('SurveyPro ISP Solutions', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).font('Helvetica-Bold').text('ISP Network Site Survey Report', { align: 'center' });
    doc.moveDown();
    
    // Header info
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    doc.fontSize(11).font('Helvetica').text(`Date: ${currentDate}`, { align: 'center' });
    doc.fontSize(11).font('Helvetica-Bold').text('Survey ID: SRV-2024-001', { align: 'center' });
    doc.moveDown(2);

    // Add a line separator
    doc.strokeColor('#cccccc').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(2);

    // ========== 2. PROPERTY INFORMATION ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Property Information');
    doc.moveDown();
    
    doc.fontSize(11).font('Helvetica').text('Property Name: Tech Park Campus');
    doc.text('Address: Madhapur, Hyderabad, Telangana');
    doc.text('Property Type: Commercial IT Park');
    doc.text('Survey Type: Network Feasibility');
    doc.moveDown(2);

    // ========== 3. BUILDING DETAILS ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Building Details');
    doc.moveDown();
    
    doc.fontSize(11).font('Helvetica').text('Building Name: Tower A');
    doc.text('Floors: 8');
    doc.text('Surveyed Floor: Floor 5');
    doc.text('Purpose: Office Infrastructure');
    doc.moveDown(2);

    // ========== 4. ENGINEER DETAILS ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Engineer Details');
    doc.moveDown();
    
    doc.fontSize(11).font('Helvetica').text('Engineer Name: Rahul Verma');
    doc.text('Role: Survey Engineer');
    doc.text(`Survey Date: ${currentDate}`);
    doc.moveDown(2);

    // ========== 5. NETWORK ASSESSMENT ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Network Assessment');
    doc.moveDown();
    
    // Create table for network assessment
    const tableTop = doc.y;
    const tableLeft = 50;
    const tableWidth = 495;
    const rowHeight = 25;
    const col1Width = 150;
    const col2Width = tableWidth - col1Width;

    // Table header
    doc.fillColor('#f0f0f0').rect(tableLeft, tableTop, tableWidth, rowHeight).fill();
    doc.strokeColor('#cccccc').rect(tableLeft, tableTop, tableWidth, rowHeight).stroke();
    
    doc.fillColor('#000000').font('Helvetica-Bold').fontSize(11);
    doc.text('Parameter', tableLeft + 5, tableTop + 17);
    doc.text('Value', tableLeft + col1Width + 5, tableTop + 17);

    // Table rows
    const tableData = [
      ['GPS Location', '17.4474° N, 78.3762° E'],
      ['Signal Strength', '-55 dBm'],
      ['Line of Sight', 'Clear'],
      ['Cable Distance', '180 meters'],
      ['Fiber Feasibility', 'Feasible'],
      ['Obstacles', 'Minor rooftop structures']
    ];

    tableData.forEach((row, index) => {
      const y = tableTop + rowHeight + (index * rowHeight);
      
      // Alternate row colors
      if (index % 2 === 0) {
        doc.fillColor('#fafafa').rect(tableLeft, y, tableWidth, rowHeight).fill();
      }
      
      doc.strokeColor('#cccccc').rect(tableLeft, y, tableWidth, rowHeight).stroke();
      
      doc.fillColor('#000000').font('Helvetica').fontSize(11);
      doc.text(row[0], tableLeft + 5, y + 17);
      doc.text(row[1], tableLeft + col1Width + 5, y + 17);
    });

    doc.moveDown(7);

    // ========== 6. INFRASTRUCTURE READINESS ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Infrastructure Readiness');
    doc.moveDown();
    
    doc.fontSize(11).font('Helvetica');
    const infraItems = [
      { status: '✓', label: 'Power Availability: Yes' },
      { status: '✓', label: 'Rack Space: Available' },
      { status: '✓', label: 'Cooling: Adequate' },
      { status: '✓', label: 'Conduit Path: Clear' }
    ];

    infraItems.forEach(item => {
      doc.text(item.label);
    });
    doc.moveDown(2);

    // ========== 7. RISK ANALYSIS ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Risk Analysis');
    doc.moveDown();
    
    doc.fontSize(12).font('Helvetica-Bold').text('Identified Risks:');
    doc.moveDown();
    
    doc.fontSize(11).font('Helvetica');
    const risks = [
      '• Weather exposure on rooftop',
      '• Limited cable tray space'
    ];
    
    risks.forEach(risk => {
      doc.text(risk);
    });
    
    doc.moveDown();
    doc.fontSize(12).font('Helvetica-Bold').text('Mitigation:');
    doc.moveDown();
    
    const mitigations = [
      '• Use protective casing',
      '• Install secondary cable path'
    ];
    
    mitigations.forEach(mitigation => {
      doc.text(mitigation);
    });
    doc.moveDown(2);

    // ========== 8. RECOMMENDATION ==========
    doc.fontSize(14).font('Helvetica-Bold').text('Recommendation');
    doc.moveDown();
    
    doc.fontSize(11).font('Helvetica');
    const recommendation = 'The site is suitable for ISP deployment. Fiber installation is feasible with minor adjustments. Recommend proceeding with deployment.';
    
    // Word wrap for long text
    const words = recommendation.split(' ');
    let line = '';
    const lineHeight = 15;
    const maxWidth = 495;
    
    words.forEach(word => {
      const testLine = line + word + ' ';
      const metrics = doc.widthOfString(testLine);
      
      if (metrics > maxWidth && line !== '') {
        doc.text(line);
        line = word + ' ';
        doc.moveDown();
      } else {
        line = testLine;
      }
    });
    doc.text(line);
    doc.moveDown(3);

    // ========== 9. FOOTER ==========
    // Add footer line
    doc.strokeColor('#cccccc').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(2);
    
    doc.fontSize(9).font('Helvetica').text('Generated by SurveyPro ISP System', { align: 'center' });
    doc.text(`Page 1 of 1`, { align: 'center' });

    // Finalize the PDF
    doc.end();

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF report',
      details: error.message 
    });
  }
});

module.exports = router;
