include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTechFP.js");
include("script/campaign/transitionTech.js");
const SCAVENGER_PLAYER = 7;
const CORes0 = [
		"R-Wpn-MG1Mk1", "R-Sys-Engineering02",
		"R-Defense-WallUpgrade06", "R-Struc-Materials06",
		"R-Vehicle-Engine03", "R-Vehicle-Metals03", "R-Cyborg-Metals03",
		"R-Wpn-Cannon-Accuracy02", "R-Wpn-Cannon-Damage04",
		"R-Wpn-Cannon-ROF01", "R-Wpn-Flamer-Damage03", "R-Wpn-Flamer-ROF01",
		"R-Wpn-MG-Damage05", "R-Wpn-MG-ROF02", "R-Wpn-Mortar-Acc01",
		"R-Wpn-Mortar-Damage03", "R-Wpn-Mortar-ROF01",
		"R-Wpn-Rocket-Accuracy02", "R-Wpn-Rocket-Damage04",
		"R-Wpn-Rocket-ROF03", "R-Wpn-RocketSlow-Accuracy03",
		"R-Wpn-RocketSlow-Damage04", "R-Sys-Sensor-Upgrade01"
];
const CORes1 = [
];
const CORes2 = [
];
const CORes3 = [
];
//-----------------------------------Event Triggers--------------------------------------
camAreaEvent("playerArea", function()
{
	camEnableFactory("COout1Factory");
	camEnableFactory("scavFactory");
});
//-----------------------------------Game Mechanics--------------------------------------
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
// MBDEMO1_MSG
}
function camEnemyBaseEliminated_COwestBase()
{
// turn on vtols from b1
// activate the transport waves(3-5)
// MBDEMO3_MSG 5 minute delay
}
function camEnemyBaseEliminated_COnorthBase()
{
// turn on factories from b1
// MBDEMO2_MSG
}
function camEnemyBaseEliminated_COnorthEastBase()
{
// turn on b2
// activate the ground waves(5-10)
// MBDEMO5_MSG
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
	setPower(10000, CAM_HUMAN_PLAYER);
	camSetEnemyBases({
		"westBase": {
			cleanup: "lastScav",
			detectMsg: "FAST_BASE1",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"COwestBase": {
			cleanup: "COOutpost1",
			detectMsg: "FAST_BASE2",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"COnorthBase": {
			cleanup: "COOutpost2"
		},
		"COnorthEastBase": {
			cleanup: "COBase1",
			detectMsg: "FAST_BASE4",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
		"COsouthEastBase": {
			cleanup: "COBase2",
			detectMsg: "FAST_BASE5",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
		},
	});
//-------------------------------------Artifacts-----------------------------------------
	camSetArtifacts({
		"scavFactory": { tech: "R-Vehicle-Prop-Tracks"},
		"COout1Factory": { tech: ["R-Vehicle-Prop-Hover", "R-Vehicle-Engine03"]},
		"COout1Pow": { tech: "R-Struc-Power-Upgrade01"},
		"COout1Res": { tech: ["R-Wpn-Cannon3Mk1", "R-Struc-Research-Upgrade01"]},
		"hardSensor": { tech: "R-Sys-Sensor-Upgrade01"},
		"hardCB": { tech: "R-Sys-CBSensor-Turret01"},
//		"R-Wpn-MG4"
//		"R-Vehicle-Prop-VTOL"
//		"R-Sys-Engineering02"
//		"R-Wpn-MG-ROF02"
//		"R-Wpn-Cannon-ROF01"
//		"R-Wpn-MG-ROF03"
//		"R-Wpn-HowitzerMk1"
//		"R-Struc-VTOLFactory"
//		"R-Struc-VTOLPad"
//		"R-Wpn-Bomb01"
//		"R-Wpn-Cannon4AMk1"
//		"R-Wpn-Mortar3"
//		"R-Wpn-Rocket06-IDF"
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
// MBDEMO4_MSG 30 minute repeat delay
}