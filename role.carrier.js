let roleCarrier = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.refilling && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.refilling = false;
            creep.say('📤 outbox');
        }
        if (!creep.memory.refilling && creep.store.getFreeCapacity() === 0) {
            creep.memory.refilling = true;
            creep.say('📬 refill');
        }

        if (!creep.memory.refilling) {
            let source = Game.getObjectById('6255085a71db8742010a87f1');
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN || structure.structureType === STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                        structure.id !== '6255085a71db8742010a87f1';
                }
            });
            if (targets.length > 0) {
                let target = targets.pop()
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                let source = Game.getObjectById('6255085a71db8742010a87f1');
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
    }
};

module.exports = roleCarrier;