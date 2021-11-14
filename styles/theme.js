import baseStyled, { css } from "styled-components";

const sizes = {
  desktop: 1167,
  tablet: 778,
  phone: 576,
};

// Iterate through the sizes and create a media template
const media = {
  desktop: (...args) => undefined,
  tablet: (...args) => undefined,
  phone: (...args) => undefined,
};

Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(args.shift(), ...args)}
    }
  `;
  return acc;
}, media);

const colors = {
  primary: {
    light: "#757ce8",
    main: "#3f50b5",
    dark: "#002884",
    white: "#fff",
    black: "#000",
    text: "#fff",
    btnLight: "#40a9ff",
    btnMain: "#1890ff",
  },
  secondary: {
    light: "#ff7961",
    main: "#f44336",
    dark: "#ba000d",
    text: "#000",
  },
  common: {
    error: "#ff4d4f"
  }
};

const theme = {
  colors,
  media,
};

export const styled = baseStyled;
export default theme;
