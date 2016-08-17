var roleBuilder = require('role.builder');

module.exports = {
  run: function(creep) {
    if (creep.spawning === false) {
      var numEnergySources = 2;
      if (creep.memory.sourcenum == undefined || creep.memory.sourcenum > 1) {
        // var numEnergySources = creep.room.lookForAtArea(LOOK_SOURCES, 0, 0, 49, 49, true).length;
        creep.memory.sourcenum = Math.floor(Math.random() * (numEnergySources + 1));
      }
      if (creep.memory.working === true) {
        if (creep.carry.energy === 0) {
          creep.memory.working = false;
        }
        var target = undefined;
        // This creates 11 possible percentages.
        for (let percentage = 0.0001; percentage <= 1; percentage = percentage * 2.782559402206) {
          let minHitsWalls = (300 * 1000 * 1000) * percentage;
          let minHitsRamparts = (300 * 1000 * 1000) * percentage;
          target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => {
              return (s.structureType === STRUCTURE_RAMPART && s.hits < minHitsRamparts && s.hits < s.hitsMax) ||
                (s.structureType === STRUCTURE_WALL && s.hits < minHitsWalls && s.hits < s.hitsMax);
            }
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
