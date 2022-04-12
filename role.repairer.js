let roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvast');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }
        let targets = creep.room.find(FIND_MY_STRUCTURES, {
            fliter: (structure) => {
                return structure.hits < structure.hitsMax;
            }
        });
        if (creep.memory.repairing) {
            if (targets.length) {
                let target = Game.getObjectById('62546f04b3441f30e4b0e9bb');
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else {
                let target = Game.getObjectById('62546f04b3441f30e4b0e9bb');
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            let source = Game.getObjectById('62546f04b3441f30e4b0e9bb');
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleRepairer;