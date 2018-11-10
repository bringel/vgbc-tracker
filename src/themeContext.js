//@flow
import * as React from 'react';

export type ThemeOption = 'dark' | 'light';
export type AccentColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'facebook-blue';
export type ThemeContextValue = {
  theme: ThemeOption,
  accentColor: AccentColor,
  setTheme: (theme: ThemeOption) => void,
  setAccentColor: (accentColor: AccentColor) => void
};

const defaultTheme = {
  theme: 'dark',
  accentColor: 'green',
  setTheme: (theme) => {}, //eslint-disable-line
  setAccentColor: (accentColor) => {} //eslint-disable-line
};

const ThemeContext = React.createContext(defaultTheme);

export const AccentColorUpdate = (props: { accentColor: AccentColor }) => {
  return (
    <ThemeContext.Consumer>
      {(themeContext) => {
        if (themeContext.accentColor !== props.accentColor) {
          themeContext.setAccentColor(props.accentColor);
        }
      }}
    </ThemeContext.Consumer>
  );
};

export default ThemeContext;
