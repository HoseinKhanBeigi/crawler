import React from 'react';
import PropTypes from 'prop-types';
import RenderDetail from '../RenderDetail/RenderDetail';
import Link from '../Link';

const unitTypeNames = {
  BRANCH: 'شعبه',
  REPRESENTATIVE: 'نمایندگی',
};

const localizedOperationTypeNames = {
  OPERATIONAL: 'عملیاتی',
  NON_OPERATIONAL: 'غیر عملیاتی',
};

export const localizeOperationTypeName = val =>
  localizedOperationTypeNames[val];

const ShowUnitInformation = ({ data, unitType }) => (
  <RenderDetail maxWidth={100}>
    <RenderDetail.Row
      title={`نام ${unitTypeNames[unitType]}`}
      data={data?.name}
    />
    <RenderDetail.Row
      title={`کد ${unitTypeNames[unitType]}`}
      data={data?.code}
    />
    {unitType === 'BRANCH' && (
      <RenderDetail.Row
        title="نوع شعبه"
        data={localizeOperationTypeName(data?.operationType)}
      />
    )}
    <RenderDetail.Row title="شهر" data={data?.contactDTO?.cityName} />
    <RenderDetail.Row title="شماره تماس" data={data?.contactDTO?.tel} />
    <RenderDetail.Row title="کد پستی" data={data?.contactDTO?.postalCode} />
    <RenderDetail.Row title="آدرس" data={data?.contactDTO?.address} />
    <RenderDetail.Row
      type="node"
      title="مسئول"
      data={
        <Link target to={`lead/${data?.managerLevantId}`}>
          {data?.managerFullName}
        </Link>
      }
    />
    <RenderDetail.Row
      type="tag"
      title="محصول"
      data={(data?.productsDTO || []).map(product => product?.title)}
    />
  </RenderDetail>
);

ShowUnitInformation.propTypes = {
  data: PropTypes.object.isRequired,
  unitType: PropTypes.oneOf(['BRANCH', 'REPRESENTATIVE']).isRequired,
};

export default ShowUnitInformation;
