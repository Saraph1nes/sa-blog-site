import {createContext, useLayoutEffect, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import PropTypes from "prop-types";

export const DarkModeContent = createContext({})

const DarkModeProvider = ({children}) => {
  const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [darkMode, setDarkMode] = useState('dark')
  const [primaryMainColor, setPrimaryMainColor] = useState('#ffa41d')

  const theme = useMemo(() => {
    const themeDarkMode = darkMode === 'auto' ? (osDarkMode ? 'dark' : 'light') : darkMode
    return createTheme({
      palette: {
        primary: {
          main: primaryMainColor,
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
  }, [darkMode, osDarkMode, primaryMainColor])

  const switchColor = useMemo(() => {
    return {
      setPrimaryMain: (color) => {
        setPrimaryMainColor(() => {
          document.documentElement.style.setProperty('--main-color', color);
          localStorage && localStorage.setItem('primaryMainColor', color)
          setPrimaryMainColor(color)
          return color
        })
      }
    }
  }, [])

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
    const storageDarkMode = localStorage.getItem('darkMode');
    if (storageDarkMode) {
      setDarkMode(storageDarkMode)
    }
  }, []);

  useLayoutEffect(() => {
    const storagePrimaryMainColor = localStorage.getItem('primaryMainColor');
    if (storagePrimaryMainColor) {
      document.documentElement.style.setProperty('--main-color', storagePrimaryMainColor);
      setPrimaryMainColor(storagePrimaryMainColor)
    }
  }, [])

  return <DarkModeContent.Provider
    value={{
      switchMode,
      darkMode,
      switchColor
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
