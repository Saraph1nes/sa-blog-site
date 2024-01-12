import {createContext, useLayoutEffect, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import PropTypes from "prop-types";

export const DarkModeContent = createContext({})

const DarkModeProvider = ({children}) => {
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [darkMode, setDarkMode] = useState('dark')

  const theme = useMemo(() => {
    const themeDarkMode = darkMode === 'auto' ? (osDarkMode ? 'dark' : 'light') : darkMode
    return createTheme({
      palette: {
        primary: {
          main: 'rgb(255,165,0)',
        },
        mode: themeDarkMode,
        ...(themeDarkMode === 'dark' && {
          background: {
            default: 'rgb(16,20,24)',
          },
          color: {
            default: '#ffffff'
          },
        }),
        ...(themeDarkMode === 'light' && {
          background: {
            default: '#ffffff',
          },
          color: {
            default: '#434343'
          }
        }),
      },
    })
  }, [darkMode, osDarkMode])

  const switchMode = useMemo(() => {
    return {
      toggleDarkMode: (_mode) => {
        setDarkMode(() => {
          let mode = _mode
          localStorage && localStorage.setItem('darkMode', mode)
          return mode
        })
      }
    }
  }, [])

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

DarkModeProvider.defaultProps = {
  children: null
}

DarkModeProvider.propTypes = {
  children: PropTypes.node
}

export default DarkModeProvider
