import { listenToResize } from "../../frontend/src/pages/ProductsPage";

describe("listenToResize", () => {
  test("removes the same resize listener when cleanup runs", () => {
    const originalWindow = globalThis.window;
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    const onResize = jest.fn();

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        addEventListener,
        removeEventListener
      }
    });

    const cleanup = listenToResize(onResize);
    cleanup();

    expect(addEventListener).toHaveBeenCalledWith("resize", onResize);
    expect(removeEventListener).toHaveBeenCalledWith("resize", onResize);

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow
    });
  });
});
