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
			const cap = creep.store.getCapacity(RESOURCE_ENERGY);
			const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: i => i.structureType === STRUCTURE_CONTAINER &&
					i.store[RESOURCE_ENERGY] > cap
			})
			if (target && target.id != '625552b73f39446428c64fb8' && target.id != '6255085a71db8742010a87f1')
				creep.drawFrom(target.id, cap);
		}
	}
};

module.exports = roleBuilder;