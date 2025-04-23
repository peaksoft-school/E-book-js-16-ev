import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
   palette: {
      primary: {
         main: '#222222',
         white: '#FFFFFF',
         darkGray: '#A3A3A3',
      },
      secondary: {
         main: '#F34901',
         yellow: '#F8DF00',
         darkBlack: '#1C1C1C',
         background: '#F8F8F8',
         strokeGray: '#C4C4C4',
         placeholderGray: '#969696',
      },
      tertiary: {
         main: '#F10000',
         green: '#00AB1B',
         blushPink: '#FFF5F5',
         peachPuff: '#FFEEE6',
      },
   },
})

export const Themes = ({ children }) => (
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
