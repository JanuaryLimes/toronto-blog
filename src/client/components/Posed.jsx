import React from 'react';
import posed from 'react-pose';

const spring = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  mass: 1
};

const showAuto = {
  height: 'auto',
  opacity: 1,
  transition: spring
};
const hideZero = {
  height: 0,
  opacity: 0,
  overflow: 'hidden',
  transition: spring
};
const visible = {
  opacity: 1,
  transition: spring
};
const hidden = {
  opacity: 0,
  transition: spring
};

const PosedLi = posed.li({
  enter: showAuto,
  exit: hideZero
});

const OpacityModifierPosed = posed.div({
  visible,
  hidden
});

const FadeInOutPosed = posed.div({
  in: showAuto,
  out: hideZero
});

function FadeInOut({ condition, children }) {
  return (
    <FadeInOutPosed pose={condition ? 'in' : 'out'}>{children}</FadeInOutPosed>
  );
}

function OpacityModifier({ condition, children }) {
  return (
    <OpacityModifierPosed pose={condition ? 'visible' : 'hidden'}>
      {children}
    </OpacityModifierPosed>
  );
}

export { PosedLi, OpacityModifier, FadeInOut };
