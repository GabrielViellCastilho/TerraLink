import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Data {
  name: string;
  value: number;
}

interface BarChartProps {
  data: Data[];
  title: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const [chartData, setChartData] = useState<{
    series: { data: number[] }[];
    options: ApexOptions;
  }>({
    series: [{ data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 450,
        background: "transparent",
        toolbar: { show: false },
      },

      title: {
        text: title,
        align: "center",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          color: "#000",
        },
      },

      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "55%",
          borderRadius: 6,
        },
      },

      dataLabels: { enabled: false },

      xaxis: {
        categories: [],
        labels: {
          show: false,
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "13px",
            fontWeight: 600,
          },
        },
      },

      grid: {
        borderColor: "#d7d7d7",
        strokeDashArray: 4,
      },

      tooltip: {
        theme: "light",
      },


      colors: ["#1447e6"],
    },
  });

  useEffect(() => {
    const values = data.map((i) => i.value);
    const labels = data.map((i) => i.name);

    setChartData((prev) => ({
      ...prev,
      series: [{ name: "Value", data: values }],
      options: {
        ...prev.options,
        xaxis: {
          ...prev.options.xaxis,
          categories: labels,
        },
        tooltip: {
          ...prev.options.tooltip,
          y: {
            formatter: (value: number) => `${value}`,
          },
        },
        title: {
          ...prev.options.title,
          text: title,
        },
      },
    }));
  }, [data, title]);

  return (
    <div className="w-full flex justify-center mt-6 mb-5">
      <div className="bg-white rounded-xl shadow p-3 max-w-lg w-full">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>

  );
};
