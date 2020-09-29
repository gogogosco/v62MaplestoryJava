/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Hidden Street : Warrior's Rocky Mountain (108000300)
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
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.completeQuest(100004);
			if (cm.getQuestStatus(100004) == net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
				cm.startQuest(100005);
				cm.sendOk("You're a true hero! Take this and Dances with Balrog will acknowledge you.");
			} else {
				cm.sendOk("You will have to collect me #b30 #t4031013##k. Good luck.")
				cm.dispose();
			}
		} else if (status == 1) {
			cm.warp(102020300, 0);
			cm.dispose();
		}
	}
}	