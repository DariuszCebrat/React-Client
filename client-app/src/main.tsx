import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css"
import "react-calendar/dist/Calendar.css"
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css"
//import "./app/layout/index.css";


import { StoreContext,store } from "./app/store/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router}/>
    </StoreContext.Provider>
  </StrictMode>
);
