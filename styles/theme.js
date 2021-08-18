import baseStyled, { css } from 'styled-components';

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
},                        media);

const colors = {
  blue: '#2054ae',
  pink: '#c43683',
  black: '#24272a',
  primary: '#0070f3',
};

const theme = {
  colors,
  media,
  sizes,
};

export const styled = baseStyled
export default theme