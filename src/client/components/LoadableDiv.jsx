import React from 'react';
import { BouncingLoader } from './Loaders';
import { OpacityModifier } from './Animate';

function LoadableDiv({ children, isLoading = false }) {
  function render() {
    return (
      <div className="relative">
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
}

export { LoadableDiv };
