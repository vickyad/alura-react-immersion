import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #A978AF;
    background-image: url('https://wallpapercave.com/wp/wp6578590.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
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
