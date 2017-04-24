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

  #Sun {
    width: 400px;
    position: absolute;
    z-index: 0;
    // bottom: -200px;

    bottom: 0;  /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */

    transform: translate(-50%, 35%);
  }

  #hero-svg {
    width: 60vw;
  }

  #hero {
    position: relative;
  }

  @media (min-width: 480px) {
    #Sun {
      transform: translate(-50%, 35%);
      width: 480px;
    }
  }

  @media (min-width: 640px) {
    #Sun {
      transform: translate(-50%, 40%);
      width: 640px;
    }
  }

  @media (min-width: 800px) {
    #Sun {
      transform: translate(-50%, 44%);
      width: 800px;
    }
  }

  @media (min-width: 1024px) {
    #Sun {
      transform: translate(-50%, 50%);
      width: 1024px;
    }
  }

  @media (min-width: 1200px) {
    #Sun {
      transform: translate(-50%, 60%);
      width: 1200px;
    }
  }
`;
