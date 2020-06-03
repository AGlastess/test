import { observable, action } from "mobx";

import { DoctorsStore, DoctorStore } from 'stores/DoctorsStore';
import { doctorsMapper, filterParamsMapper } from './utils';

class DoctorsState {

  constructor() {
    this.initStore();
  }

  //initialization
  @observable doctorsStore;
  @observable doctorStore;
  @observable.ref params = {};

  @action
  initStore = () => {
    this.doctorsStore = DoctorsStore.create();
    this.doctorStore = DoctorStore.create();
  };

  dispose = () => {
    this.clearParams();
    this.clearDoctors();
  };

  //total
  @observable totalLength = 0;

  @action
  setTotalLength = (length) => {
    this.totalLength = length;
  };

  //doctors
  @observable doctors = [];

  @action
  setDoctors = (doctors) => {
    this.doctors = doctorsMapper(doctors);
  };

  @action
  clearDoctors = () => {
    this.doctors = [];
  };

  @action
  setParams = (params) => {
    this.params = { ...this.params, ...params };
  };

  @action
  clearParams = () => {
    this.params = {};
  };

  async fetch(page = 1) {
    this.setCurrentPage(page);
    this.setState('pending');
    const doctors = await this.doctorsStore.fetch({ ...this.params });
    this.setTotalLength(doctors.total);
    this.setDoctors(doctors.data.toJSON());
    this.setState('done');
  }

  add(values) {
    return this.doctorsStore.add(values);
  }

  update({ id, values }) {
    return this.doctorStore.update(id, values);
  }

  //state
  @observable state = 'done';

  @action
  setState = (state) => {
    this.state = state;
  };

  //pagination
  @observable currentPage = 1;

  @action
  setCurrentPage = (page) => {
    const paginate = {
      page: page,
      limit: 10
    };

    this.setParams({paginate});

    this.currentPage = page;
  };

  @action
  filterParams = (filters) => {
    const params = filterParamsMapper(filters);

    this.setParams(params);
  }

}

export default DoctorsState;