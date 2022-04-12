let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.storing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.storing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.storing && creep.store.getFreeCapacity() === 0) {
            creep.memory.storing = true;
            creep.say('📥 store');
        }

        if (!creep.memory.storing) {
            let sources = creep.room.find(FIND_SOURCES);
            let closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN || structure.structureType === STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                let target = targets.pop()
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                let spawns = creep.room.find(FIND_MY_SPAWNS);
                creep.moveTo(spawns[0], { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
    }
};

module.exports = roleHarvester;