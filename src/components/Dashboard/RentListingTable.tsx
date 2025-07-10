"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Box,
  IconButton,
  Chip,
  Tooltip,
  TablePagination,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  CheckCircle,
  Cancel,
  Edit,
  Event,
  Update,
} from "@mui/icons-material";
import moment from "moment";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateListingStatus, updateListing } from "@/store/slices/dashboardSlice";

interface RentListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  userId: string;
  username: string;
  adminId: string | null;
  rejectionReason: string | null;
}

const statusOptions = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const getStatusChipColor = (status: string): "success" | "error" | "warning" => {
  const colorMap = {
    approved: "success",
    rejected: "error",
    pending: "warning",
  };

  return (colorMap[status as keyof typeof colorMap] || "warning") as "success" | "error" | "warning";
};

const RentListingTable = ({ listings }: { listings: RentListing[] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedListing, setSelectedListing] = useState<RentListing | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleApprove = async (id: string) => {
    setPendingActionId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (!pendingActionId) return;

    setActionLoading(pendingActionId);
    setConfirmDialogOpen(false);
    try {
      await dispatch(updateListingStatus({
        id: pendingActionId,
        status: "approved",
        rejectionReason: null
      })).unwrap();
    } finally {
      setActionLoading(null);
      setPendingActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    setPendingActionId(id);
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!pendingActionId) return;

    setActionLoading(pendingActionId);
    setRejectDialogOpen(false);
    try {
      await dispatch(updateListingStatus({
        id: pendingActionId,
        status: "rejected",
        rejectionReason: rejectionReason
      })).unwrap();
    } finally {
      setActionLoading(null);
      setPendingActionId(null);
      setRejectionReason("");
    }
  };

  const filtered = listings
    .filter((l) => statusFilter === "all" || l.status === statusFilter)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Rent Listing Dashboard</Typography>
        <TextField
          select
          sx={{ width: 150 }}
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>CID</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>₹/day</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <React.Fragment key={row.id}>
                <TableRow hover onClick={() => handleExpand(index)}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>₹{row.price}</TableCell>
                  <TableCell>
                    <Chip label={row.status} color={getStatusChipColor(row.status)} size="small" />
                  </TableCell>
                  <TableCell>{moment(row.createdAt).format("D/M/YYYY HH:mm")}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Approve">
                        <span>
                          <IconButton
                            color="success"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(row.id);
                            }}
                            disabled={row.status !== "pending" || actionLoading === row.id}
                          >
                            {actionLoading === row.id ? <CircularProgress size={20} /> : <CheckCircle />}
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <span>
                          <IconButton
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(row.id);
                            }}
                            disabled={row.status !== "pending" || actionLoading === row.id}
                          >
                            {actionLoading === row.id ? <CircularProgress size={20} /> : <Cancel />}
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedListing(row);
                          setEditDialogOpen(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      {expandedIndex === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={9} sx={{ p: 0, border: 0 }}>
                    <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                      <Box
                        sx={{
                          mx: "auto",
                          p: 2,
                          borderRadius: 2,
                          color: "#e6edf3",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              {row.status === "approved" ? (
                                <CheckCircle
                                  color="success"
                                  sx={{
                                    fontSize: 28,
                                    mb: 1,
                                    transition: "transform 0.3s",
                                    "&:hover": { transform: "scale(1.2)" },
                                  }}
                                />
                              ) : row.status === "rejected" ? (
                                <Cancel
                                  sx={{
                                    fontSize: 28,
                                    color: "#d32f2f",
                                    mb: 1,
                                    transition: "transform 0.3s",
                                    "&:hover": { transform: "scale(1.2)" },
                                  }}
                                />
                              ) : (
                                <Update
                                  sx={{
                                    fontSize: 28,
                                    color: "#58a6ff",
                                    mb: 1,
                                    transition: "transform 0.3s",
                                    "&:hover": { transform: "scale(1.2)" },
                                  }}
                                />
                              )}
                              <Box sx={{ width: 2, height: 50, bgcolor: "#D6D7D8" }} />
                            </Box>
                            <Box>
                              <Typography color="#3B3B3C" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                                {row.status === "approved"
                                  ? "Approved"
                                  : row.status === "rejected"
                                    ? "Rejected"
                                    : "Pending"}
                              </Typography>
                              {row.updatedAt && (
                                <Typography sx={{ fontSize: "0.8rem", color: "#767777" }}>
                                  {moment(row.updatedAt).format("D/M/YYYY, HH:mm:ss")}
                                </Typography>
                              )}
                              {row.rejectionReason && row.status === "rejected" && (
                                <Typography sx={{ fontSize: "0.8rem", color: "#d32f2f" }}>
                                  Reason: {row.rejectionReason}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <Event
                                sx={{
                                  fontSize: 28,
                                  color: "#ffa726",
                                  transition: "transform 0.3s",
                                  "&:hover": { transform: "rotate(-15deg) scale(1.1)" },
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography color="#3B3B3C" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                                Created On
                              </Typography>
                              <Typography sx={{ fontSize: "0.8rem", color: "#767777" }}>
                                {moment(row.createdAt).format("D/M/YYYY, HH:mm:ss")}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            pl: 4,
                            borderLeft: "1px solid #eee",
                            width: "400px",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: -2,
                              top: "50%",
                              height: "80%",
                              width: 4,
                              bgcolor: "primary.main",
                              transform: "translateY(-50%)",
                              borderRadius: 2,
                            },
                          }}
                        >
                          <Typography gutterBottom sx={{ color: "#B96B1A", fontWeight: "bold", mb: 2 }}>
                            Contact Details
                          </Typography>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              Description: {row.description}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                              Location: {row.location}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                              Category: {row.category}
                            </Typography>


                          </Box>
                        </Box>
                      </Box>
                    </Collapse>

                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={filtered.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      <EditListingDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        listing={selectedListing}
        dispatch={dispatch}
      />

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmApprove}
            color="success"
            variant="contained"
            disabled={actionLoading === pendingActionId}
          >
            {actionLoading === pendingActionId ? <CircularProgress size={24} /> : "Approve"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={rejectDialogOpen}
        onClose={() => {
          setRejectDialogOpen(false);
          setRejectionReason("");
        }}
      >
        <DialogTitle>Reject Listing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for rejecting this listing:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            type="text"
            fullWidth
            variant="standard"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setRejectDialogOpen(false);
              setRejectionReason("");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmReject}
            color="error"
            variant="contained"
            disabled={!rejectionReason || actionLoading === pendingActionId}
          >
            {actionLoading === pendingActionId ? <CircularProgress size={24} /> : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

interface EditListingDialogProps {
  open: boolean;
  onClose: () => void;
  listing: RentListing | null;
  dispatch: any;
}

const EditListingDialog: React.FC<EditListingDialogProps> = ({ open, onClose, listing, dispatch }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        location: listing.location,
      });
    }
  }, [listing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  const handleSubmit = async () => {
    if (!listing) return;

    setLoading(true);
    try {
      await dispatch(updateListing({
        id: listing.id,
        updatedData: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          location: formData.location,
        }
      })).unwrap();
      onClose();
    } catch (error) {
      console.error("Error updating listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Listing</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="price"
            label="Price (₹/day)"
            fullWidth
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            name="location"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Category"
            fullWidth
            value={listing?.category || ""}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Status"
            fullWidth
            value={listing?.status || ""}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Created By"
            fullWidth
            value={listing?.username || ""}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RentListingTable;