import React from 'react';
import { getColorFromClassName } from '../utils';
import { BouncingLoaderProps, DonutSpinnerLoaderProps } from '../types';

export const BouncingLoader: React.FC<BouncingLoaderProps> = function({
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
};

export const DonutSpinnerLoader: React.FC<DonutSpinnerLoaderProps> = function({
  foregroundClassName = 'bg-purple-400',
  height = 'h-5',
  width = 'w-5'
}) {
  const foregroundColor = getColorFromClassName(foregroundClassName);

  function render() {
    return (
      <div
        className={['donut', height, width].join(' ')} // TODO classnames
        style={{
          borderLeftColor: foregroundColor
        }}
      />
    );
  }

  return render();
};
