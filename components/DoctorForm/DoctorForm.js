import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';
import { computed } from 'mobx';

import {
  Form,
  Input,
  MaskedInput,
  Button,
  AvatarFileUploader,
  OrganizationFilter,
  DatePicker,
  Switch
} from 'components/forms';
import { FieldSet, FormRow, FormRowCell, Field } from 'components/ui';
import Educations from '../Educations';
import Specializations from '../Specializations';
import { Stub } from '.';

const AddDoctorButton = styled(Button)`
  border-radius: 4px;
  margin-right: 43px;
`;

const CancelButton = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #747d8a;

  &:hover {
    color: ${lighten(0.1, '#747d8a')}
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 50px;
  height: 99px;
  background-color: #eff1f4;
`;

const FormContainer = styled.div`
  flex-grow: 1;
  padding: 38px 50px;
  background-color: #FFFFFF;
  max-height: calc(100vh - 99px);
  overflow: auto;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const ErrorField = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  padding-top: 1px;
  color: #E95E5E;
  font-size: 12px;
  line-height: 1;
`;

const Wrapper = styled(Form)`
  ${FormContainer} {
    width: 442px;
  }
`;

@inject('doctorForm', 'doctorsState')
@observer
class DoctorForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    doctorsState: PropTypes.object.isRequired,
    doctorForm: PropTypes.object.isRequired,
    isFetching: PropTypes.bool,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    isFetching: false
  };

  @computed get listUrl() {
    const { doctorsState } = this.props;
    let { currentPage } = doctorsState;

    if (!currentPage) currentPage = 1;

    return `/doctors?page=${currentPage}`;
  }

  render() {
    const { doctorForm, isFetching, t, ...rest } = this.props;

    return (
      <Wrapper
        {...rest}
        form={doctorForm}
      >
        <FormWrapper>
          <FormContainer>
            {isFetching
              ? <Stub />
              : (
                <>
                  <FieldSet>
                    <FormRow>
                      <FieldSet.Legend>
                        {t('DoctorForm.MainFieldSet')}
                      </FieldSet.Legend>

                      <Switch
                        reverse
                        field={doctorForm.$('visible')}
                        label='Доступен'
                      />
                    </FormRow>

                    <FormRow>
                      <AvatarFileUploader
                        field={doctorForm.$('avatar')}
                        url={doctorForm.$('avatar.image_urls.thumb').value}
                      />
                    </FormRow>

                    <FormRow>
                      <Field
                        field={doctorForm.$('last_name')}
                        component={Input}
                      />
                    </FormRow>

                    <FormRow>
                      <FormRowCell cols={7}>
                        <Field
                          field={doctorForm.$('first_name')}
                          component={Input}
                        />
                      </FormRowCell>

                      <FormRowCell cols={5}>
                        <Field
                          field={doctorForm.$('middle_name')}
                          component={Input}
                        />
                      </FormRowCell>
                    </FormRow>

                    <FormRow>
                      <Field
                        field={doctorForm.$('birth_date')}
                        component={DatePicker}
                      />
                    </FormRow>
                  </FieldSet>

                  <FieldSet>
                    <FormRow>
                      <FieldSet.Legend>
                        {t('DoctorForm.DoctorFieldSet')}
                      </FieldSet.Legend>
                    </FormRow>

                    <Specializations
                      field={doctorForm.$('specializations')}
                    />

                    <FormRow>
                      <Field
                        field={doctorForm.$('organization')}
                        component={OrganizationFilter}
                      />

                      {doctorForm.$('organization.title').error && (
                        <ErrorField>
                          {t('Form.Organization.Error')}
                        </ErrorField>
                      )}
                    </FormRow>

                    <Educations form={doctorForm} />
                  </FieldSet>

                  <FieldSet>
                    <FormRow>
                      <FieldSet.Legend>
                        {t('DoctorForm.ContactsFieldSet')}
                      </FieldSet.Legend>
                    </FormRow>

                    <FormRow>
                      <Field
                        field={doctorForm.$('email')}
                        component={Input}
                      />
                    </FormRow>

                    <FormRow>
                      <Field
                        field={doctorForm.$('phone')}
                        component={MaskedInput}
                      />
                    </FormRow>
                  </FieldSet>
                </>
              )}
          </FormContainer>

          <ControlsWrapper>
            <AddDoctorButton
              disabled={isFetching}
              variant='primary'
              type='submit'
            >
              {t('UI.Save')}
            </AddDoctorButton>

            <CancelButton to={this.listUrl}>
              {t('UI.Cancel')}
            </CancelButton>
          </ControlsWrapper>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default styled(withTranslation()(DoctorForm))``;
