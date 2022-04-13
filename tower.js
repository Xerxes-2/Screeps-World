const tower = {

    /** @param {Game} game **/
    run: function () {
        const towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })
        _.forEach(towers, function (tower) {
            const damagedStructure = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax &&
                    structure.hits < 600
            });
            damagedStructure.sort((a, b) => (b.hitsMax - b.hits) - (a.hitsMax - a.hits));
            if (damagedStructure) {
                tower.repair(damagedStructure[0]);
            }
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        })
    }
};

module.exports = tower;