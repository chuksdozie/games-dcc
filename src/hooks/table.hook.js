import { calculateLeagueTable, scorelines } from "@/utils";

export const useSortMatchTable = () => {
  const resultdddd = calculateLeagueTable(scorelines);
  console.log({ resultdddd, free: 1 });
  return resultdddd;
};
