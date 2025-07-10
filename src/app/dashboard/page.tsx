"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  Grid,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import RequestGraph from "@/components/Dashboard/RequestGraph";
import TopCarCategoriesChart from "@/components/Dashboard/TopCarCategoriesChart";
import { data, data as listings } from "@/utils/mockData";
import TrendingVehiclesItem from "@/components/Dashboard/TrendingVehiclesItem";


const cards = [
  {
    title: "Total Pending",
    value: 12,
    color: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    icon: PendingActionsIcon,
  },
  {
    title: "Approved",
    value: 24,
    color: "linear-gradient(135deg, #00C853 0%, #1B5E20 100%)",
    icon: CheckCircleIcon,
  },
  {
    title: "Rejected",
    value: 8,
    color: "linear-gradient(135deg, #FF5252 0%, #B71C1C 100%)",
    icon: CancelIcon,
  },
  {
    title: "Total Requests",
    value: 44,
    color: "linear-gradient(135deg, #8c52ff 0%, #5ce1e6 100%)",
    icon: RequestQuoteIcon,
  },
];

export default function DashboardPage() {
  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
      <CssBaseline />

      {/* Stat Cards */}
      <Grid container spacing={2} mb={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                background: card.color,
                color: "white",
                borderRadius: 2,
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box display="flex" justifyContent="space-between" height="100%">
                <CardContent
                  sx={{
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {card.value}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end",
                  }}
                >
                  <card.icon sx={{ color: "white", fontSize: 30 }} />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row - Responsive */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <RequestGraph />
        </Grid>
        <Grid item xs={12} md={4}>
          <TopCarCategoriesChart />
        </Grid>
        <Grid item xs={12} md={3}>
          <TrendingVehiclesItem listings={data} />
        </Grid>
      </Grid>
    </Box>
  );
}
