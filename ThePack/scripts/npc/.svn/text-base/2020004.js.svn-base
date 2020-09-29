var status = 0;

function start() {
    status=-1;
    action(1,0,0);
}
function action(mode, type, selection) {
    if (status == 0) {
        cm.sendNext ("Hi #b#h ##k. I am the NX seller. Which of the following deals do you want?\r\n#L0##b1000 NX (10,000,000 mesos)#k #l\r\n#L1##b10000 NX (900,000,000 mesos)#k #l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getMeso() > 10000000) {
                status = 2;
                cm.sendOk ("What would you like?\r\n#L1#Paypal/Pay By Cash\r\n#L2#Nexon Game Card Cash\r\n#L3#Maple Points");
            }
            else {
                cm.sendOk("You don't have enough mesos!");
                cm.dispose();
            }
        }
        else if (selection == 1) {
            if (cm.getMeso() > 90000000) {
                status = 3;
                cm.sendOk ("What would you like?\r\n#L1#Paypal/Pay By Cash\r\n#L2#Nexon Game Card Cash\r\n#L3#Maple Points");
            }
            else {
                cm.sendOk("You don't have enough mesos!");
                cm.dispose();
            }
        }
    }  else if (status == 2) {
        if (selection == 1) cm.modifyNX(1, 1000);
        else if (selection == 2) cm.modifyNX(4, 1000);
        else if (selection == 3) cm.modifyNX(2, 1000);
    } else if (status == 3) {
        if (selection == 1) cm.modifyNX(1, 10000);
        else if (selection == 2) cm.modifyNX(4, 10000);
        else if (selection == 3) cm.modifyNX(2, 10000);
    }
}