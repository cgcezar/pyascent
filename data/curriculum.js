import m1 from "./module1.js";
import m2 from "./module2.js";
import m3 from "./module3.js";
import m4 from "./module4.js";
import m5 from "./module5.js";
import { module6 as m6, module7 as m7 } from "./module67.js";

export const SUMMIT_M = 2926; // Mount Pulag, Benguet. The route tops out here.

export const MODULES = [m1, m2, m3, m4, m5, m6, m7];

// Points per waypoint: brief 10, two drills 20 each, three quiz questions 10 each,
// challenge 20. Everything sums to 100 so a finished waypoint is a round number.
export const PTS = { brief: 10, drill: 20, quiz: 10, challenge: 20 };

export function waypointMax(wp) {
  return (
    PTS.brief +
    wp.drills.length * PTS.drill +
    wp.quiz.length * PTS.quiz +
    PTS.challenge
  );
}

// Flat list with back-references, built once at load.
export const WAYPOINTS = [];
MODULES.forEach((mod, mi) => {
  mod.index = mi;
  mod.waypoints.forEach((wp, wi) => {
    wp.module = mod;
    wp.moduleIndex = mi;
    wp.indexInModule = wi;
    wp.order = WAYPOINTS.length;
    wp.max = waypointMax(wp);
    wp.needsPandas = wp.needsPandas || mod.needsPandas || false;
    WAYPOINTS.push(wp);
  });
});

export const TOTAL_PTS = WAYPOINTS.reduce((n, wp) => n + wp.max, 0);
export const TOTAL_WAYPOINTS = WAYPOINTS.length;

export function byId(id) {
  return WAYPOINTS.find((wp) => wp.id === id) || null;
}

// Points map onto metres so the gauge lands exactly on the summit at 100%.
export function metres(points) {
  return Math.round((points / TOTAL_PTS) * SUMMIT_M);
}
