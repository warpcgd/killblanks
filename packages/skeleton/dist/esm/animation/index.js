import { addStyle } from '../handler/styleCache';
import { addClassName } from '../util';
export const addBlick = (ele) => {
    const animateRule = `{
    animation: skeleton-blink 1.2s ease-in-out infinite
  }`;
    const keyframesRule = `{
    50% {
      opacity: 0.6;
    }
  }`;
    addStyle('.skeleton--animate', animateRule);
    addStyle('@keyframes skeleton-blink', keyframesRule);
    addClassName(ele, ['skeleton--animate']);
};
export const addTransition = () => {
    const transitionRule = `{
    transition: opacity 0.3s;
  }`;
    const opacityRule = `{
    opacity: 0;
  }`;
    addStyle('.skeleton-enter-active', transitionRule);
    addStyle('.skeleton-enter, .skeleton-leave-to', opacityRule);
};
