import React from 'react';
import { Input } from '../components/Input';
import { DonutSpinnerLoader } from '../components/Loaders';
import { useMeasure } from '../hooks/useMeasure';
import {
  FadeInOut,
  HeightModifier,
  OpacityModifier,
  AnimatePresence,
  motion
} from '../components/Animate';
import { LoadableDiv } from '../components/LoadableDiv';
import { useRegisterPageState } from '../hooks/state/useRegisterPageState';

export const RegisterPage = () => {
  const {
    isLoading,
    usernameProps,
    passwordProps,
    renderAlertsContainer,
    canRegister,
    onClickHandler,
    repeatPasswordProps,
    getRepeatPasswordValidationStatus,
    username,
    usernameIsChecking,
    usernameIsAvailable,
    passwordStrengthCheck
  } = useRegisterPageState();

  const [div1, { height: viewHeight1 }] = useMeasure<HTMLDivElement>();
  const [div2, { height: viewHeight2 }] = useMeasure<HTMLDivElement>();
  const [div3, { height: viewHeight3 }] = useMeasure<HTMLDivElement>();

  function checkUsernameAvailability() {
    let checkingAvailability = false,
      usernameStatusAvailable = false,
      usernameStatusNotAvailable = false,
      containerHeight = 0;

    if (!(username === '')) {
      if (usernameIsChecking) {
        checkingAvailability = true;
        containerHeight = viewHeight1;
      } else {
        if (usernameIsAvailable) {
          usernameStatusAvailable = true;
          containerHeight = viewHeight2;
        } else {
          usernameStatusNotAvailable = true;
          containerHeight = viewHeight3;
        }
      }
    } else {
      containerHeight = 0;
    }

    return (
      <div className="overflow-hidden">
        <HeightModifier height={containerHeight}>
          <div className="relative">
            <div className="absolute inset-0 z-10">
              <OpacityModifier condition={checkingAvailability} duration={250}>
                <div {...div1}>
                  <div className="flex items-center py-1">
                    <div className="inline-flex">
                      <DonutSpinnerLoader />
                    </div>
                    <span className="inline ml-1">checking availability</span>
                  </div>
                </div>
              </OpacityModifier>
            </div>
            <div className="absolute inset-0">
              <OpacityModifier condition={usernameStatusAvailable} duration={1}>
                <div {...div2}>
                  <div className="py-1">
                    <div className="px-2 rounded valid-feedback  bg-green-700 break-all ">
                      {username} is available
                    </div>
                  </div>
                </div>
              </OpacityModifier>
            </div>
            <div className="absolute inset-0">
              <OpacityModifier
                condition={usernameStatusNotAvailable}
                duration={1}
              >
                <div {...div3}>
                  <div className="py-1">
                    <div className="px-2 rounded invalid-feedback  bg-red-700 break-all ">
                      {username} is not available
                    </div>
                  </div>
                </div>
              </OpacityModifier>
            </div>
          </div>
        </HeightModifier>
      </div>
    );
  }

  function checkPasswordStrength() {
    let arr = [];

    if (!passwordStrengthCheck || passwordStrengthCheck.valid) {
      arr = [];
    } else {
      arr = passwordStrengthCheck.msg;
    }

    return (
      <FadeInOut condition={arr.length > 0}>
        <div className="invalid-feedback text-sm bg-red-700 mt-1 px-2 py-1 rounded">
          <ul className="list-disc m-0 mt-1 pl-2 pl-4 ">
            <AnimatePresence>
              {arr.map((m: any) => (
                <motion.li
                  transition={{ duration: 0.5, type: 'tween' }}
                  key={m}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  {m}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </FadeInOut>
    );
  }

  function getRepeatPasswordSection() {
    return (
      <>
        <Input {...repeatPasswordProps} />
        <FadeInOut
          condition={
            getRepeatPasswordValidationStatus().showRepeatPasswordErrorMessage
          }
        >
          <div className="pt-1">
            <div className="px-2 rounded invalid-feedback text-sm bg-red-700 truncate">
              Passwords do not match
            </div>
          </div>
        </FadeInOut>
      </>
    );
  }

  function render() {
    return (
      <div className="px-4 py-12 ">
        <div className="m-auto max-w-sm rounded">
          <LoadableDiv isLoading={isLoading}>
            <form className="px-4 py-2">
              <Input {...usernameProps} />
              {checkUsernameAvailability()}
              <Input {...passwordProps} />
              {checkPasswordStrength()}
              {getRepeatPasswordSection()}
              <div className="pt-2">{renderAlertsContainer()}</div>
              <button
                className="register-button bg-green-700 hover:bg-green-600 my-2 px-2 px-4 py-1 rounded shadow"
                type="submit"
                disabled={!canRegister}
                onClick={onClickHandler}
              >
                Register
              </button>
            </form>
          </LoadableDiv>
        </div>
      </div>
    );
  }

  return render();
};
