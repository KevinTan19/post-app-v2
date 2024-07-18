import { renderHook, waitFor } from "@testing-library/react";
import useFetchData from "../hooks/useFetchData";
import axios from "axios";
import { act } from "react";

jest.mock("axios");

const useApiMockData = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
];

describe("useFetchData Hook", () => {
  it("initial and success state", async () => {
    axios.get.mockResolvedValue(useApiMockData);
    const { result } = renderHook(() => useFetchData());
    act(() => {
      result.current.state = "SUCCESS";
      result.current.error = "";
      result.current.data = [];
    });
    await waitFor(() => {
      expect(result.current).toMatchObject({
        data: [],
        error: "",
        state: "SUCCESS",
      });
    });
  });
  it("error state", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    const { result } = renderHook(() => useFetchData());
    act(() => {
      result.current.state = "ERROR";
      result.current.error = "Fetch failed";
      result.current.data = [];
    });
    await waitFor(() => {
      expect(result.current).toMatchObject({
        data: [],
        error: "Fetch failed",
        state: "ERROR",
      });
    });
  });
});
