let roleBuilder = {

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
			let closest = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(closest) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closest, { visualizePathStyle: { stroke: '#ffffff' } });
				}
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

module.exports = roleBuilder;