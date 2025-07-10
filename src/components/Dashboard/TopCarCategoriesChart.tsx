"use client";

import React from "react";
import { Typography, Box, Paper, Fade } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// ----- Sample listings data -----
const mockListings = [
  {
    id: "listing_001",
    title: "Toyota Camry 2022",
    category: "sedan",
  },
  {
    id: "listing_002",
    title: "Honda City 2021",
    category: "sedan",
  },
  {
    id: "listing_003",
    title: "Mahindra Thar 2023",
    category: "suv",
  },
  {
    id: "listing_004",
    title: "Hyundai Creta 2020",
    category: "suv",
  },
  {
    id: "listing_005",
    title: "Maruti Swift 2022",
    category: "hatchback",
  },
  {
    id: "listing_006",
    title: "Jeep Compass",
    category: "suv",
  },
  {
    id: "listing_007",
    title: "Tata Nexon",
    category: "compact suv",
  },
];

// ----- Count by category and pick top 5 -----
const getTopCategories = (listings) => {
  const categoryCount = {};

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

const TopCarCategoriesChart = ({ listings = mockListings }) => {
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

  const chartOptions = {
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
          minHeight: "400px",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.12)",
          },
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
          Top 5 Car Categories by Listings
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
