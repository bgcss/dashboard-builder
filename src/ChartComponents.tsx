import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  PolarArea,
} from 'react-chartjs-2';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler
);

// Common chart options
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        padding: 10,
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    },
  },
};

// Bar Chart Component
export const BarChartComponent: React.FC = () => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    datasets: [
      {
        label: 'Documents Processed',
        data: [650, 850, 450, 750, 550],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

// Sample data for the data table
interface DocumentData {
  id: string;
  documentName: string;
  type: string;
  status: 'Processed' | 'Processing' | 'Failed' | 'Pending';
  accuracy: number;
  processedDate: string;
  extractedFields: number;
}

const sampleTableData: DocumentData[] = [
  {
    id: 'DOC-001',
    documentName: 'Invoice_2024_001.pdf',
    type: 'Invoice',
    status: 'Processed',
    accuracy: 98.5,
    processedDate: '2024-01-15',
    extractedFields: 12
  },
  {
    id: 'DOC-002',
    documentName: 'Receipt_Store_A.jpg',
    type: 'Receipt',
    status: 'Processed',
    accuracy: 95.2,
    processedDate: '2024-01-15',
    extractedFields: 8
  },
  {
    id: 'DOC-003',
    documentName: 'Contract_Legal_B.pdf',
    type: 'Contract',
    status: 'Processing',
    accuracy: 0,
    processedDate: '2024-01-16',
    extractedFields: 0
  },
  {
    id: 'DOC-004',
    documentName: 'Form_Application.pdf',
    type: 'Form',
    status: 'Processed',
    accuracy: 92.8,
    processedDate: '2024-01-16',
    extractedFields: 15
  },
  {
    id: 'DOC-005',
    documentName: 'Invoice_2024_002.pdf',
    type: 'Invoice',
    status: 'Failed',
    accuracy: 0,
    processedDate: '2024-01-16',
    extractedFields: 0
  },
  {
    id: 'DOC-006',
    documentName: 'Receipt_Gas_Station.jpg',
    type: 'Receipt',
    status: 'Processed',
    accuracy: 89.3,
    processedDate: '2024-01-17',
    extractedFields: 6
  },
  {
    id: 'DOC-007',
    documentName: 'Medical_Report.pdf',
    type: 'Report',
    status: 'Pending',
    accuracy: 0,
    processedDate: '2024-01-17',
    extractedFields: 0
  }
];

// Data Table Component
export const DataTableComponent: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columnHelper = createColumnHelper<DocumentData>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => (
        <span className="font-mono text-xs text-gray-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('documentName', {
      header: 'Document Name',
      cell: info => (
        <div className="max-w-[120px] truncate" title={info.getValue()}>
          <span className="text-sm font-medium text-gray-900">{info.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: info => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const statusColors = {
          'Processed': 'bg-green-100 text-green-800',
          'Processing': 'bg-yellow-100 text-yellow-800',
          'Failed': 'bg-red-100 text-red-800',
          'Pending': 'bg-gray-100 text-gray-800'
        };
        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor('accuracy', {
      header: 'Accuracy',
      cell: info => {
        const accuracy = info.getValue();
        return accuracy > 0 ? (
          <span className="text-sm font-medium text-gray-900">{accuracy}%</span>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        );
      },
    }),
    columnHelper.accessor('processedDate', {
      header: 'Date',
      cell: info => (
        <span className="text-sm text-gray-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('extractedFields', {
      header: 'Fields',
      cell: info => {
        const fields = info.getValue();
        return fields > 0 ? (
          <span className="text-sm font-medium text-gray-900">{fields}</span>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: sampleTableData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search documents..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() && (
                        <span className="text-gray-400">
                          {header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="w-3 h-3" />
                          ) : (
                            <ChevronUp className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-2 py-2 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <span>
            ({table.getFilteredRowModel().rows.length} total)
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border border-gray-300 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border border-gray-300 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Line Chart Component
export const LineChartComponent: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Processing Time (seconds)',
        data: [2.1, 1.8, 1.5, 1.2, 1.4, 1.1],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Pie Chart Component
export const PieChartComponent: React.FC = () => {
  const data = {
    labels: ['Invoices', 'Receipts', 'Contracts', 'Forms', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} options={commonOptions} />;
};

// Donut Chart Component
export const DonutChartComponent: React.FC = () => {
  const data = {
    labels: ['Success', 'Warning', 'Error'],
    datasets: [
      {
        data: [75, 20, 5],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    cutout: '60%',
  };

  return <Doughnut data={data} options={options} />;
};

// Area Chart Component
export const AreaChartComponent: React.FC = () => {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'User Activity',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Documents Processed',
        data: [80, 150, 250, 400, 150, 250],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Gauge Chart Component (using PolarArea as approximation)
export const GaugeChartComponent: React.FC = () => {
  const data = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [
      {
        data: [85, 10, 3, 2],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

// Heatmap Component (using Bar chart with custom styling)
export const HeatmapComponent: React.FC = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hour 0-6',
        data: [10, 15, 12, 8, 5, 20, 25],
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Hour 6-12',
        data: [45, 50, 48, 52, 55, 40, 35],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Hour 12-18',
        data: [80, 85, 90, 88, 92, 70, 60],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Hour 18-24',
        data: [30, 35, 32, 28, 25, 45, 50],
        backgroundColor: 'rgba(59, 130, 246, 1)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
