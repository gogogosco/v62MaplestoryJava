/*
	NX Cash Selling NPC
	By V1ral from www.ancient-ms.net
	Put it as any NPC you have free.
	Change prices and ammounts to your liking
 */
function start() {
    cm.sendSimple ("Would you like to buy some NX?\r\n#r#L0##e10,000 NX - 100,000,000 Mesos#n#l\r\n#k#L1##e25,000 NX - 250,000,000 Mesos#n#l#k");
}

function action(mode, type, selection) {
    cm.dispose();
    switch(selection){
        case 0: 
            if(cm.getMeso() >= 100000000){
                cm.sendOk("Thanks, 10,000 NX points have been added to your account.");
                cm.gainNX(10000);
                cm.gainMeso(-100000000);
                cm.dispose();
            }else{
                cm.sendOk("You do not have 100,000,000 mesos.");
                cm.dispose();
            }
            break;
        case 1: 
            if(cm.getMeso() >= 250000000){
                cm.sendOk("Thanks, 25,000 NX points have been added to your account.");
                cm.gainNX(25000);
                cm.gainMeso(-250000000);
                cm.dispose();
            }else{
                cm.sendOk("You do not have 250,000,000 mesos.");
                cm.dispose();
            }
            break;
    }
}