import React from 'react';
import { BarChart3, FileText, Layers, Workflow, Settings, Shield, Users, User } from 'lucide-react';
import logoExtract from './images/logo-extract.svg';
import {
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  DonutChartComponent,
  AreaChartComponent,
  GaugeChartComponent,
  HeatmapComponent,
  DataTableComponent
} from './ChartComponents';

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

interface DashboardPreviewProps {
  dashboardRows: DashboardRow[];
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ dashboardRows }) => {
  const kpiBlockMetrics = [
    { label: 'Total Documents', value: '2,847', change: '+12%', positive: true },
    { label: 'Accuracy Rate', value: '98.5%', change: '+2.1%', positive: true },
    { label: 'Avg Processing Time', value: '1.2s', change: '-0.3s', positive: true },
    { label: 'Error Rate', value: '1.5%', change: '-0.5%', positive: true },
    { label: 'Active Users', value: '47', change: '+5', positive: true },
    { label: 'Queue Length', value: '23', change: '-8', positive: true },
  ];

  const renderBlockContent = (block: any) => {
    if (!block.configured) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <div className="text-sm font-medium mb-1">Empty Block</div>
          <div className="text-xs text-center text-gray-400">
            Not configured
          </div>
        </div>
      );
    }

    if (block.graphType === 'kpi_block') {
      const count = block.kpiCount || 4;
      const metricsToShow = kpiBlockMetrics.slice(0, count);
      
      return (
        <div className="grid grid-cols-2 gap-2 lg:gap-3 h-full">
          {metricsToShow.map((metric, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-2 lg:p-3 flex flex-col justify-between">
              <div className="text-xs text-gray-600 font-medium mb-1 lg:mb-2 truncate">{metric.label}</div>
              <div>
                <div className="text-lg lg:text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className={`text-xs mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (block.graphType) {
      case 'kpi':
        return (
          <div className="flex flex-col items-start justify-center h-full">
            <div className="text-4xl font-bold text-black mb-2">
              {block.value || '2,847'}
            </div>
            <div className="text-sm text-gray-500">+12% from last month</div>
          </div>
        );
      case 'donut':
        return (
          <div className="h-full">
            <DonutChartComponent />
          </div>
        );
      case 'pie':
        return (
          <div className="h-full">
            <PieChartComponent />
          </div>
        );
      case 'bar':
        return (
          <div className="h-full">
            <BarChartComponent />
          </div>
        );
      case 'line':
        return (
          <div className="h-full">
            <LineChartComponent />
          </div>
        );
      case 'area':
        return (
          <div className="h-full">
            <AreaChartComponent />
          </div>
        );
      case 'gauge':
        return (
          <div className="h-full">
            <GaugeChartComponent />
          </div>
        );
      case 'heatmap':
        return (
          <div className="h-full">
            <HeatmapComponent />
          </div>
        );
      case 'table':
        return (
          <div className="h-full">
            <DataTableComponent />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-2" />
              <div className="text-sm">Widget Preview</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left Navigation */}
      <div className="lg:w-64 lg:flex lg:flex-col lg:fixed lg:h-full bg-white border-b lg:border-b-0 lg:border-r border-gray-200">
        {/* Logo */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <img src={logoExtract} alt="Extract Logo" className="h-6 lg:h-8" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 lg:p-4 overflow-x-auto lg:overflow-x-visible">
          <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 min-w-max lg:min-w-0">
            {/* Main Navigation */}
            <div className="lg:mb-6">
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
                <a href="#" className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-white bg-gray-900 rounded-lg whitespace-nowrap">
                  <BarChart3 size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span className="hidden sm:inline">Dashboard</span>
                </a>
                <a href="#" className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg whitespace-nowrap">
                  <FileText size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span className="hidden sm:inline">Inputs</span>
                </a>
                <a href="#" className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg whitespace-nowrap">
                  <Layers size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span className="hidden sm:inline">Classifications</span>
                </a>
                <a href="#" className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg whitespace-nowrap">
                  <Workflow size={16} className="lg:w-[18px] lg:h-[18px]" />
                  <span className="hidden sm:inline">Workflow</span>
                </a>
              </div>
            </div>

            {/* Configure Section - Hidden on mobile */}
            <div className="hidden lg:block">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Configure
              </div>
              <div className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Shield size={18} />
                  Authentication
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Users size={18} />
                  User Access
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-3 lg:p-6 lg:ml-64">
        {/* Content Container */}
        <div className="bg-white rounded-xl flex-1 flex flex-col">
          {/* Header */}
          <div className="px-3 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Dashboard</h1>
              {/* User Profile */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs lg:text-sm font-semibold text-white">BG</span>
                </div>
                <span className="text-xs lg:text-sm font-medium text-gray-700 hidden sm:inline">Super Admin</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-3 lg:p-6">
            {dashboardRows.length === 0 ? (
              <div className="flex items-center justify-center h-64 lg:h-96 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500 px-4">
                  <FileText size={32} className="lg:w-12 lg:h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm lg:text-lg font-medium">No dashboard content</p>
                  <p className="text-xs lg:text-sm mt-2">Configure your dashboard to see content here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 lg:space-y-6">
                {dashboardRows.map((row, rowIdx) => (
                  <div 
                    key={row.id}
                    className={`grid gap-3 lg:gap-6 ${
                      row.columns === 1 ? 'grid-cols-1' :
                      row.columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
                      row.columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                    }`}
                  >
                    {row.blocks.map((block, blockIdx) => (
                      <div
                        key={block.id}
                        className={`border rounded-xl p-3 lg:p-4 ${
                          block.configured 
                            ? 'bg-white border-gray-200' 
                            : 'bg-gray-50 border-dashed border-gray-300'
                        }`}
                      >
                        {/* Block Header */}
                        {block.configured && (
                          <div className="mb-2 lg:mb-3">
                            <h3 className="font-semibold text-gray-900 text-xs lg:text-sm">{block.title}</h3>
                          </div>
                        )}

                        {/* Block Content */}
                        <div className={block.graphType === 'kpi' ? '' : 'h-32 sm:h-40 lg:h-48'}>
                          {renderBlockContent(block)}
                        </div>

                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
