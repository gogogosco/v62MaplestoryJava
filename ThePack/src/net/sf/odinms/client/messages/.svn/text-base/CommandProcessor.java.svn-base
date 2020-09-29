package net.sf.odinms.client.messages;

import java.lang.management.ManagementFactory;
import java.sql.*;
import java.util.*;
import javax.management.*;
import net.sf.odinms.client.*;
import net.sf.odinms.database.DatabaseConnection;
import net.sf.odinms.net.channel.ChannelServer;
import net.sf.odinms.net.channel.handler.GeneralchatHandler;
import net.sf.odinms.scripting.npc.NPCScriptManager;
import net.sf.odinms.server.MapleShopFactory;
import net.sf.odinms.server.TimerManager;
import net.sf.odinms.server.life.MapleLifeFactory;
import net.sf.odinms.server.maps.MapleMap;
import net.sf.odinms.tools.*;

public class CommandProcessor implements CommandProcessorMBean {

    private static CommandProcessor instance = new CommandProcessor();
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GeneralchatHandler.class);
    private static List<Pair<MapleCharacter, String>> gmlog = new LinkedList<Pair<MapleCharacter, String>>();
    private static Runnable persister;
    private static String type;
    private static int monsterId,  quantity,  gmlvl;
    static {
        persister = new PersistingTask();
        TimerManager.getInstance().register(persister, 62000);
    }

    public static CommandProcessor getInstance() {
        return instance;
    }

    private CommandProcessor() {
    }

    public static class PersistingTask implements Runnable {

        @Override
        public void run() {
            synchronized (gmlog) {
                Connection con = DatabaseConnection.getConnection();
                try {
                    PreparedStatement ps = con.prepareStatement("INSERT INTO gmlog (cid, command) VALUES (?, ?)");
                    for (Pair<MapleCharacter, String> logentry : gmlog) {
                        ps.setInt(1, logentry.getLeft().getId());
                        ps.setString(2, logentry.getRight());
                        ps.executeUpdate();
                    }
                    ps.close();
                } catch (SQLException e) {
                    log.error("error persisting cheatlog", e);
                }
                gmlog.clear();
            }
        }
    }

    public static void registerMBean() {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        try {
            mBeanServer.registerMBean(instance, new ObjectName("net.sf.odinms.client.messages:name=CommandProcessor"));
        } catch (Exception e) {
            log.error("Error registering CommandProcessor MBean");
        }
    }

    public static boolean processCommand(MapleClient c, String line) {
        return processCommandInternal(c, new ServernoticeMapleClientMessageCallback(c), line);
    }

    public String processCommandJMX(int cserver, int mapid, String command) {
        ChannelServer cserv = ChannelServer.getInstance(cserver);
        if (cserv == null) {
            return "The specified channel Server does not exist in this serverprocess";
        }
        MapleClient c = new MapleClient(null, null, new MockIOSession());
        MapleCharacter chr = MapleCharacter.getDefault(c, 26023);
        c.setPlayer(chr);
        chr.setName("/---------jmxuser-------------\\");
        MapleMap map = cserv.getMapFactory().getMap(mapid);
        if (map != null) {
            chr.setMap(map);
            map.addPlayer(chr);
        }
        cserv.addPlayer(chr);
        MessageCallback mc = new StringMessageCallback();
        try {
            processCommandInternal(c, mc, command);
        } finally {
            if (map != null) {
                map.removePlayer(chr);
            }
            cserv.removePlayer(chr);
        }
        return mc.toString();
    }

    private static boolean processCommandInternal(MapleClient c, MessageCallback mc, String line) {
        int gm = c.getPlayer().gmLevel();
        if (line.charAt(0) == '!' && gm > 0) {
            if (isExist(line)) {
                if (makeCustomSummon(c, type, monsterId, quantity, gmlvl)) {
                    return makeCustomSummon(c, type, monsterId, quantity, gmlvl);
                }
            }
            if (gm > 0) {
                if (DonatorCommand.executeDonatorCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 1) {
                if (InternCommand.executeInternCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 2) {
                if (GMCommand.executeGMCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 3) {
                if (SuperCommand.executeSuperCommand(c, mc, line)) {
                    return true;
                }
            }
            if (gm > 4) {
                if (AdminCommand.executeAdminCommand(c, mc, line, log, gmlog, persister)) {
                    return true;
                }
            }
            return false;
        } else if (line.charAt(0) == '@') {
            return gm > -1 && PlayerCommand.executePlayerCommand(c, mc, line);
        }
        return false;
    }

    private static boolean isExist(String name) {
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM newcommands WHERE name=\"" + name + "\"");
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                return false;
            }
            type = rs.getString("type");
            monsterId = rs.getInt("monsterid");
            quantity = rs.getInt("quantity");
            gmlvl = rs.getInt("gmlvl");
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            return false;
        }
        return true;
    }

    public static boolean makeCustomSummon(MapleClient c, String type, int monsterid, int quantity, int gmlvl) {
        MapleCharacter player = c.getPlayer();
        if (player.gmLevel() >= gmlvl) {
            if (type.equals("spawn")) {
                for (int i = 0; i < quantity; i++) {
                    player.getMap().spawnMonsterOnGroudBelow(MapleLifeFactory.getMonster(monsterid), player.getPosition());
                }
            } else if (type.equals("npc")) {
                NPCScriptManager.getInstance().start(c, monsterid, null, null);
            } else if (type.equals("shop")) {
                MapleShopFactory.getInstance().getShop(monsterid).sendShop(c);
            } else {
                return false;
            }
        } else {
            player.dropMessage("Your GM level isn't high enough or the custom command failed.");
        }
        return true;
    }
}
