import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";

export const fonteTitulos = localFont({
  src: "../assets/fonts/tropicane.woff",
  weight: "400",
  style: "normal",
  variable: "--fonte-titulos",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const fonteTexto = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--fonte-texto",
  display: "swap",
});
