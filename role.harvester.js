module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    if (creep.spawning === false) {
      if (creep.memory.working === true) {
        //console.log("Harvester: " + name + " is working");
        if (creep.carry.energy === 0) {
          creep.memory.working = false;
          creep.say(">harvest");
          console.log("Harvester: " + creep.name + " is out of energy. Getting some now.");
        }
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
          }
        });
        if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
          }
        }
      } else {
        //console.log("Harvester: " + name + " is not working");
        if (creep.carry.energy === creep.carryCapacity) {
          creep.memory.working = true;
          console.log("Harvester: " + creep.name + " is full, dropping off at spawn.");
        }
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    }
  }
};
