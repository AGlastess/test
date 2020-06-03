import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ComponentStub from 'components/ui/ComponentStub';

const FieldSet = styled.div``;

const FieldSetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 0px;
`;

const FieldSetContent = styled.div``;

const Label = styled(ComponentStub.Text)``;

const TextInput = styled(ComponentStub.TextInput)``;

const FormRow = styled.div`
  padding: 11px 0;

  ${Label} {
    width: 40%;
    margin-bottom: 9px;
  }

  ${TextInput} + ${TextInput} {
    margin-top: 9px;
  }
`;

const Title = styled(ComponentStub.Title)``;

const StatusSwitcher = styled(ComponentStub.Title)`
  width: 124px;
`;

const PhotoUploaderAvatar = styled(ComponentStub.Avatar)``;

const PhotoUploaderChangeButton = styled(ComponentStub.Button)``;

const PhotoUploaderRemoveButton = styled(ComponentStub.Text)``;

const PhotoUploader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 0px;

  ${PhotoUploaderChangeButton} {
    flex-grow: 1;
    margin-left: 20px;
  }

  ${PhotoUploaderRemoveButton} {
    flex-grow: 0;
    flex-shrink: 0;
    width: 28%;
    margin-left: 20px;
  }
`;

const Wrapper = styled.div`
  ${Title} {
    width: 108px;
  }
`;

class Stub extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { className } = this.props;

    return (
      <Wrapper className={className}>
        <FieldSet>
          <FieldSetHeader>
            <Title />

            <StatusSwitcher />
          </FieldSetHeader>

          <FieldSetContent>
            <PhotoUploader>
              <PhotoUploaderAvatar />

              <PhotoUploaderChangeButton />

              <PhotoUploaderRemoveButton />
            </PhotoUploader>

            <FormRow>
              <Label />

              <TextInput />
            </FormRow>

            <FormRow>
              <Label />

              <TextInput />
            </FormRow>

            <FormRow>
              <Label />

              <TextInput />
            </FormRow>
          </FieldSetContent>
        </FieldSet>

        <FieldSet>
          <FieldSetHeader>
            <Title />
          </FieldSetHeader>

          <FieldSetContent>
            <FormRow>
              <Label />

              <TextInput />
            </FormRow>

            <FormRow>
              <Label />

              <TextInput />
            </FormRow>

            <FormRow>
              <Label />

              <TextInput />

              <TextInput />
            </FormRow>
          </FieldSetContent>
        </FieldSet>

        <FieldSet>
          <FieldSetHeader>
            <Title />
          </FieldSetHeader>

          <FieldSetContent>
            <FormRow>
              <Label />

              <TextInput />
            </FormRow>

            <FormRow>
              <Label />

              <TextInput />
            </FormRow>
          </FieldSetContent>
        </FieldSet>
      </Wrapper>
    );
  }
}

export default styled(Stub)``;
