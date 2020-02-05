import React from 'react';
import { DonutSpinnerLoader } from '../components/Loaders';
import { useLogoutPageState } from '../hooks/state/useLogoutPageState';

export const LogoutPage = () => {
  const { hasError, renderAlertsContainer } = useLogoutPageState();

  function render() {
    return (
      <div className="p-2">
        {hasError ? (
          <div className="h-40">{renderAlertsContainer()}</div>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <DonutSpinnerLoader />
            <div className="pl-2">Logging out...</div>
          </div>
        )}
      </div>
    );
  }
  return render();
};
