import BaseForm from 'forms/BaseForm';

import { fields } from './index';

class SpecializationsForm extends BaseForm {
  setup() {
    return fields;
  }
}

export default SpecializationsForm;
