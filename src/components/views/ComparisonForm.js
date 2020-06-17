import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  Button,
  IconButton,
  Pane,
  Paneset,
  PaneFooter,
  PaneMenu,
  MessageBanner,
} from '@folio/stripes/components';

import css from './ComparisonForm.css';

class ComparisonForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onDownloadFile: PropTypes.func.isRequired,
      onUploadFile: PropTypes.func.isRequired,
    }),
    localKB: PropTypes.shape({
      trustedSourceTI: PropTypes.bool,
    }),
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
  }

  renderPaneFooter() {
    const { handlers, handleSubmit, pristine, submitting } = this.props;
    const startButton = (
      <Button
        buttonStyle="default mega"
        id="clickable-cancel"
        marginBottom0
        onClick={handlers.onClose}
      >
        <FormattedMessage id="stripes-components.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        buttonStyle="primary mega"
        data-test-save-button
        disabled={pristine || submitting}
        marginBottom0
        onClick={handleSubmit}
        type="submit"
      >
        <FormattedMessage id="stripes-components.saveAndClose" />
      </Button>
    );

    return (
      <PaneFooter
        renderEnd={endButton}
        renderStart={startButton}
      />
    );
  }

  renderFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-erm-comparison.comparison.close">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-comparison-form-button"
              onClick={this.props.handlers.onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  render() {
    return (
      <Paneset>
        <FormattedMessage id="ui-erm-comparison.create">
          {create => (
            <Pane
              appIcon={<AppIcon app="local-kb-admin" />}
              defaultWidth="100%"
              firstMenu={this.renderFirstMenu()}
              footer={this.renderPaneFooter()}
              id="pane-comparison-form"
              paneTitle={<FormattedMessage id="ui-erm-comparison.comparison.newComparison" />}
            >
              <TitleManager record={create}>
                <form>
                  <div className={css.comparisonForm}>
                    <MessageBanner>
                      <FormattedMessage id="ui-erm-comparison.comparison.info" />
                    </MessageBanner>
                    <Field
                      name="comparisonResource1"
                      render={() => {
                        return (
                          <Button
                            bottomMargin0
                            onClick={() => window.alert('Select a package/agreement')}
                          >
                            <FormattedMessage id="ui-erm-comparison.newComparison.selectPackageOrAgreement" />
                          </Button>
                        );
                      }}
                    />
                    <Field
                      name="comparisonResource2"
                      render={() => {
                        return (
                          <Button
                            bottomMargin0
                            onClick={() => window.alert('Select a package/agreement')}
                          >
                            <FormattedMessage id="ui-erm-comparison.newComparison.selectPackageOrAgreement" />
                          </Button>
                        );
                      }}
                    />
                  </div>
                </form>
              </TitleManager>
            </Pane>
          )}
        </FormattedMessage>
      </Paneset>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  keepDirtyOnReinitialize: true,
})(ComparisonForm);
