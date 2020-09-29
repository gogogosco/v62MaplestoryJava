var status = 0;
var mapid = 925100700;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("OK then, see you next time!");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#b#L1#I wanna restore bombs#l\r\n#L2#I want to get out#k#l");
        } else {
            if (selection == 1) {
                if (cm.itemQuantity(2100067) <= 10) {
                    cm.gainItem(2100067, 25);
                    cm.dispose();
                } else {
                    cm.sendOk("you have more then 10 bombs\r\nSo its not time to restore yet");
                    cm.dispose();
                }
            } else {
                cm.warp(100000000);
                cm.gainItem(2100067, -cm.itemQuantity(2100067));
                cm.dispose();
            }
        }
    }
}