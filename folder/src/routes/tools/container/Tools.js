import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tools.scss';
import CPSelect from '../../../components/CP/CPSelect';
import toolsList from '../utils/toolsList';
import { isAclSkipped } from '../../../utils/aclActions';

const Tools = props => {
  const { authorities } = props;
  const [selected, setSelected] = useState('iban');
  const [finalList, setFinalList] = useState(new Map([]));

  function initList() {
    const isAuthorize = code => {
      const couldShow = authorities?.find(item => item.code === code);
      return !!couldShow;
    };
    if (!isAclSkipped(authorities))
      setFinalList(
        new Map(
          toolsList
            .filter(t => isAuthorize(t.authority))
            .map(t => [t.value, t]),
        ),
      );
  }

  useEffect(initList, []);

  const selectedTool = finalList.get(selected);

  return (
    <>
      <div className={s.toolsContainer}>
        <div className={s.title}>ابزار ها</div>
        <div className={s.selectContainer}>
          <CPSelect
            defaultValue={selected}
            dataSource={[...finalList.values()]}
            onChange={setSelected}
          />
        </div>
      </div>
      {selectedTool && <selectedTool.component title={selectedTool.text} />}
    </>
  );
};

Tools.propTypes = {
  authorities: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  authorities: state?.acl?.authorities,
});

export default connect(mapStateToProps)(withStyles(s)(Tools));
