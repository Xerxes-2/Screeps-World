module.exports = function () {
    Object.assign(Spawn.prototype, spawnExtension)
}
const creepConfigs = {
    'harvester': {
        bodys: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE],
        number: 2
    },
    'upgrader': {
        bodys: [WORK,/* WORK, WORK, WORK, WORK, WORK, CARRY,*/ CARRY, MOVE],
        number: 1
    },
    'builder': {
        bodys: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY],
        number: 2
    },
    'carrier': {
        bodys: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
        number: 2
    }
}

const spawnExtension = {
    // 检查任务队列
    work() {
        if (this.spawning) {
            const spawningCreep = Game.creeps[this.spawning.name];
            this.room.visual.text(
                // @ts-ignore
                '🛠️' + spawningCreep.memory.role,
                this.pos.x + 1,
                this.pos.y,
                { align: 'left', opacity: 0.8 });
        }
        if (!this.memory.spawnList) {
            for (const [key, value] of Object.entries(creepConfigs)) {
                const roles = _.filter(Game.creeps, (creep) => creep.memory.role == key);
                if (roles.length < value.number)
                    this.addTask(key);
            }
        }
        // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
        if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return
        // 进行生成
        const spawnSuccess = this.mainSpawn(this.memory.spawnList[0])
        // 生成成功后移除任务
        if (spawnSuccess) this.memory.spawnList.shift()
    },

    // 将生成任务推入队列
    addTask(taskName) {
        if (!this.memory.spawnList) {
            this.memory.spawnList = [];
        }
        const roles = _.filter(Game.creeps, (creep) => creep.memory.role === taskName);
        // 任务加入队列
        if (roles.length < creepConfigs[taskName].number)
            this.memory.spawnList.push(taskName)
        return this.memory.spawnList.length

    },

    // creep 生成主要实现
    mainSpawn(taskName) {
        const body = creepConfigs[taskName].bodys;
        const newName = taskName + Game.time;
        let mem;
        switch (taskName) {
            case 'harvester': {
                const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
                let source_id;
                if (harvesters.length > 0) {
                    source_id = harvesters[0].memory.source ? 0 : 1;
                } else {
                    source_id = 1;
                }
                mem = { role: taskName, source: source_id };
                break;
            }
            case 'upgrader': {
                const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                let pos;
                if (upgraders.length > 0) {
                    pos = upgraders[0].memory.pos ? 0 : 1;
                } else {
                    pos = 0;
                }
                mem = { role: taskName, pos: pos }
                break;
            }
            default: mem = { role: taskName }
        }
        if (this.spawnCreep(body, newName, { memory: mem }) === OK) {
            console.log('Spawning ' + newName);
            return true;
        }
        else return false;
    }
}