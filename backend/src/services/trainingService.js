// Stub training service for future ML integration.
// Currently this just lists available stored machines and can be extended for model training.

const fs = require("fs");
const env = require("../config/env");

function listAvailableMachines(store) {
  const machines = new Set();
  (store?.metrics || []).forEach((m) => machines.add(m.machineId));
  return Array.from(machines);
}

module.exports = { listAvailableMachines };
