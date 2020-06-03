export const filterParamsMapper = (filters) => {
  return filters.reduce((total, current) => {
    switch (current.type) {
      case 'chars':
        return { ...total, chars: current.value };
      case 'specialization':
        return { ...total, specialization_ids: [ ...total.specialization_ids, current.value ] };
      default:
        return total;
    }
  }, {
    chars: '',
    specialization_ids: []
  });
};