import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Row, Table, Button } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShowCaseListSection.scss';
import caseManagementService from '../../service/caseManagementsService';
import { columns } from './columns';
import history from '../../history';

const ShowCaseListSection = props => {
  const { id } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    caseManagementService
      .getAllCase(
        `?caseOwnerLevantId=${id}&&page=0&size=5&sort=createdDate,desc`,
      )
      .then(
        response => {
          if (response?.additionalInfo) {
            delete response?.additionalInfo;
          }
          setData(response);
          setLoading(false);
        },
        () => setLoading(false),
      );
  }, [id]);

  const goToCase = () => {
    const to = `/case`;
    history.push(to);
  };

  return (
    <>
      <div className={s.container}>
        <Row
          gutter={24}
          type="flex"
          style={{ justifyContent: 'space-between', padding: '0 15px' }}
        >
          <b>سایر کیس ها ({data?.totalElements})</b>
          <Button type="link" className={s.link_list} onClick={goToCase}>
            نمایش کامل کیس ها
          </Button>
        </Row>
        <Divider />
        <Table
          columns={columns}
          dataSource={data?.content}
          size="small"
          bordered
          loading={loading}
          pagination={false}
        />
      </div>
    </>
  );
};
ShowCaseListSection.propTypes = {
  id: PropTypes.string,
};
ShowCaseListSection.defaultProps = {
  id: null,
};

export default withStyles(s)(ShowCaseListSection);
