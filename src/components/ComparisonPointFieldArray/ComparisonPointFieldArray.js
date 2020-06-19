import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Tooltip } from '@folio/stripes/components';

import { EditCard } from '@folio/stripes-erm-components';
import ComparisonPointField from './ComparisonPointField';

class ComparisonPointFieldArray extends React.Component {
  state = {
    comparisonPoints: {}
  }

  // Execution of this block only occurs with the find-user plugin existing in UserPicker.
  handleComparisonPointSelected = /* istanbul ignore next */ (index, comparisonPoint, comparisonType) => {
    switch (comparisonType) {
      case 'agreement':
        this.handleUpdateField(index, {
          id: comparisonPoint.id,
          name: comparisonPoint.name,
          startDate: comparisonPoint.startDate,
          endDate: comparisonPoint.endDate
        });
        break;
      case 'package':
        this.handleUpdateField(index, {
          id: comparisonPoint.id,
          name: comparisonPoint.name,
          type: comparisonPoint.type,
          count: comparisonPoint.count,
          provider: comparisonPoint.provider
        });
        break;
      default:
        return;
    }

    this.setState(prevState => ({
      comparisonPoints: {
        ...prevState.comparisonPoints,
        [comparisonPoint.id]: comparisonPoint,
      },
    }));
  }


  // We don't need a full blown withKiwtFieldArray here since these will never be edited, just these small handlers will do
  handleAddField = () => {
    this.props.fields.insert(this.props.fields.length, {});
  }

  handleDeleteField = (index) => {
    this.props.fields.remove(index);
  }

  handleUpdateField = (index, field) => {
    const { fields } = this.props;
    fields.update(index, {
      ...fields.value[index],
      ...field,
    });
  }

  renderComparisonPoints = () => {
    const { comparisonPoint: comparisonType, deleteButtonTooltipId, fields, headerId, name } = this.props;
    return fields?.value?.map((comparisonPoint, index) => (
      <EditCard
        key={index}
        data-test-comparison-point-number={`${comparisonType} ${index}`}
        deleteButtonTooltipText={<FormattedMessage id={deleteButtonTooltipId} values={{ index: index + 1 }} />}
        header={<FormattedMessage id={headerId} values={{ number: index + 1 }} />}
        onDelete={() => this.handleDeleteField(index)}
      >
        <Field
          comparisonPoint={this.state.comparisonPoints[comparisonPoint[comparisonType]] || comparisonPoint}
          component={ComparisonPointField}
          index={index}
          name={`${name}[${index}]`}
          onComparisonPointSelected={selectedComparisonPoint => this.handleComparisonPointSelected(index, selectedComparisonPoint, comparisonType)}
        />
      </EditCard>
    ));
  }

  renderAddNewButton() {
    const {addButtonId, addLabelId, disableAddNew } = this.props;
    return (
      <Button disabled={disableAddNew} id={addButtonId} onClick={() => this.handleAddField()}>
        <FormattedMessage id={addLabelId} />
      </Button>
    );
  }

  render = () => {
    const { id } = this.props;
    return (
      <div>
        <div id={id}>
          {this.renderComparisonPoints()}
        </div>
        {this.renderAddNewButton()}
      </div>
    );
  }
}

export default ComparisonPointFieldArray;