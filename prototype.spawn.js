module.exports = function() {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 200);
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    // body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }

    // create creep with the created body and the given role
    var newCreepName = (roleName.substr(0, 1).toUpperCase() + "-" + numberOfParts + "-" + Math.floor((Math.random() * 1000) + 1)).toString();
    return this.createCreep(body, newCreepName, {
      role: roleName,
      working: false
    });
    if (Memory.dbg)
      console.log("Created new creep: " + newCreepName + " with a factor " + numberOfParts + " for the body-parts");
  };
};
