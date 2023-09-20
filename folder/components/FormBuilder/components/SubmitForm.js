import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Divider, Row } from 'antd';

const SubmitForm = props => {
  const {
    onCancel,
    cancelLabel,
    submitLabel,
    loading,
    disabled,
    okType,
  } = props;
  return (
    <Row gutter={[8, 8]} type="flex" justify="end">
      <Divider className="form_builder_divider" />
      {onCancel && (
        <Col>
          <Button onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
        </Col>
      )}
      <Col>
        <Button
          disabled={disabled}
          loading={loading}
          type={okType}
          htmlType="submit"
        >
          {submitLabel}
        </Button>
      </Col>
    </Row>
  );
};

SubmitForm.propTypes = {
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  okType: PropTypes.string,
};

SubmitForm.defaultProps = {
  onCancel: null,
  okType: 'primary',
};

export default SubmitForm;
