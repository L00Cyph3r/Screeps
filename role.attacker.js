module.exports = {
  run: function(creep) {
    if (creep.spawning === false) {
      if (creep.memory.mode === 'defending') {
        var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
        if (targets.length > 0) {
          creep.attack(targets[0]);
        } else {
          var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
          if (targets.length > 0) {
            creep.rangedAttack(targets[0]);
          } else {
            var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS);
            if (targets.length > 0) {
              creep.moveTo(targets[0]);
            } else {
              creep.moveTo(creep.memory.targetLocation[0], creep.memory.targetLocation[1]);
            }
          }
        }
      } else if (creep.memory.mode === 'attacking') {
        var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
        if (targets.length > 0) {
          creep.attack(targets[0]);
        } else {
          var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
          if (targets.length > 0) {
            creep.rangedAttack(targets[0]);
          }
        }
        var targets = creep.pos.findInRange(FIND_HOSTILE_SPAWNS, 3);
        if (targets.length > 0) {
          creep.attack(targets[0]);
        }
      }
    }
  }
};
