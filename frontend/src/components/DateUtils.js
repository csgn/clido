export const toFinalDate = ({ startDate, endDate }) => {
  const startDateArray = new Date(startDate)
    .toDateString()
    .toString()
    .split(' ');
  const endDateArray = new Date(endDate).toDateString().toString().split(' ');

  const sdd = startDateArray[2];
  const edd = endDateArray[2];

  const smm = startDateArray[1];
  const emm = endDateArray[1];

  const syy = startDateArray[3];
  const eyy = endDateArray[3];

  let finalDate = [];
  finalDate.push(sdd);

  if (smm === emm) {
    if (sdd !== edd) {
      finalDate.push('-');
      finalDate.push(edd);
    }
    finalDate.push(smm);
  } else {
    finalDate.push(smm);
    finalDate.push('-');
    finalDate.push(edd);
    finalDate.push(emm);
  }

  if (syy === eyy) {
    finalDate.push(syy);
  }

  return finalDate.join(' ').toString();
};
