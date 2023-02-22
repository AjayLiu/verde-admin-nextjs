import type { AppProps } from "next/app";

import "@styles/globals.scss";
import GoogleAnalyticsHook from "@components/GoogleAnalyticsHook";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";

function Application({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalyticsHook />
      <Component {...pageProps} />
    </>
  );
}

export default Application;
