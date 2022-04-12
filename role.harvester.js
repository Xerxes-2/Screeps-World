const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.storing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.storing = false;
            creep.say('🔄 harvest');
        }
        /*if (!creep.memory.storing && creep.store.getFreeCapacity() === 0) {
                    creep.memory.storing = true;
                    creep.say('📥 store');
                } */


        const sources = creep.room.find(FIND_SOURCES);
        const source = sources[creep.memory.source]
        //let closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }


    }
};

module.exports = roleHarvester;