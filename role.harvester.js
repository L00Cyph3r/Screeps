module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    if (creep.spawning === false) {
      if (creep.memory.working === true) {
        //console.log("Harvester: " + name + " is working");
        if (creep.carry.energy === 0) {
          creep.memory.working = false;
          creep.say("Going to harvest");
          console.log("Harvester: " + creep.name + " is out of energy. Getting some now.");
        }
        if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          //creep.say(">Spawn");
          creep.moveTo(Game.spawns.Spawn1);
        } else {
          //creep.say("Energy>");
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
