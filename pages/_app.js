import "tailwindcss/tailwind.css";
import GlobalState from "../context/GlobalState";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <Component {...pageProps} />
    </GlobalState>
  );
}

export default MyApp;
