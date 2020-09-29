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
        var nthtext = "5th";


        if (status == 0) {
            party = eim.getPlayers();
            preamble = eim.getProperty("leader" + nthtext + "preamble");
            mobcount = eim.getProperty("leader" + nthtext + "mobcount");
            if (preamble == null) {
                cm.sendOk("Hi. Welcome to the " + nthtext + " stage. This is the great trial of the PQ. Shall we get started?");
                status = 9;
            }else{
                if(!isLeader()){
                    if(mobcount == null){
                        cm.sendOk("Please tell your #bParty-Leader#k to come talk to me");
                        cm.dispose();
                    }else{
                        cm.warp(600010000,0);
                        cm.dispose();
                    }
		}
		if(mobcount == null){
                    cm.sendYesNo("You're finished?!");
		}
            }
        }else if (status == 1){
            //if (cm.mobCount(910000019)==0) {
            if (cm.mapMobCount() == 0) {
		cm.sendOk("Good job! You've killed 'em!");
            }else{
		cm.sendOk("What are you talking about? Kill those creatures!!");
		cm.dispose();
            }
        }else if (status == 2){
            cm.sendOk("You may continue to the next stage!");
        }else if (status == 3) {
            cm.clear();
            eim.setProperty("leader" + nthtext + "mobcount","done");
            var map = eim.getMapInstance(600010000);
            var members = eim.getPlayers();
            cm.warpMembers(map, members);
            cm.givePartyExp(2000, eim.getPlayers());
            cm.dispose();
        }else if (status == 10){
            eim.setProperty("leader" + nthtext + "preamble","done");
            cm.summonMobAtPosition(9300028,3000000,250000,1,604,-146);
            cm.summonMobAtPosition(9300029,1500000,125000,1,259,-146);
            cm.summonMobAtPosition(9300030,1500000,125000,1,1106,-146);
            cm.summonMobAtPosition(9300031,2000000,125000,1,849,-386);
            cm.summonMobAtPosition(9300032,2000000,125000,1,399,-386);	
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