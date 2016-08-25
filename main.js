require('prototype.spawn')();
var functions = require('functions');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleAttacker = require('role.attacker');

var cpuUsage = {};

if (Memory.rooms === undefined) {
  Memory.rooms = [];
  console.log("Variable 'rooms' was non-existent in memory, added with default value of '{}'");
}
if (Memory.rooms.length === 0) {
  var error = "No rooms are defined!\n\
Please set your first room in console with the following command:\n\
Memory.rooms[0] = \"Room-coords\"";
  Game.notify(error, 15);
  console.log(error);
}
if (Memory.minimumEnergyNewCreep === undefined) {
  Memory.minimumEnergyNewCreep = Game.spawns.Spawn1.room.energyCapacityAvailable;
  console.log("Variable 'minimumEnergyNewCreep' was non-existent in memory, \
  added with default value of '" + Game.spawns.Spawn1.room.energyCapacityAvailable + "'");
}
if (Memory.minimumNumberOfHarvesters === undefined) {
  Memory.minimumNumberOfHarvesters = 1;
  console.log("Variable 'minimumNumberOfHarvesters' was non-existent in memory, \
  added with default value of '" + Memory.minimumNumberOfHarvesters + "'");
}
if (Memory.minimumNumberOfUpgraders === undefined) {
  Memory.minimumNumberOfUpgraders = 1;
  console.log("Variable 'minimumNumberOfUpgraders' was non-existent in memory, \
  added with default value of '" + Memory.minimumNumberOfUpgraders + "'");
}
if (Memory.minimumNumberOfBuilders === undefined) {
  Memory.minimumNumberOfBuilders = 1;
  console.log("Variable 'minimumNumberOfBuilders' was non-existent in memory, \
  added with default value of '" + Memory.minimumNumberOfBuilders + "'");
}
if (Memory.minimumNumberOfRepairers === undefined) {
  Memory.minimumNumberOfRepairers = 0;
  console.log("Variable 'minimumNumberOfRepairers' was non-existent in memory, \
  added with default value of '" + Memory.minimumNumberOfRepairers + "'");
}
if (Memory.minimumNumberOfWallRepairers === undefined) {
  Memory.minimumNumberOfWallRepairers = 0;
  console.log("Variable 'minimumNumberOfWallRepairers' was non-existent in memory, \
  added with default value of '" + Memory.minimumNumberOfWallRepairers + "'");
}
if (Memory.minimumNumberOfAttackers === undefined) {
  Memory.minimumNumberOfAttackers = 0;
  console.log("Variable 'minimumNumberOfAttackers' was non-existent in memory, \
  added with default value of '" + Memory.minimumNumberOfAttackers + "'");
}
if (Memory.cpuBucketMin === undefined) {
  Memory.cpuBucketMin = 3000;
  console.log("Variable 'cpuBucketMin' was non-existent in memory, \
  added with default value of '" + Memory.cpuBucketMin + "'");
}
if (Memory.cpuBucketMax === undefined) {
  Memory.cpuBucketMax = 8000;
  console.log("Variable 'cpuBucketMax' was non-existent in memory, \
  added with default value of '" + Memory.cpuBucketMax + "'");
}
if (Memory.dbg === undefined) {
  Memory.dbg = true;
  console.log("Variable 'dbg' was non-existent in memory, added with default value of 'true'");
}
if (Memory.showCPUUsage === undefined) {
  Memory.showCPUUsage = true;
  console.log("Variable 'showCPUUsage' was non-existent in memory, added with default value of 'true'");
}
if (Memory.showCPUUsageModulus === undefined) {
  Memory.showCPUUsageModulus = 5;
  console.log("Variable 'showCPUUsageModulus' was non-existent in memory, added with default value of '" + Memory.showCPUUsageModulus + "'");
}

module.exports.loop = function() {
  // var creep = Game.creeps['A-2-865'];
  // creep.moveTo(new RoomPosition(26, 29, 'E46N58'));
  var numberOfHarvesters = 0;
  var numberOfUpgraders = 0;
  var numberOfBuilders = 0;
  var numberOfRepairers = 0;
  var numberOfWallRepairers = 0;
  var numberOfAttackers = 0;
  var startCpu = Game.cpu.getUsed();

  cpuUsage['memory'] = Game.cpu.getUsed() - startCpu;

  var startCpu = Game.cpu.getUsed();
  cpuUsage['creeps'] = {
    'harvester': 0,
    'upgrader': 0,
    'builder': 0,
    'repairer': 0,
    'wallRepairer': 0
  };
  var cont = {
    'creeps': true,
    'creep': {
      'harvester': true,
      'upgrader': true,
      'builder': true,
      'repairer': true,
      'wallRepairer': true,
      'attacker': true,
    },
    'memoryGC': true,
  };
  if (Game.cpu.bucket < Memory.cpuBucketMin) {
    cont['creeps'] = false;
  }
  for (let name in Memory.creeps) {
    if (cont['memoryGC'] === true) {
      if (Game.creeps[name] === undefined) {
        delete Memory.creeps[name];
      }
    }
  }
  var startCpu = Game.cpu.getUsed();
  for (var i = 0; i < Memory.rooms.length; i++) {
    functions.defence.defendRoom(Memory.rooms[i]);
  }
  cpuUsage['defence'] = Game.cpu.getUsed() - startCpu;
  if (cont['creeps'] === true) {
    for (let name in Game.creeps) {
      if (Game.time % 1000 === 0) {
        var numEnergySources = 2;
        try {
          creep.memory.sourcenum = Math.floor(Math.random() * (numEnergySources + 1));
        } catch (e) {
          console.log(e.message);
        }
      }
      var startCpu2 = Game.cpu.getUsed();
      var creep = Game.creeps[name];
      if (creep.memory.role === 'harvester') {
        numberOfHarvesters++;
        if (cont['creep'][creep.memory.role]) {
          // console.log("True");
          roleHarvester.run(creep);
        }
      } else if (creep.memory.role === 'upgrader') {
        numberOfUpgraders++;
        if (cont['creep']['upgrader'] === true) {
          roleUpgrader.run(creep);
        }
      } else if (creep.memory.role === 'builder') {
        numberOfBuilders++;
        if (cont['creep'][creep.memory.role])
          roleBuilder.run(creep);
      } else if (creep.memory.role === 'repairer') {
        numberOfRepairers++;
        if (cont['creep'][creep.memory.role])
          roleRepairer.run(creep);
      } else if (creep.memory.role === 'wallRepairer') {
        numberOfWallRepairers++;
        if (cont['creep'][creep.memory.role])
          roleWallRepairer.run(creep);
      } else if (creep.memory.role === 'attacker') {
        numberOfAttackers++;
        if (cont['creep'][creep.memory.role])
          roleAttacker.run(creep);
      }
      cpuUsage['creeps'][creep.memory.role] += Game.cpu.getUsed() - startCpu2;
    }
  }
  cpuUsage['creep'] = Game.cpu.getUsed() - startCpu;
  var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType === STRUCTURE_TOWER
  });
  for (let tower of towers) {
    var target = tower.room.find(FIND_HOSTILE_CREEPS);
    if (target.length > 1) {
      console.log("Enemy (" + target[0].owner.username + ") at: " +
        target[0].pos.x + "," + target[0].pos.x +
        " with " + (target[0].hits / target[0].hitsMax) * 100 + "% HP");
      console.log(tower.attack(target[target.length - 1]));
    }
  }

  var energyInSpawn = Game.spawns.Spawn1.room.energyAvailable;
  if (energyInSpawn >= Memory.minimumEnergyNewCreep) {
    var name = undefined;
    if (numberOfHarvesters < Memory.minimumNumberOfHarvesters) {
      name = Game.spawns.Spawn1.createCustomCreep(energyInSpawn, 'harvester');
    } else if (numberOfUpgraders < Memory.minimumNumberOfUpgraders) {
      name = Game.spawns.Spawn1.createCustomCreep(energyInSpawn, 'upgrader');
    } else if (numberOfBuilders < Memory.minimumNumberOfBuilders) {
      name = Game.spawns.Spawn1.createCustomCreep(energyInSpawn, 'builder');
    } else if (numberOfRepairers < Memory.minimumNumberOfRepairers) {
      name = Game.spawns.Spawn1.createCustomCreep(energyInSpawn, 'repairer');
    } else if (numberOfWallRepairers < Memory.minimumNumberOfWallRepairers) {
      name = Game.spawns.Spawn1.createCustomCreep(energyInSpawn, 'wallRepairer');
    } else if (numberOfAttackers < Memory.minimumNumberOfAttackers) {
      name = Game.spawns.Spawn1.createCustomCreep(energyInSpawn, 'attacker');
    }
    if (name !== undefined && !name < 0) {
      console.log("Spawned new creep: " + name);
    }
  } else if (numberOfHarvesters === 0) {
    if (energyInSpawn > 600) {
      Game.spawns.Spawn1.createCustomCreep(400, 'harvester');
    } else {
      Game.spawns.Spawn1.createCustomCreep(200, 'harvester');
    }
  }
  if (Game.time % Memory.showCPUUsageModulus === 0) {
    if (Memory.showCPUUsage) console.log(
        "Total: " + (Math.round(Game.cpu.getUsed() * 100) / 100) +
        "\tBucket: " + Game.cpu.bucket + "/10000" +
        "\tCreeps: " + (Math.round(cpuUsage['creep'] * 100) / 100) +
        "\tMemory: " + (Math.round(cpuUsage['memory'] * 100) / 100) +
        "\tDefence: " + (Math.round(cpuUsage['defence'] * 100) / 100) +
        "\tH:" + (Math.round(cpuUsage['creeps']['harvester'] * 100) / 100) +
        "\tU:" + (Math.round(cpuUsage['creeps']['upgrader'] * 100) / 100) +
        "\tB:" + (Math.round(cpuUsage['creeps']['builder'] * 100) / 100) +
        "\tR:" + (Math.round(cpuUsage['creeps']['repairer'] * 100) / 100) +
        "\tEiS:" + (energyInSpawn) +
        "");
  }
  if (Game.time % 10 === 0) {
    console.log(numberOfHarvesters + "/" + Memory.minimumNumberOfHarvesters + " Harvesters\t" +
      numberOfUpgraders + "/" + Memory.minimumNumberOfUpgraders + " Upgraders\t" +
      numberOfBuilders + "/" + Memory.minimumNumberOfBuilders + " Builders\t" +
      numberOfRepairers + "/" + Memory.minimumNumberOfRepairers + " Repairers\t" +
      numberOfWallRepairers + "/" + Memory.minimumNumberOfWallRepairers + " WallRepairers\t" +
      numberOfAttackers + "/" + Memory.minimumNumberOfAttackers + " Attackers");
  }
};
