import BaseForm from 'forms/BaseForm';

import { fields } from './index';

class InitialsForm extends BaseForm {
  setup() {
    return fields;
  }
}

export default InitialsForm;
