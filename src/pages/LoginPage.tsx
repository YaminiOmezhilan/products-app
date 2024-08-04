import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { useAppDispatch } from "../redux/store";
import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Define the validation schema using zod
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Define the types for form data using the validation schema
type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      // Dispatch the login action
      const result = await dispatch(loginUser(data));
      // Check if the login was successful
      if (result.meta.requestStatus === "fulfilled") {
        // Redirect to the products page
        navigate("/products");
      } else {
        // Show error message if login failed
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("An error occurred during login");
    }
  };

  const CustomButton = styled(Button)`
    text-transform: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 8px 10px;
    margin-top: 10px;
    line-height: 1.5;
    border: none;
    border-radius: 6px;
    background-color: #cfd4d8;
    border-color: #d9d9d9;
    color: #2d3540;

    &:hover {
      background-color: #b8bdc0;
      border-color: #dde3e7;
      color: #000;
    }

    &:active {
      border-color: #1c4b8e;
      color: #000;
    }
  `;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#fafafa",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 2,
          boxShadow:
            "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 4px 6px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("username")}
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#cfd4d8", // Default border color
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#cfd4d8", // Border color on hover
                  borderWidth: "1px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#cfd4d8", // Border color when focused
                  borderWidth: "1px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#2D3540", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2D3540", // Label color when focused
              },
            }}
          />
          <TextField
            {...register("password")}
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#cfd4d8", // Default border color
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#cfd4d8", // Border color on hover
                  borderWidth: "1px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#cfd4d8", // Border color when focused
                  borderWidth: "1px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#2D3540", // Label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2D3540", // Label color when focused
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#b8bdc0" }} />
                    ) : (
                      <Visibility sx={{ color: "#b8bdc0" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomButton type="submit" variant="contained" fullWidth>
            Login
          </CustomButton>
          {errorMessage && (
            <Box
              sx={{
                mt: 2,
                bgcolor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <Alert severity="error" sx={{ margin: 0 }}>
                {errorMessage}
              </Alert>
            </Box>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
