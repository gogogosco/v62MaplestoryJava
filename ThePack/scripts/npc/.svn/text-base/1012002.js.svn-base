//Made by Moogra
//Vicious -- Old Arrow/Bow maker

importPackage(net.sf.odinms.scripting);

var status = 0;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("All right, come back next time.");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("Do you want to go to the event map?");
        } else if (status == 1) {
            if (cm.eventOn())
            cm.doEvent();
            cm.dispose();
        }
    }
}
