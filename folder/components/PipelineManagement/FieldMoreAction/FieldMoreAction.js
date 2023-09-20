import React, { useMemo } from 'react';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classes from 'classnames';
import PropTypes from 'prop-types';
import styles from './FieldMoreAction.scss';
import More from '../icons/more';
import RecycleBin from '../icons/recycleBin';
import ArrowUp from '../icons/arrowUp';
import ArrowDown from '../icons/arrowDown';

function FieldMoreAction({
  onRemove,
  field,
  onMove,
  fieldNumber,
  lastFieldNumber,
}) {
  const upHandler = useMemo(() => {
    if (fieldNumber !== 0) {
      return (
        <DropdownItem
          className={styles.moreActionTextWrapper}
          onClick={() => onMove(fieldNumber, 'up')}
        >
          <ArrowUp />
          <span className={styles.moreActionText}>حرکت به سمت بالا</span>
        </DropdownItem>
      );
    }
    return null;
  }, [fieldNumber]);
  const downHandler = useMemo(() => {
    if (fieldNumber !== lastFieldNumber) {
      return (
        <DropdownItem
          className={styles.moreActionTextWrapper}
          onClick={() => onMove(fieldNumber, 'down')}
        >
          <ArrowDown />
          <span className={styles.moreActionText}>حرکت به سمت پایین</span>
        </DropdownItem>
      );
    }
    return null;
  }, [fieldNumber, lastFieldNumber]);
  return (
    <div className={styles.moreActionContainer}>
      <DropdownMenu
        triggerButtonProps={{ iconBefore: <More /> }}
        triggerType="button"
      >
        <DropdownItemGroup>
          {upHandler}
          {downHandler}
          <DropdownItem
            className={classes(
              styles.moreActionTextWrapper,
              styles.removeAction,
            )}
            onClick={() => onRemove(field.id)}
          >
            <RecycleBin />
            <span className={styles.moreActionText}>حذف فیلد</span>
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </div>
  );
}

FieldMoreAction.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  field: PropTypes.any.isRequired,
  fieldNumber: PropTypes.number.isRequired,
  lastFieldNumber: PropTypes.number.isRequired,
};

export default withStyles(styles)(FieldMoreAction);
