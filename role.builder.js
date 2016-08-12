var roleUpgrader = require('role.upgrader');

module.exports = {
  // a function to run the logic for this role
  run: function(creep) {
    // if creep is trying to complete a constructionSite but has no energy left
    if (creep.memory.working == true) {
      if (creep.carry.energy === 0) {
        creep.memory.working = false;
      } else {
        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        // if one is found
        if (constructionSite != undefined) {
          // try to build, if the constructionSite is not in range
          if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
            //creep.say(">build");
            creep.moveTo(constructionSite);
          } else {
            //creep.say("build>");
          }
        } else {
          roleUpgrader.run(creep);
        }
      }
    } else {
      if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
      }
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      // try to harvest energy, if the source is not in range
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        // move towards the source
        creep.moveTo(source);
      }
    }
  }
};
