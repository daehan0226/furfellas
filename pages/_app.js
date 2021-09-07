import GlobalStyle from "../styles/global-styles";
import { ThemeProvider } from "../styles/themed-components";
import theme from "../styles/theme";
import { Layout, AdminLayout } from "../components/layout";

import {
  LocationContextProvider,
  ActionContextProvider,
  PhotoTypeContextProvider,
} from "../contexts";

function withContext(Component) {
  return (props) => (
    <LocationContextProvider>
      <ActionContextProvider>
        <PhotoTypeContextProvider>
          <Component {...props} />
        </PhotoTypeContextProvider>
      </ActionContextProvider>
    </LocationContextProvider>
  );
}

function App({ Component, pageProps, router: { route } }) {
  const getLayout = (page) => {
    let LayoutComponent = Layout;
    if (route.includes("admin")) {
      LayoutComponent = AdminLayout;
    }
    return <LayoutComponent>{page}</LayoutComponent>;
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}

export default withContext(App);
