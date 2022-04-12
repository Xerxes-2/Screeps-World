const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const sources = creep.room.find(FIND_SOURCES);
        const source = sources[creep.memory.source];
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
};

module.exports = roleHarvester;