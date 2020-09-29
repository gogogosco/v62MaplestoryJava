/* Sera
* By Moogra
*/

function start() {
    cm.sendSimple ("Welcome to MapleStory. What job do you wish to be? \r\n#L0##bBeginner#k#l \r\n\ #L1##bWarrior#k#l \r\n\ #L2##bMagician#k#l \r\n\ #L3##bBowman#k#l \r\n\ #L4##bThief#k#l \r\n\ #L5##bPirate#k#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        cm.gainRandEquip(1002357);
        switch(selection) {
            case 0: cm.gainRandEquip(1102041); cm.gainRandEquip(1442018); cm.gainRandEquip(1442039); break;
            case 1: cm.gainRandEquip(1432038); cm.gainRandEquip(1402036); cm.gainRandEquip(1102041); break;
            case 2: cm.gainRandEquip(1372032); cm.gainRandEquip(1382036); cm.gainRandEquip(1102042); break;
            case 3: cm.gainRandEquip(1452044); cm.gainRandEquip(1462039); cm.gainRandEquip(1102041); break;
            case 4: cm.gainRandEquip(1472051); cm.gainRandEquip(1332050); cm.gainRandEquip(1102041); break;
            case 5: cm.gainRandEquip(1482023); cm.gainRandEquip(1492013); cm.gainRandEquip(1102041); break;
        }
        cm.warp(1,0);
        cm.getChar().maxAllSkills();
        cm.resetStats();
        cm.sendOk("Let the training begin!");
        cm.dispose();
    }
}