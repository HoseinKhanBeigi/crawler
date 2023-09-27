import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Card.scss';
import ShortTextIcon from '../icons/shortTextIcon';
import { MODAL_KEY_MAP, ModalWrapperContext } from '../modalWrappers/store';
import { openModal } from '../modalWrappers/store/actions';
import { generateFieldValueByFields } from '../../../utils/pipelineFieldValueGenerator';

function Card({ card, fields, cardTitleField }) {
  const cardId = card.id;
  const { dispatch } = useContext(ModalWrapperContext);

  function fieldToDataRow(field) {
    if (card?.values && field?.id) {
      return {
        title: field.properties?.label,
        fieldId: field?.id,
        value: Object.keys(card?.values).includes(field?.id)
          ? card.values[field?.id]
          : '',
      };
    }
    return {
      title: '',
      value: '',
    };
  }

  const initialFields = useMemo(() => fields?.map(fieldToDataRow), [fields]);

  function openCardDetail() {
    dispatch(openModal(MODAL_KEY_MAP.CARD_DETAIL, { card }));
  }

  const generateStartFormOverview = useMemo(
    () =>
      initialFields
        ?.filter(field => field.value)
        ?.map((field, formIndex) => {
          if (formIndex < 3) {
            return (
              <div key={field.fieldId}>
                <div className={styles.formFieldTitleOverview}>
                  <ShortTextIcon />
                  <span className={styles.formFieldTitleText}>
                    {field.title}
                  </span>
                </div>
                <div className={styles.formFieldValuePreview}>
                  {generateFieldValueByFields(
                    field.value,
                    fields,
                    field.fieldId,
                  )}
                </div>
              </div>
            );
          }
          return <></>;
        }),
    [fields],
  );

  const cardRendered = useMemo(() => {
    let titleIndex = 0;
    if (cardTitleField) {
      titleIndex = initialFields?.findIndex(
        item => item.fieldId === cardTitleField,
      );
    }
    return (
      <div className={styles.cardTitle}>
        {initialFields?.length && initialFields[titleIndex].value
          ? generateFieldValueByFields(
              initialFields[titleIndex].value,
              fields,
              initialFields[titleIndex].fieldId,
            )
          : 'بدون داده'}{' '}
      </div>
    );
  }, [cardTitleField, fields]);
  return (
    <div key={cardId}>
      <Draggable draggableId={cardId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={
                snapshot.isDragging
                  ? styles.draggingCard
                  : styles.cardsContainer
              }
              role="presentation"
              onClick={openCardDetail}
            >
              {cardRendered}
              <div>{generateStartFormOverview}</div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  cardTitleField: PropTypes.number.isRequired,
};

export default withStyles(styles)(Card);
