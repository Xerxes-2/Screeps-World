const roleCarrier = {

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
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: structure => structure.structureType === STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] > 300 &&
                    structure.id != '62546f04b3441f30e4b0e9bb'
            });
            containers.sort((a, b) => creep.pos.findPathTo(a).length - creep.pos.findPathTo(b).length)
            if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_CONTAINER ||
                        structure.structureType === STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                        structure.id !== '6255085a71db8742010a87f1' &&
                        structure.id !== '625552b73f39446428c64fb8';
                }
            });
            if (targets.length > 0) {
                const target = targets.pop()
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const source = Game.getObjectById('6255085a71db8742010a87f1');
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
    }
};

module.exports = roleCarrier;