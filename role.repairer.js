var roleBuilder = require('role.builder');

module.exports = {
  run: function(creep) {
    if (creep.spawning === false) {
      if (creep.memory.sourcenum == undefined) {
        var numEnergySources = creep.room.lookForAtArea(LOOK_ENERGY, 0, 0, 49, 49, true).length;
        creep.memory.sourcenum = Math.floor(Math.random() * (numEnergySources + 1));
      }
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
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType === STRUCTURE_CONTAINER ||
              structure.structureType === STRUCTURE_STORAGE) &&
              structure.store.energy > creep.carryCapacity;
          }
        });
        if (targets.length > 0) {
          var source = targets[0];
          if (creep.withdraw(source, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          }
        } else {
          var source = creep.room.find(FIND_SOURCES)[creep.memory.sourcenum];
          if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          }
        }
      }
    }
  }
};
