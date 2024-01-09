import {createContext, useLayoutEffect, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export const DarkModeContent = createContext({})

const Index = ({children}) => {
  const [darkMode, setDarkMode] = useState('dark')

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        primary: {
          main: 'rgb(255,165,0)',
        },
        mode: darkMode,
        ...(darkMode === 'dark' && {
          background: {
            default: 'rgb(16,20,24)',
          },
          color: {
            default: '#ffffff'
          },
        }),
        ...(darkMode === 'light' && {
          background: {
            default: '#ffffff',
          },
          color: {
            default: '#434343'
          }
        }),
      },
    })
  }, [darkMode])

  const switchMode = useMemo(() => {
    return {
      toggleDarkMode: () => {
        setDarkMode(p => {
          let mode = p === 'dark' ? 'light' : 'dark'
          localStorage && localStorage.setItem('darkMode', mode)
          return mode
        })
      }
    }
  }, [darkMode])

  useLayoutEffect(() => {
    if (localStorage) {
      const storageDarkMode = localStorage.getItem('darkMode');
      if (storageDarkMode) {
        setDarkMode(storageDarkMode)
      }
    }
  }, []);

  return <DarkModeContent.Provider
    value={{
      switchMode,
      darkMode
    }}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div>{children}</div>
    </ThemeProvider>
  </DarkModeContent.Provider>
}

Index.defaultProps = {
  children: null
}

export default Index
