import AccountUpdater from "../components/AccountUpdater";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AccountUpdater>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AccountUpdater>
    </>
  );
}
export default MyApp;
