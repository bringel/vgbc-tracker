//@flow
import * as React from 'react';
import { Link } from 'react-head';

export type ThemeOption = 'dark' | 'light';
export type AccentColor = 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'facebook-blue';
export type ThemeContextValue = {
  theme: ThemeOption,
  accentColor: AccentColor,
  setTheme: (theme: ThemeOption) => void,
  setAccentColor: (accentColor: AccentColor) => void
};

const defaultTheme: ThemeContextValue = {
  theme: 'dark',
  accentColor: 'green',
  setTheme: theme => {}, //eslint-disable-line
  setAccentColor: accentColor => {} //eslint-disable-line
};

const ThemeContext = React.createContext<ThemeContextValue>(defaultTheme);

export class AccentColorUpdate extends React.Component<{ accentColor: AccentColor }> {
  static contextType = ThemeContext;

  componentDidMount() {
    if (this.context.accentColor !== this.props.accentColor) {
      this.context.setAccentColor(this.props.accentColor);
    }
  }

  render() {
    return <Link rel="stylesheet" href={`${process.env.PUBLIC_URL || ''}/accent-${this.props.accentColor}.css`} />;
  }
}

export default ThemeContext;
