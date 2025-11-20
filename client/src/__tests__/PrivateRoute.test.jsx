import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PrivateRoute from "../../src/components/PrivateRoute.jsx";

// Mock AuthContext
vi.mock("../../src/context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: true, loading: false }),
}));

describe("PrivateRoute", () => {
  it("renders children when authenticated", () => {
    const { container } = render(
      <PrivateRoute>
        <div>Protected</div>
      </PrivateRoute>
    );

    expect(screen.getByText("Protected")).toBeInTheDocument();
  });

  it("hides children when not authenticated", () => {
    // Override mock for this test
    vi.mocked(require("../../src/context/AuthContext")).useAuth = () => ({
      isAuthenticated: false,
      loading: false,
    });

    const { queryByText } = render(
      <PrivateRoute>
        <div>Protected</div>
      </PrivateRoute>
    );

    expect(queryByText("Protected")).toBeNull();
  });
});
