require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var minHarvesters = 2;
var minUpgraders = 1;
var minBuilders = 1;
var cpuUsage = {};
module.exports.loop = function() {
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
  // console.log('Creep ' + name + ' has used ' + elapsed + ' CPU time');
  }
  cpuUsage['creep'] = Game.cpu.getUsed() - startCpu;
  //console.log('Creep management has used ' + elapsed + ' CPU time');
  var towers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER
  });
  for (let tower of towers) {
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target != undefined) {
      tower.attack(target);
    }
  }

  // setup some minimum numbers for different roles
  var minimumNumberOfHarvesters = 5;
  var minimumNumberOfUpgraders = 5;
  var minimumNumberOfBuilders = 5;
  var minimumNumberOfRepairers = 2;
  var minimumNumberOfWallRepairers = 2;

  // count the number of creeps alive for each role
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a harvester
  var energy = Game.spawns.Spawn1.energy;
  if (energy >= 200) {
    var name = undefined;
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
      if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
        name = Game.spawns.Spawn1.createCustomCreep(
          Game.spawns.Spawn1.room.energyAvailable, 'harvester');
      }
    } else if (numberOfUpgraders < minimumNumberOfUpgraders) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    } else if (numberOfRepairers < minimumNumberOfRepairers) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    } else if (numberOfBuilders < minimumNumberOfBuilders) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    } else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
      name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    } else {
      //name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    if (name !== undefined && !name < 0) {
      console.log("Spawned new creep: " + name);
    }
  }
  console.log(
    "Total: " + (Math.round(Game.cpu.getUsed() * 100) / 100) +
    "\tBucket: " + Game.cpu.bucket + "/10000" +
    "\tCreeps: " + (Math.round(cpuUsage['creep'] * 100) / 100) +
    "\tMemory: " + (Math.round(cpuUsage['memory'] * 100) / 100) +
    "");
};
