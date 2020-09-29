/*
Multi-Purpose NPC
Author: Moogra
 */

function start() {
    cm.sendSimple ("What do you want me to do for you? \b\r\n#L0#Travel to Towns or Fight Bosses\n\#l\r\n#L1#Job Advance\n\#l\r\n#L2#Reset Stats\n\#l\r\n#L3#Change Music#l\r\n#L4#Buy NX#l\r\n#L5#Exchange Mesos for Items#l\r\n#L6#Get Buffs#l\r\n#L7#Go To PvP#l\r\n#L8#Donation Point NPC#l\r\n#L9#Pirate Shop#l\r\n#L10#Karma Shop");
}

function action(mode, type, selection) {
    switch(selection) {
        case 0: cm.openNpc(9000020); break;
        case 1: cm.openNpc(9200000); break;
        case 2: cm.openNpc(2003);    break;
        case 3: cm.openNpc(1061008); break;
        case 4: cm.openNpc(9201082); break;
        case 5: cm.openNpc(2050015); break;
        case 6: cm.openNpc(9201091); break;
        case 7: cm.openNpc(9001002); break;
        case 8: cm.openNpc(2040048); break;
        case 9: cm.openNpc(9120024); break;
        case 10:cm.openNpc(1022005); break;
        default: cm.dispose();
    }
}