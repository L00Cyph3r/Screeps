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

  Harvesters have the task of keeping the energy-levels full of the following structures:
  ```
  STRUCTURE_EXTENSION
  STRUCTURE_SPAWN
  STRUCTURE_TOWER
  ```
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

  WallRepairers' their main task is finding damaged `STRUCTURE_WALL`, and repair if necessary.  
  Default to (in order):  
  - [Repairer](#role-repairer)
  - [Builder](#role-builder)
  - [Upgrader](#role-upgrader)
