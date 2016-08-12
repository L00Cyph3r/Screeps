module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    if (creep.spawning === false) {
      // if creep is bringing energy to the controller but has no energy left
      if (creep.memory.working === true) {
        if (creep.carry.energy === 0) {
          creep.memory.working = false;
        }
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          // if not in range, move towards the controller
          creep.moveTo(creep.room.controller);
        }
      } else {
        if (creep.carry.energy === creep.carryCapacity) {
          creep.memory.working = true;
        }
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          // move towards the source
          creep.moveTo(source);
        }
      }
    }
  }
};
