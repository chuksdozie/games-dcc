export const addMatchDay = (matchArray, matchDay) => {
  const newMatchArray = matchArray.map((match) => {
    return {
      ...match,
      matchDay,
    };
  });
  return newMatchArray;
};
