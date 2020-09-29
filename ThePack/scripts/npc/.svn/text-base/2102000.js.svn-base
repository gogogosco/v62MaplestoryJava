var status = 0;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (status == 0) {
		cm.sendYesNo("Hello there. Welcome to the entrance to #bValvendale#k. A brand new town that just opened up. Ariant was hit by a severe sandstorm that covered the entire city, so now, we made Valvendale right here where the Amorian Challenge! Party Quest is suppose to be. But I've rambled, would you like to go in?");
		status++;
	} else {
		if ((status == 1 && type == 1 && selection == -1 && mode == 0) || mode == -1) {
			cm.dispose();
		} else {
			if (status == 1) {
					cm.warp(670010100, 1);
					cm.dispose();
				} else {
					cm.sendOk("You need at least one Orbis Rock Scroll.");
					cm.dispose();
				}
			}
		}
	}
