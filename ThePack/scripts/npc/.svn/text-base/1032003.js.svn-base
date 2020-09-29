/* Shane
	who is a person, NOT a house.

	1032004 is louis (escape)

2050: JQ1: 101000100 [end npc: 1043000, item: 4031020 x1]
2051: JQ2: 101000102 [end npc: 1043001, item: 4031032 x1]
*/

importPackage(net.sf.odinms.client);

var status = 0;
var zones = 0;
var names = Array("Forest of Patience 1", "Forest of Patience 2");
var maps = Array(101000100, 101000102);
var selectedMap = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.sendOk("Alright, see you next time.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendYesNo("Hello. Would you like to visit my secret tree fort?");
			if (!(cm.getQuestStatus(2051).equals(MapleQuestStatus.Status.NOT_STARTED))) {
			zones = 2;
			}
			else if (!(cm.getQuestStatus(2050).equals(MapleQuestStatus.Status.NOT_STARTED))) {
			zones = 1;
			}
			else {
			zones = 0;
			}
		} else if (status == 1) {
			if (zones == 0) {
			cm.sendOk("Oh, but I can't just show it to anyone. Sorry.");
			cm.dispose();
			} else {
			var selStr = "Okay, which fort do you want to visit?#b";
			for (var i = 0; i < zones; i++) {
				selStr += "\r\n#L" + i + "#" + names[i] + "#l";
			}
			cm.sendSimple(selStr);
			}
		} else if (status == 2) {
			selectedMap = selection;
			cm.warp(maps[selectedMap],0);
			cm.dispose();
		} 
	}
}	