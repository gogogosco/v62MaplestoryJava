/* 
	Machine Apparatus
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("\r\n#L1##bCrack#k please!#l\r\n\#L2#Take me to #bDeep Inside The Clocktower#k!#l");
        } else if (status == 1) {
            if (selection == 1) {
                cm.gainItem(4031179, 1);
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(220080000, 0);
                cm.resetReactors();
                cm.dispose();
            }
        }
    }
}