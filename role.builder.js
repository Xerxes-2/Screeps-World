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
			if (!creep.buildStructure())
				if (!creep.goRepair())
					creep.goUpgrade();
		}
		else {
			const cap = creep.store.getCapacity(RESOURCE_ENERGY);
			creep.drawFrom('6256847034ed8cc90c831768', cap);
		}
	}
};

module.exports = roleBuilder;