var roleBuilder = require('role.builder');

module.exports = {
  run: function(creep) {
    if (creep.spawning === false) {
      if (creep.memory.working === true) {
        if (creep.carry.energy === 0) {
          creep.memory.working = false;
        }
        var target = undefined;
        for (let percentage = 0.1; percentage <= 1; percentage = percentage + 0.1) {
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_WALL &&
              s.hits / s.hitsMax < percentage
          });
          if (target) {
            break;
          }
        }
        if (target) {
          if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        } else {
          roleBuilder.run(creep);
        }
      } else {
        if (creep.carry.energy === creep.carryCapacity) {
          creep.memory.working = true;
        }
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {
          filter: (s) => s.energy > 0
        });
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    }
  }
};
