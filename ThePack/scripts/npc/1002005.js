importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.client);

var status = 0;
var newName;
var n = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status <= 3 && mode == 0) {
            cm.sendOk("See you around, then.");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            cm.dispose();
        }
        if (status == 0) {
            if (cm.c.getPlayer().getPet(0) == null) {
                cm.sendOk("You don't have any pets out!");
                cm.dispose();
            } else if (cm.c.getPlayer().getPet(1) == null) {
                cm.sendSimple("Would you like to change your pet's name? Choose the pet you wish to change. \r\n\#b#L1#"+cm.c.getPlayer().getPet(0).getName()+"#l");
            } else if (cm.c.getPlayer().getPet(2) == null) {
                cm.sendSimple("Would you like to change your pet's name? Choose the pet you wish to change. \r\n\#b#L1#"+cm.c.getPlayer().getPet(0).getName()+"#l\r\n\#L2#"+cm.c.getPlayer().getPet(1).getName()+"#l");
            } else {
                cm.sendSimple("Would you like to change your pet's name? Choose the pet you wish to change. \r\n\#b#L1#"+cm.c.getPlayer().getPet(0).getName()+"#l\r\n\#L2#"+cm.c.getPlayer().getPet(1).getName()+"#l\r\n\#L3#"+cm.c.getPlayer().getPet(2).getName()+"#l\r\n#k");
            }
    
        } else if (status == 1) {
            if (selection == 1) {
                n = 0;
                cm.sendYesNo("Are you sure you want to change #b"+cm.c.getPlayer().getPet(n).getName()+"#k's name?");
            } else if (selection == 2) {
                n = 1;
                cm.sendYesNo("Are you sure you want to change #b"+cm.c.getPlayer().getPet(n).getName()+"#k's name?");
            } else if (selection == 3) {
                n = 2;
                cm.sendYesNo("Are you sure you want to change #b"+cm.c.getPlayer().getPet(n).getName()+"#k's name?");
            } else {
                cm.sendOk("Alright, come again.");
            }
        } else if (status == 2) {
            //if(cm.haveItem(5170000)) {
                cm.sendGetTextNew("Alright, enter what you want #b"+cm.c.getPlayer().getPet(n).getName()+"#k's name to be below. Be wary that it will reload your character.\r\n\ ");
           // } else {
          //      cm.sendOk("You need a Pet Name Tag to change your pet's name!");
            //    cm.dispose();
          //  }
        } else if (status == 3) {
            newName = cm.getTextNew();
            if(newName == null) {
                cm.sendOk("newName is null.");
                cm.dispose();
            }
            if (newName.length() < 3 || newName.length() > 12) {
                cm.sendOk("Your pet's name must be between 3 ~ 12 characters..");
                cm.dispose();
            } else {
                cm.c.getPlayer().getPet(n).setName(newName);
                cm.c.getPlayer().getClient().getSession().write(MaplePacketCreator.updatePet(cm.getPlayer().getPet(n), true));
                cm.c.getPlayer().getClient().getSession().write(MaplePacketCreator.getCharInfo(cm.getChar()));
                cm.c.getPlayer().getMap().removePlayer(cm.getChar());
                cm.c.getPlayer().getMap().addPlayer(cm.getChar());
                //cm.gainItem(5170000,-1);
                cm.c.getPlayer().getPet(n).saveToDb();
                cm.sendOk("Your pet should be saved!");
                cm.dispose();
            }
        }
    }
}