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
            const cap = creep.store.getCapacity(RESOURCE_ENERGY);
            if (!creep.pickDropped())
                if (!creep.drawFrom('6255085a71db8742010a87f1', cap))
                    if (!creep.drawFrom('625552b73f39446428c64fb8', cap));
        }
        else {
            if (!creep.fillSpawn())
                if (!creep.fillTower())
                    if (!creep.fillContainer('6255c22d61c01b4e251178bb'))
                        if (!creep.fillContainer('6255bd598cd31070f4e6a8c3'))
                            if (!creep.fillContainer('62546f04b3441f30e4b0e9bb'));
        }
    }
};

module.exports = roleCarrier;