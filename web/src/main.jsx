import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import routes from "./routes/index.jsx";
import {Provider} from "react-redux";
import store from "store/index.jsx";
import 'simplebar-react/dist/simplebar.min.css'
import {ClerkProvider} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
          <RouterProvider router={routes}/>
      </Provider>
  </ClerkProvider>,
)
