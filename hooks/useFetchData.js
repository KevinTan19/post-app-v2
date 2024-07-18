"use client";
import axios from "axios";
import React from "react";

const endpoint = "https://jsonplaceholder.typicode.com/posts";
export default function useFetchData() {
  const [data, setData] = React.useState({
    state: "LOADING",
    error: "",
    data: [],
  });
  const fetchData = async () => {
    try {
      const result = await axios.get(endpoint);
      setData({
        state: "SUCCESS",
        error: "",
        data: result.data, // Access the data directly
      });
    } catch (err) {
      setData({
        data: [],
        state: "ERROR",
        error: err,
      });
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return data;
}
