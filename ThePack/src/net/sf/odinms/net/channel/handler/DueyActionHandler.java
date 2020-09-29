/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.MapleInventoryType;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.server.MapleDueyActions;
import net.sf.odinms.server.MapleInventoryManipulator;
import net.sf.odinms.server.MapleItemInformationProvider;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

/**
 *
 * @author Patrick/PurpleMadness
 */

public class DueyActionHandler extends AbstractMaplePacketHandler {

	@Override
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
		byte type = slea.readByte();
		boolean senditem = true;
		boolean sendmesos = true;

		if (type == MapleDueyActions.C_SEND_ITEM.getCode()) { //send item
			byte invid = slea.readByte();
			byte slot = slea.readByte();
			slea.readByte();
			short quantity = slea.readShort();
			senditem = slot == 0 && invid == 0 && quantity == 0;
			int mesos = slea.readInt();
			sendmesos = mesos == 0;
			String name = slea.readMapleAsciiString();
			slea.readByte();
			MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

			if (c.getChannelServer().characterNameExists(name)) {
				if (sendmesos && !ii.isDropRestricted(invid)) {
					c.getPlayer().gainMeso(-mesos, false);
				}
				if (senditem && !ii.isDropRestricted(invid)) {
					MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.getByType(invid), slot, quantity, false);
				}
				c.getSession().write(MaplePacketCreator.sendDueyAction(MapleDueyActions.S_SUCCESSFULLY_SENT.getCode()));
			} else {
				c.getSession().write(MaplePacketCreator.sendDueyAction(MapleDueyActions.S_ERROR_SENDING.getCode()));
			}
		} else if (type == MapleDueyActions.C_CLOSE_DUEY.getCode()) { //close duey
			//do nothing
		}
	}
}
