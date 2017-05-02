import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    min-height: 400px;
    min-width: 400px;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: linear-gradient( 0deg, #022c70, black );
    // background-image: linear-gradient(to top, rgba(91,115,125,1) 0%, rgba(2,44,112,1) 50%, rgba(0,0,0,1) 100%);
    // background-image: radial-gradient(ellipse farthest-corner at center bottom, rgba(255,255,255,1) 0%, rgba(245,252,43,1) 33%, rgba(86,86,160,1) 66.5%, rgba(0,0,0,1) 100%);
    color: grey;
    min-width: 400px;
    display: flex;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100vh;
    min-width: 100vw;
  }

  #sun-svg {
  }

  #hero-svg {
    width: 60vw;
    opacity: 0;
    fill: transparent;
  }

  #hero {
    position: relative;
  }

  @media (min-width: 480px) {
    #sun-svg {
      // transform: translate(-50%, 35%);
      // width: 480px;
    }
  }

  @media (min-width: 640px) {
    #sun-svg {
      // transform: translate(-50%, 40%);
      // width: 640px;
    }
  }

  @media (min-width: 800px) {
    #sun-svg {
      // transform: translate(-50%, 44%);
      // width: 800px;
    }
  }

  @media (min-width: 1024px) {
    #sun-svg {
      // transform: translate(-50%, 50%);
      // width: 1024px;
    }
  }

  @media (min-width: 1200px) {
    #sun-svg {
      // transform: translate(-50%, 60%);
      // width: 1200px;
    }
  }
`;
