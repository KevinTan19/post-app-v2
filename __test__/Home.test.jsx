import { render, screen, renderHook } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have 'Post App v2' text", () => {
    render(<Home />);

    const myElem = screen.getByText("Post App v2");

    expect(myElem).toBeInTheDocument();
  });

  it("should have 'Search' button", () => {
    render(<Home />);

    const myElem = screen.getByRole("button", { name: "Search" });

    expect(myElem).toBeInTheDocument();
  });

  it("should have '+ Add' button", () => {
    render(<Home />);

    const myElem = screen.getByRole("button", { name: "+ Add" });

    expect(myElem).toBeInTheDocument();
  });

  test("returns array of post", () => {
    const { result } = renderHook(() => {});
  });
});
