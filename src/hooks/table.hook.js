import { calculateLeagueTable, scorelines } from "@/utils";

export const useSortMatchTable = () => {
  const resultdddd = calculateLeagueTable(scorelines);
  console.log({ resultdddd });
  return resultdddd;
};
