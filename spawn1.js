const spawn1 = {
    /**
     * 
     */
    spawn: function () {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                const role = name.replace(/[0-9]+/g, '').toLowerCase();
                Game.spawns['Spawn1'].addTask(role);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        Game.spawns['Spawn1'].work();
    }
}

module.exports = spawn1;