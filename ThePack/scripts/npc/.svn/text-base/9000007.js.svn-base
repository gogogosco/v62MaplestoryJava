var status = 0;
var party;
var preamble;
var mobcount;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

         
    if (mode == -1) {
        cm.dispose();//ExitChat
    }else if (mode == 0){
        cm.dispose();//No
    }else{		    //Regular Talk
        if (mode == 1)
            status++;
        else
            status--;
        var eim = cm.getPlayer().getEventInstance(); 
        var nthtext = "3rd";


        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            mobcount = eim.getProperty("leader" + nthtext + "mobcount");
            if (preamble == null) {
                cm.sendOk("Hi. Welcome to the " + nthtext + " stage. This is the class test. Collect 12 Black Charms!  Shall we get started?");
                status = 9;
            }else{
                if(!isLeader()){
                    if(mobcount == null){
                        cm.sendOk("Please tell your #bParty-Leader#k to come talk to me");
                        cm.dispose();
                    }else{
                        cm.warp(910000013,0);
                        cm.dispose();
                    }
		}
		if(mobcount == null){
                    cm.sendSimple("What's up?\r\n#L0#I've got your charms!#l\r\n#L1#There's something wrong here.#l");
		}
            }
        }else if (status == 1){
            if (selection == 0) {
		if(cm.itemQuantity(4031059) >= 12){
                    cm.sendOk("Good job! you have collected all 12 #b#t4031059#'s#k");
		}else{
                    cm.sendOk("Sorry you don't have all 12 #b#t4031059#'s#k");
                    cm.dispose();
		}
            } else if (selection == 1) {
		//if (cm.mobCount(910000007)==0) {
		if (cm.mapMobCount() == 0) {
                    cm.sendOk("Good job! You've killed 'em!");
		}else{
                    cm.sendOk("What are you talking about? Kill those creatures!!");
                    cm.dispose();
		}
            }
        }else if (status == 2){
            cm.sendOk("You may continue to the next stage!");
        }else if (status == 3){
            cm.clear();
            eim.setProperty("leader" + nthtext + "mobcount","done");
            var map = eim.getMapInstance(910000013);
            var members = eim.getPlayers();
            cm.warpMembers(map, members);
            cm.givePartyExp(1000, eim.getPlayers());
            cm.dispose();
        }else if (status == 10){
            eim.setProperty("leader" + nthtext + "preamble","done");
            cm.summonMobAtPosition(9001000,250000,25000,5,-827,102);
            cm.summonMobAtPosition(9001001,250000,25000,5,-1412,102);	
            cm.summonMobAtPosition(9001002,250000,25000,5,-1458,-108);	
            cm.summonMobAtPosition(9001003,250000,25000,5,-848,-108);	
            cm.dispose();
        }           
    }
}
     
     
function isLeader(){
    if(cm.getParty() == null){
        return false;
    }else{
        return cm.isLeader();
    }
}