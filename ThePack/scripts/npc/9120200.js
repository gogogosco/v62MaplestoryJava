function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	}else {
		if (mode == 0) {
			cm.sendOk("If you want to return to #m801000000#, then talk to me");
			cm.dispose();
			return;
		} if (mode == 1) {
			status++;
		}
		if (status == 0) {
			cm.sendYesNo("Here you are, right in front of the hideout! What? You want to\r\nreturn to #m801000000#?");
		} if (status == 1) {
			cm.warp("801000000");
			cm.dispose();
		}
	}
}