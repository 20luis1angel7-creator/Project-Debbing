import { useEffect, useState } from "react";
import OrdersPage from "../../frontend/src/pages/OrdersPage";
import { apiGet } from "../../frontend/src/services/api";

jest.mock("../../frontend/src/services/api", () => ({
  apiGet: jest.fn()
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
  useState: jest.fn()
}));

describe("OrdersPage", () => {
  test("marks orders as loaded after the request finishes", async () => {
    let resolveRequest!: () => void;
    const setLoaded = jest.fn();

    (apiGet as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = () => resolve([]);
      })
    );
    (useState as jest.Mock)
      .mockReturnValueOnce([[], jest.fn()])
      .mockReturnValueOnce([false, setLoaded]);
    (useEffect as jest.Mock).mockImplementation((callback) => callback());

    OrdersPage();

    expect(setLoaded).not.toHaveBeenCalled();

    resolveRequest();
    await Promise.resolve();
    await Promise.resolve();

    expect(setLoaded).toHaveBeenCalledWith(true);
  });
});
