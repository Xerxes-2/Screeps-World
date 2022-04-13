const roleBuilder = {
	/** @param {Creep} creep **/
	run: function (creep) {

		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}

		if (creep.memory.building) {
			if (!creep.buildStructure());
			//creep.goUpgrade();
		}
		else {
			let containers = creep.room.find(FIND_STRUCTURES, {
				filter: structure => structure.structureType === STRUCTURE_CONTAINER &&
					structure.store[RESOURCE_ENERGY] > 200
			});
			containers.sort((a, b) => creep.pos.findPathTo(a).length - creep.pos.findPathTo(b).length)
			if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

module.exports = roleBuilder;