require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');

var cpuUsage = {};

var minimumEnergyNewCreep = 200;
var minimumNumberOfHarvesters = 5;
var minimumNumberOfUpgraders = 1;
var minimumNumberOfBuilders = 10;
var minimumNumberOfRepairers = 1;
var minimumNumberOfWallRepairers = 0;

module.exports.loop = function() {
  if (Memory.dbg === undefined) {
    Memory.dbg = true;
    console.log("Variable 'dbg' was non-existent in memory, added with default value of 'true'");
  }
  var numberOfHarvesters = 0;
  var numberOfUpgraders = 0;
  var numberOfBuilders = 0;
  var numberOfRepairers = 0;
  var numberOfWallRepairers = 0;
  var startCpu = Game.cpu.getUsed();
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }
  cpuUsage['memory'] = Game.cpu.getUsed() - startCpu;

  var startCpu = Game.cpu.getUsed();
  for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      numberOfHarvesters++;
      roleHarvester.run(creep);
    } else if (creep.memory.role === 'upgrader') {
      numberOfUpgraders++;
      roleUpgrader.run(creep);
    } else if (creep.memory.role === 'builder') {
      numberOfBuilders++;
      roleBuilder.run(creep);
    } else if (creep.memory.role == 'repairer') {
      numberOfRepairers++;
      roleRepairer.run(creep);
    } else if (creep.memory.role == 'wallRepairer') {
      numberOfWallRepairers++;
      roleWallRepairer.run(creep);
    }
  }
  cpuUsage['creep'] = Game.cpu.getUsed() - startCpu;
  var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER
  });
  for (let tower of towers) {
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target != undefined) {
      tower.attack(target);
    }
  }

  var energy = Game.spawns.Spawn1.energy;
  if (energy >= minimumEnergyNewCreep) {
    var name = undefined;
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
      console.log("Need new harvester");
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
    // if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
    //   name = Game.spawns.Spawn1.createCustomCreep(
    //     Game.spawns.Spawn1.room.energyAvailable, 'harvester');
    // }
    } else if (numberOfUpgraders < minimumNumberOfUpgraders) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    } else if (numberOfBuilders < minimumNumberOfBuilders) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    } else if (numberOfRepairers < minimumNumberOfRepairers) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    } else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    }
    if (name !== undefined && !name < 0) {
      console.log("Spawned new creep: " + name);
    }
  }
  (Memory.dbg) ? console.log(
    "Total: " + (Math.round(Game.cpu.getUsed() * 100) / 100) +
    "\tBucket: " + Game.cpu.bucket + "/10000" +
    "\tCreeps: " + (Math.round(cpuUsage['creep'] * 100) / 100) +
    "\tMemory: " + (Math.round(cpuUsage['memory'] * 100) / 100) +
    "") : null;
  if (Game.time % 10 === 0) {
    console.log(numberOfHarvesters + "/" + minimumNumberOfHarvesters + " Harvesters\t" +
      numberOfUpgraders + "/" + minimumNumberOfUpgraders + " Upgraders\t" +
      numberOfBuilders + "/" + minimumNumberOfBuilders + " Builders\t" +
      numberOfRepairers + "/" + minimumNumberOfRepairers + " Repairers\t" +
      numberOfWallRepairers + "/" + minimumNumberOfWallRepairers + " WallRepairers");
  }
};
