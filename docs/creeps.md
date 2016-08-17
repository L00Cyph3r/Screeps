# Creeps

## Naming
The naming convention is specified in [prototype.spawn.js](../prototype.spawn.js).  
Currently it is specified as a combination of:  
`Uppercase first letter of role`  
`BodyPartsMultiplier`  
`Random number between 1 and 1000`  
For example:
`H-2-4561` is a [Harvester](#role-harvester) with 2 times the default body-set (defined in [prototype.spawn.js](../prototype.spawn.js)).  
The random number is there to prevent duplicates (duh)...

## Roles
Creeps theire roles are defined on creation. Their role is defined in their memory. This allows (pretty) easy changing of a creeps role.  
The following roles are currently implemented:
- ### <a name="role-harvester"></a>Harvester

  Harvesters have the task of keeping the energy-levels full of the following structures in order of importance:

  1. `STRUCTURE_EXTENSION`
  2. `STRUCTURE_TOWER`
  3. `STRUCTURE_SPAWN`
  4. `STRUCTURE_CONTAINER` or `STRUCTURE_STORAGE`

- ### <a name="role-upgrader"></a>Upgrader

  Upgraders' their main task is upgrading your controller. They don't default because there is always some upgrading to do.


- ### <a name="role-builder"></a>Builder

  Builders' their main task is building their closest construction site.  
  Defaults to (in order):  
  - [Upgrader](#role-upgrader)


- ### <a name="role-repairer"></a>Repairer

  Repairers' their main task is repairing closest construction building with less than 100% of it's HP.  
  Defaults to (in order):  
  - [Builder](#role-builder)
  - [Upgrader](#role-upgrader)


- ### WallRepairer<a name="role-wallrepairer"></a>

  WallRepairers' their main task is finding a damaged `STRUCTURE_WALL`, and repair if necessary.  
  It searches with some math that exponentially grows the hits-percentage:
  ```javascript
  for (let percentage = 0.001; percentage <= 1; percentage = percentage * 1.995262) {
    // Find target
  });
  ```
  The above creates 11 values which are:
  ```
  0.001
  0.001995262
  0.003981070448644
  0.0079432785855023
  0.015848921917067
  0.03162275164209
  0.0630956746869
  0.12589240206713
  0.25118832593327
  0.50118652157827
  0.99999842141731
  ```

  Default to (in order):  
  - [Repairer](#role-repairer)
  - [Builder](#role-builder)
  - [Upgrader](#role-upgrader)


- ### Attacker<a name="role-attacker"></a>
  - `role`
    - type: `string`
    - default: `attacker`
  - `mode`
    - type: `string`
    - default: `defending`
  - `targetLocation`
    - type: `Array`
    - default: `[Game.flags['Rally1'].pos.x, Game.flags['Rally1'].pos.y]`

  Attackers' their main task is finding a hostile entity. If one is found, it will move towards is, until the target is within attacking range. They don't default to anything.
