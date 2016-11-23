module.exports = {
  run: function(creep) {
    var prio1Target = STRUCTURE_EXTENSION;
    var prio2Target = STRUCTURE_TOWER;
    if (creep.room.energyAvailable > Memory.minimumEnergyNewCreep) {
      prio1Target = STRUCTURE_TOWER;
      prio2Target = STRUCTURE_EXTENSION;
    }
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
        // First find extenstions to fill
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType === prio1Target) &&
              structure.energy < structure.energyCapacity;
          }
        });
        if (target) {
          if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        } else {
          // Then try towers
          var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType === prio2Target) &&
                structure.energy < structure.energyCapacity;
            }
          });
          if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          } else {
            // Then try spawns
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: (structure) => {
                return (structure.structureType === STRUCTURE_SPAWN) &&
                  structure.energy < structure.energyCapacity;
              }
            });
            if (target) {
              if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
              }
            } else {
              // Then try storage
              var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                  return (structure.structureType === STRUCTURE_STORAGE) &&
                    structure.store.energy < structure.storeCapacity;
                }
              });
              if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                  creep.moveTo(target);
                }
              } else {
                // Then try containers
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                  filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER) &&
                      structure.store.energy < structure.storeCapacity;
                  }
                });
                if (target) {
                  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                  }
                } else {

                }
              }
            }
          }
        }
      } else {
        if (creep.carry.energy === creep.carryCapacity) {
          creep.memory.working = true;
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
