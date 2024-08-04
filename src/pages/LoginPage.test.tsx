// src/pages/LoginPage.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "./LoginPage";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter as Router } from "react-router-dom";

describe("LoginPage", () => {
  it("renders login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("displays error messages for invalid input", async () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/username is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });
});
