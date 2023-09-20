import { Inter } from "next/font/google";
import App from "../components/App";
import { NextUIProvider } from "@nextui-org/react";

// eslint-disable-next-line no-unused-vars
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
}
