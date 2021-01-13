import { css } from 'styled-components';

const accentColors = ['#0057A8', '#614767', '#00CFFF'];
const neutralColors = ['#425563', '#5F7A76', '#80746E', '#767676'];
const statusColors = {
  critical: '#F04953',
  error: '#F04953',
  warning: '#FFD144',
  ok: '#01a982',
  unknown: '#CCCCCC',
  disabled: '#CCCCCC',
};

const colors = {
  lightgray: '#e0e0e0',
  muted: '#888888',
  brand: '#0057A8',
  secondary: '#00CFFF',
  dark: '#001529',
  black: '#181718',
  grey: '#5d5a5d',
  focus: '#008bd0',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

const pjn = {
  global: {
    size: {
      xxsmall: '48px',
      xsmall: '96px',
      small: '192px',
      medium: '384px',
      large: '768px',
      xlarge: '1152px',
      xxlarge: '1536px',
      full: '100%',
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: '4px',
          large: '6px',
          xlarge: '12px',
        },
        edgeSize: {
          none: '0px',
          hair: '1px',
          xxsmall: '2px',
          xsmall: '3px',
          small: '6px',
          medium: '12px',
          large: '24px',
          xlarge: '48px',
        },
        size: {
          xxsmall: '24px',
          xsmall: '48px',
          small: '96px',
          medium: '192px',
          large: '384px',
          xlarge: '768px',
          full: '100%',
        },
      },
      medium: { value: 1536 },
      large: {},
    },
    colors,
  },
  text: {
    xsmall: { size: '12px', height: 1.5 },
    small: { size: '14px', height: 1.43 },
    medium: { size: '16px', height: 1.375 },
    large: { size: '18px', height: 1.167 },
    xlarge: { size: '20px', height: 1.1875 },
    xxlarge: { size: '24px', height: 1.125 },
  },
  textInput: {
    extend: css`
      font-weight: 400;
    `,
  },
  MaskedInput: {
    extend: css`
      font-weight: 400;
      border: none;
    `,
  },
  checkBox: {
    size: '20px',
    check: { thickness: '3px' },
  },
  formField: {
    label: {
      color: 'black',
      size: '14px',
      margin: {
        horizontal: '10px',
      },
      help: {
        size: '10px',
      },
    },
  },
  button: {
    border: {
      radius: '5px',
    },
    extend:
      'letter-spacing: 0.04167em; font-size:12px; text-transform:uppercase;',
  },
  icon: {
    colors,
  },
};

export default pjn;
