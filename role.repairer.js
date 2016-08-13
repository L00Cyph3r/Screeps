var roleUpgrader = require('role.upgrader');

module.exports = {
  run: function(creep) {
    if (creep.memory.working === true) {
      if (creep.carry.energy === 0) {
        creep.memory.working = false;
      } else {
        var structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {});
      }
    } else {
      if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
      }
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
};
