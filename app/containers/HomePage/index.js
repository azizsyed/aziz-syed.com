/* eslint-disable */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import anime from 'animejs';
import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { FormattedMessage } from 'react-intl';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import messages from './messages';

// Create an <Input> component that'll render an <input> tag with some styles
const Path = styled.path`
  stroke: #fff;
  strokeWidth: 1;
  strokeMiterlimit: 10;
`;

class HeroSVG extends React.PureComponent {
  componentDidMount() {
    anime({
      targets: this.$svg.getElementsByTagName('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      fill: ['#FFF', '#FF851B'],
      easing: 'easeInOutSine',
      duration: 1800,
      delay: (el, i) => (i * 500) + 1800,
      // direction: 'alternate',
      // loop: true,
    });

    // const colors = [
    //   '#FF4136',
    //   '#0074D9',
    //   '#01FF70',
    //   '#FFDC00',
    //   '#F012BE',
    //   '#FF851B',
    // ];

    // anime({
    //   targets: this.$svg.getElementsByTagName('path'),
    //   strokeDashoffset: [anime.setDashoffset, 3],
    //   fill: () => ([
    //     { value: '#000000', duration: 500 },
    //     { value: (0 === 0) ? '#FF4136' :  '#0074D9', duration: 500, delay: 500 }
    //   ]),
    //   easing: 'easeInOutSine',
    //   duration: 1000,
    //   delay: (el, i) => (i * 500) + 1000,
    //   // direction: 'alternate',
    //   loop: true,
    // });

    anime({
      targets: this.$svg,
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 3000,
    });
  }

  render() {
    return (
      <svg
        id="hero-svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox="0 0 216 54"
        ref={(svg) => { this.$svg = svg; }}
      >
        <defs>
          <linearGradient id="skyGradient" x1="50%" y1="0%" x2="50%" y2="100%" >
            <stop offset="0%" stopColor="#000" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#022c70" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <Path d="M15.822,21.418v10.547h-3.428v9.521H0.5v-25.43 c0-4.922,1.343-8.745,4.028-11.47C7.213,1.862,10.988,0.5,15.852,0.5c4.688,0,8.154,1.235,10.4,3.706 c2.246,2.471,3.369,6.284,3.369,11.44v25.84H17.727V16.438c0-1.562-0.186-2.646-0.557-3.252c-0.371-0.605-1.036-0.908-1.992-0.908 c-1.856,0-2.783,1.387-2.783,4.16v4.98H15.822z" />
        <Path d="M55.788,17.146l-7.471,14.771h8.594v9.57H33.449l7.422-14.819 h-7.715v-9.521H55.788z" />
        <Path d="M69.362,17.146v24.341h-9.131V17.146H69.362z M64.821,6.281 c1.237,0,2.307,0.436,3.21,1.306c0.903,0.871,1.355,1.9,1.355,3.088c0,1.27-0.427,2.312-1.282,3.125 c-0.854,0.814-1.949,1.221-3.284,1.221c-1.335,0-2.429-0.407-3.284-1.221c-0.854-0.813-1.282-1.855-1.282-3.125 c0-1.188,0.452-2.217,1.355-3.088C62.514,6.717,63.584,6.281,64.821,6.281z" />
        <Path d="M95.046,17.146l-7.471,14.771h8.594v9.57H72.707l7.422-14.819 h-7.715v-9.521H95.046z" />
        <Path d="M132.121,1.32v11.396c-0.86-0.293-1.523-0.439-1.992-0.439 c-0.898,0-1.67,0.333-2.314,0.996c-0.645,0.664-0.967,1.465-0.967,2.402c0,0.801,0.352,1.816,1.055,3.047l0.908,1.582 c1.641,2.852,2.461,5.605,2.461,8.262c0,3.887-1.382,7.178-4.146,9.873c-2.764,2.695-6.138,4.043-10.122,4.043 c-1.915,0-3.809-0.439-5.684-1.318V29.592c1.132,0.723,2.139,1.084,3.018,1.084c1.035,0,1.899-0.298,2.593-0.894 c0.693-0.596,1.04-1.343,1.04-2.241c0-0.586-0.557-1.865-1.67-3.838c-1.777-3.125-2.666-6.25-2.666-9.375 c0-3.769,1.343-7.017,4.028-9.741c2.685-2.725,5.893-4.087,9.624-4.087C128.928,0.5,130.539,0.774,132.121,1.32z" />
        <Path d="M139.953,52.155v-7.935c1.237,0.521,2.319,0.781,3.247,0.781 c2.962,0,4.883-1.669,5.762-5.005c-1.596,0.944-3.158,1.416-4.688,1.416c-2.263,0-4.126-0.843-5.591-2.526 c-1.465-1.686-2.197-3.829-2.197-6.434V17.146h9.131v13.086c0,1.449,0.603,2.173,1.807,2.173c1.155,0,1.733-0.797,1.733-2.393 V17.146h9.131v21.729c0,4.053-1.14,7.324-3.418,9.814c-2.719,2.962-6.006,4.443-9.863,4.443 C143.313,53.132,141.63,52.806,139.953,52.155z" />
        <Path d="M187.536,30.793h-13.844c-0.211-0.699-0.316-1.343-0.316-1.929 c0-0.813,0.146-1.611,0.439-2.393h4.639c-0.326-1.807-1.344-2.71-3.053-2.71c-1.139,0-2.066,0.484-2.783,1.453 c-0.717,0.968-1.074,2.209-1.074,3.723c0,1.579,0.346,2.856,1.037,3.833c0.693,0.977,1.6,1.465,2.723,1.465 c0.912,0,1.791-0.455,2.637-1.367l5.201,6.25c-2.426,1.904-5.119,2.856-8.082,2.856c-3.613,0-6.648-1.212-9.105-3.638 c-2.459-2.425-3.688-5.428-3.688-9.009c0-3.564,1.242-6.575,3.723-9.033c2.482-2.458,5.531-3.687,9.145-3.687 c3.531,0,6.498,1.201,8.898,3.601c2.4,2.401,3.602,5.359,3.602,8.875C187.634,29.442,187.601,30.012,187.536,30.793z" />
        <Path d="M206.312,8.161h9.131v20.288c0,3.728-0.977,6.763-2.93,9.106 c-1.123,1.352-2.553,2.426-4.285,3.223c-1.734,0.797-3.512,1.196-5.334,1.196c-3.631,0-6.689-1.221-9.18-3.662 s-3.736-5.436-3.736-8.984c0-3.434,1.236-6.404,3.711-8.911c2.475-2.506,5.404-3.76,8.789-3.76c0.537,0,1.352,0.049,2.441,0.146 v10.059c-0.748-0.586-1.498-0.879-2.246-0.879c-0.943,0-1.754,0.346-2.43,1.038c-0.674,0.691-1.012,1.525-1.012,2.502 c0,0.944,0.35,1.754,1.049,2.43c0.699,0.675,1.539,1.013,2.516,1.013c2.344,0,3.516-1.619,3.516-4.858V8.161z" />
      </svg>
    );
  }
}

const Icon = styled.i`
`;

const Link = styled.a`
  color: #DDDDDD;
  text-align: center;
  display: block;

  transition: color 0.5s ease-out, transform 0.2s;

  &:hover, &:focus{
    color: #FF851B;
    transform: scale(1.25);
  }

  &:focus{
    outline: 1px dashed #FF851B;
  }

  font-size: 28px;

  ${breakpoint('tablet')`
    font-size: 26px;
  `}
  ${breakpoint('desktop')`
    font-size: 24px;
  `}
`;

const Hero = () => (
  <HeroWrapper>
    <HeroSVG />
  </HeroWrapper>
);

const Footer = () => (
  <FooterWrapper>
    <Link href="https://github.com/azizsyed"><Icon className="ion-social-github-outline" /></Link>
    <Link href="https://www.linkedin.com/in/aziz-syed-0b895964/"><Icon className="ion-social-linkedin-outline" /></Link>
    <Link href="https://codepen.io/azizsyed/"><Icon className="ion-social-codepen-outline" /></Link>
    <Link href="https://www.instagram.com/syed80"><Icon className="ion-social-instagram-outline" /></Link>
    <Link href="https://www.facebook.com/aziz.syed"><Icon className="ion-social-facebook-outline" /></Link>
    <Link href="mailto:aziz.scarn@gmail.com"><Icon className="ion-ios-email-outline" /></Link>
  </FooterWrapper>
);

const HeroWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
`;

const Home = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Home>
        <Hero />
        <Footer />
      </Home>
    );
  }
}
