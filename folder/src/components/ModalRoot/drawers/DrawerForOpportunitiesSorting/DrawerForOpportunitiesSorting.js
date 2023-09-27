import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Col, Divider, Icon, Row, Tooltip } from 'antd';
import { DRAWER_FOR_OPPORTUNITIES_SORTING } from '../../repository';
import { sortingSchema } from './schema';
import { setOpportunitiesSorting } from '../../../../store/opportunities/opportunities.actions';
import sleep from '../../../../utils/sleep';
import KianDrawer from '../../../KianDrawer/KianDrawer';

const DrawerForOpportunitiesSorting = props => {
  const { sorting } = props;
  const [visible, setVisible] = useState(true);

  const handleSorting = (sortField, sortDirection) => () => {
    props.setOpportunitiesSorting({ sortField, sortDirection });
    sleep(350).then(() => setVisible(false));
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const clearSorting = () => {
    props.setOpportunitiesSorting({ sortField: null, sortDirection: null });
    sleep().then(closeDrawer);
  };

  return (
    <KianDrawer
      title="مرتب‌سازی فرصت‌ها"
      drawerId={DRAWER_FOR_OPPORTUNITIES_SORTING}
      visible={visible}
      onClose={closeDrawer}
    >
      {sortingSchema.map(({ sortField, title }) => (
        <Row type="flex" gutter={[8, 8]} key={sortField}>
          <Col span={12}>
            {sorting.sortField === sortField && (
              <Icon
                type="check"
                style={{ color: '#4CAF50', fontSize: 14, marginLeft: 5 }}
              />
            )}
            {title}
          </Col>
          <Col span={12} style={{ textAlign: 'left' }}>
            <Tooltip title="صعودی">
              <Button
                icon="arrow-down"
                type={
                  sortField === sorting.sortField &&
                  sorting.sortDirection === 'ASC'
                    ? 'primary'
                    : 'default'
                }
                shape="circle"
                onClick={handleSorting(sortField, 'ASC')}
              />
            </Tooltip>
            <Tooltip title="نزولی">
              <Button
                icon="arrow-up"
                type={
                  sortField === sorting.sortField &&
                  sorting.sortDirection === 'DESC'
                    ? 'primary'
                    : 'default'
                }
                shape="circle"
                style={{ marginRight: 5 }}
                onClick={handleSorting(sortField, 'DESC')}
              />
            </Tooltip>
          </Col>
          <Divider />
        </Row>
      ))}
      <Row type="flex">
        <Col span={24}>
          <Button
            disabled={!sorting.sortField}
            onClick={clearSorting}
            type="dashed"
            block
          >
            مرتب‌سازی پیشفرض
          </Button>
        </Col>
      </Row>
    </KianDrawer>
  );
};

DrawerForOpportunitiesSorting.propTypes = {
  setOpportunitiesSorting: PropTypes.func.isRequired,
  sorting: PropTypes.object.isRequired,
};

const mapState = state => ({
  sorting: state.opportunities.sorting,
});

const mapDispatch = {
  setOpportunitiesSorting,
};

export default connect(mapState, mapDispatch)(DrawerForOpportunitiesSorting);
