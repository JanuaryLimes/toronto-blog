import React from 'react';
import { getColorFromClassName } from '../utils';

export function BouncingLoader({
  backgroundClassName = 'bg-gray-900',
  foregroundClassName = 'bg-white'
}) {
  function render() {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={[
            'absolute h-full opacity-75 rounded w-full',
            backgroundClassName
          ].join(' ')}
        />
        <div className="z-0">
          <div className="bouncing-loader">
            <div className={foregroundClassName} />
            <div className={foregroundClassName} />
            <div className={foregroundClassName} />
          </div>
        </div>
      </div>
    );
  }

  return render();
}

export function DonutSpinnerLoader({
  foregroundClassName = 'bg-purple-400',
  size = 5
}) {
  const foregroundColor = getColorFromClassName(foregroundClassName);

  function render() {
    return (
      <div
        className={['donut', 'h-' + size, 'w-' + size].join(' ')}
        style={{
          borderLeftColor: foregroundColor
        }}
      />
    );
  }

  return render();
}
