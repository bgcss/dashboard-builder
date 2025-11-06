import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, BarChart3, FileText, Save, Eye, Columns, Edit, X, Check } from 'lucide-react';
import logoMark from './images/logo-mark-extract.svg';
import areaChartIcon from './images/icon-graph-area-chart.svg';
import barChartIcon from './images/icon-graph-bar-chart.svg';
import donutChartIcon from './images/icon-graph-donut-chart.svg';
import gaugeIcon from './images/icon-graph-gauge.svg';
import kpiIcon from './images/icon-graph-kpi.svg';
import lineChartIcon from './images/icon-graph-line-chart.svg';
import multipleKpiIcon from './images/icon-graph-multiple-kpi.svg';
import pieChartIcon from './images/icon-graph-pie-chart.svg';
import heatMapIcon from './images/icon-graph-heat-map.svg';
import dataTableIcon from './images/icon-graph-dataTable.svg';
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

const OCRDashboardBuilderV2 = () => {
  const [editingBlock, setEditingBlock] = useState<{rowId: number, blockIndex: number} | null>(null);
  const [selectedDataType, setSelectedDataType] = useState('');
  const [selectedGraphType, setSelectedGraphType] = useState('');
  const [kpiBlockCount, setKpiBlockCount] = useState(4);
  const [draggedRow, setDraggedRow] = useState<DashboardRow | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<{block: Block, rowId: number, blockIndex: number} | null>(null);
  const [dashboardRows, setDashboardRows] = useState<DashboardRow[]>([
    {
      id: 1,
      columns: 3,
      blocks: [
        { id: 1, configured: false },
        { id: 2, configured: false },
        { id: 3, configured: false },
      ]
    }
  ]);

  // Data type to graph type mapping
  const dataTypeOptions = [
    { 
      value: 'kpi_block', 
      label: 'KPI Block (Multiple Metrics)',
      availableGraphs: ['kpi_block'],
      requiresConfig: true
    },
    { 
      value: 'documents_processed', 
      label: 'Documents Processed',
      availableGraphs: ['kpi', 'bar', 'line']
    },
    { 
      value: 'extraction_accuracy', 
      label: 'Extraction Accuracy',
      availableGraphs: ['kpi', 'gauge', 'line']
    },
    { 
      value: 'document_types', 
      label: 'Document Types Distribution',
      availableGraphs: ['pie', 'donut', 'bar']
    },
    { 
      value: 'processing_time', 
      label: 'Processing Time',
      availableGraphs: ['line', 'bar', 'area']
    },
    { 
      value: 'error_rate', 
      label: 'Error Rate',
      availableGraphs: ['kpi', 'line', 'gauge']
    },
    { 
      value: 'field_extraction', 
      label: 'Field Extraction Success',
      availableGraphs: ['bar', 'donut', 'table']
    },
    { 
      value: 'user_activity', 
      label: 'User Activity',
      availableGraphs: ['line', 'bar', 'heatmap']
    }
  ];

  const graphTypeOptions: {[key: string]: {label: string, icon: string | React.ReactElement}} = {
    kpi_block: { label: 'KPI Block', icon: <img src={multipleKpiIcon} alt="KPI Block" className="w-5 h-5 mx-auto" /> },
    kpi: { label: 'Single KPI', icon: <img src={kpiIcon} alt="Single KPI" className="w-5 h-5 mx-auto" /> },
    bar: { label: 'Bar Chart', icon: <img src={barChartIcon} alt="Bar Chart" className="w-5 h-5 mx-auto" /> },
    line: { label: 'Line Chart', icon: <img src={lineChartIcon} alt="Line Chart" className="w-5 h-5 mx-auto" /> },
    pie: { label: 'Pie Chart', icon: <img src={pieChartIcon} alt="Pie Chart" className="w-5 h-5 mx-auto" /> },
    donut: { label: 'Donut Chart', icon: <img src={donutChartIcon} alt="Donut Chart" className="w-5 h-5 mx-auto" /> },
    gauge: { label: 'Gauge', icon: <img src={gaugeIcon} alt="Gauge" className="w-5 h-5 mx-auto" /> },
    area: { label: 'Area Chart', icon: <img src={areaChartIcon} alt="Area Chart" className="w-5 h-5 mx-auto" />  },
    table: { label: 'Data Table', icon: <img src={dataTableIcon} alt="Data Table" className="w-5 h-5 mx-auto" /> },
    heatmap: { label: 'Heatmap', icon: <img src={heatMapIcon} alt="Heatmap" className="w-5 h-5 mx-auto" /> },
  };

  const kpiBlockMetrics = [
    { label: 'Total Documents', value: '2,847', change: '+12%', positive: true },
    { label: 'Accuracy Rate', value: '98.5%', change: '+2.1%', positive: true },
    { label: 'Avg Processing Time', value: '1.2s', change: '-0.3s', positive: true },
    { label: 'Error Rate', value: '1.5%', change: '-0.5%', positive: true },
    { label: 'Active Users', value: '47', change: '+5', positive: true },
    { label: 'Queue Length', value: '23', change: '-8', positive: true },
  ];

  const getAvailableGraphs = () => {
    const dataType = dataTypeOptions.find(dt => dt.value === selectedDataType);
    return dataType ? dataType.availableGraphs : [];
  };

  const addNewRow = (columnCount = 3) => {
    const newRow = {
      id: Date.now(),
      columns: columnCount,
      blocks: Array(columnCount).fill(null).map((_, idx) => ({
        id: Date.now() + idx,
        configured: false
      }))
    };
    setDashboardRows([...dashboardRows, newRow]);
  };

  const deleteRow = (rowId: number) => {
    setDashboardRows(dashboardRows.filter(row => row.id !== rowId));
  };

  const updateRowColumns = (rowId: number, newColumns: number) => {
    setDashboardRows(dashboardRows.map(row => {
      if (row.id === rowId) {
        const currentBlocks = row.blocks;
        const currentCount = currentBlocks.length;
        
        if (newColumns > currentCount) {
          // Add empty blocks
          const newBlocks = [...currentBlocks];
          for (let i = currentCount; i < newColumns; i++) {
            newBlocks.push({ id: Date.now() + i, configured: false });
          }
          return { ...row, columns: newColumns, blocks: newBlocks };
        } else if (newColumns < currentCount) {
          // Remove blocks from the end
          return { ...row, columns: newColumns, blocks: currentBlocks.slice(0, newColumns) };
        }
        return { ...row, columns: newColumns };
      }
      return row;
    }));
  };

  const startEditingBlock = (rowId: number, blockIndex: number, block: any) => {
    setEditingBlock({ rowId, blockIndex });
    if (block.configured) {
      setSelectedDataType(block.dataType);
      setSelectedGraphType(block.graphType);
      setKpiBlockCount(block.kpiCount || 4);
    } else {
      setSelectedDataType('');
      setSelectedGraphType('');
      setKpiBlockCount(4);
    }
  };

  const cancelEditing = () => {
    setEditingBlock(null);
    setSelectedDataType('');
    setSelectedGraphType('');
    setKpiBlockCount(4);
  };

  const saveBlockConfiguration = () => {
    if (!editingBlock || !selectedDataType || !selectedGraphType) return;

    const dataTypeLabel = dataTypeOptions.find(dt => dt.value === selectedDataType)?.label;
    
    setDashboardRows(dashboardRows.map(row => {
      if (row.id === editingBlock.rowId) {
        const newBlocks = [...row.blocks];
        newBlocks[editingBlock.blockIndex] = {
          ...newBlocks[editingBlock.blockIndex],
          dataType: selectedDataType,
          graphType: selectedGraphType,
          title: dataTypeLabel,
          configured: true,
          ...(selectedGraphType === 'kpi_block' && { kpiCount: kpiBlockCount })
        };
        return { ...row, blocks: newBlocks };
      }
      return row;
    }));

    cancelEditing();
  };

  const handleRowDragStart = (e: React.DragEvent, row: any) => {
    setDraggedRow(row);
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleRowDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDraggedRow(null);
  };

  const handleRowDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRowDrop = (e: React.DragEvent, targetRow: any) => {
    e.preventDefault();
    if (!draggedRow || draggedRow.id === targetRow.id) return;

    const draggedIdx = dashboardRows.findIndex(r => r.id === draggedRow.id);
    const targetIdx = dashboardRows.findIndex(r => r.id === targetRow.id);

    const newRows = [...dashboardRows];
    newRows.splice(draggedIdx, 1);
    newRows.splice(targetIdx, 0, draggedRow);
    
    setDashboardRows(newRows);
  };

  // Block drag and drop handlers
  const handleBlockDragStart = (e: React.DragEvent, block: Block, rowId: number, blockIndex: number) => {
    e.stopPropagation();
    setDraggedBlock({ block, rowId, blockIndex });
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleBlockDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDraggedBlock(null);
  };

  const handleBlockDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBlockDrop = (e: React.DragEvent, targetRowId: number, targetBlockIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedBlock) return;
    
    // Don't allow dropping on the same position
    if (draggedBlock.rowId === targetRowId && draggedBlock.blockIndex === targetBlockIndex) return;
    
    // Only allow dropping within the same row for now
    if (draggedBlock.rowId !== targetRowId) return;

    setDashboardRows(dashboardRows.map(row => {
      if (row.id === targetRowId) {
        const newBlocks = [...row.blocks];
        const draggedBlockData = newBlocks[draggedBlock.blockIndex];
        
        // Remove the dragged block from its original position
        newBlocks.splice(draggedBlock.blockIndex, 1);
        
        // Insert it at the target position
        const adjustedTargetIndex = draggedBlock.blockIndex < targetBlockIndex ? targetBlockIndex - 1 : targetBlockIndex;
        newBlocks.splice(adjustedTargetIndex, 0, draggedBlockData);
        
        return { ...row, blocks: newBlocks };
      }
      return row;
    }));
  };

  const isBlockBeingEdited = (rowId: number, blockIndex: number) => {
    return editingBlock && editingBlock.rowId === rowId && editingBlock.blockIndex === blockIndex;
  };

  const renderBlockConfiguration = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-4 overflow-y-auto">
          {/* Step 1: Select Data Type */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              1. Select Data Type
            </label>
            <select 
              value={selectedDataType}
              onChange={(e) => {
                setSelectedDataType(e.target.value);
                // Auto-select KPI Block visualization for KPI Block (Multiple Metrics)
                if (e.target.value === 'kpi_block') {
                  setSelectedGraphType('kpi_block');
                } else {
                  setSelectedGraphType('');
                }
              }}
              className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose data type...</option>
              {dataTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Select Graph Type - Hidden for KPI Block (Multiple Metrics) */}
          {selectedDataType !== 'kpi_block' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                2. Select Visualization
              </label>
              {selectedDataType ? (
                <div className="grid grid-cols-2 gap-2">
                  {getAvailableGraphs().map(graphType => (
                    <button
                      key={graphType}
                      onClick={() => setSelectedGraphType(graphType)}
                      className={`p-2 border-2 rounded-lg text-center transition-all ${
                        selectedGraphType === graphType 
                          ? 'border-accent-400 bg-accent-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xl mb-0.5">{graphTypeOptions[graphType].icon}</div>
                      <div className="text-xs text-gray-700 leading-tight">{graphTypeOptions[graphType].label}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-500 italic border border-dashed border-gray-300 rounded-lg p-3 text-center">
                  Select a data type first
                </div>
              )}
            </div>
          )}

          {/* KPI Block Configuration */}
          {selectedGraphType === 'kpi_block' && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                2. Number of Metrics
              </label>
              <select 
                value={kpiBlockCount}
                onChange={(e) => setKpiBlockCount(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2}>2 Metrics</option>
                <option value={4}>4 Metrics</option>
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={cancelEditing}
            className="flex-1 px-3 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            onClick={saveBlockConfiguration}
            disabled={!selectedDataType || !selectedGraphType}
            className={`flex-1 px-3 py-2 text-sm rounded-lg font-medium flex items-center justify-center gap-1.5 ${
              selectedDataType && selectedGraphType
                ? 'text-white cursor-pointer bg-black hover:bg-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Check size={16} />
            Apply
          </button>
        </div>
      </div>
    );
  };

  const renderBlockContent = (block: any) => {
    if (!block.configured) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Plus size={40} className="mb-2 text-gray-300" />
          <p className="text-sm font-medium mb-1">Empty Block</p>
          <p className="text-xs text-center text-gray-400 px-4">
            Click to configure
          </p>
        </div>
      );
    }

    if (block.graphType === 'kpi_block') {
      const count = block.kpiCount || 4;
      const metricsToShow = kpiBlockMetrics.slice(0, count);
      
      return (
        <div className="grid grid-cols-2 gap-3 h-full">
          {metricsToShow.map((metric, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3 flex flex-col justify-between">
              <div className="text-xs text-gray-600 font-medium mb-2">{metric.label}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
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

  const totalBlocks = dashboardRows.reduce((sum, row) => sum + row.blocks.length, 0);
  const configuredBlocks = dashboardRows.reduce((sum, row) => 
    sum + row.blocks.filter(b => b.configured).length, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoMark} alt="Extract Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-900">Customize your dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                // Store dashboard data in localStorage for the preview
                localStorage.setItem('dashboardPreviewData', JSON.stringify(dashboardRows));
                // Open preview in new tab
                window.open('preview', '_blank');
              }}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye size={18} />
              Preview
            </button>
            <button 
              className="px-4 py-2 text-white bg-black rounded-lg flex items-center gap-2 hover:bg-gray-800"
            >
              <Save size={18} />
              Save Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-end">
          <div className="text-sm text-gray-500">
            {dashboardRows.length} row{dashboardRows.length !== 1 ? 's' : ''} • {configuredBlocks}/{totalBlocks} blocks configured
          </div>
        </div>
      </div>

      {/* Dashboard Canvas */}
      <div className="flex-1 p-6 pb-32 relative">
        {dashboardRows.length === 0 ? (
          <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No rows added yet</p>
              <p className="text-sm mt-2">Click "Add Row" below to start building your dashboard</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {dashboardRows.map((row, rowIdx) => (
              <div 
                key={row.id} 
                draggable
                onDragStart={(e) => handleRowDragStart(e, row)}
                onDragEnd={handleRowDragEnd}
                onDragOver={handleRowDragOver}
                onDrop={(e) => handleRowDrop(e, row)}
                className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-accent-400 transition-all cursor-move"
              >
                {/* Row Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <GripVertical size={20} className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" />
                    <span className="text-sm font-semibold text-gray-700">Row {rowIdx + 1}</span>
                    <div className="flex items-center gap-2">
                      <Columns size={16} className="text-gray-400" />
                      <select 
                        value={row.columns} 
                        onChange={(e) => updateRowColumns(row.id, Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer"
                      >
                        <option value={1}>1 Column</option>
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                      </select>
                    </div>
                    <span className="text-xs text-gray-500">
                      {row.blocks.filter(b => b.configured).length}/{row.blocks.length} configured
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRow(row.id);
                    }}
                    className="p-1 text-red-400 hover:text-red-600 rounded"
                    title="Delete row"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Row Blocks */}
                <div 
                  className="grid gap-4"
                  style={{ gridTemplateColumns: `repeat(${row.columns}, 1fr)` }}
                >
                  {row.blocks.map((block, blockIdx) => (
                    <div
                      key={block.id}
                      draggable={block.configured}
                      onDragStart={(e) => block.configured ? handleBlockDragStart(e, block, row.id, blockIdx) : undefined}
                      onDragEnd={handleBlockDragEnd}
                      onDragOver={handleBlockDragOver}
                      onDrop={(e) => handleBlockDrop(e, row.id, blockIdx)}
                      className={`border-2 rounded-lg p-4 transition-all relative group ${
                        isBlockBeingEdited(row.id, blockIdx)
                          ? 'bg-white border-accent-400 shadow-lg'
                          : block.configured 
                            ? 'bg-gray-50 border-gray-200 hover:border-accent-400' 
                            : 'bg-white border-dashed border-gray-300 hover:border-accent-400 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (!block.configured && !isBlockBeingEdited(row.id, blockIdx)) {
                          startEditingBlock(row.id, blockIdx, block);
                        }
                      }}
                    >
                      {/* Show Configuration UI if Editing */}
                      {isBlockBeingEdited(row.id, blockIdx) ? (
                        <div>
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900">Configure Block</h3>
                          </div>
                          {renderBlockConfiguration()}
                        </div>
                      ) : (
                        <>
                          {/* Block Header */}
                          {block.configured && (
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-gray-900 text-sm">{block.title}</h3>
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditingBlock(row.id, blockIdx, block);
                                  }}
                                  className="p-1 text-gray-400 hover:text-black rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Edit configuration"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  className="p-1 text-gray-400 hover:text-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                                  title="Drag to reorder"
                                  onMouseDown={(e) => e.stopPropagation()}
                                >
                                  <GripVertical size={16} />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Block Content */}
                          <div>
                            {renderBlockContent(block)}
                          </div>

                          {/* Block Footer */}
                          {block.configured && block.graphType && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{graphTypeOptions[block.graphType].label}</span>
                                <span>Updated 2m ago</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Text */}
        {dashboardRows.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            💡 Click empty blocks to configure • Click edit icon on configured blocks to modify • Drag grip icon to reorder blocks within a row • Drag rows to reorder
          </div>
        )}

        {/* Add Row Button - Bottom Left */}
        <button
          onClick={() => addNewRow(1)}
          className="fixed bottom-8 left-8 px-5 py-3 text-white bg-black rounded-lg shadow-lg flex items-center gap-2 font-medium transition-all hover:bg-gray-800 hover:shadow-xl"
        >
          <Plus size={20} />
          Add Row
        </button>
      </div>
    </div>
  );
};

export default OCRDashboardBuilderV2;
