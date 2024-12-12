import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./reducers";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root")!);

// Render the App component to the DOM
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
