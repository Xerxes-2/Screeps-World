// 将拓展签入 Creep 原型
module.exports = function () {
    Object.assign(Creep.prototype, creepExtension)
}

// 自定义的 Creep 的拓展
const creepExtension = {
    // 建设房间内的建筑工地
    buildStructure() {
        const target = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        if (target) {
            if (this.build(target) === ERR_NOT_IN_RANGE) {
                this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return 1;
        } else return 0;
    },
    // 自定义敌人检测
    checkEnemy() {
        // 代码实现...
    },
    // 填充所有 spawn 和 extension
    fillSpawn() {
        const target = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: structure => (structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_EXTENSION) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        })
        if (target) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return 1;
        } else return 0;
    },
    // 填充所有 tower
    fillTower() {
        const target = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: structure => structure.structureType == STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        })
        if (target) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return 1;
        } else return 0;
    },
    // 填充特定container
    fillContainer(id) {
        const target = Game.getObjectById(id)
        if (target && target.store.getFreeCapacity() > 0) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return 1;
        } else return 0;
    },
    goUpgrade() {
        if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE)
            this.moveTo(this.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    },
    pickDropped(cap) {
        const target = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
        console.log(target.amount);
        if (target) {
            if (this.pickup(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
            return 1;
        } else return 0;
    },
    drawFrom(id, cap) {
        const target = Game.getObjectById(id);
        if (target && target.store[RESOURCE_ENERGY] > cap) {
            if (this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return 1;
        } else return 0;
    }
}