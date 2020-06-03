import React from 'react';
import { observer, Provider } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Qs from "qs";
import PropTypes from "prop-types";

import { DefaultLayout as Layout } from 'components/layouts';
import { Navbar, DoctorsPageHeader, FiltersPanel } from 'components/ui';
import { Add, Edit } from '../';
import DoctorsState from './state/DoctorsState';
import Doctors from './Doctors';
import { InitialsFilter } from './Filters/InitialsFilter';
import { SpecializationsFilter } from './Filters/SpecializationsFilter';

@withTranslation()
@observer
class List extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.doctorsState = new DoctorsState();
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const { page } = Qs.parse(search, { ignoreQueryPrefix: true });
    const pageNumber = page ? page : 1;

    this.doctorsState.fetch(pageNumber);
  }

  handleOnSaveFilters = (filters) => {
    this.doctorsState.filterParams(filters);
    this.doctorsState.fetch();
  }

  componentWillUnmount() {
    this.doctorsState.dispose();
  }

  render() {
    const { t } = this.props;

    return (
      <Provider
        doctorsState={this.doctorsState}
      >
        <Layout>
          <Layout.Nav>
            <Navbar />
          </Layout.Nav>

          <Layout.Header>
            <DoctorsPageHeader
              heading={t('Doctors.List.Header.Title')}
              btnText={t('Doctors.List.Header.BtnText')}
              link='/doctors/add'
            />
          </Layout.Header>

          <Layout.Body>
            <FiltersPanel
              items={[
                {
                  type: 'chars',
                  label: t('Doctors.Filters.Initials.Label'),
                  unique: true,
                  component: InitialsFilter,
                },
                {
                  type: 'specialization',
                  label: t('Doctors.Filters.Specializations.Label'),
                  component: SpecializationsFilter
                }
              ]}
              onChange={this.handleOnSaveFilters}
            />
            <Doctors />
          </Layout.Body>

          <Switch>
            <Route
              exact
              path="/doctors/add"
              component={Add}
            />

            <Route
              exact
              path="/doctors/:id/edit"
              component={Edit}
            />
          </Switch>

        </Layout>
      </Provider>
    );
  }
}

export default List;
