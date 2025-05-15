import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '@/lib/AluraKutCommons';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: url('https://image.api.playstation.com/vulcan/ap/rnd/202409/1611/875ccc48e74d960e0070687aa60efe28a62ca6ce3b81037e.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

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