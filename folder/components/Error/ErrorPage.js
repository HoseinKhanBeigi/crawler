import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Result, Tooltip } from 'antd';

const ErrorPage = props => {
  const { error } = props;
  const [loading, setLoading] = useState(false);

  const reload = () => {
    setLoading(true);
    window.location.reload();
  };

  return (
    <main
      style={{
        backgroundColor: 'rgb(234, 240, 242)',
        height: '100%',
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Result
        status="500"
        title={<Tooltip title={error?.error?.message}>Oops</Tooltip>}
        subTitle="متاسفیم، خطای غیر منتظره‌ای رخ داده است..."
        extra={
          <Button loading={loading} type="primary" onClick={reload}>
            بارگزاری مجدد
          </Button>
        }
      />
    </main>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorPage;
