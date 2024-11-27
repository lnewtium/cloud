import { createRoot } from 'react-dom/client';
// @ts-ignore
import App from './components/App';
// @ts-ignore
import {store} from "./reducers";
import {Provider} from "react-redux";

// @ts-ignore
const root = createRoot(document.getElementById('root'));

// Render the App component to the DOM
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)