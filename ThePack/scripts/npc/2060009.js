/*
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
			cm.sendSimple ("I drive the dolphin Taxi! What do you want to do today\r\n#L0#Learn to ride a Pig#l\r\n#L1#Go to Herb Town#l");
		} else if (status == 1) {
			if (selection == 0) {
				if(cm.getLevel() >= 70) {
					cm.teachSkill(1004, 1, 0);
					cm.sendOk("You are ready to get on the Pig.");
				} else {
					cm.sendOk("You are too weak. Please come back when you've grown stronger.");
				}
				cm.dispose();
			} else {
				cm.sendNext ("Alright, see you next time. Take care.");
			}
		} else if (status == 2) {
			cm.warp(251000100, 0);
			cm.dispose();
		}
	}
}	