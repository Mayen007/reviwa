import { render, screen, fireEvent } from "@testing-library/react";
import CreateReport from "../../src/pages/CreateReport.jsx";
import { LoadingProvider } from "../../src/context/LoadingContext.jsx";
import { MemoryRouter } from "react-router-dom";

describe("CreateReport validation", () => {
  it("shows validation error when location not set", async () => {
    render(
      <MemoryRouter>
        <LoadingProvider>
          <CreateReport />
        </LoadingProvider>
      </MemoryRouter>
    );

    const submit = screen.getByRole("button", { name: /Submit Report/i });
    fireEvent.click(submit);

    // The component updates error state synchronously in handleSubmit
    const err = await screen.findByText(
      /Please get your current location first/i
    );
    expect(err).toBeInTheDocument();
  });
});
