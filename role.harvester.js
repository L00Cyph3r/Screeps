module.exports = {
  run: function(creep) {
    if (creep.spawning === false) {
      if (creep.memory.working === true) {
        if (creep.carry.energy === 0) {
          creep.memory.working = false;
        }
        // First find extenstions to fill
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType === STRUCTURE_EXTENSION) &&
              structure.energy < structure.energyCapacity;
          }
        });
        if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        } else {
          // Than try towers
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType === STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity;
            }
          });
          if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0]);
            }
          } else {
            // Than try towers
            var targets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN) &&
                  structure.energy < structure.energyCapacity;
              }
            });
            if (targets.length > 0) {
              if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
              }
            } else {
              // Than try towers
              var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                  return (structure.structureType === STRUCTURE_CONTAINER ||
                    structure.structureType === STRUCTURE_STORAGE) &&
                    structure.energy < structure.energyCapacity;
                }
              });
              if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                  creep.moveTo(targets[0]);
                }
              } else {

              }
            }
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
  }
};
