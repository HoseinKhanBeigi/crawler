import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GroupByForm.scss';
import { groupBySchema } from '../../utils/groupBySchema';
import SelectionBox from '../../../../components/SelectionBox/SelectionBox';
import { AsemanPanelContext } from '../../store';
import { groupByAction } from '../../store/actions';

const GroupByForm = ({ groupByFields, id }) => {
  const {
    state: { groupBy },
    dispatch,
  } = useContext(AsemanPanelContext);
  const selectionBoxChangeHandler = name => value => {
    dispatch(groupByAction(name, value));
  };
  return (
    <div className={s.groupByContainer}>
      {groupBySchema({ fields: groupByFields }).map(
        ({ options, title, name }) => (
          <SelectionBox
            options={options}
            title={title}
            id={`${id}_${name}`}
            value={groupBy[name]}
            onChange={selectionBoxChangeHandler(name)}
          />
        ),
      )}
    </div>
  );
};

GroupByForm.propTypes = {
  groupByFields: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(s)(GroupByForm);
