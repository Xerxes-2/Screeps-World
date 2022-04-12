// @ts-check
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const spawner = require('role.spawner');
const roleCarrier = require('role.carrier');

module.exports.loop = function () {

    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawner.spawn();

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        // @ts-ignore
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // @ts-ignore
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // @ts-ignore
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // @ts-ignore
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        // @ts-ignore
        if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
}