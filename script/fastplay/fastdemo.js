include("script/campaign/libcampaign.js");
include("script/campaign/templates.js");
include("script/campaign/transitionTechFP.js");
include("script/campaign/transitionTech.js");
const SCAVENGER_PLAYER = 7;
const ScavRes = [
];
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
}),
//-----------------------------------Game Mechanics--------------------------------------
function camEnemyBaseEliminated_westBase()
{
	camCallOnce("scavdeath");
}
function scavdeath()
{
	camSetFactoryData("COout1Factory", {
		assembly: "COO1Fac1Ass",
		order: CAM_ORDER_ATTACK,
		groupSize: 3,
		throttle: camChangeOnDiff(camSecondsToMilliseconds(30)),
		templates: [cTempl.comhhmg, cTempl.comhca2, cTempl.comhrbb]
	});
	camEnableFactory("COout1Factory");
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
			cleanup: "COOutpost2",
			detectMsg: "FAST_BASE3",
			detectSnd: "pcv374.ogg",
			eliminateSnd: "pcv392.ogg"
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
	});
//----------------------------------Enemy Factories--------------------------------------
	camSetFactories({
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
		"scavFactory": {
			assembly: "scavass",
			order: CAM_ORDER_DEFEND,
			groupSize: 5,
			throttle: camChangeOnDiff(camSecondsToMilliseconds(10)),
			templates: [cTempl.bjeepheavy, cTempl.rbuggy, cTempl.firecan]
		},
	});
//----------------------------Start of Mission Event Queue-------------------------------

}