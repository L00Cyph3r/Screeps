module.exports = function() {
  StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
    var numberOfParts = Math.floor(energy / 200);
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    var newCreepName = (roleName.substr(0, 1).toUpperCase() + "-" + numberOfParts + "-" + Math.floor((Math.random() * 1000) + 1)).toString();

    console.log("Created new creep: " + newCreepName + " with a factor " + numberOfParts + " for the body-parts");

    return this.createCreep(body, newCreepName, {
      role: roleName,
      working: false
    });
  };
};
