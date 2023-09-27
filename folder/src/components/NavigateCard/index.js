import React from 'react';
import PropType from 'prop-types';
import { Button, Col } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';
import history from '../../history';
import HandleAclPermission from '../../components/HandleAclPermission';

const NavigateCard = props => {
  const { title, permission, content, buttonText, linkURL, children } = props;
  const renderCard = () => (
    <Col>
      <div className={s.card}>
        <div>{children}</div>
        <h3 className={s.title}>{title}</h3>
        <p>{content}</p>
        <Button
          size="large"
          onClick={() => {
            history.push(linkURL);
          }}
          className={s.btn}
          block
          type="primary"
        >
          {buttonText}
        </Button>
      </div>
    </Col>
  );
  if (permission) {
    return (
      <HandleAclPermission wich={permission}>
        {renderCard()}
      </HandleAclPermission>
    );
  }
  return renderCard();
};
NavigateCard.propTypes = {
  title: PropType.string,
  content: PropType.string,
  buttonText: PropType.string,
  linkURL: PropType.string,
  permission: PropType.string,
  children: PropType.node,
};
NavigateCard.defaultProps = {
  title: '',
  content: '',
  buttonText: '',
  linkURL: '',
  permission: '',
  children: '',
};
export default withStyles(s)(NavigateCard);
