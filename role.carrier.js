const roleCarrier = {
    /** @param {Creep} creep **/
    run: function (creep) {
        const cap = creep.store.getCapacity(RESOURCE_ENERGY);
        function PAction(action, priority, ...args) {
            this.action = action;
            this.priority = priority;
            this.args = args
        }
        pqOutbox = [new PAction('pickDropped', 100, cap),
        new PAction('drawFrom', 90, '6255085a71db8742010a87f1', cap),
        new PAction('drawFrom', 80, '625552b73f39446428c64fb8', cap)]
        pqRefill = [new PAction('fillSpawn', 100),
        new PAction('fillTower', 90),
        new PAction('fillContainer', 80, '6255c22d61c01b4e251178bb'),
        new PAction('fillContainer', 70, '6255bd598cd31070f4e6a8c3'),
        new PAction('fillContainer', 60, '62546f04b3441f30e4b0e9bb')]
        if (creep.memory.refilling && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.refilling = false;
            creep.say('📤 outbox');
        }
        if (!creep.memory.refilling && creep.store.getFreeCapacity() === 0) {
            creep.memory.refilling = true;
            creep.say('📬 refill');
        }
        if (!creep.memory.refilling) {
            /* _.takeRightWhile(_.sortBy(pqOutbox, 'priority'), (o) => {
                return !_.invoke(creep, o.action, ...(o.args || []));
            }); */
            if (!creep.pickDropped(cap))
                if (!creep.drawFrom('6255085a71db8742010a87f1', cap))
                    if (!creep.drawFrom('625552b73f39446428c64fb8', cap));
        }
        else {
            /*_.takeRightWhile(_.sortBy(pqRefill, 'priority'), (o) => {
                return !_.invoke(creep, 'action', ...(o.args || []));
            }); */
            if (!creep.fillSpawn())
                if (!creep.fillTower())
                    if (!creep.fillContainer('6256847034ed8cc90c831768'));
        }
    }
};

module.exports = roleCarrier;