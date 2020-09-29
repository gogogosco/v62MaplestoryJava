/* Pison
	Warp NPC to Florina Beach (110000000)
	located in Lith Harbor (104000000)
 */

importPackage(net.sf.odinms.server.maps);

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.sendOk("Alright, see you next time.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendNext("Congratulations on finishing the Jump Quest");
        } else if (status == 1) {
            cm.sendNextPrev("I'll take you the next stage")
        } else if (status == 2) {
            if (cm.getMeso() < 1) {
                cm.sendOk("Take care and don't give up!!!")
                cm.dispose();
            } else {
                cm.sendYesNo("Good luck.");
            }
        } else if (status == 3) {
            cm.gainMeso(-0);
            cm.showEffect("quest/party/clear");
            cm.playSound("Party1/Clear");
            cm.warp(108000202, 0);
            cm.dispose();
        }
    }
}