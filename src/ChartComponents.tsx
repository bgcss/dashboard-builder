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
  Bubble,
  Scatter,
  Radar,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

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

// Scatter Chart Component
export const ScatterChartComponent: React.FC = () => {
  const data = {
    datasets: [
      {
        label: 'Processing Time vs Accuracy',
        data: [
          { x: 95, y: 1.2 },
          { x: 88, y: 2.1 },
          { x: 92, y: 1.8 },
          { x: 85, y: 2.5 },
          { x: 98, y: 0.9 },
          { x: 90, y: 1.5 },
          { x: 87, y: 2.2 },
          { x: 94, y: 1.1 },
          { x: 91, y: 1.7 },
          { x: 89, y: 1.9 },
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Error Rate vs Response Time',
        data: [
          { x: 82, y: 3.1 },
          { x: 78, y: 3.5 },
          { x: 85, y: 2.8 },
          { x: 80, y: 3.2 },
          { x: 88, y: 2.4 },
          { x: 83, y: 2.9 },
          { x: 86, y: 2.6 },
          { x: 84, y: 2.7 },
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Accuracy Rate (%)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Processing Time (seconds)',
          font: {
            size: 12,
          },
        },
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
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context: any) {
            const point = context.parsed;
            return `${context.dataset.label}: Accuracy: ${point.x}%, Time: ${point.y}s`;
          },
        },
      },
    },
  };

  return <Scatter data={data} options={options} />;
};

// Bubble Chart Component
export const BubbleChartComponent: React.FC = () => {
  const data = {
    datasets: [
      {
        label: 'Document Processing Performance',
        data: [
          { x: 95, y: 1.2, r: 15 }, // Accuracy vs Processing Time, bubble size = volume
          { x: 88, y: 2.1, r: 25 },
          { x: 92, y: 1.8, r: 20 },
          { x: 85, y: 2.5, r: 30 },
          { x: 98, y: 0.9, r: 12 },
          { x: 90, y: 1.5, r: 18 },
          { x: 87, y: 2.2, r: 22 },
          { x: 94, y: 1.1, r: 16 },
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
      {
        label: 'Error Handling Performance',
        data: [
          { x: 82, y: 3.1, r: 14 },
          { x: 78, y: 3.5, r: 19 },
          { x: 85, y: 2.8, r: 17 },
          { x: 80, y: 3.2, r: 21 },
          { x: 88, y: 2.4, r: 13 },
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Accuracy Rate (%)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Processing Time (seconds)',
          font: {
            size: 12,
          },
        },
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
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context: any) {
            const point = context.parsed;
            return `${context.dataset.label}: Accuracy: ${point.x}%, Time: ${point.y}s, Volume: ${context.raw.r}`;
          },
        },
      },
    },
  };

  return <Bubble data={data} options={options} />;
};

// Polar Chart Component
export const PolarChartComponent: React.FC = () => {
  const data = {
    labels: ['Document Types', 'Processing Speed', 'Accuracy Rate', 'Error Handling', 'User Satisfaction'],
    datasets: [
      {
        data: [85, 92, 78, 88, 95],
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

  const options = {
    ...commonOptions,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

// Radar Chart Component
export const RadarChartComponent: React.FC = () => {
  const data = {
    labels: ['Processing Speed', 'Accuracy', 'Error Handling', 'User Experience', 'Scalability', 'Security'],
    datasets: [
      {
        label: 'Current Performance',
        data: [85, 92, 78, 88, 75, 90],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Target Performance',
        data: [90, 95, 85, 92, 88, 95],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
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
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
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

// Data Table Component using shadcn/ui - Auto-sizing to content
export const DataTableComponent: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columnHelper = createColumnHelper<DocumentData>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => (
        <span className="font-mono text-xs text-muted-foreground">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('documentName', {
      header: 'Document Name',
      cell: info => (
        <div className="max-w-[120px] truncate" title={info.getValue()}>
          <span className="text-sm font-medium">{info.getValue()}</span>
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
          <span className="text-sm font-medium">{accuracy}%</span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        );
      },
    }),
    columnHelper.accessor('processedDate', {
      header: 'Date',
      cell: info => (
        <span className="text-sm text-muted-foreground">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('extractedFields', {
      header: 'Fields',
      cell: info => {
        const fields = info.getValue();
        return fields > 0 ? (
          <span className="text-sm font-medium">{fields}</span>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
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
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search documents..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() && (
                        <span className="text-muted-foreground">
                          {header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronUp className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} 
          ({table.getFilteredRowModel().rows.length} total)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
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
