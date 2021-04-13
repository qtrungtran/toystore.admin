import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "state/store";
import App from "./App";
test("App's working", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(container).toBeTruthy();
});
