import React, { useState, useEffect } from 'react';
import DashboardPreview from './DashboardPreview';

interface Block {
  id: number;
  dataType?: string;
  graphType?: string;
  title?: string;
  value?: string;
  configured: boolean;
  kpiCount?: number;
}

interface DashboardRow {
  id: number;
  columns: number;
  blocks: Block[];
}

const PreviewPage: React.FC = () => {
  const [dashboardRows, setDashboardRows] = useState<DashboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load dashboard data from localStorage
    const storedData = localStorage.getItem('dashboardPreviewData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDashboardRows(parsedData);
      } catch (error) {
        console.error('Error parsing dashboard data:', error);
        // Fallback to default data if parsing fails
        setDashboardRows([
          {
            id: 1,
            columns: 3,
            blocks: [
              { id: 1, dataType: 'documents_processed', graphType: 'kpi', title: 'Documents Processed', value: '2,847', configured: true },
              { id: 2, dataType: 'extraction_accuracy', graphType: 'kpi', title: 'Extraction Accuracy', value: '98.5%', configured: true },
              { id: 3, dataType: 'error_rate', graphType: 'kpi', title: 'Error Rate', value: '1.5%', configured: true },
            ]
          },
          {
            id: 2,
            columns: 2,
            blocks: [
              { id: 4, dataType: 'document_types', graphType: 'donut', title: 'Document Types', configured: true },
              { id: 5, dataType: 'processing_time', graphType: 'line', title: 'Processing Time Trend', configured: true },
            ]
          }
        ]);
      }
    } else {
      // Default dashboard data if no stored data
      setDashboardRows([
        {
          id: 1,
          columns: 3,
          blocks: [
            { id: 1, dataType: 'documents_processed', graphType: 'kpi', title: 'Documents Processed', value: '2,847', configured: true },
            { id: 2, dataType: 'extraction_accuracy', graphType: 'kpi', title: 'Extraction Accuracy', value: '98.5%', configured: true },
            { id: 3, dataType: 'error_rate', graphType: 'kpi', title: 'Error Rate', value: '1.5%', configured: true },
          ]
        },
        {
          id: 2,
          columns: 2,
          blocks: [
            { id: 4, dataType: 'document_types', graphType: 'donut', title: 'Document Types', configured: true },
            { id: 5, dataType: 'processing_time', graphType: 'line', title: 'Processing Time Trend', configured: true },
          ]
        }
      ]);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard preview...</p>
        </div>
      </div>
    );
  }

  return <DashboardPreview dashboardRows={dashboardRows} />;
};

export default PreviewPage;
