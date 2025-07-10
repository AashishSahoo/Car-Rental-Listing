"use client";

import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  Grid,
  Skeleton,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import RequestGraph from "@/components/Dashboard/RequestGraph";
import TopCarCategoriesChart from "@/components/Dashboard/TopCarCategoriesChart";
import TrendingVehiclesItem from "@/components/Dashboard/TrendingVehiclesItem";
import RentListingTable from "@/components/Dashboard/RentListingTable";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchListings } from "@/store/slices/dashboardSlice";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { listings = [], loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const totalPending = listings.filter((item) => item.status === "pending").length;
  const totalApproved = listings.filter((item) => item.status === "approved").length;
  const totalRejected = listings.filter((item) => item.status === "rejected").length;

  const cards = [
    {
      title: "Total Pending",
      value: totalPending,
      color: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
      icon: PendingActionsIcon,
    },
    {
      title: "Approved",
      value: totalApproved,
      color: "linear-gradient(135deg, #00C853 0%, #1B5E20 100%)",
      icon: CheckCircleIcon,
    },
    {
      title: "Rejected",
      value: totalRejected,
      color: "linear-gradient(135deg, #FF5252 0%, #B71C1C 100%)",
      icon: CancelIcon,
    },
    {
      title: "Total Requests",
      value: listings.length,
      color: "linear-gradient(135deg, #8c52ff 0%, #5ce1e6 100%)",
      icon: RequestQuoteIcon,
    },
  ];

  return (
    <ProtectedRoute>
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <CssBaseline />

        <Grid container spacing={2} mb={2}>
          {(loading ? Array(4).fill(null) : cards).map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {loading ? (
                <Card sx={{ p: 2, borderRadius: 2 }}>
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton variant="text" width="40%" height={50} />
                  <Skeleton variant="circular" width={50} height={50} sx={{ mt: 2 }} />
                </Card>
              ) : (
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
                    <CardContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
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
              )}
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            {loading ? (
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
            ) : (
              <RequestGraph listings={listings} />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            {loading ? (
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
            ) : (
              <TopCarCategoriesChart listings={listings} />
            )}
          </Grid>

          <Grid item xs={12} md={3}>
            {loading ? (
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2 }} />
            ) : (
              <TrendingVehiclesItem listings={listings} />
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 2 }}>
          {loading ? (
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          ) : (
            <RentListingTable
              listings={listings.map((item) => ({
                ...item,
                status:
                  item.status === "pending"
                    ? "pending"
                    : item.status === "approved"
                      ? "approved"
                      : item.status === "rejected"
                        ? "rejected"
                        : "pending",
              }))}
            />
          )}
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
