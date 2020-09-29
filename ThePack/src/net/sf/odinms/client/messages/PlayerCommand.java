package net.sf.odinms.client.messages;

import net.sf.odinms.client.*;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.login.LoginServer;
import net.sf.odinms.scripting.npc.NPCScriptManager;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.server.maps.SavedLocationType;
import net.sf.odinms.tools.MaplePacketCreator;

public class PlayerCommand {

    public static boolean executePlayerCommand(MapleClient c, MessageCallback mc, String line) {
        MapleCharacter player = c.getPlayer();
        String[] splitted = line.split(" ");
        ChannelServer cserv = c.getChannelServer();
        if (splitted[0].equals("@version") || splitted[0].equals("@revision")) {
            mc.dropMessage("ThePack Revision 68");
        } else if (splitted[0].equals("@help")) {
            mc.dropMessage("============================================================");
            mc.dropMessage("                 " + LoginServer.getInstance().getServerName() + "Player Commands");
            mc.dropMessage("============================================================");
            mc.dropMessage("@bot                - Helps you with the server bot.");
            mc.dropMessage("@checkkarma         - See how much karma you have.");
            mc.dropMessage("@dispose            - Use if you're stuck.");
            mc.dropMessage("@expfix             - Fixes negative EXP.");
            mc.dropMessage("@emo                - Sets your HP to 0.");
            mc.dropMessage("@fmnpc              - Shows Shanks.");
            if (player.getKarma() > 39) {
                mc.dropMessage("@karma [raise/drop] [user] - Raises or drops someone's karma by using one of your own.");
            }
            mc.dropMessage("@hideout            - Go to your guild hideout.");
            mc.dropMessage("@rebirth            - Does Reborn/Rebirth at level 200+");
            mc.dropMessage("@save               - Saves your data.");
            mc.dropMessage("@stat [amount]      - Adds [amount] str/dex/int/luk.");
            if (player.getKarma() > 4) {
                mc.dropMessage("@warphere [person]  - Warps [person] to your map if your karma is greater than 4.");
            }
        } else if (splitted[0].equals("@checkkarma")) {
            mc.dropMessage("You currently have: " + player.getKarma() + " karma.");
        } else if (splitted[0].equals("@save")) {
            player.saveToDB(true);
            mc.dropMessage("Saved.");
        } else if (splitted[0].equals("@toggleexp") && splitted[1].equals("@toggleexp")) {
            player.ban("Trying to hack server"); // This is pro.
        } else if (splitted[0].equals("@str") || splitted[0].equals("@int") || splitted[0].equals("@luk") || splitted[0].equals("@dex")) {
            int amount = Integer.parseInt(splitted[1]);
            if (amount > 0 && amount <= player.getRemainingAp() && amount < 31997) {
                if (splitted[0].equals("@str") && amount + player.getStr() < 32001) {
                    player.setStr(player.getStr() + amount);
                    player.updateSingleStat(MapleStat.STR, player.getStr());
                } else if (splitted[0].equals("@int") && amount + player.getInt() < 32001) {
                    player.setInt(player.getInt() + amount);
                    player.updateSingleStat(MapleStat.INT, player.getInt());
                } else if (splitted[0].equals("@luk") && amount + player.getLuk() < 32001) {
                    player.setLuk(player.getLuk() + amount);
                    player.updateSingleStat(MapleStat.LUK, player.getLuk());
                } else if (splitted[0].equals("@dex") && amount + player.getDex() < 32001) {
                    player.setDex(player.getDex() + amount);
                    player.updateSingleStat(MapleStat.DEX, player.getDex());
                } else {
                    mc.dropMessage("Please make sure the stat you are trying to raise is not over 32000.");
                }
                player.setRemainingAp(player.getRemainingAp() - amount);
                player.updateSingleStat(MapleStat.AVAILABLEAP, player.getRemainingAp());
            } else {
                mc.dropMessage("Please make sure your AP is not over 32000 and you have enough to distribute.");
            }
        } else if (splitted[0].equals("@dispose")) {
            NPCScriptManager.getInstance().dispose(c);
            mc.dropMessage("Unstucked.");
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (splitted[0].equals("@rebirth") || splitted[0].equals("@reborn")) {
            if (player.getLevel() > 199) {
                player.setLevel(1);
                player.setExp(0);
                player.setReborns(player.getReborns() + 1);
                player.changeJob(MapleJob.getById(0));
                player.gainExp(-player.getExp(), false, false);
                player.updateSingleStat(MapleStat.EXP, player.getExp());
            } else {
                mc.dropMessage("You must be at least level 200.");
            }
        } else if (splitted[0].equals("@emo") && !player.inJail() && !player.isPvPMap()) {
            player.setHp(0);
            player.updateSingleStat(MapleStat.HP, 0);
        } else if (splitted[0].equals("@expfix")) {
            player.setExp(0);
            player.updateSingleStat(MapleStat.EXP, Integer.valueOf(0));
            mc.dropMessage("Your exp has been reset.");
        } else if (splitted[0].equals("@hideout")) {
            if (player.getGuildId() == 0) {
                mc.dropMessage("You are not in a guild.");
            } else {
                int mapid = cserv.getGuildSummary(player.getGuildId()).getHideout();
                if (mapid == -1) {
                    mc.dropMessage("Your guild doesn't have a hideout.");
                } else if (player.getClient().getChannel() == 1) {
                    if (player.getMapId() != mapid) {
                        player.saveLocation(SavedLocationType.HIDEOUT);
                        MapleMap target = cserv.getMapFactory().getMap(mapid);
                        player.changeMap(target, target.getPortal(0));
                        mc.dropMessage("Welcome to the Guild Hideout.");
                    } else {
                        MapleMap target = cserv.getMapFactory().getMap(player.getSavedLocation(SavedLocationType.HIDEOUT));
                        player.changeMap(target, target.getPortal(0));
                        player.clearSavedLocation(SavedLocationType.HIDEOUT);
                    }
                } else {
                    mc.dropMessage("Guilds Hideouts are in channel 1");
                }
            }
        } else if (splitted[0].equals("@fmnpc") && !player.inJail()) {
            NPCScriptManager.getInstance().start(c, 22000, null, null);
        } else if (splitted[0].equals("@karma") && player.getKarma() > 40) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[2]);
            if (splitted[1].equals("raise") && victim.getKarma() < 25) {
                player.downKarma();
                victim.upKarma();
                mc.dropMessage("You have raised " + victim + "'s karma.");
            } else if (splitted[1].equals("drop") && victim.getKarma() > -25) {
                player.downKarma();
                victim.downKarma();
                mc.dropMessage("You have dropped " + victim + "'s karma.");
            } else {
                mc.dropMessage("Either you didn't use the correct syntax or " + victim + "'s karma is too high or too low.");
            }
        } else if (splitted[0].equals("@warphere") && player.getKarma() > 4) {
            MapleCharacter victim = cserv.getPlayerStorage().getCharacterByName(splitted[1]);
            int victimid = MapleCharacter.getIdByName(splitted[1], victim.getWorld());
            if (player.isBuddy(victimid) && !victim.isGM()) {
                victim.changeMap(player.getMap(), player.getMap().findClosestSpawnpoint(player.getPosition()));
            } else {
                mc.dropMessage("Either " + victim + " is not your buddy, or " + victim + " is a GM.");
            }
        } else {
            mc.dropMessage("Player Command " + splitted[0] + " does not exist.");
            return false;
        }
        return true;
    }
}