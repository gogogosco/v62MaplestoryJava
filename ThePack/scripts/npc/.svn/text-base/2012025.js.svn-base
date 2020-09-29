var status = 0;

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
            cm.sendYesNo("Hey, Do you want to do the Bomberman PVP?");
        } else {
            cm.gainItem(2100067, 100-cm.itemQuantity(2100067));
            cm.warp(925100700);
            cm.dispose();
        }
    }
}