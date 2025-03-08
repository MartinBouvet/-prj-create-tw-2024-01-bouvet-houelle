import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const theme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#f8f9fa',
  cardBg: '#ffffff',
  text: '#333333',
  textLight: '#777777',
  border: '#e0e0e0',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#3498db',
  success: '#2ecc71',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  transition: '0.3s ease'
};