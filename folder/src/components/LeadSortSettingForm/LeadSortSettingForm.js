import React, { Component } from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Draggable } from 'react-smooth-dnd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LeadSortSettingForm.scss';
import CPButton from '../CP/CPButton';
import withModal from '../HOC/withModal';
import Field from './Field';
import { putFieldsOrderAction } from '../../store/formSetting/formSetting.actions';
import { getLeadFormFieldsAction } from '../../store/lead/lead.actions';
import CPMessage from '../CP/CPMessage';
import { removeTableDataFromLocalStorage } from '../KianTable/helpers/persist';
import { LEADS_TABLE } from '../../store/settings/settings.constants';
import { MODAL_FOR_ADD_COLUMN } from '../ModalRoot/repository';
import HandleAclPermission from '../HandleAclPermission';
import { Actions } from '../../utils/aclActions';

class LeadSortSettingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      actives: props.actives,
      deActives: props.deActives,
    };

    this.generateForm = this.generateForm.bind(this);
  }

  // Sort active fields
  onDropActives = e => {
    this.setState({
      actives: this.applyDrag(this.state.actives, 'actives', e),
    });
  };

  // Sort deActive fields
  onDropDeActives = e => {
    this.setState({
      deActives: this.applyDrag(this.state.deActives, 'deActives', e),
    });
  };

  // Drag and drop data between containers
  applyDrag = (arr, columnName, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      const status = columnName === 'actives' ? 'ACTIVE' : 'DEACTIVE';
      result.splice(addedIndex, 0, { ...itemToAdd, status });
    }
    return result;
  };

  changeField = (action, index, columnName) => {
    let newState;

    if (action === 'delete') {
      newState = this.state[columnName].filter(
        item => index !== item.appearanceOrder,
      );
    }
    if (action === 'add') {
      newState = [...this.state[columnName], index];
    }

    if (action === 'update') {
      newState = this.state[columnName]
        .filter(item => {
          const statusChange =
            index.appearanceOrder !== item.appearanceOrder ||
            (index.appearanceOrder === item.appearanceOrder &&
              index.status === item.status);
          if (!statusChange) {
            const columnStatus =
              index.status === 'ACTIVE' ? 'actives' : 'deActives';
            this.setState({
              [columnStatus]: [...this.state[columnStatus], index],
            });
          }
          return statusChange;
        })
        .map(item => (index.id === item.id ? index : item));
    }
    this.setState({ [columnName]: newState });
  };

  // Generate fields
  generateForm = (list, columnName) =>
    list?.map(item => (
      <Draggable key={item.appearanceOrder}>
        <Field
          index={item.appearanceOrder}
          data={item}
          type={this.props.type}
          columnName={columnName}
          onChange={this.changeField}
        />
      </Draggable>
    ));

  showModal = () => {
    this.props.showModalAction({
      type: MODAL_FOR_ADD_COLUMN,
      props: {
        type: this.props.type,
        editMode: false,
        onChange: this.changeField,
      },
    });
  };

  submitForm = async () => {
    const { actives } = this.state;
    const newData = actives?.map((item, key) => {
      if (item.status === 'DEACTIVE') {
        return {
          ...item,
          status: 'ACTIVE',
          appearanceOrder: key,
        };
      }
      return {
        ...item,
        appearanceOrder: key,
      };
    });

    this.setState({
      actives: newData,
    });

    const result = await this.props.putFieldsOrderAction({
      partyType: this.props.type,
      body: newData,
    });

    if (!result.err) {
      CPMessage('فرم با موفقیت ثبت گردید.', 'success');
      removeTableDataFromLocalStorage(LEADS_TABLE);
    } else {
      CPMessage('ارتباط با سرور قطع می باشد.', 'error');
    }
  };

  // Check main field existence in deactive column
  checkValidation = () => {
    const { deActives } = this.state;
    const filter = deActives?.filter(
      item =>
        item.columnCategory === 'SYSTEM' || item.columnCategory === 'MAIN',
    );

    return !!filter?.length;
  };

  render() {
    return (
      <Row type="flex" gutter={40}>
        <Col span={12}>
          <Row className="margin-b-10" type="flex" align="middle">
            <Col span={24}>
              <Row type="flex" className={s.category}>
                <Col span={12}>
                  <h4>فیلدهای فعال</h4>
                </Col>
                <HandleAclPermission wich={Actions.columnNewLeadField}>
                  <Col span={12} className="text-left">
                    <CPButton
                      onClick={this.showModal}
                      icon="plus"
                      className="default-btn"
                    >
                      ایجاد فیلد جدید
                    </CPButton>
                  </Col>
                </HandleAclPermission>
              </Row>
              <Container
                groupName="1"
                getChildPayload={i => this.state.actives[i]}
                onDrop={e => this.onDropActives(e)}
                nonDragAreaSelector=".nonDragArea"
              >
                {this.generateForm(this.state.actives, 'actives')}
              </Container>
            </Col>
            <HandleAclPermission wich={Actions.columnUpdateLeadFields}>
              <Col span={24} className="text-left">
                <CPButton
                  loading={this.props.loading}
                  disabled={this.checkValidation()}
                  onClick={this.submitForm}
                  className="btn primary-btn margin-t-10"
                >
                  تایید
                </CPButton>
              </Col>
            </HandleAclPermission>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="margin-b-10" type="flex" align="middle">
            <Col span={24} className={s.category}>
              <h4>فیلدهای غیرفعال</h4>
            </Col>
            <Col span={24}>
              <Container
                groupName="1"
                getChildPayload={i => this.state.deActives[i]}
                onDrop={e => this.onDropDeActives(e)}
                nonDragAreaSelector=".nonDragArea"
              >
                {this.generateForm(this.state.deActives, 'deActives')}
              </Container>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

LeadSortSettingForm.propTypes = {
  actives: PropTypes.array,
  deActives: PropTypes.array,
  type: PropTypes.string,
  showModalAction: PropTypes.func.isRequired,
  putFieldsOrderAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LeadSortSettingForm.defaultProps = {
  actives: [],
  deActives: [],
  type: '',
  loading: false,
};

const mapState = state => ({
  loading: state.formSetting.putFieldsOrderLoading,
});

const mapDispatch = {
  putFieldsOrderAction,
  getLeadFormFieldsAction,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(withModal(LeadSortSettingForm)));
export const FieldTest = LeadSortSettingForm;
