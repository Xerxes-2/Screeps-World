const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }
        creep.moveTo(5 - creep.memory.pos, 11, { visualizePathStyle: { stroke: '#ffaa00' } });
        if (creep.memory.upgrading) {
            creep.upgradeController(creep.room.controller);
        }
        else {
            const source = Game.getObjectById('625552b73f39446428c64fb8');
            creep.withdraw(source, RESOURCE_ENERGY);
        }
    }
};

module.exports = roleUpgrader;