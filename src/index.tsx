import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyShop } from "@/pages/shop/Shop.lazy";
// import { Shop } from "@/pages/shop";
import Shop from "@/pages/shop/Shop";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import About from "./pages/about/About";
// import React from "react";
const root = document.getElementById("root");
if (!root) {
  throw new Error("root not found");
}
const container = createRoot(root);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        // element: <h1>about</h1>
        // //lenivye starnitsy
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyAbout />
          </Suspense>
        ),
        //NElenivye starnitsy
        // element:<About/>
      },
      {
        path: "/shop",
        // element: <h1>shop</h1>
        //lenivye starnitsy
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyShop />
          </Suspense>
        ),
        //NElenivye starnitsy
        // element:<Shop/>
      },
      {
        path: "/admin",
        element: <h1>admin panel</h1>,
      },
    ],
  },
]);
// container.render(<App />);
container.render(<RouterProvider router={router} />);
