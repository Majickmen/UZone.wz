//------------------------------------Static Values--------------------------------------
include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTechFP.js");
include("script/campaign/transitionTech.js");
var COTruck;
if (difficulty === INSANE)
{
	var lzWave = 6;
	var Wave = 6;
	var difnum = 4;
	var pdroids = [cTempl.tpvwsen];
}
if (difficulty === HARD)
{
	var lzWave = 4;
	var Wave = 4;
	var difnum = 3;
	var pdroids = [cTempl.tpphthg, cTempl.tpphthg, cTempl.tpphthg, cTempl.tpphtc2, cTempl.tpphtc2, cTempl.tpphtre];
}
else
{
	var lzWave = 3;
	var Wave = 3;
	var difnum = 2;
	var pdroids = [cTempl.tpchthg, cTempl.tpchthg, cTempl.tpchthg, cTempl.tpchthg, cTempl.tpchtc2, cTempl.tpchtc2, cTempl.tpchtc2, cTempl.tpchtc2, cTempl.tpchtre, cTempl.tpchtre];
}
const SCAVENGER_PLAYER = 7;
const CORes0 = [
	"R-Wpn-MG1Mk1", "R-Sys-Engineering02", "R-Defense-WallUpgrade06",
	"R-Struc-Materials06", "R-Vehicle-Engine03", "R-Vehicle-Metals03",
	"R-Cyborg-Metals03", "R-Wpn-Cannon-Accuracy02", "R-Wpn-Cannon-Damage04",
	"R-Wpn-Cannon-ROF01", "R-Wpn-Flamer-Damage03", "R-Wpn-Flamer-ROF01",
	"R-Wpn-MG-Damage05", "R-Wpn-MG-ROF02", "R-Wpn-Mortar-Acc01",
	"R-Wpn-Mortar-Damage03", "R-Wpn-Mortar-ROF01", "R-Wpn-Rocket-Accuracy02",
	"R-Wpn-Rocket-Damage04", "R-Wpn-Rocket-ROF03", "R-Wpn-RocketSlow-Accuracy03",
	"R-Wpn-RocketSlow-Damage04", "R-Sys-Sensor-Upgrade01"
];
const CORes1 = [
	"R-Vehicle-Engine04", "R-Vehicle-Metals05", "R-Cyborg-Metals05",
	"R-Wpn-Cannon-Damage05","R-Wpn-Cannon-ROF02", "R-Wpn-Flamer-Damage06",
	"R-Wpn-Flamer-ROF03", "R-Wpn-MG-Damage07", "R-Wpn-MG-ROF03",
	"R-Wpn-Mortar-Acc02", "R-Wpn-Mortar-Damage05", "R-Wpn-Mortar-ROF02",
	"R-Wpn-Rocket-Damage06", "R-Wpn-RocketSlow-Damage05", "R-Wpn-Bomb-Damage01",
	"R-Wpn-RocketSlow-ROF02", "R-Wpn-Howitzer-ROF01", "R-Wpn-AAGun-ROF03",
	"R-Wpn-Howitzer-Damage07", "R-Cyborg-Armor-Heat01", "R-Vehicle-Armor-Heat01",
	"R-Wpn-AAGun-Damage03", "R-Wpn-AAGun-Accuracy01", "R-Struc-VTOLPad-Upgrade02"
];
const CORes2 = [
	"R-Vehicle-Engine06", "R-Vehicle-Metals06", "R-Cyborg-Metals06",
	"R-Wpn-Cannon-Damage06","R-Wpn-Cannon-ROF03", "R-Wpn-Mortar-Damage06",
	"R-Wpn-Mortar-ROF03", "R-Wpn-RocketSlow-Damage06", "R-Wpn-RocketSlow-ROF03",
	"R-Wpn-Howitzer-ROF03", "R-Wpn-Howitzer-Damage09", "R-Cyborg-Armor-Heat03",
	"R-Vehicle-Armor-Heat03", "R-Wpn-Bomb-Damage02", "R-Wpn-AAGun-Accuracy02",
	"R-Wpn-Howitzer-Accuracy02", "R-Struc-VTOLPad-Upgrade03"
];
//---------------------------------------Events------------------------------------------
camAreaEvent("playerArea", function()
{
	camEnableFactory("COout1Factory");
	camEnableFactory("scavFactory");
	hackAddMessage("FAST_BASE0", PROX_MSG, CAM_HUMAN_PLAYER);
	hackAddMessage("FAST_BASE1", PROX_MSG, CAM_HUMAN_PLAYER);
	camSendReinforcement(CAM_HUMAN_PLAYER, camMakePos("landingZone"), pdroids, CAM_REINFORCE_TRANSPORT,
		{
			entry: { x: 0, y: 99 },
			exit: { x: 6, y: 0 },
		}
	);
});
camAreaEvent("removeObjectiveBlip0", function()
{
	hackRemoveMessage("FAST_BASE0", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip1", function()
{
	hackRemoveMessage("FAST_BASE1", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip2", function()
{
//	camPlayVideos([sound power surge detected]);
	derrickBlips();
	hackRemoveMessage("FAST_OBJ0", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip3", function()
{
	hackRemoveMessage("FAST_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip4", function()
{
	hackRemoveMessage("FAST_OBJ2", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip5", function()
{
	hackRemoveMessage("FAST_OBJ3", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip6", function()
{
	hackRemoveMessage("FAST_OBJ4", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip7", function()
{
	hackRemoveMessage("FAST_BASE2", PROX_MSG, CAM_HUMAN_PLAYER);
});
camAreaEvent("removeObjectiveBlip8", function()
{
	hackRemoveMessage("FAST_BASE3", PROX_MSG, CAM_HUMAN_PLAYER);
});
//--------------------------------------Functions----------------------------------------
function camEnemyBaseEliminated_westBase()
{
	camSetFactoryData("COout1Factory", {
		assembly: "COO1Fac1Ass",
		order: CAM_ORDER_ATTACK,
		groupSize: 3,
		throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
		templates: [cTempl.comhhmg, cTempl.comhca2, cTempl.comhrbb]
	});
	camEnableFactory("COout1Factory");
	camPlayVideos({video: "MBDEMO1_MSG", type: MISS_MSG});
}
function camEnemyBaseEliminated_COwestBase()
{
	camCompleteRequiredResearch(CORes0, THE_COLLECTIVE);
	camEnableFactory("CObase1Vtol1");
	camEnableFactory("CObase1Vtol2");
	setTimer("COTransWave", camChangeOnDiff(camSecondsToMilliseconds(120)));
	queue("COMSG3", camMinutesToMilliseconds(5));
	powerDetect();
}
function powerDetect()
{
	hackAddMessage("FAST_OBJ0", PROX_MSG, CAM_HUMAN_PLAYER);
//	camPlayVideos(video power surge detected);
}
function eventDestroyed(obj)
{
	if (COTruck && (obj.id === COTruck.id))
	{
		var acrate = addFeature("Crate", obj.x, obj.y);
		addLabel(acrate, "newArtiLabel");
		camSetArtifacts({"newArtiLabel": { tech: "R-Sys-Engineering02" }});
	}
}
function derrickBlips()
{
	hackAddMessage("FAST_OBJ1", PROX_MSG, CAM_HUMAN_PLAYER);
	hackAddMessage("FAST_OBJ2", PROX_MSG, CAM_HUMAN_PLAYER);
	hackAddMessage("FAST_OBJ3", PROX_MSG, CAM_HUMAN_PLAYER);
	hackAddMessage("FAST_OBJ4", PROX_MSG, CAM_HUMAN_PLAYER);
}
function COTransWave()
{
	if (lzWave !== 0)
	{
		lzWave = lzWave - 1;
		var TankNum = 2 * difnum;
		var list = [cTempl.commca2, cTempl.commhmg];
		var tdroids = [];
		for (var i = 0; i < TankNum; ++i)
		{
			tdroids.push(list[camRand(list.length)]);
		}
		camSendReinforcement(THE_COLLECTIVE, camMakePos("COTrans"), tdroids, CAM_REINFORCE_TRANSPORT,
			{
				entry: { x: 99, y: 42 },
				exit: { x: 0, y: 0 },
				order: CAM_ORDER_ATTACK,
				data: {
					regroup: false,
					count: -1,
					pos: camMakePos("enemyLZ"),
					repair: 33,
				},
			}
		);
	}
	if (lzWave === 0)
	{
		removeTimer("COTransWave");
	}
}
function COMSG3()
{
	camPlayVideos({video: "MBDEMO3_MSG", type: MISS_MSG});
}
function COMSG4()
{
	camPlayVideos({video: "MBDEMO4_MSG", type: MISS_MSG});
}
function camArtifactPickup_CObase1Vtol1()
{
	removeTimer("COMSG4");
}
function camEnemyBaseEliminated_COnorthBase()
{
	camCompleteRequiredResearch(CORes1, THE_COLLECTIVE);
	camEnableFactory("CObase1Factory1");
	camEnableFactory("CObase1Factory2");
	camEnableFactory("CObase1Factory3");
	camPlayVideos({video: "MBDEMO2_MSG", type: MISS_MSG});
	hackAddMessage("FAST_BASE2", PROX_MSG, CAM_HUMAN_PLAYER);
}
function camEnemyBaseEliminated_COnorthEastBase()
{
	camCompleteRequiredResearch(CORes2, THE_COLLECTIVE);
	camEnableFactory("CObase2Factory1");
	camEnableFactory("CObase2Factory2");
	camEnableFactory("CObase2Vtol1");
	camEnableFactory("CObase2Vtol2");
	camEnableFactory("CObase2Vtol3");
	camEnableFactory("CObase2Cyb1");
	camEnableFactory("CObase2Cyb2");
	camEnableFactory("CObase2Cyb3");
	camEnableFactory("CObase2Cyb4");
	setTimer("COGroundWave", camChangeOnDiff(camSecondsToMilliseconds(180)));
	camPlayVideos({video: "MBDEMO5_MSG", type: MISS_MSG});
	hackAddMessage("FAST_BASE3", PROX_MSG, CAM_HUMAN_PLAYER);
}
function COGroundWave()
{
	if (Wave !== 0)
	{
		Wave = Wave - 1;
		var TankNum = 3 * difnum;
		var list = [cTempl.comhbom, cTempl.comhhmg, cTempl.comhca2, cTempl.comhrbb, cTempl.comhsen];
		var droids = [];
		for (var i = 0; i < TankNum; ++i)
		{
			droids.push(list[camRand(list.length)]);
		}
		camSendReinforcement(THE_COLLECTIVE, camMakePos("COGround"), droids, CAM_REINFORCE_GROUND);
	}
	if (Wave === 0)
	{
		removeTimer("COGroundWave");
	}
}
function SetupMission()
{
	camCompleteRequiredResearch(ALPHA_RESEARCH_NEW, SCAV_7);
	camCompleteRequiredResearch(ALPHA_RESEARCH_NEW, THE_COLLECTIVE);
	camCompleteRequiredResearch(ALPHA_RESEARCH_FASTPLAY, CAM_HUMAN_PLAYER);
	for (var x = 0, l = STRUCTS_ALPHA.length; x < l; ++x)
	{
		enableStructure(STRUCTS_ALPHA[x], CAM_HUMAN_PLAYER);
	}
	enableResearch("R-Wpn-AAGun03", CAM_HUMAN_PLAYER);
}
//------------------------------------------
function eventStartLevel()
{
	var startpos = getObject("startPosition");
	camSetStandardWinLossConditions(CAM_VICTORY_STANDARD, undefined);
	var lz = getObject("landingZone");
	var enemyLZ = getObject("enemyLandingZone");
	centreView(startpos.x, startpos.y);
	setNoGoArea(lz.x, lz.y, lz.x2, lz.y2, CAM_HUMAN_PLAYER);
	setNoGoArea(enemyLZ.x, enemyLZ.y, enemyLZ.x2, enemyLZ.y2, THE_COLLECTIVE);
	setReinforcementTime(-1);
	setMissionTime(-1);
	SetupMission();
	setPower(5000, CAM_HUMAN_PLAYER);
	camSetEnemyBases({
		"westBase": {
			cleanup: "lastScav",
			detectMsg: "FAST_BASE0",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"COwestBase": {
			cleanup: "COOutpost1",
			detectMsg: "FAST_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"COnorthBase": {
			cleanup: "COOutpost2"
		},
		"COnorthEastBase": {
			cleanup: "COBase1",
			detectMsg: "FAST_BASE2",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"COsouthEastBase": {
			cleanup: "COBase2",
			detectMsg: "FAST_BASE3",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
	});
//-------------------------------------Artifacts-----------------------------------------
	camSetArtifacts({
		"scavFactory": { tech: "R-Vehicle-Prop-Tracks" },
		"COout1Factory": { tech: ["R-Vehicle-Prop-Hover", "R-Vehicle-Engine03"] },
		"COout1Pow": { tech: "R-Struc-Power-Upgrade01" },
		"COout1Res": { tech: ["R-Wpn-Cannon3Mk1", "R-Struc-Research-Upgrade01"] },
		"hardSensor": { tech: "R-Sys-Sensor-Upgrade01" },
		"hardCB": { tech: "R-Sys-CBSensor-Turret01" },
		"CObase1Factory1": { tech: "R-Wpn-MG4" },
		"CObase1Vtol1": { tech: "R-Vehicle-Prop-VTOL" },
		"CObase1Res1": { tech: "R-Wpn-MG-ROF02" },
		"CObase1Res2": { tech: ["R-Wpn-Cannon-ROF01", "R-Wpn-MG-ROF03"] },
		"COhowitzer": { tech: "R-Wpn-HowitzerMk1" },
		"CObase1Vtol2": { tech: "R-Wpn-Bomb01" },
		"CObase1Factory2": { tech: "R-Wpn-Cannon4AMk1" },
		"CObase1Factory3": { tech: "R-Wpn-Mortar3" },
		"COripple": { tech: "R-Wpn-Rocket06-IDF" },
	});
//----------------------------------Enemy Factories--------------------------------------
	camSetFactories({
		"scavFactory": {
			assembly: "scavass",
			order: CAM_ORDER_DEFEND,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(10)),
			templates: [cTempl.bjeepheavy, cTempl.rbuggy, cTempl.firecan]
		},
		"COout1Factory": {
			assembly: "COO1Fac1Ass",
			order: CAM_ORDER_COMPROMISE,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			data: {
				pos: camMakePos("scavass"),
			},
			templates: [cTempl.comhhmg, cTempl.comhca2, cTempl.comhrbb]
		},
		"CObase1Factory1": {
			assembly: "COB1Fac1Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			templates: [cTempl.comhhmg, cTempl.comhca2, cTempl.comhrbb]
		},
		"CObase1Factory2": {
			assembly: "COB1Fac2Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			templates: [cTempl.comhhmg, cTempl.comhca2, cTempl.comhrbb]
		},
		"CObase1Factory3": {
			assembly: "COB1Fac3Ass",
			order: CAM_ORDER_DEFEND,
			groupSize: 12,
			maxSize: 12,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			templates: [cTempl.cohtca3, cTempl.cohtltt, cTempl.cohtass]
		},
		"CObase1Vtol1": {
			assembly: "COB1Vtol1Ass",
			order: CAM_ORDER_ATTACK,
			maxSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			templates: [cTempl.colvrot, cTempl.colvbom]
		},
		"CObase1Vtol2": {
			assembly: "COB1Vtol2Ass",
			order: CAM_ORDER_ATTACK,
			maxSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			templates: [cTempl.colvrot, cTempl.colvbom]
		},
		"CObase2Factory1": {
			assembly: "COB2Fac2Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			templates: [cTempl.cohtltt, cTempl.cohtass, cTempl.cohthvc]
		},
		"CObase2Factory2": {
			assembly: "COB2Fac2Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(50)),
			templates: [cTempl.cohtltt, cTempl.cohtass, cTempl.cohthvc]
		},
		"CObase2Vtol1": {
			assembly: "COB2Vtol1Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			maxSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			templates: [cTempl.colvbom]
		},
		"CObase2Vtol2": {
			assembly: "COB2Vtol2Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			maxSize: 6,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			templates: [cTempl.colvlan]
		},
		"CObase2Vtol3": {
			assembly: "COB2Vtol3Ass",
			order: CAM_ORDER_DEFEND,
			groupSize: 5,
			maxSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(45)),
			templates: [cTempl.colvlan]
		},
		"CObase2Cyb1": {
			assembly: "COB2Cyb1Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			templates: [cTempl.cocybag, cTempl.npcybr, cTempl.npcybc]
		},
		"CObase2Cyb2": {
			assembly: "COB2Cyb2Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			templates: [cTempl.cocybag, cTempl.npcybr, cTempl.npcybc]
		},
		"CObase2Cyb3": {
			assembly: "COB2Cyb3Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			templates: [cTempl.cocybag, cTempl.npcybr, cTempl.npcybc]
		},
		"CObase2Cyb4": {
			assembly: "COB2Cyb4Ass",
			order: CAM_ORDER_ATTACK,
			groupSize: 3,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
			templates: [cTempl.cocybag, cTempl.npcybr, cTempl.npcybc]
		},
	});
//----------------------------Start of Mission Event Queue-------------------------------
	camPlayVideos({video: "MBDEMO0_MSG", type: MISS_MSG});
	setTimer("COMSG4", camMinutesToMilliseconds(30));
	COTruck = getObject("COtruck");
}