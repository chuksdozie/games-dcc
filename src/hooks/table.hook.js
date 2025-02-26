import { calculateLeagueTable, scorelines } from "@/utils";

export const useSortMatchTable = (filter) => {
  const output = calculateLeagueTable(scorelines, filter);
  return output;
};
