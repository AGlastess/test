function doctorMapper(doctor) {
  const {
    id,
    first_name,
    last_name,
    middle_name,
    specializations,
    organization,
    experience
  } = doctor;

  return {
    id,
    first_name,
    last_name,
    middle_name,
    specializations,
    organization,
    experience
  };
}

export default function doctorsMapper(doctors) {
  return doctors.map(doctor => doctorMapper(doctor));
}