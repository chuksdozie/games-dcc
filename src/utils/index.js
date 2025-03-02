import { feb25, jan25, mar25 } from "@/constants/score";
import { addMatchDay } from "./match";

export const scorelines = [
  ...addMatchDay(jan25, 1),
  ...addMatchDay(feb25, 2),
  ...addMatchDay(mar25, 3),
];

export const calculateLeagueTable = (scorelines, filter) => {
  const filteredScorelines =
    filter === 0
      ? scorelines
      : scorelines.filter((item) => item.matchDay === filter);
  const table = {};

  // Initialize or update team stats
  const updateTeamStats = (team, goalsScored, goalsConceded, result) => {
    if (!table[team]) {
      table[team] = {
        points: 0,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        GF: 0,
        GA: 0,
        GD: 0,
        last5: [], // Track the last 5 match outcomes
      };
    }

    table[team].played += 1;
    table[team].GF += goalsScored;
    table[team].GA += goalsConceded;
    table[team].GD = table[team].GF - table[team].GA;

    if (result === "win") {
      table[team].points += 3;
      table[team].wins += 1;
      table[team].last5.push("W");
    } else if (result === "draw") {
      table[team].points += 1;
      table[team].draws += 1;
      table[team].last5.push("D");
    } else if (result === "loss") {
      table[team].losses += 1;
      table[team].last5.push("L");
    }

    // Keep only the last 5 results
    if (table[team].last5.length > 5) {
      table[team].last5.shift();
    }
  };

  // Process each scoreline
  for (const { home, homeGoals, away, awayGoals } of filteredScorelines) {
    if (homeGoals > awayGoals) {
      // Home wins
      updateTeamStats(home, homeGoals, awayGoals, "win");
      updateTeamStats(away, awayGoals, homeGoals, "loss");
    } else if (homeGoals < awayGoals) {
      // Away wins
      updateTeamStats(home, homeGoals, awayGoals, "loss");
      updateTeamStats(away, awayGoals, homeGoals, "win");
    } else {
      // Draw
      updateTeamStats(home, homeGoals, awayGoals, "draw");
      updateTeamStats(away, awayGoals, homeGoals, "draw");
    }
  }

  // Convert table object to array and sort
  const sortedTable = Object.entries(table)
    .map(([team, stats], index) => ({ team, ...stats }))
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.GD - a.GD ||
        b.GF - a.GF ||
        a.team.localeCompare(b.team)
    );

  return sortedTable;
};

// console.log(calculateLeagueTable(scorelines));
