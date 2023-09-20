import React from 'react';
import PropTypes from 'prop-types';
import Button, { LoadingButton } from '@atlaskit/button';

function ButtonWrapper({
  appearance,
  onClick,
  className,
  children,
  loading,
  type,
  isDisabled,
}) {
  return (
    <>
      {loading ? (
        <LoadingButton
          appearance={appearance}
          onClick={onClick}
          className={className}
          isLoading={loading}
        >
          {children}
        </LoadingButton>
      ) : (
        <Button
          type={type}
          appearance={appearance}
          onClick={onClick}
          className={className}
          isDisabled={isDisabled}
        >
          {children}
        </Button>
      )}
    </>
  );
}

ButtonWrapper.propTypes = {
  appearance: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
  loading: PropTypes.bool,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

ButtonWrapper.defaultProps = {
  appearance: '',
  onClick: () => {},
  className: '',
  children: <></>,
  loading: false,
  type: 'button',
  isDisabled: false,
};

export default ButtonWrapper;
