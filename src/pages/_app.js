import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import DashboardLayout from "@/layout/DashboardLayout";
import { useEffect, useState } from "react";
import theme from "@/constants/theme";
import { ToastContainer, toast } from "react-toastify";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState({ firstTime: true });
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <Provider store={store}>
        <DefaultSeo {...SEO} />
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <style jsx global>{`
                html {
                  font-family: ${montserrat.style.fontFamily};
                }
              `}</style>
              {loading?.firstTime ? (
                <div>loading...</div>
              ) : (
                <DashboardLayout>
                  <Component {...pageProps} />
                  <ToastContainer />
                </DashboardLayout>
              )}
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
