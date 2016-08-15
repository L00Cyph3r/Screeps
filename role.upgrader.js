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
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
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
