import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryDetails from "./ui/QueryDetails";
import Modal from "./ui/Modal";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WatchList from "./pages/WatchList";
import Signup from "./pages/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/queryDetails/:title",
        element: (
          <Modal>
            <QueryDetails />
          </Modal>
        ),
      },
      {
        path: "/watchList",
        element: <WatchList />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </QueryClientProvider>
  );
}

export default App;
