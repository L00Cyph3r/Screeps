# Config
- ## Memory variables
In memory, there are variables that control some elements of the script, here's the list.

  - #### <a name="config-rooms"></a>`rooms`
    - type: `array`  
    - default: `{}`
    - example: `Memory.rooms[0] = "N12E34"`

    This is the array that holds all of your room-names. This is used to manage defences and stuff across all of your rooms. It also helps to find certain objects when there is no relevant creep or spawn available.  
    `Note`: This should be set before continuing any further, as this might produce erors.

  - #### `minimumEnergyNewCreep`
    - type: `integer`  
    - default: `Game.spawns.Spawn1.energyCapacity`

    This controls the minimum amount of `energy` needed in your spawn before attempting to spawn any new creeps. This is a very crude way to control the minimum body-parts of new creeps.

  - #### `minimumNumberOfHarvesters`
    - type: `integer`  
    - default: `1`

    The minimum amount of `Harvesters` needed. If there are less than this number, a new creep will be created as soon as the main spawn has more energy then `Memory.minimumEnergyNewCreep`

  - #### `minimumNumberOfUpgraders`
    - type: `integer`  
    - default: `1`

    The minimum amount of `Upgraders` needed. If there are less than this number, a new creep will be created as soon as the main spawn has more energy then `Memory.minimumEnergyNewCreep`

  - #### `minimumNumberOfBuilders`
    - type: `integer`  
    - default: `1`

    The minimum amount of `Builders` needed. If there are less than this number, a new creep will be created as soon as the main spawn has more energy then `Memory.minimumEnergyNewCreep`

  - #### `minimumNumberOfRepairers`
    - type: `integer`  
    - default: `0`

    The minimum amount of `Repairers` needed. If there are less than this number, a new creep will be created as soon as the main spawn has more energy then `Memory.minimumEnergyNewCreep`

  - #### `minimumNumberOfWallRepairers`
    - type: `integer`  
    - default: `0`

    The minimum amount of `WallRepairers` needed. If there are less than this number, a new creep will be created as soon as the main spawn has more energy then `Memory.minimumEnergyNewCreep`

  - #### `dbg`
    - type: `bool`  
    - default: `true`

    Controls if some debug-values should be displayed on the console.

  - #### `showCPUUsage`
    - type: `bool`
    - default: `true`

    Controls whether or not the CPU-Usage should be displayed on the console at every tick.
  - #### `showCPUUsageModulus`
    - type: `integer`
    - default: `5`

    Defines the modulus (every `num` seconds), on which the CPU-Usage is printed out.
