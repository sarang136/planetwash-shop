import React, { useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  parseISO,
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  subDays,
  isBefore,
} from 'date-fns';
import { FaRegCalendar } from 'react-icons/fa';
import { RiBarChartFill } from 'react-icons/ri';
import { IoMdArrowDropup } from 'react-icons/io';
import { useGetUserOrdersQuery } from '../redux/appSlice';
import { useSelector } from 'react-redux';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const StatCards = () => {
  const { user } = useSelector((state) => state.auth);
  const { data = [], isLoading, error } = useGetUserOrdersQuery(user?._id);
  console.log("alldata", data);

  const { monthlyData, weeklyData, currentMonthAmount } = useMemo(() => {
    const monthlyTotals = {};
    const weeklyTotals = {};

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);

    // Monthly data init
    for (
      let date = startOfMonth(startDate);
      isBefore(date, endDate) || date.getTime() === endDate.getTime();
      date = addMonths(date, 1)
    ) {
      const key = format(date, 'MMM');
      monthlyTotals[key] = 0;
    }

    // Weekly (last 7 days) data init
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = subDays(today, i);
      const key = format(day, 'dd MMM');
      weeklyTotals[key] = { uv: 0, pv: 0 };
    }

    data?.forEach((order) => {
      const date = parseISO(order.createdAt);
      if (!date) return;

      // Monthly
      const monthKey = format(date, 'MMM');
      if (monthlyTotals[monthKey] !== undefined) {
        monthlyTotals[monthKey] += order.totalAmount;
      }

      // Weekly (last 7 days only)
      const weekKey = format(date, 'dd MMM');
      if (weeklyTotals[weekKey]) {
        weeklyTotals[weekKey].uv += order.totalAmount * 0.6;
        weeklyTotals[weekKey].pv += order.totalAmount * 0.4;
      }
    });

    const currentMonthKey = format(new Date(), 'MMM');
    const currentMonthAmount = monthlyTotals[currentMonthKey] || 0;

    return {
      monthlyData: {
        labels: Object.keys(monthlyTotals),
        datasets: [
          {
            label: 'Total Spends',
            data: Object.values(monthlyTotals),
            borderColor: '#00D991',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointBorderColor: '#00D991',
            pointBackgroundColor: '#ffffff',
            pointBorderWidth: 3,
            pointRadius: 5,
          },
        ],
      },
      weeklyData: {
        labels: Object.keys(weeklyTotals),
        datasets: [
          {
            label: 'uv',
            data: Object.values(weeklyTotals).map((w) => w.uv),
            backgroundColor: '#7F56D9',
            stack: 'stack1',
          },
          {
            label: 'pv',
            data: Object.values(weeklyTotals).map((w) => w.pv),
            backgroundColor: '#38bdf8',
            stack: 'stack1',
          },
        ],
      },
      currentMonthAmount,
    };
  }, [data]);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
      x: {
        grid: { display: false },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          callback: (val, index) => monthlyData.labels?.[index] || '',
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, stacked: true },
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          callback: (val, index) => weeklyData.labels?.[index] || '',
        },
      },
    },
  };

  // if (error) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-2">
      {/* Monthly Line Chart Card */}
      <div className="bg-white p-4 rounded-2xl shadow-md flex-1 transition-[0.3s] hover:shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm bg-blue-50 text-blue-500 px-2 py-1 rounded-md">
            <FaRegCalendar className="mr-1" />
            This month
          </div>
          <RiBarChartFill className="text-gray-400" />
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1f2454]">
              ₹{(currentMonthAmount )}
            </h2>
            <p className="text-gray-500 text-sm">Total Spent</p>
            <div className="flex items-center text-green-500 mt-1 text-sm">
              <IoMdArrowDropup />
              +2.45%
            </div>
            <div className="flex items-center text-green-500 mt-1 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div> On track
            </div>
          </div>
          <div className="flex-1 h-40">
            <Line data={monthlyData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Weekly Revenue Bar Chart Card */}
      <div className="bg-white p-4 rounded-2xl shadow-md flex-1 transition-[0.3s] hover:shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-md font-bold text-[#1f2454]">Weekly Revenue</h2>
          <RiBarChartFill className="text-gray-400" />
        </div>
        <div className="w-full h-48">
          <Bar data={weeklyData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatCards;
