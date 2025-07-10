"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

interface Vehicle {
  id: string;
  title: string;
  price: number;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  adminId: string | null;
  rejectionReason: string | null;
}

interface TrendingVehiclesItemProps {
  listings: Vehicle[];
}

const TrendingVehiclesItem: React.FC<TrendingVehiclesItemProps> = ({ listings }) => {
  const itemsPerPage = 4;
  const topListings = [...listings]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  const [displayedItems, setDisplayedItems] = useState<Vehicle[]>([]);

  useEffect(() => {
    setDisplayedItems(topListings.slice(0, itemsPerPage));
  }, [listings]);

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      const currentLength = displayedItems.length;
      if (currentLength < topListings.length) {
        const moreItems = topListings.slice(currentLength, currentLength + itemsPerPage);
        setDisplayedItems((prev) => [...prev, ...moreItems]);
      }
    }
  };

  return (
    <Card
      sx={{
        background: "white",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1565C0",
            mb: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DirectionsCarIcon /> Top Renting Vehicles
        </Typography>

        {topListings.length === 0 ? (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography sx={{ color: "#1565C0" }}>No data found</Typography>
          </Box>
        ) : (
          <List
            onScroll={handleScroll}
            sx={{
              flex: 1,
              overflowY: "auto",
              mt: 1,
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-track": { background: "#f1f1f1", borderRadius: "10px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "10px",
                "&:hover": { background: "#555" },
              },
            }}
          >
            {displayedItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(10px)",
                      background: "rgba(21, 101, 192, 0.05)",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: `rgba(21, 101, 192, ${1 - index * 0.15})`,
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Tooltip title={item.title} arrow>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                          {item.title}
                        </Typography>
                      </Tooltip>
                    }
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#1565C0",
                            fontWeight: 600,
                            background: "rgba(21, 101, 192, 0.1)",
                            padding: "4px 12px",
                            borderRadius: "12px",
                          }}
                        >
                          {item.category.toUpperCase()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < displayedItems.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingVehiclesItem;
