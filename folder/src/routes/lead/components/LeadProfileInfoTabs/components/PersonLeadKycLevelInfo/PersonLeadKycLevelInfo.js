import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RenderDetail from '../../../../../../components/RenderDetail/RenderDetail';
import s from './PersonLeadKycLevelInfo.scss';
import CPEmpty from '../../../../../../components/CP/CPEmpty';

const { Row } = RenderDetail;

const PersonLeadKycLevelInfo = ({ kycLevels }) => (
  <div className={s.kycLevel}>
    {kycLevels?.length ? (
      kycLevels.map(data => (
        <div>
          <RenderDetail maxWidth={100}>
            <Row data={data?.name} title="نام سطح" />
            <Row data={data?.description} title="توضیحات سطح" />
            <Row
              data={Object.values(data?.kycElementListFull || {})}
              title="المان ها"
              type="tag"
            />
          </RenderDetail>
        </div>
      ))
    ) : (
      <CPEmpty description="لیست سطوح احراز هویت خالیست" />
    )}
  </div>
);

PersonLeadKycLevelInfo.propTypes = {
  kycLevels: PropTypes.array,
};

PersonLeadKycLevelInfo.defaultProps = {
  kycLevels: null,
};

export default withStyles(s)(PersonLeadKycLevelInfo);
