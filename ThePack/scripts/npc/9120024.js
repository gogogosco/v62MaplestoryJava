function start() {
    cm.sendSimple ("Hello, I sell Pirate weapons and acessories. What do you want?\r\n#L0#Knuckles#l\r\n#L1#Guns#l\r\n#L2#Bullets#l\r\n#L3#Hats\r\n#L4#Overalls\r\n#L5#Gloves\r\n#L6#Shoes\r\n#L7#Scrolls");
}

function action(mode, type, selection) {
    cm.dispose();
    cm.openShop(5000+selection);//test
}