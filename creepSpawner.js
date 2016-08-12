module.exports = {
  /**
  * @param {string} type Type of creep.
  */
  run: function(type, spawn) {

    if (type === "harvester") {
      if (spawn.energy >= 200) {
        var newName = spawn.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
          working: false,
          role: 'harvester'
        });
        console.log("Spawned new harvester creep: " + newName);
      } else {
        console.log("Cannot create creep, not enough energy in spawn: " + spawn.name + " (current: " + spawn.energy + ")");
      }
    } else if (type === "upgrader") {
      if (spawn.energy >= 200) {
        var newName = spawn.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
          working: false,
          role: 'upgrader'
        });
        console.log("Spawned new upgrader creep: " + newName);
      } else {
        console.log("Cannot create creep, not enough energy in spawn: " + spawn.name + " (current: " + spawn.energy + ")");
      }
    } else if (type === "builder") {
      if (spawn.energy >= 200) {
        var newName = spawn.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], undefined, {
          working: false,
          role: 'builder'
        });
        console.log("Spawned new builder creep: " + newName);
      } else {
        console.log("Cannot create creep, not enough energy in spawn: " + spawn.name + " (current: " + spawn.energy + ")");
      }
    }
  }
}
