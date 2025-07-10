"use client";

import React from "react";
import { Box, Typography, Paper, Fade } from "@mui/material";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

interface Listing {
  id: string;
  title: string;
  createdAt: string;
}

interface Props {
  listings: Listing[];
}

const getOrderHistoryByMonth = (listings: Listing[]): number[] => {
  const months = Array(12).fill(0);
  listings.forEach((entry) => {
    const date = new Date(entry.createdAt);
    const month = date.getMonth(); // 0 = Jan, 11 = Dec
    months[month]++;
  });
  return months;
};

const RequestGraph: React.FC<Props> = ({ listings }) => {
  const orderHistory: number[] = getOrderHistoryByMonth(listings);

  const salesData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Car Rental Requests",
        data: orderHistory,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const salesOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#555",
          font: {
            size: 12,
            weight: "bold",
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          color: "#555",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
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
        displayColors: true,
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
  };

  return (
    <Fade in timeout={1000}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          backgroundColor: "#ffffff",
          minHeight: "400px",
          height: { xs: "auto", sm: "500px" },
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#222",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              mb: 2,
            }}
          >
            Monthly Car Rental Requests
          </Typography>

          <Box
            sx={{
              flex: 1,
              minHeight: "300px",
              position: "relative",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.05))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "scale(1.02)",
              },
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {orderHistory.length === 0 || orderHistory.every((val) => val === 0) ? (
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
            ) : (
              <Line data={salesData} options={salesOptions} />
            )}
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default RequestGraph;
