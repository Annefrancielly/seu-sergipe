import { Big_Shoulders, DM_Mono } from "next/font/google";

export const fonteTitulos = Big_Shoulders({
  subsets: ["latin"],
  variable: "--fonte-titulos",
  display: "swap",
});

export const fonteTexto = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--fonte-texto",
  display: "swap",
});
