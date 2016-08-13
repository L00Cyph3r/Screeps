# Screeps
This is my own attempt of building a modular library/script for the geeky game Screeps.

# How to install
Copy all the contents to your local folder. Note that the folder 'ScreepsAutocomplete' is only needed if you want autocomplete to work for some editors. (See https://github.com/Garethp/ScreepsAutocomplete/ for more info)

# Assumptions
In this script we are assuming the following:
- Your spawn is called `Spawn1`

# Config
- ## Memory variables
In memory, there are variables that control some elements of the script, here's the list.
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

# Credits
Special thanks to [thPion's tutorial-scripts](https://github.com/thPion/Screeps-Nooby-Guide) and his [helpful videos](https://www.youtube.com/playlist?list=PL0EZQ169YGlor5rzeJEYYPE3tGYT2zGT2)
