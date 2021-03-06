import GlobalStyle from "../styles/global-styles";
import { Provider } from "react-redux";
import { useStore } from "../redux";
import { ThemeProvider } from "../styles/themed-components";
import theme from "../styles/theme";
import { Layout, AdminLayout } from "../components/layout";

import {
  LocationContextProvider,
  ActionContextProvider,
  PetContextProvider,
} from "../contexts";
import "../styles/styles.css";

function withContext(Component) {
  return (props) => (
    <LocationContextProvider>
      <ActionContextProvider>
        <PetContextProvider>
          <Component {...props} />
        </PetContextProvider>
      </ActionContextProvider>
    </LocationContextProvider>
  );
}

function App({ Component, pageProps, router: { route } }) {
  const store = useStore(pageProps.initialReduxState);
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default withContext(App);
