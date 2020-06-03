import React from "react";
import {withTranslation} from "react-i18next";
import {computed} from "mobx";
import {inject, observer, PropTypes} from "mobx-react";
import styled from "styled-components";

import {doctorStorePropType} from "types/react-prop-types";

import {Avatar, Billet, Billets} from "components/ui";
import {Button} from "components/forms";

const DoctorProfileS = styled.div``;

const DoctorProfileHeaderS = styled.div`
  padding: 0 0 1.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const DoctorProfileContentS = styled.div`
  padding: 1rem 0;
`;

const DoctorProfileFooterS = styled.div`
  padding: 2rem 0 0 0;
`;

const DoctorProfilePersonalS = styled.div`
  display: flex;
  align-items: center;
`;

const DoctorProfilePersonalPhotoS = styled.div``;

const DoctorProfilePersonalNameS = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  font-size: 2rem;
  line-height: 1.5em;
`;

const DoctorProfileDetailsS = styled.div``;

const DoctorProfileDetailsItemS = styled.div`
  padding: 1rem 0;
`;

@inject("doctorStore")
@observer
class Details extends React.Component {
  static propTypes = {
    doctorStore: doctorStorePropType,
    t: PropTypes.func
  };

  @computed get doctor() {
    const { doctorStore } = this.props;
    return doctorStore.data.toJSON();
  }

  @computed get fullName() {
    const { first_name, last_name, middle_name } = this.doctor;
    return `${last_name} ${first_name} ${middle_name}`;
  }

  render() {
    const { t } = this.props;
    const {
      avatar,
      email,
      phone,
      specializations
    } = this.doctor;

    return (
      <Billets>
        <Billet>
          <DoctorProfileS>
            <DoctorProfileHeaderS>
              <DoctorProfilePersonalS>
                <DoctorProfilePersonalPhotoS>
                  {avatar && <Avatar size={48} url={avatar.image_urls.thumb} />}
                </DoctorProfilePersonalPhotoS>
                <DoctorProfilePersonalNameS>
                  {this.fullName}
                </DoctorProfilePersonalNameS>
              </DoctorProfilePersonalS>
            </DoctorProfileHeaderS>
            <DoctorProfileContentS>
              <DoctorProfileDetailsS>
                {specializations && specializations.length > 0 && (
                  <DoctorProfileDetailsItemS>
                    {specializations.map(({ name }) => name).join(", ")}
                  </DoctorProfileDetailsItemS>
                )}
                {phone && (
                  <DoctorProfileDetailsItemS>{phone}</DoctorProfileDetailsItemS>
                )}
                {email && (
                  <DoctorProfileDetailsItemS>{email}</DoctorProfileDetailsItemS>
                )}
              </DoctorProfileDetailsS>
            </DoctorProfileContentS>
            <DoctorProfileFooterS>
              <Button>{t("UI.Edit")}</Button>
            </DoctorProfileFooterS>
          </DoctorProfileS>
        </Billet>
        <Billet>{t("Doctor.ScheduleTitle")}</Billet>
        <Billet>{t("Doctor.SertificatesTitle")}</Billet>
      </Billets>
    );
  }
}

export default withTranslation()(Details);
