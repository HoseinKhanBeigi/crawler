import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ButtonWrapper } from '../../widgets';
import styles from './SmartFormCreator.scss';
import { createPipelineFormField } from '../../../../service/pipelineManagementService';
import Modal from '../../Modal/Modal';
import SmartFormPreviewer from '../SmartFormPreviewer/SmartFormPreviewer';
import FieldElementGenerator from './FieldElementGenerator/FieldElementGenerator';

function SmartFormCreator({
  formParentId,
  loading,
  onSubmit,
  onCancel,
  canEditTitle,
  initialForm,
  fieldTypes,
  pipeId,
}) {
  const [showFieldsDetailModal, setShowFieldsDetailModal] = useState(false);
  const [fields, setFields] = useState(initialForm?.fields || []);
  useEffect(() => {
    setFields(initialForm?.fields || []);
  }, [initialForm, formParentId]);
  const [fieldType, setFieldType] = useState();

  function generateFieldElement(selectedElementId) {
    const newField = fieldTypes?.find(
      element => element.id === selectedElementId,
    );
    setFieldType(newField);
    setShowFieldsDetailModal(true);
  }

  async function onDragEnd(result) {
    const item = result.draggableId;
    const source = result.source?.droppableId;
    const destination = result.destination?.droppableId;
    if (result.reason === 'DROP' && source !== destination) {
      generateFieldElement(item);
    }
  }

  function generateNewFields(properties, newField) {
    const newFields = fields;
    newFields?.push(newField);
    setFields(newFields);
  }

  async function submitField(properties) {
    const newField = {
      name: null,
      fieldType: fieldType?.id,
      required: false,
      editableOnOtherPhase: true,
      syncCardFieldWithThisField: true,
      properties,
    };
    const response = await createPipelineFormField(newField);
    if (response) {
      generateNewFields(properties, response);
      setShowFieldsDetailModal(false);
    }
  }

  function removeField(selectedField) {
    setFields(fields.filter(field => field.id !== selectedField));
  }

  function replaceField(index, direction) {
    const newSortedField = fields;
    const replacedField = newSortedField.splice(index, 1)[0];
    if (direction === 'up') {
      newSortedField.splice(index - 1, 0, replacedField);
    } else if (direction === 'down') {
      newSortedField.splice(index + 1, 0, replacedField);
    }
    setFields([...newSortedField]);
  }

  const renderedFieldTypes = useMemo(
    () =>
      fieldTypes?.map(field => (
        <Draggable key={field.id} draggableId={field.id}>
          {draggableProvided => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
              onClick={() => generateFieldElement(field.id)}
              className={styles.fieldType}
              role="presentation"
            >
              <span>{field.title}</span>
            </div>
          )}
        </Draggable>
      )),
    [fieldTypes],
  );

  return (
    <>
      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.content}>
            <Droppable droppableId="1">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.fieldTypesContainer}
                >
                  <div className={styles.header}>
                    <span className={styles.title}>انواع فیلدها</span>
                    <span className={styles.desc}>
                      برای ساخت فرم مورد نظر خود، بر روی فیلدهای زیر کلیک کنید
                      یا آن‌ها را بکشید و در صفحه رها کنید.
                    </span>
                  </div>
                  {renderedFieldTypes}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="2">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={styles.formContainer}
                >
                  <SmartFormPreviewer
                    pipeId={pipeId}
                    title={initialForm?.title || 'اسم اصلی فرم'}
                    id={initialForm?.id}
                    fields={fields}
                    moveField={replaceField}
                    removeField={removeField}
                    canEditTitle={canEditTitle}
                    readOnly
                  />
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
        <div className={styles.actionsContainer}>
          <ButtonWrapper
            appearance="subtle"
            onClick={onCancel}
            className={styles.cancel}
          >
            لغو
          </ButtonWrapper>
          <ButtonWrapper
            appearance="primary"
            onClick={() => onSubmit(fields)}
            className={styles.submit}
            loading={loading}
          >
            ذخیره
          </ButtonWrapper>
        </div>
      </div>
      <Modal
        show={showFieldsDetailModal}
        handleClose={() => setShowFieldsDetailModal(false)}
      >
        <FieldElementGenerator
          fieldType={fieldType}
          submitFields={submitField}
          key={showFieldsDetailModal ? 0 : 1}
          loading={loading}
        />
      </Modal>
    </>
  );
}

SmartFormCreator.propTypes = {
  formParentId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  canEditTitle: PropTypes.bool.isRequired,
  initialForm: PropTypes.object.isRequired,
  fieldTypes: PropTypes.array.isRequired,
  pipeId: PropTypes.string.isRequired,
};

const stateMap = (store, { formParentId }) => ({
  initialForm: store.pipelineForm.data[formParentId],
  fieldTypes: store.pipelineFieldType.data,
});

export default connect(stateMap, null)(withStyles(styles)(SmartFormCreator));
