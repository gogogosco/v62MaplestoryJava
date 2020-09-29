var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("Haven't you finished the training program yet? If you want to leave this place, please do not hesitate to tell me.");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("Are you done with your training? If you wish, I will send you out from this training camp.");
        } else if (status == 1) {
            cm.sendNext("Then, I will send you out from here. Good job.");
        } else if (status == 2) {
            cm.warp(40000, 0);
            cm.dispose();
        }
    }
}