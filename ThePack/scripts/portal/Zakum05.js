importPackage(net.sf.odinms.server.maps);
importPackage(net.sf.odinms.net.channel);
importPackage(net.sf.odinms.tools);

/*
    Zakum Entrance
*/

function enter(pi) {
	var nextMap = 211042400;
//	if (pi.getQuestStatus(100200) != net.sf.odinms.client.MapleQuestStatus.Status.COMPLETED) {
//		// do nothing; send message to player
//		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6, "You are not ready to face the boss."));
//		return false;
//	}
//	else
        if (!pi.haveItem(4001017)) {
		// do nothing; does not have Eye of Fire
		pi.getPlayer().getClient().getSession().write(MaplePacketCreator.serverNotice(6,"You do not have the Eye of Fire.  You may not face the boss."));
		return false;
	}
	else {
		pi.warp(nextMap,"west00");
		return true;
	}
}