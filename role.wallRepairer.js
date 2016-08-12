var roleBuilder = require('role.builder');

module.exports = {
  run: function(creep) {
    // var startCpu = Game.cpu.getUsed();
    if (creep.memory.working === true) {
      if (creep.carry.energy === 0) {
        creep.memory.working = false;
      }
      var walls = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_WALL
      });
      var target = undefined;
      for (let percentage = 0.1; percentage <= 1; percentage = percentage + 0.1) {
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => s.structureType == STRUCTURE_WALL &&
            s.hits / s.hitsMax < percentage
        });

        // if there is one
        if (target != undefined) {
          // break the loop
          break;
        }
      }
      // if we find a wall that has to be repaired
      if (target != undefined) {
        // try to repair it, if not in range
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(target);
        }
      }
      // if we can't fine one
      else {
        // look for construction sites
        roleBuilder.run(creep);
      }
    } else {
      if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
      }
      var source = creep.pos.findClosestByPath(FIND_SOURCES, {
        filter: (s) => s.energy > 0
      });
      // try to harvest energy, if the source is not in range
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        // move towards the source
        creep.moveTo(source);
      }
    }
  // var elapsed = Game.cpu.getUsed() - startCpu;
  // console.log('wallRepairer has used ' + elapsed + ' CPU time');
  }
};
