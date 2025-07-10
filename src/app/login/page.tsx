"use client";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { loginUser } from '@/store/slices/authSlice';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  FormHelperText,
  Grid,
} from "@mui/material";
import { Icon } from "@iconify/react";



export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "aarav.sharma@example.com",
    password: "test1234",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const { user, loading, error } = useAppSelector(state => state.auth);

  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);


  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "97vh",
          width: "99vw",
          overflow: "hidden",
          bgcolor: "#f9f7fc",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            minWidth: 360,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #d3bfff, #f0e5ff)",
            boxShadow: "4px 0 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              width: "80%",
              maxWidth: 400,
              bgcolor: "#ffffff",
              borderRadius: 4,
              px: 4,
              py: 5,
              boxShadow: "0 8px 30px rgba(140, 82, 255, 0.25)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ width: 150, height: 150, marginBottom: 0 }}
              />
              <Typography
                variant="h5"
                fontWeight={700}
                color="#8c52ff"
                letterSpacing={0.5}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                Sign in to access your dashboard
              </Typography>

            </Box>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                size="small"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                size="small"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              {error && (
                <FormHelperText error sx={{ textAlign: "center", mt: 1, fontSize: '0.875rem' }}>
                  {error}
                </FormHelperText>
              )}

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #8c52ff, #6a38c3)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(90deg, #7a45e5, #572aa4)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: { xs: "none", md: "block" },
            backgroundImage: "url('/images/image1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(to bottom right, rgba(140,82,255,0.3), rgba(0,0,0,0.3))",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Admin Panel • Simplified & Secure
            </Typography>
          </Box>
        </Box>
      </Box>

    </>

  );
}

