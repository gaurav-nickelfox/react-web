// Export all the private routes

import Dashboard from "pages/private/dashboard";
import BlogsList from "pages/private/blog";

export const PrivateRoutes = [
  { path: "/u/dashboard", exact: true, component: Dashboard },
  { path: "/u/blogs", exact: true, component: BlogsList }
];
