package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleClient;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class MapleTVHandler extends AbstractMaplePacketHandler {

	@Override
	public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
	/*
		D1 00 - header
		07 00 4F 72 69 67 69 6E 32 - "Origin2"
		00 00 00 00 - ?
		80 7F 3D 36 - (910000000 -> ?) Any suggestions?

		The MapleTV packet for Origin2

		You could check who's actually watched the MapleTV here or atleast passed by...
		This is why I don't have a fuckin clue why nexon implemented this packet.
		If there's any suggestions, feel free to PM TheRamon
	*/
		String chString = slea.readMapleAsciiString();
		slea.readInt();
		slea.readInt();
		//c.getSession().write(MaplePacketCreator.serverNotice(5, chString));
	}
}