import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define the schema using Zod for validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Define the type for the form data using Zod's inference
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  // Initialize the form using react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful:", result);

        // Redirect to products page upon successful login
        navigate("/products");
      } else {
        console.error("Login failed:", response.statusText);
        // Handle login failure (show error message to user)
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
