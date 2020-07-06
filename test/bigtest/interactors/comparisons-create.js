import {
  clickable,
  collection,
  count,
  fillable,
  interactor,
  isPresent,
  is,
  text
} from '@bigtest/interactor';

@interactor class Button {
  isDisabled = is('[disabled]');
  click = clickable();

  whenEnabled() {
    return this.when(() => !this.isDisabled);
  }
}

@interactor class AgreementInteractor {
  isLinkAgreementButtonPresent = isPresent('[data-test-ic-link-agreement]');
  linkAgreementButton = new Button('[data-test-ic-link-agreement]');
  isEmptyAgreementCardPresent = isPresent('[data-test-agreement-empty]');
  isAgreementCardPresent = isPresent('[data-test-agreement-card]');
  isAgreementStartDatePresent = isPresent('[data-test-agreement-start-date]');
  isAgreementEndDatePresent = isPresent('[data-test-agreement-end-date]');
  isAgreementStatusPresent = isPresent('[data-test-agreement-status]');
  isAgreementReasonForClosurePresent = isPresent('[data-test-agreement-reason-for-closure]');
}

@interactor class AgreementsListInteractor {
  size = count('#data-test-comparison-point-agreement');
  items = collection('#data-test-comparison-point-agreement', AgreementInteractor);
}

@interactor class PackageInteractor {
  isLinkPackageButtonPresent = isPresent('[data-test-ic-link-package]')
  linkPackageButton = new Button('[data-test-ic-link-package]')
  isEmptyPackageCardPresent = isPresent('[data-test-package-empty]')
  isPackageCardPresent = isPresent('[data-test-package-card]')
  isPackageCountPresent = isPresent('[data-test-package-count]')
  isPackageProviderPresent = isPresent('[data-test-package-count]')
}

@interactor class PackagesListInteractor {
  size = count('#data-test-comparison-point-package');
  items = collection('#data-test-comparison-point-package', PackageInteractor);
}

export default @interactor class ComparisonsCreate {
  isComparisonNameFieldPresent = isPresent('[data-test-field-comparison-name]');
  fillComparisonName = fillable('[data-test-field-comparison-name]');

  isAddAgreementButtonPresent = isPresent('#data-test-add-agreement-button');
  addAgreementButton = clickable('#data-test-add-agreement-button');
  agreementsList = new AgreementsListInteractor();

  isAddPackageButtonPresent = isPresent('#data-test-add-package-button');
  addPackageButton = clickable('#data-test-add-package-button');
  packagesList = new PackagesListInteractor();


  saveButton = new Button('[data-test-save-button]');
  closeButton = clickable('#close-comparison-form-button');
  confirmCloseButton = clickable('[data-test-confirmation-modal-cancel-button]');
  isComparisonPane = isPresent('[data-test-ermcomparisons]');
  errorText = text('[data-test-error-msg]');
}
