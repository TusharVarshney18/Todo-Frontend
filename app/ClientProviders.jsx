"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
const client = new QueryClient();

export default function ClientProviders({ children }) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="colored"
        limit={3}
      />
    </QueryClientProvider>
  );
}
