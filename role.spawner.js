const spawner = {
    /**
     * 
     */
    spawn: function () {
        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        const repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        const carrier = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
        //console.log('Harvesters: ' + harvesters.length);

        if (harvesters.length < 2) {
            const newName = 'Harvester' + Game.time;
            const source_id = harvesters[0].memory.source ? 0 : 1;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'harvester', source: source_id } });
        }

        if (carrier.length < 2) {
            const newName = 'Carrier' + Game.time;
            console.log('Spawning new carrier: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName,
                { memory: { role: 'carrier' } });
        }

        if (builders.length < 2) {
            const newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'builder' } });
        }

        if (upgraders.length < 1) {
            const newName = 'Upgrader' + Game.time;
            const pos = upgraders[0].memory.pos ? 0 : 1;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], newName,
                { memory: { role: 'upgrader', pos: pos } });
        }

        if (repairers.length < 1) {
            const newName = 'Repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                { memory: { role: 'repairer' } });
        }

        if (Game.spawns['Spawn1'].spawning) {
            const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                // @ts-ignore
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
}

module.exports = spawner;