// // app/dashboard/StatCardWrapper.tsx
// "use client";
// import React from "react";
// import Grid from "@mui/material/Grid";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

// interface StatCardProps {
//   title: string;
//   color: string;
//   value: number;
//   loading: boolean;
//   icon: React.ElementType;
// }

// interface WrapperProps {
//   skeletonLoader: boolean;
//   loading: boolean;
//   data: {
//     pending: number;
//     approved: number;
//     rejected: number;
//     total: number;
//   };
// }

// const StatCard = ({
//   title,
//   color,
//   value,
//   loading,
//   icon: IconComponent,
// }: StatCardProps) => {
//   return (
//     <Card
//       sx={{
//         background: color,
//         color: "white",
//         borderRadius: 2,
//         p: 2,
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         transition: "transform 0.3s, box-shadow 0.3s",
//         "&:hover": {
//           transform: "scale(1.03)",
//           boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//         },
//       }}
//     >
//       <Box display="flex" justifyContent="space-between" height="100%">
//         <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {title}
//           </Typography>
//           {loading ? (
//             <CircularProgress sx={{ color: "white", mt: 1 }} size={30} />
//           ) : (
//             <Typography variant="h4" fontWeight="bold">
//               {value}
//             </Typography>
//           )}
//         </CardContent>
//         <Box
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.2)",
//             borderRadius: "50%",
//             width: 50,
//             height: 50,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             alignSelf: "flex-end",
//           }}
//         >
//           <IconComponent sx={{ color: "white", fontSize: 30 }} />
//         </Box>
//       </Box>
//     </Card>

//   );
// };

// const StatCardWrapper = ({
//   skeletonLoader,
//   loading,
//   data,
// }: WrapperProps) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

//   const cards = [
//     {
//       title: "Total Pending",
//       value: data.pending,
//       color: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
//       icon: PendingActionsIcon,
//     },
//     {
//       title: "Approved",
//       value: data.approved,
//       color: "linear-gradient(135deg, #00C853 0%, #1B5E20 100%)",
//       icon: CheckCircleIcon,
//     },
//     {
//       title: "Rejected",
//       value: data.rejected,
//       color: "linear-gradient(135deg, #FF5252 0%, #B71C1C 100%)",
//       icon: CancelIcon,
//     },
//     {
//       title: "Total Requests",
//       value: data.total,
//       color: "linear-gradient(135deg, #8c52ff 0%, #5ce1e6 100%)",
//       icon: RequestQuoteIcon,
//     },
//   ];

//   return (
//     <Box sx={{ width: "100%", p: 0 }}>
//       <Grid container spacing={2} sx={{ m: 0, width: "100%" }}>
//         {cards.map((card, index) => (
//           <Grid
//             item
//             key={index}
//             xs={12}
//             sm={6}
//             md={3}
//             sx={{
//               p: "0!important",
//               pr: isSmallScreen ? "0!important" : "16px!important",
//               pb: "16px!important",
//               pl: index % 2 === 0 || isSmallScreen ? "0!important" : "16px!important",
//               "&:nth-of-type(2n)": {
//                 pr: isMediumScreen ? "0!important" : "16px!important",
//               },
//               "&:nth-of-type(4n)": {
//                 pr: "0!important",
//               },
//             }}
//           >
//             {skeletonLoader ? (
//               <Skeleton
//                 variant="rectangular"
//                 width="100%"
//                 height={150}
//                 sx={{ borderRadius: 2 }}
//               />
//             ) : (
//               <StatCard
//                 title={card.title}
//                 color={card.color}
//                 value={card.value}
//                 loading={loading}
//                 icon={card.icon}
//               />
//             )}
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default StatCardWrapper;