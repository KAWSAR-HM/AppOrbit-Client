import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as echarts from "echarts";

const ModeratorHome = () => {
  const [pending, setPending] = useState(47);
  const [reported, setReported] = useState(23);
  const [approved, setApproved] = useState(156);

  useEffect(() => {
    const chartDom = document.getElementById("contentChart");
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Content Review",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: approved, name: "Approved Content" },
            { value: pending, name: "Pending Review" },
            { value: reported, name: "Reported Content" },
          ],
        },
      ],
    };
    myChart.setOption(option);
  }, [approved, pending, reported]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Moderator Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Monitor and manage platform content, users, and reports
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Moderation Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 h-96">
            <h3 className="text-lg font-semibold mb-4">
              Content Review Status
            </h3>
            <div id="contentChart" className="w-full h-80"></div>
          </div>

          <div className="space-y-6">
            <StatCard
              icon="ri-time-line"
              color="bg-yellow-100"
              textColor="text-yellow-600"
              title="Pending Reviews"
              count={pending}
            />
            <StatCard
              icon="ri-flag-line"
              color="bg-red-100"
              textColor="text-red-600"
              title="Reported Content"
              count={reported}
            />
            <StatCard
              icon="ri-check-line"
              color="bg-green-100"
              textColor="text-green-600"
              title="Resolved Today"
              count={approved}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, color, textColor, title, count }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 flex items-center`}>
    <div
      className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mr-4`}
    >
      <i className={`${icon} ${textColor} text-xl`}></i>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{count}</p>
      <p className="text-gray-600">{title}</p>
    </div>
  </div>
);

export default ModeratorHome;
