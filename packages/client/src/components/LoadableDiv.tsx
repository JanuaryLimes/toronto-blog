import React from 'react';
import { BouncingLoader } from './Loaders';
import { OpacityModifier } from './Animate';
import { LoadableDivProps } from '../types';

export const LoadableDiv: React.FC<LoadableDivProps> = function({
  children,
  isLoading = false,
  className
}) {
  function render() {
    return (
      <div className={'relative ' + className}>
        <div>
          <OpacityModifier duration={500} condition={!isLoading}>
            {children}
          </OpacityModifier>
        </div>
        {isLoading && <BouncingLoader />}
      </div>
    );
  }

  return render();
};
