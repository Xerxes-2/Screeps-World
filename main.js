// @ts-check
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
//const roleRepairer = require('role.repairer');
const spawn1 = require('spawn1');
const roleCarrier = require('role.carrier');
const tower = require('tower')
require('./mount')()

module.exports.loop = function () {
    spawn1.spawn();
    tower.run();

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
        /*         if (creep.memory.role == 'repairer') {
                    roleRepairer.run(creep);
                } */
        // @ts-ignore
        if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
}