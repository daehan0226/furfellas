import GlobalStyle from "../styles/global-styles"
import { ThemeProvider } from '../styles/themed-components';
import theme from '../styles/theme';


export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}