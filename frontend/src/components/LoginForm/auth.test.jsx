import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginForm from "./LoginForm";

// Mock store setup
const mockStore = configureStore({
  reducer: {
    auth: (state = { user: null, error: null, loading: false }, action) => state,
  },
});

const renderWithStore = (component) =>
  render(<Provider store={mockStore}>{component}</Provider>);

// ─────────────────────────────────────────────
// TEST 1: Login form renders correctly
// ─────────────────────────────────────────────
test("renders login form with email, password fields and submit button", () => {
  renderWithStore(<LoginForm />);

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});

// ─────────────────────────────────────────────
// TEST 2: Shows error if fields are empty on submit
// ─────────────────────────────────────────────
test("shows validation error when form is submitted with empty fields", async () => {
  renderWithStore(<LoginForm />);

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// TEST 3: Shows error message on wrong credentials
// ─────────────────────────────────────────────
test("displays error message on failed login attempt", async () => {
  const storeWithError = configureStore({
    reducer: {
      auth: (state = { user: null, error: "Invalid credentials", loading: false }) => state,
    },
  });

  render(
    <Provider store={storeWithError}>
      <LoginForm />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});