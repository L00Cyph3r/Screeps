module.exports = function() {
  StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
    if (roleName == 'harvester' || roleName == 'upgrader' || roleName == 'builder' || roleName == 'repairer' || roleName == 'wallRepairer') {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
      }
      var newCreepName = (roleName.substr(0, 1).toUpperCase() + "-" + numberOfParts + "-" + Math.floor((Math.random() * 1000) + 1)).toString();
      if (newCreepName) {
        console.log("Created new creep: " + newCreepName + " with a factor " + numberOfParts + " for the body-parts");
        return this.createCreep(body, newCreepName, {
          role: roleName,
          working: false
        });
      } else {
        return newCreepName;
      }
    } else if (roleName == 'attacker') {
      var numberOfParts = Math.floor(energy / (150 + 80 + 10 + 10 + 50 + 50)); // 350
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(RANGED_ATTACK); // 150
        body.push(ATTACK); // 80
        body.push(TOUGH); // 10
        body.push(TOUGH); // 10
        body.push(MOVE); // 50
        body.push(MOVE); // 50
      }
      var newCreepName = (roleName.substr(0, 1).toUpperCase() + "-" + numberOfParts + "-" + Math.floor((Math.random() * 1000) + 1)).toString();
      if (newCreepName) {
        console.log("Created new creep: " + newCreepName + " with a factor " + numberOfParts + " for the body-parts");
        return this.createCreep(body, newCreepName, {
          role: roleName,
          mode: 'defending',
          targetLocation: [Game.flags['Rally1'].pos.x, Game.flags['Rally1'].pos.y]
        });
      } else {
        return newCreepName;
      }
    }
  };
};
