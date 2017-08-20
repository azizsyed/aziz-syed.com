import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-image: linear-gradient( 135deg, #97ABFF 10%, #123597 100%);
    // background-image: linear-gradient( 135deg, #3B2667 10%, #BC78EC 100%);
    // background-image: linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%);
    // background: linear-gradient( 0deg, #022c70, black );
    // background-image: linear-gradient(to top, rgba(91,115,125,1) 0%, rgba(2,44,112,1) 50%, rgba(0,0,0,1) 100%);
    // background-image: radial-gradient(ellipse farthest-corner at center bottom, rgba(255,255,255,1) 0%, rgba(245,252,43,1) 33%, rgba(86,86,160,1) 66.5%, rgba(0,0,0,1) 100%);
    color: grey;
    display: flex;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100vw;
  }

  #hero-svg {
    width: 70vw;
    max-width: 1000px;
    opacity: 0;
    fill: transparent;
  }
`;
