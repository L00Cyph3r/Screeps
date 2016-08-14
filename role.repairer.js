var roleBuilder = require('role.builder');

module.exports = {
  run: function(creep) {
    if (creep.memory.working === true) {
      if (creep.carry.energy === 0) {
        creep.memory.working = false;
      } else {
        var structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
        if (structures.length > 0) {
          if (creep.repair(structures[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structures[0]);
          }
        } else {
          roleBuilder.run(creep);
        }
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
