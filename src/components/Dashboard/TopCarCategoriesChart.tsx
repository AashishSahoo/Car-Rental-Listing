"use client";

import React from "react";
import {
  Typography,
  Box,
  Paper,
  Fade,
} from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

type Listing = {
  id: string;
  title: string;
  category: string;
};

interface Props {
  listings: Listing[];
}

const getTopCategories = (listings: Listing[]) => {
  const categoryCount: Record<string, number> = {};

  listings.forEach(({ category }) => {
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const sorted = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    labels: sorted.map(([name]) => name),
    values: sorted.map(([, count]) => count),
  };
};

const TopCarCategoriesChart: React.FC<Props> = ({ listings }) => {
  const { labels, values } = getTopCategories(listings);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Listings",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<"polarArea"> = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          color: "#444",
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: "bold",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#222",
        bodyColor: "#444",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: "bold",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} listings`,
        },
      },
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3.5 },
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          width: "100%",
          minHeight: "500px",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            color: "#222",
            mb: 3,
          }}
        >
          Most valued Car Categories
        </Typography>

        <Box
          sx={{
            height: { xs: "300px", md: "350px" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {labels.length ? (
            <PolarArea data={chartData} options={chartOptions} />
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: "#888",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              No data found
            </Typography>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};

export default TopCarCategoriesChart;
