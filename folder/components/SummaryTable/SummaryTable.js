import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './SummaryTable.scss';
import CPButton from '../CP/CPButton';
import Link from '../Link';
import KianTable from '../KianTable';
import CPTooltip from '../CP/CPTooltip';
import { kianTableApi } from '../KianTable/helpers/globalApi';

const SummaryTable = ({
  title,
  addAction,
  fullTableLink,
  endPoint,
  tableColumns,
  tableId,
}) => {
  const [totalElement, setTotalElements] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (isMounted) {
      kianTableApi(tableId).refreshTable();
    }
  }, [endPoint]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <div className={s.header}>
        <h3>
          {title}
          {!!totalElement && (
            <span className={s.header__totalElements}>{totalElement}</span>
          )}
        </h3>
        <div style={{ display: 'flex' }}>
          {addAction && (
            <CPTooltip title="ایجاد جدید">
              <CPButton onClick={addAction} icon="plus" type="primary" />
            </CPTooltip>
          )}
          {fullTableLink && (
            <CPTooltip title="مشاهده همه">
              <Link to={fullTableLink} target>
                <span className={s.header__linkButton}>
                  <Icon
                    path={mdiOpenInNew}
                    style={{ width: '16px' }}
                    color="#178ffe"
                  />
                </span>
              </Link>
            </CPTooltip>
          )}
        </div>
      </div>
      <div className={s.tableWrapper}>
        <KianTable
          persistInLocalStorage={false}
          withPagination={false}
          endpoint={endPoint}
          tableId={tableId}
          columns={tableColumns}
          withSearch={false}
          withToolbar={false}
          withSort={false}
          withRowIndex={false}
          setTotalElement={setTotalElements}
        />
      </div>
    </>
  );
};

SummaryTable.defaultProps = {
  addAction: undefined,
  fullTableLink: undefined,
};

SummaryTable.propTypes = {
  title: PropTypes.string.isRequired,
  addAction: PropTypes.func,
  fullTableLink: PropTypes.string,
  endPoint: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableId: PropTypes.string.isRequired,
};
export default withStyle(s)(SummaryTable);
