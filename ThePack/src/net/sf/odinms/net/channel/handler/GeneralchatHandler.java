package net.sf.odinms.net.channel.handler;

import net.sf.odinms.client.MapleCharacter;
import net.sf.odinms.client.MapleClient;
import net.sf.odinms.client.messages.CommandProcessor;
import net.sf.odinms.net.AbstractMaplePacketHandler;
import net.sf.odinms.tools.MaplePacketCreator;
import net.sf.odinms.tools.StringUtil;
import net.sf.odinms.tools.data.input.SeekableLittleEndianAccessor;

public class GeneralchatHandler extends AbstractMaplePacketHandler {

    @Override
    public void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        String text = slea.readMapleAsciiString();
        int show = slea.readByte();
        MapleCharacter player = c.getPlayer();
        int gmlvl = player.gmLevel();
        boolean chatwhite = gmlvl > 2 && player.getGMChat() && c.getChannelServer().allowGmWhiteText();
        if ((StringUtil.countCharacters(text, '@') > 4 || player.getCanTalk() == 2) && gmlvl < 3) {
            text = "DISREGARD THAT I SUCK COCK";
        }
        if (!CommandProcessor.processCommand(c, text)) {
            if ((!text.startsWith("!") && gmlvl > 0) || !text.startsWith("@")) {
                player.getMap().broadcastMessage(MaplePacketCreator.getChatText(player.getId(), text, chatwhite, show));
            }
        }
    }
}