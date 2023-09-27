import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Accordion.scss';

function Accordion({ items, card, getFieldValue }) {
  const [activeIndexes, setActiveIndexes] = useState({});
  useEffect(() => {
    const activities = {};
    items.forEach(item => {
      activities[item.id] = false;
    });
    setActiveIndexes({ ...activities });
  }, [items]);

  const handleClick = index => {
    const activeIndexClone = { ...activeIndexes };
    activeIndexClone[index] = !activeIndexes[index];
    setActiveIndexes({ ...activeIndexClone });
  };

  function getHistoryItemContext(phaseFields) {
    return phaseFields?.map(field => (
      <div className={styles.historyItemField}>
        <div className={styles.fieldTitle}>{field.properties?.label}</div>
        <div className={styles.fieldContext}>{getFieldValue(field)}</div>
      </div>
    ));
  }

  return (
    <>
      {items.map(
        item =>
          item.fields &&
          item.phase.id !== card.currentPhase && (
            <div key={item.id} className={styles.historyItemField}>
              <div className={styles.historyItemHeader}>
                <div className={styles.historyItemHeaderPhaseName}>
                  <span className={styles.phase}>{item?.phase?.name}</span>
                </div>
              </div>
              {activeIndexes[item.id] && (
                <p className={styles.historyItemContext}>
                  {getHistoryItemContext(item.fields)}
                </p>
              )}
              <button
                className={styles.showHandler}
                onClick={() => handleClick(item.id)}
              >
                {activeIndexes[item.id] ? 'بستن اطلاعات' : 'اطلاعات بیشتر'}
              </button>
            </div>
          ),
      )}
    </>
  );
}

Accordion.propTypes = {
  items: PropTypes.array.isRequired,
  card: PropTypes.object.isRequired,
  getFieldValue: PropTypes.func.isRequired,
};

export default withStyles(styles)(Accordion);
