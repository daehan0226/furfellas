import GlobalStyle from "../styles/global-styles"
import { ThemeProvider } from '../styles/themed-components';
import theme from '../styles/theme';
import Layout from "../components/Layout"


export default function App({ Component, pageProps }) {

  
  const getLayout = (page) => {
    let LayoutComponent = Layout;
    return <LayoutComponent>{page}</LayoutComponent>;
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    </>
  )
}