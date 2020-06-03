import fixtures from './filterParamsMapper.fixture';
import { filterParamsMapper } from './filterParamsMapper';

test('Should return filters', () => {

  const params = filterParamsMapper(fixtures);
  const actualParams = {
    chars: 'a',
    specialization_ids: ['1', '3']
  };

  expect(actualParams).toStrictEqual(params);
});