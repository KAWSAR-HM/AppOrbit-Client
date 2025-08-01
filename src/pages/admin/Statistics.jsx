import { useEffect, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";

const Statistics = () => {
  const [stats, setStats] = useState({
    accepted: 0,
    pending: 0,
    rejected: 0,
    totalProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/stats`
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load statistics:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById("productChart");
    if (!chartDom) return;
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: { trigger: "item" },
      legend: { orient: "vertical", left: "left" },
      series: [
        {
          name: "Products",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: { show: false, position: "center" },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: { show: false },
          data: [
            { value: stats.accepted, name: "Accepted Products" },
            { value: stats.pending, name: "Pending Products" },
            { value: stats.rejected, name: "Rejected Products" },
          ],
        },
      ],
    };

    myChart.setOption(option);
    window.addEventListener("resize", () => myChart.resize());
  }, [stats]);

  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Manage your platform statistics, users, and coupons
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Statistics Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 h-96">
              <h3 className="text-lg font-semibold mb-4">
                Product Distribution
              </h3>
              <div id="productChart" className="w-full h-80"></div>
            </div>
          </div>

          <div className="space-y-6">
            <StatCard
              count={stats.totalProducts.toLocaleString()}
              label="Total Products"
              icon="ri-product-hunt-line"
            />
            <StatCard
              count={stats.totalReviews.toLocaleString()}
              label="Total Reviews"
              icon="ri-star-line"
            />
            <StatCard
              count={stats.totalUsers.toLocaleString()}
              label="Total Users"
              icon="ri-user-line"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

const StatCard = ({ count, label, icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
        <i className={`${icon} text-blue-600 text-xl`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </div>
);

export default Statistics;
