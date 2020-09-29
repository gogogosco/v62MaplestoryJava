package net.sf.odinms.net.world.guild;

public class MapleGuildSummary implements java.io.Serializable {

    public static final long serialVersionUID = 3565477792085301248L;
    private String name;
    private int hideout;
    private short logoBG;
    private byte logoBGColor;
    private short logo;
    private byte logoColor;

    public MapleGuildSummary(MapleGuild g) {
        name = g.getName();
        hideout = g.getHideout();
        logoBG = (short) g.getLogoBG();
        logoBGColor = (byte) g.getLogoBGColor();
        logo = (short) g.getLogo();
        logoColor = (byte) g.getLogoColor();
    }

    public String getName() {
        return name;
    }

    public short getLogoBG() {
        return logoBG;
    }

    public byte getLogoBGColor() {
        return logoBGColor;
    }

    public int getHideout() {
        return hideout;
    }

    public short getLogo() {
        return logo;
    }

    public byte getLogoColor() {
        return logoColor;
    }
}
