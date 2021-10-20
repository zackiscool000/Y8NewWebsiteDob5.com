function visibleResume() {
muted || manualPause || Howler.unmute()
}

function visiblePause() {
Howler.mute()
}

function boosterLoaded(a, b, c) {
adSense = a, analytics = b, moregames = c, loadPreAssets()
}

function initSplash() {
gameState = "splash", resizeCanvas(), 1 != audioType || muted || music.play(), initStartScreen()
}

function initStartScreen() {
gameState = "start", userInput.removeHitArea("moreGames"), analytics.menu(), 1 == audioType && (musicTween && musicTween.kill(), musicTween = TweenLite.to(music, 1, {
volume: .1,
ease: "Linear.easeNone"
})), curLevel = 0, totalStars = saveDataHandler.getData(aLevelData.length, 0), background = new Elements.Background, background.renderState = "menuScroll", userInput.addHitArea("mute", butEventHandler, null, "rect", {
aRect: [392, 0, canvas.width, 53]
}, !0);
var a = {
oImgData: assetLib.getData("uiButs"),
aPos: [canvas.width / 2, 525],
id: oImageIds.playBut
},
b = {
oImgData: assetLib.getData("uiButs"),
aPos: [353, 655],
id: oImageIds.moreGamesBut,
noMove: !0
},
c = {
oImgData: assetLib.getData("uiButs"),
aPos: [103, 655],
id: oImageIds.creditsBut,
noMove: !0
};
userInput.addHitArea("levelSelect", butEventHandler, null, "image", a), userInput.addHitArea("moreGames", butEventHandler, null, "image", b), userInput.addHitArea("credits", butEventHandler, null, "image", c);
var d = new Array(a, b, c);
panel = new Elements.Panel(gameState, d, canvas.width, canvas.height), panel.startTween1(), previousTime = (new Date).getTime(), updateStartScreenEvent()
}

function initCreditsScreen() {
gameState = "credits";
var a = {
oImgData: assetLib.getData("uiButs"),
aPos: [103, 655],
id: oImageIds.backBut
},
b = {
oImgData: assetLib.getData("uiButs"),
aPos: [103, 50],
id: oImageIds.resetDataBut,
noMove: !0
};
userInput.addHitArea("backFromCredits", butEventHandler, null, "image", a), userInput.addHitArea("resetData", butEventHandler, null, "image", b);
var c = new Array(a, b);
panel = new Elements.Panel(gameState, c, canvas.width, canvas.height), panel.startTween2(), previousTime = (new Date).getTime(), updateCreditsScreenEvent()
}

function initLevelSelect() {
gameState = "levelSelect";
var a = {
oImgData: assetLib.getData("uiButs"),
aPos: [103, 655],
id: oImageIds.backBut,
noMove: !0
},
b = {
oImgData: assetLib.getData("uiButs"),
aPos: [canvas.width / 2, 525],
id: oImageIds.playBut
},
c = {
oImgData: assetLib.getData("uiButs"),
aPos: [36, 525],
id: oImageIds.scrollLeftBut,
noMove: !0
},
d = {
oImgData: assetLib.getData("uiButs"),
aPos: [canvas.width - 30, 525],
id: oImageIds.scrollRightBut,
noMove: !0
};
userInput.addHitArea("backFromLevelSelect", butEventHandler, null, "image", a), userInput.addHitArea("selectLevel", butEventHandler, null, "image", b), userInput.addHitArea("scrollLeft", butEventHandler, null, "image", c), userInput.addHitArea("scrollRight", butEventHandler, null, "image", d);
var e = new Array(a, b, c, d);
panel = new Elements.Panel(gameState, e, canvas.width, canvas.height), panel.startTween1(), previousTime = (new Date).getTime(), updateLevelSelectEvent()
}

function initGame() {
gameState = "game", 1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, 1, {
volume: .3,
ease: "Linear.easeNone"
})), ground = new Elements.Ground, aStars = new Array;
var a = new Array;
aCars = new Array;
for (var b = 0; b < aLevelData[curLevel].aData.length; b++)
if ("userStart" == aLevelData[curLevel].aData[b].type) userCar = new Elements.UserCar({
trackX: aLevelData[curLevel].aData[b].p0.x,
trackY: aLevelData[curLevel].aData[b].p0.y,
rot: aLevelData[curLevel].aData[b].p1.x
}), aCars.push(userCar);
else if ("wall" == aLevelData[curLevel].aData[b].type) a.push({
p0: aLevelData[curLevel].aData[b].p0,
p1: aLevelData[curLevel].aData[b].p1,
b: 1,
f: 1
});
else if ("enemyStart" == aLevelData[curLevel].aData[b].type) {
var c = new Elements.EnemyCar({
id: aCars.length,
trackX: aLevelData[curLevel].aData[b].p0.x,
trackY: aLevelData[curLevel].aData[b].p0.y,
rot: aLevelData[curLevel].aData[b].p1.x
});
aCars.push(c)
} else if ("star" == aLevelData[curLevel].aData[b].type) {
var d = new Elements.Star(aLevelData[curLevel].aData[b].p0);
aStars.push(d)
}
for (var b = 0; b < aCars.length; b++)
if ("enemy" == aCars[b].carType) {
for (var e = 0; e < aCars.length; e++) aCars[b].aTargs.push({
x: aCars[e].trackX,
y: aCars[e].trackY
});
aCars[b].targId = b
}
physics2D = new Utils.Physics2D(a, aCars), userInput.addHitArea("pause", butEventHandler, null, "rect", {
aRect: [0, 0, 68, 68]
}, !0), userInput.addHitArea("steerLeft", butEventHandler, {
multiTouch: !0
}, "rect", {
aRect: [0, 60, canvas.width / 2, canvas.height]
}, !0), userInput.addHitArea("steerRight", butEventHandler, {
multiTouch: !0
}, "rect", {
aRect: [canvas.width / 2, 60, canvas.width, canvas.height]
}, !0), userInput.addKey("steerRight", butEventHandler, null, 39), userInput.addKey("steerLeft", butEventHandler, null, 37), curTime = 6e3, carInPlay = !0, leftSteer = 0, rightSteer = 0, gamePlayed++, levelStars = 0, curLevel > 0 && (firstTimeState = 2), aEffects = new Array, hud = new Elements.Hud, previousTime = (new Date).getTime(), updateGameEvent()
}

function butEventHandler(a, b) {
switch (a) {
case "langSelect":
curLang = b.lang, ctx.clearRect(0, 0, canvas.width, canvas.height), userInput.removeHitArea("langSelect"), preAssetLib = new Utils.AssetLoader(curLang, [{
id: "preloadImage",
file: "images/" + curLang + "/preloadImage.jpg"
}], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLoadAssets);
break;
case "levelSelect":
playSound("click"), userInput.removeHitArea("levelSelect"), userInput.removeHitArea("moreGames"), userInput.removeHitArea("credits"), isMobile && launchFullscreen(document.documentElement), initLevelSelect();
break;
case "credits":
playSound("click"), userInput.removeHitArea("levelSelect"), userInput.removeHitArea("moreGames"), userInput.removeHitArea("credits"), isMobile && launchFullscreen(document.documentElement), initCreditsScreen();
break;
case "resetData":
playSound("click"), saveDataHandler.resetData(), userInput.removeHitArea("backFromCredits"), userInput.removeHitArea("resetData"), initStartScreen();
break;
case "backFromCredits":
playSound("click"), userInput.removeHitArea("backFromCredits"), userInput.removeHitArea("resetData"), initStartScreen();
break;
case "backFromLevelSelect":
playSound("click"), userInput.removeHitArea("backFromLevelSelect"), userInput.removeHitArea("scrollLeft"), userInput.removeHitArea("scrollRight"), userInput.removeHitArea("selectLevel"), initStartScreen();
break;
case "scrollLeft":
panel.scrollLevelSelect("left");
break;
case "scrollRight":
panel.scrollLevelSelect("right");
break;
case "selectLevel":
(0 == curLevel || saveDataHandler.getData(curLevel - 1, 0) <= saveDataHandler.getData(curLevel - 1, 1)) && (playSound("levelStart"), isMobile && launchFullscreen(document.documentElement), userInput.removeHitArea("backFromLevelSelect"), userInput.removeHitArea("scrollLeft"), userInput.removeHitArea("scrollRight"), userInput.removeHitArea("selectLevel"), initGame());
break;
case "moreGames":
case "moreGamesPause":
// playSound("click"), moregames.redirect();
break;
case "steerLeft":
b.isDown ? (leftSteer = 1, rightSteer = 0) : leftSteer = 0;
break;
case "steerRight":
b.isDown ? (rightSteer = -1, leftSteer = 0) : rightSteer = 0;
break;
case "changeLevel":
playSound("click"), userInput.removeHitArea("changeLevel"), userInput.removeHitArea("playAgain"), userInput.removeHitArea("playNew"), userInput.removeHitArea("moreGames"), initLevelSelect();
break;
case "playAgain":
playSound("click"), isMobile && launchFullscreen(document.documentElement), userInput.removeHitArea("changeLevel"), userInput.removeHitArea("playAgain"), userInput.removeHitArea("playNew"), userInput.removeHitArea("moreGames"), initGame();
break;
case "playNew":
playSound("click"), userInput.removeHitArea("changeLevel"), userInput.removeHitArea("playAgain"), userInput.removeHitArea("playNew"), userInput.removeHitArea("moreGames");
for (var c = 0; c < aLevelData.length; c++) saveDataHandler.getData(c, 1) >= saveDataHandler.getData(c, 0) && (curLevel = c + 1);
initGame();
break;
case "mute":
manualPause || (playSound("click"), toggleMute());
break;
case "pause":
case "playFromPause":
playSound("click"), toggleManualPause();
break;
case "retryFromPause":
playSound("click"), toggleManualPause(), initGame();
break;
case "backFromPause":
playSound("click"), toggleManualPause(), userInput.removeHitArea("pause"), userInput.removeHitArea("steerLeft"), userInput.removeHitArea("steerRight"), userInput.removeKey("steerRight"), userInput.removeKey("steerLeft"), userInput.removeHitArea("backFromPause"), userInput.removeHitArea("playFromPause"), userInput.removeHitArea("moreGamesPause"), userInput.removeHitArea("retryFromPause"), initStartScreen()
}
}

function showGameEndPlayBut(a, b) {
var c = {
oImgData: assetLib.getData("uiButs"),
aPos: [canvas.width / 2, 525],
id: a
};
userInput.addHitArea(b, butEventHandler, null, "image", c);
var d = {
oImgData: assetLib.getData("uiButs"),
aPos: [103, 655],
id: oImageIds.changeLevelBut,
noMove: !0
};
userInput.addHitArea("changeLevel", butEventHandler, null, "image", d), "playNew" == b && playSound("levelUnlocked"), panel.aButs.push(c, d)
}

function scoreThenEnd() {
totalStars += levelStars, initGameEnd()
}

function initGameEnd() {
gameState = "gameEnd", 1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, .5, {
volume: .1,
ease: "Linear.easeNone"
})), analytics.level(curLevel), playSound("levelEnd"), userInput.removeHitArea("pause"), userInput.removeHitArea("steerLeft"), userInput.removeHitArea("steerRight"), userInput.removeKey("steerRight"), userInput.removeKey("steerLeft");
var a = {
oImgData: assetLib.getData("uiButs"),
aPos: [353, 655],
id: oImageIds.moreGamesBut,
noMove: !0
};
userInput.addHitArea("moreGames", butEventHandler, null, "image", a);
var b = new Array(a);
background.render(), panel = new Elements.Panel(gameState, b, canvas.width, canvas.height), panel.prevScore = saveDataHandler.getData(curLevel, 1), saveDataHandler.getData(curLevel, 1) < levelStars && (saveDataHandler.setData(curLevel, 1, levelStars), analytics.score(levelStars)), saveDataHandler.setData(aLevelData.length, 0, totalStars), panel.startGameEndTween(), previousTime = (new Date).getTime(), updateGameEnd()
}

function explodeEnemy(a) {
var b = new Elements.Explode;
b.startX = a.trackX, b.startY = a.trackY, aEffects.push(b), playSound("enemyExplode");
var c = new Elements.Star({
x: a.trackX,
y: a.trackY
}, 1);
aStars.push(c)
}

function addDrift(a, b) {
var c = new Elements.Drift;
c.startX = 12 * Math.cos(userCar.rotation + 90) + a, c.startY = 12 * Math.sin(userCar.rotation + 90) + b, aEffects.push(c);
var c = new Elements.Drift;
c.startX = -12 * Math.cos(userCar.rotation + 90) + a, c.startY = -12 * Math.sin(userCar.rotation + 90) + b, aEffects.push(c)
}

function dropStars() {
if (playSound("dropStars"), levelStars / 10 > 0 && aStars.length < 30) {
var a = 3;
1 > dropDelay && (a = 1);
for (var b = 0; b < Math.min(a, levelStars / 10); b++) {
var c = new Elements.Star({
x: userCar.trackX,
y: userCar.trackY
}, 2),
d = 100 * Math.random() + 150,
e = 360 * Math.random();
c.throwMe(d * Math.cos((e + 120 * b) * radian), d * Math.sin((e + 120 * b) * radian)), levelStars -= 10, aStars.push(c)
}
}
}

function updateGameEvent() {
if (!manualPause && !rotatePause && "game" == gameState) {
delta = getDelta(), carInPlay && firstTimeState > 0 && (curTime = Math.max(Math.round(curTime - 100 * delta), 0)), 0 == curTime && scoreThenEnd(), ground.update(), ground.render();
for (var a = 0; a < aEffects.length; a++) aEffects[a].update(ground.x, ground.y), aEffects[a].render(), aEffects[a].removeMe && (aEffects.splice(a, 1), a -= 1);
userCar.update(ground.x, ground.y), userCar.render(), dropDelay += delta;
for (var a = 0; a < aCars.length; a++)
if ("enemy" == aCars[a].carType) {
aCars[a].update(ground.x, ground.y), aCars[a].render();
for (var b = 0; b < aCars.length; b++)
if (aCars[a] != aCars[b] && aCars[a].canHit && aCars[b].canHit && checkSpriteCollision(aCars[a], aCars[b])) {
var c = Math.atan2(aCars[a].y - aCars[b].y, aCars[a].x - aCars[b].x);
carInPlay && aCars[b] == userCar ? 0 == userCar.shieldState && 0 == aCars[a].frozenState ? (dropStars(), dropDelay = 0, aCars[a].hitCar(c, 1), aCars[b].hitCar(c - 180 * radian, !0), 1 == firstTimeState && (firstTimeState = 2)) : (aCars[a].hitCar(c, 2), aCars[b].hitCar(c - 180 * radian), aCars[a].frozenState > 0 ? playSound("hitFrozenCar") : playSound("hitEnemyWithShield")) : 0 == aCars[a].frozenState && (aCars[a].hitCar(c), aCars[b].hitCar(c - 180 * radian))
}
}
for (var a = 0; a < aStars.length; a++) {
if (aStars[a].update(ground.x, ground.y), aStars[a].render(), aStars[a].canHit && checkSpriteCollision(aStars[a], userCar))
if (aStars[a].hit(), 1 == aStars[a].pickUpId) levelStars += 10, playSound("collectStar");
else if (2 == aStars[a].pickUpId) userCar.hitShield(), playSound("collectShield");
else if (3 == aStars[a].pickUpId) {
for (var b = 0; b < aCars.length; b++) "enemy" == aCars[b].carType && aCars[b].freeze();
playSound("collectFreeze")
} else if (4 == aStars[a].pickUpId) curTime += 500, playSound("collectTimer");
else if (5 == aStars[a].pickUpId) {
playSound("collectBomb"), ground.shudderInc = userCar.trackX < 1e3 ? -40 : 40, TweenLite.to(ground, 1, {
shudderInc: 0,
ease: "Elastic.easeOut"
});
for (var b = 0; b < aCars.length; b++)
if ("enemy" == aCars[b].carType && aCars[b].canHit) {
var c = Math.atan2(aCars[b].y - userCar.y, aCars[b].x - userCar.x);
aCars[b].hitCar(c, 2)
}
}
aStars[a].removeMe && (aStars.splice(a, 1), a -= 1)
}
hud.render(ctx), physics2D.update(delta), renderMuteBut(), requestAnimFrame(updateGameEvent)
}
}

function updateCreditsScreenEvent() {
rotatePause || "credits" != gameState || (delta = getDelta(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateCreditsScreenEvent))
}

function updateGameEnd() {
rotatePause || "gameEnd" != gameState || (delta = getDelta(), background.update(), background.render(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateGameEnd))
}

function updateSplashScreenEvent() {
if (!rotatePause && "splash" == gameState) {
if (delta = getDelta(), splashTimer += delta, splashTimer > 2.5) return 1 != audioType || muted || music.play(), initStartScreen(), void 0;
splash.render(ctx, delta), requestAnimFrame(updateSplashScreenEvent)
}
}

function updateStartScreenEvent() {
rotatePause || "start" != gameState || (delta = getDelta(), background.update(), background.render(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateStartScreenEvent))
}

function updateLevelSelectEvent() {
rotatePause || "levelSelect" != gameState || (delta = getDelta(), background.update(), background.render(), panel.update(delta), panel.render(ctx), renderMuteBut(), requestAnimFrame(updateLevelSelectEvent))
}

function getDelta() {
var a = (new Date).getTime(),
b = (a - previousTime) / 1e3;
return previousTime = a, b > .5 && (b = 0), b
}

function checkSpriteCollision(a, b) {
var c = a.x,
d = a.y,
e = b.x,
f = b.y,
g = (c - e) * (c - e) + (d - f) * (d - f),
h = a.carHitRadius * b.carHitRadius;
return h > g ? !0 : !1
}

function getScaleImageToMax(a, b) {
var c;
return c = a.isSpriteSheet ? b[0] / a.oData.spriteWidth < b[1] / a.oData.spriteHeight ? Math.min(b[0] / a.oData.spriteWidth, 1) : Math.min(b[1] / a.oData.spriteHeight, 1) : b[0] / a.img.width < b[1] / a.img.height ? Math.min(b[0] / a.img.width, 1) : Math.min(b[1] / a.img.height, 1)
}

function getCentreFromTopLeft(a, b, c) {
var d = new Array;
return d.push(a[0] + b.oData.spriteWidth / 2 * c), d.push(a[1] + b.oData.spriteHeight / 2 * c), d
}

function loadPreAssets() {
aLangs.length > 1 ? (preAssetLib = new Utils.AssetLoader(curLang, [{
id: "langSelect",
file: "images/langSelect.jpg"
}], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLangSelect)) : (curLang = aLangs[0], preAssetLib = new Utils.AssetLoader(curLang, [{
id: "preloadImage",
file: "images/" + curLang + "/preloadImage.jpg"
}], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLoadAssets))
}

function initLangSelect() {
var a = preAssetLib.getData("langSelect");
ctx.drawImage(a.img, canvas.width / 2 - a.img.width / 2, canvas.height / 2 - a.img.height / 2);
for (var b = 140, c = 0; c < aLangs.length; c++) {
var d = canvas.width / 2 - b * aLangs.length / 2 + c * b,
e = canvas.height / 2 - b / 2;
userInput.addHitArea("langSelect", butEventHandler, {
lang: aLangs[c]
}, "rect", {
aRect: [d, e, d + b, e + 140]
})
}
}

function initLoadAssets() {
var a = preAssetLib.getData("preloadImage");
ctx.drawImage(a.img, 0, 0), loadAssets()
}

function loadAssets() {
assetLib = new Utils.AssetLoader(curLang, [{
id: "rotateDeviceMessage",
file: "images/rotateDeviceMessage.jpg"
}, {
id: "splash",
file: "images/splashScreen.jpg"
}, {
id: "hud",
file: "images/" + curLang + "/hud_450x700.png"
}, {
id: "uiButs",
file: "images/" + curLang + "/uiButs.png",
oAtlasData: {
id0: {
x: 192,
y: 0,
width: 190,
height: 83
},
id1: {
x: 192,
y: 85,
width: 190,
height: 83
},
id10: {
x: 0,
y: 125,
width: 190,
height: 123
},
id11: {
x: 0,
y: 0,
width: 190,
height: 123
},
id2: {
x: 0,
y: 460,
width: 190,
height: 83
},
id3: {
x: 192,
y: 295,
width: 190,
height: 123
},
id4: {
x: 192,
y: 170,
width: 190,
height: 123
},
id5: {
x: 384,
y: 125,
width: 85,
height: 123
},
id6: {
x: 384,
y: 0,
width: 86,
height: 123
},
id7: {
x: 192,
y: 420,
width: 190,
height: 83
},
id8: {
x: 0,
y: 335,
width: 190,
height: 123
},
id9: {
x: 0,
y: 250,
width: 190,
height: 83
}
}
}, {
id: "gameElements",
file: "images/" + curLang + "/gameElements.png",
oAtlasData: {
id0: {
x: 0,
y: 483,
width: 313,
height: 48
},
id1: {
x: 0,
y: 305,
width: 360,
height: 48
},
id10: {
x: 362,
y: 305,
width: 87,
height: 71
},
id11: {
x: 297,
y: 533,
width: 262,
height: 48
},
id12: {
x: 0,
y: 0,
width: 435,
height: 146
},
id13: {
x: 0,
y: 148,
width: 431,
height: 55
},
id2: {
x: 0,
y: 533,
width: 295,
height: 48
},
id3: {
x: 324,
y: 422,
width: 201,
height: 48
},
id4: {
x: 0,
y: 255,
width: 365,
height: 48
},
id5: {
x: 0,
y: 205,
width: 372,
height: 48
},
id6: {
x: 374,
y: 205,
width: 67,
height: 69
},
id7: {
x: 0,
y: 422,
width: 322,
height: 59
},
id8: {
x: 0,
y: 355,
width: 357,
height: 65
},
id9: {
x: 315,
y: 483,
width: 262,
height: 48
}
}
}, {
id: "levelSelect1",
file: "images/" + curLang + "/levelSelect.png",
oAtlasData: {
id0: {
x: 296,
y: 0,
width: 290,
height: 463
},
id1: {
x: 876,
y: 465,
width: 290,
height: 463
},
id2: {
x: 588,
y: 0,
width: 290,
height: 463
},
id3: {
x: 584,
y: 465,
width: 290,
height: 463
},
id4: {
x: 880,
y: 0,
width: 290,
height: 463
},
id5: {
x: 292,
y: 465,
width: 290,
height: 463
},
id6: {
x: 0,
y: 0,
width: 294,
height: 463
},
id7: {
x: 0,
y: 465,
width: 290,
height: 465
}
}
}, {
id: "levelSelect2",
file: "images/" + curLang + "/levelSelect2.png",
oAtlasData: {
id0: {
x: 292,
y: 458,
width: 290,
height: 456
},
id1: {
x: 584,
y: 458,
width: 290,
height: 456
},
id2: {
x: 584,
y: 0,
width: 290,
height: 456
},
id3: {
x: 876,
y: 0,
width: 290,
height: 456
},
id4: {
x: 292,
y: 0,
width: 290,
height: 456
},
id5: {
x: 0,
y: 458,
width: 290,
height: 456
},
id6: {
x: 0,
y: 0,
width: 290,
height: 456
}
}
}, {
id: "panels",
file: "images/" + curLang + "/panels_450x700.png"
}, {
id: "fatNumbers",
file: "images/fatNumbers_79x115.png"
}, {
id: "smallNumbers",
file: "images/smallNumbers_21x28.png"
}, {
id: "muteBut",
file: "images/mute_61x70.png"
}, {
id: "pickUps",
file: "images/pickUps_107x99.png",
oAnims: {
explode: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
}
}, {
id: "driftEffect",
file: "images/driftEffect_59x61.png",
oAnims: {
explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
}, {
id: "skidmark",
file: "images/skidmark_15x15.png",
oAnims: {
explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}
}, {
id: "carExplode",
file: "images/carExplode_155x141.png",
oAnims: {
explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
}, {
id: "debris",
file: "images/debris_22x22.png"
}, {
id: "cars",
file: "images/cars.png",
oAtlasData: {
id0: {
x: 271,
y: 55,
width: 70,
height: 53
},
id1: {
x: 271,
y: 0,
width: 70,
height: 53
},
id10: {
x: 0,
y: 0,
width: 94,
height: 94
},
id11: {
x: 184,
y: 118,
width: 70,
height: 53
},
id12: {
x: 182,
y: 232,
width: 86,
height: 57
},
id13: {
x: 270,
y: 175,
width: 82,
height: 55
},
id14: {
x: 186,
y: 0,
width: 83,
height: 57
},
id15: {
x: 0,
y: 252,
width: 90,
height: 58
},
id16: {
x: 96,
y: 0,
width: 88,
height: 56
},
id17: {
x: 96,
y: 116,
width: 86,
height: 55
},
id18: {
x: 92,
y: 249,
width: 88,
height: 55
},
id19: {
x: 0,
y: 96,
width: 94,
height: 94
},
id2: {
x: 270,
y: 290,
width: 70,
height: 53
},
id20: {
x: 270,
y: 232,
width: 72,
height: 56
},
id3: {
x: 182,
y: 173,
width: 86,
height: 57
},
id4: {
x: 270,
y: 118,
width: 82,
height: 55
},
id5: {
x: 186,
y: 59,
width: 83,
height: 57
},
id6: {
x: 0,
y: 192,
width: 90,
height: 58
},
id7: {
x: 96,
y: 58,
width: 88,
height: 56
},
id8: {
x: 182,
y: 291,
width: 86,
height: 55
},
id9: {
x: 92,
y: 192,
width: 88,
height: 55
}
}
}, {
id: "ground0",
file: "images/ground0.jpg"
}, {
id: "ground1",
file: "images/ground1.jpg"
}, {
id: "ground2",
file: "images/ground2.jpg"
}, {
id: "ground3",
file: "images/ground3.jpg"
}, {
id: "ground4",
file: "images/ground4.jpg"
}, {
id: "ground5",
file: "images/ground5.jpg"
}, {
id: "ground6",
file: "images/ground6.jpg"
}, {
id: "ground7",
file: "images/ground7.jpg"
}], ctx, canvas.width, canvas.height), oImageIds.levelIntroUnlock0 = "id0", oImageIds.levelIntroUnlock1 = "id1", oImageIds.levelIntroUnlock2 = "id2", oImageIds.levelIntroUnlock3 = "id3", oImageIds.levelIntroUnlock4 = "id4", oImageIds.levelIntroUnlock5 = "id5", oImageIds.levelIntroUnlock6 = "id6", oImageIds.levelIntroUnlock7 = "id7", oImageIds.levelIntroLock1 = "id0", oImageIds.levelIntroLock2 = "id1", oImageIds.levelIntroLock3 = "id2", oImageIds.levelIntroLock4 = "id3", oImageIds.levelIntroLock5 = "id4", oImageIds.levelIntroLock6 = "id5", oImageIds.levelIntroLock7 = "id6", oImageIds.endTextGeneral0 = "id0", oImageIds.endTextGeneral1 = "id1", oImageIds.endTextGeneral2 = "id2", oImageIds.endTextBad = "id3", oImageIds.endTextLevelUnlocked = "id4", oImageIds.endTextBestScore = "id5", oImageIds.star = "id6", oImageIds.starBar = "id7", oImageIds.starBarBg = "id8", oImageIds.toUnlock = "id9", oImageIds.cash = "id10", oImageIds.toComplete = "id11", oImageIds.congratulations = "id12", oImageIds.success = "id13", oImageIds.creditsBut = "id0", oImageIds.moreGamesBut = "id1", oImageIds.changeLevelBut = "id2", oImageIds.playBut = "id3", oImageIds.replayBut = "id4", oImageIds.scrollLeftBut = "id5", oImageIds.scrollRightBut = "id6", oImageIds.backBut = "id7", oImageIds.newPlayBut = "id8", oImageIds.resetDataBut = "id9", oImageIds.retryBut = "id10", oImageIds.playAgainBut = "id11", oImageIds.enemyCar0 = "id0", oImageIds.enemyCar1 = "id1", oImageIds.userCar0 = "id2", oImageIds.userCar1 = "id3", oImageIds.userCar2 = "id4", oImageIds.userCar3 = "id5", oImageIds.userCar4 = "id6", oImageIds.userCar5 = "id7", oImageIds.userCar6 = "id8", oImageIds.userCar7 = "id9", oImageIds.carShield0 = "id10", oImageIds.userCarDead0 = "id11", oImageIds.userCarDead1 = "id12", oImageIds.userCarDead2 = "id13", oImageIds.userCarDead3 = "id14", oImageIds.userCarDead4 = "id15", oImageIds.userCarDead5 = "id16", oImageIds.userCarDead6 = "id17", oImageIds.userCarDead7 = "id18", oImageIds.carShield1 = "id19", oImageIds.enemyCarFrozen = "id20", assetLib.onReady(initSplash)
}

function resizeCanvas() {
var a = window.innerWidth,
b = window.innerHeight;
a > 480 && (a -= 1, b -= 1), window.innerWidth > window.innerHeight && isMobile ? ("loading" != gameState && rotatePauseOn(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")) : isMobile ? (rotatePause && rotatePauseOff(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")) : (rotatePause && rotatePauseOff(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")), userInput.setCanvas(canvasX, canvasY, canvasScaleX, canvasScaleY)
}

function playSound(a) {
1 == audioType && sound.play(a)
}

function toggleMute() {
muted = !muted, 1 == audioType ? muted ? Howler.mute() : Howler.unmute() : 2 == audioType && (muted ? music.pause() : music.play()), renderMuteBut()
}

function renderMuteBut() {
if (0 != audioType) {
var a = assetLib.getData("muteBut"),
b = 0;
muted && (b = 1);
var c = b * a.oData.spriteWidth % a.img.width,
d = Math.floor(b / (a.img.width / a.oData.spriteWidth)) * a.oData.spriteHeight;
ctx.drawImage(a.img, c, d, a.oData.spriteWidth, a.oData.spriteHeight, 391, 5, a.oData.spriteWidth, a.oData.spriteHeight)
}
}

function toggleManualPause() {
if (manualPause) manualPause = !1, userInput.removeHitArea("backFromPause"), userInput.removeHitArea("playFromPause"), userInput.removeHitArea("moreGamesPause"), userInput.removeHitArea("retryFromPause"), pauseCoreOff();
else {
manualPause = !0, pauseCoreOn();
var a = {
oImgData: assetLib.getData("uiButs"),
aPos: [canvas.width / 2, 300],
id: oImageIds.playBut
},
b = {
oImgData: assetLib.getData("uiButs"),
aPos: [353, 655],
id: oImageIds.moreGamesBut,
noMove: !0
},
c = {
oImgData: assetLib.getData("uiButs"),
aPos: [103, 655],
id: oImageIds.backBut,
noMove: !0
},
d = {
oImgData: assetLib.getData("uiButs"),
aPos: [canvas.width / 2, 450],
id: oImageIds.retryBut,
noMove: !0
};
userInput.addHitArea("playFromPause", butEventHandler, null, "image", a), userInput.addHitArea("moreGamesPause", butEventHandler, null, "image", b), userInput.addHitArea("backFromPause", butEventHandler, null, "image", c), userInput.addHitArea("retryFromPause", butEventHandler, null, "image", d);
var e = new Array(a, b, c, d);
panel = new Elements.Panel("pause", e, canvas.width, canvas.height), panel.render(ctx), userInput.addHitArea("pause", butEventHandler, null, "rect", {
aRect: [0, 0, 68, 68]
}, !0)
}
}

function rotatePauseOn() {
rotatePause = !0, ctx.drawImage(assetLib.getImg("rotateDeviceMessage"), 0, 0), userInput.pauseIsOn = !0, pauseCoreOn()
}

function rotatePauseOff() {
rotatePause = !1, userInput.removeHitArea("backFromPause"), userInput.removeHitArea("playFromPause"), userInput.removeHitArea("moreGamesPause"), userInput.removeHitArea("retryFromPause"), pauseCoreOff()
}

function pauseCoreOn() {
switch (1 == audioType ? Howler.mute() : 2 == audioType && music.pause(), gameState) {
case "start":
break;
case "levelSelect":
break;
case "credits":
break;
case "game":
userInput.removeHitArea("steerLeft"), userInput.removeHitArea("steerRight"), userInput.removeKey("steerRight"), userInput.removeKey("steerLeft");
break;
case "gameEnd":
}
}

function pauseCoreOff() {
switch (1 == audioType ? muted || Howler.unmute() : 2 == audioType && (muted || music.play()), previousTime = (new Date).getTime(), userInput.pauseIsOn = !1, gameState) {
case "splash":
updateSplashScreenEvent();
break;
case "start":
initStartScreen();
break;
case "levelSelect":
initLevelSelect();
break;
case "credits":
initCreditsScreen();
break;
case "game":
manualPause ? (manualPause = !1, updateGameEvent(), toggleManualPause()) : (userInput.addHitArea("pause", butEventHandler, null, "rect", {
aRect: [0, 0, 68, 68]
}, !0), userInput.addHitArea("steerLeft", butEventHandler, {
multiTouch: !0
}, "rect", {
aRect: [0, 60, canvas.width / 2, canvas.height]
}, !0), userInput.addHitArea("steerRight", butEventHandler, {
multiTouch: !0
}, "rect", {
aRect: [canvas.width / 2, 60, canvas.width, canvas.height]
}, !0), userInput.addKey("steerRight", butEventHandler, null, 39), userInput.addKey("steerLeft", butEventHandler, null, 37), updateGameEvent());
break;
case "gameEnd":
initGameEnd()
}
}
var Utils;
! function(a) {
var b = function() {
function a(a, b, c, d, e, f) {
"undefined" == typeof f && (f = !0), this.oAssetData = {}, this.assetsLoaded = 0, this.totalAssets = b.length, this.ctx = c, this.canvasWidth = d, this.canvasHeight = e, this.showBar = f, this.topLeftX = this.canvasWidth / 2 - d / 8, this.topLeftY = 450, this.showBar && (ctx.strokeStyle = "#333646", ctx.lineWidth = 2, ctx.fillStyle = "#DEE6FC", ctx.moveTo(this.topLeftX, this.topLeftY), ctx.lineTo(this.topLeftX + d / 4, this.topLeftY + 0), ctx.lineTo(this.topLeftX + d / 4, this.topLeftY + 20), ctx.lineTo(this.topLeftX + 0, this.topLeftY + 20), ctx.lineTo(this.topLeftX + 0, this.topLeftY + 0), ctx.stroke());
for (var g = 0; g < b.length; g++) this.loadImage(b[g])
}
return a.prototype.loadImage = function(a) {
var b = this,
c = new Image;
c.onload = function() {
b.oAssetData[a.id] = {}, b.oAssetData[a.id].img = c, b.oAssetData[a.id].oData = {};
var d = b.getSpriteSize(a.file);
0 != d[0] ? (b.oAssetData[a.id].oData.spriteWidth = d[0], b.oAssetData[a.id].oData.spriteHeight = d[1]) : (b.oAssetData[a.id].oData.spriteWidth = b.oAssetData[a.id].img.width, b.oAssetData[a.id].oData.spriteHeight = b.oAssetData[a.id].img.height), a.oAnims && (b.oAssetData[a.id].oData.oAnims = a.oAnims), b.oAssetData[a.id].oData.oAtlasData = a.oAtlasData ? a.oAtlasData : {
none: {
x: 0,
y: 0,
width: b.oAssetData[a.id].oData.spriteWidth,
height: b.oAssetData[a.id].oData.spriteHeight
}
}, ++b.assetsLoaded, b.showBar && ctx.fillRect(b.topLeftX + 2, b.topLeftY + 2, (b.canvasWidth / 4 - 4) / b.totalAssets * b.assetsLoaded, 16), b.checkLoadComplete()
}, c.src = a.file
}, a.prototype.getSpriteSize = function(a) {
for (var b = new Array, c = "", d = "", e = 0, f = a.lastIndexOf("."), g = !0; g;) f--, 0 == e && this.isNumber(a.charAt(f)) ? c = a.charAt(f) + c : 0 == e && c.length > 0 && "x" == a.charAt(f) ? (f--, e = 1, d = a.charAt(f) + d) : 1 == e && this.isNumber(a.charAt(f)) ? d = a.charAt(f) + d : 1 == e && d.length > 0 && "_" == a.charAt(f) ? (g = !1, b = [parseInt(d), parseInt(c)]) : (g = !1, b = [0, 0]);
return b
}, a.prototype.isNumber = function(a) {
return !isNaN(parseFloat(a)) && isFinite(a)
}, a.prototype.checkLoadComplete = function() {
this.assetsLoaded == this.totalAssets && this.loadedCallback()
}, a.prototype.onReady = function(a) {
this.loadedCallback = a
}, a.prototype.getImg = function(a) {
return this.oAssetData[a].img
}, a.prototype.getData = function(a) {
return this.oAssetData[a]
}, a
}();
a.AssetLoader = b
}(Utils || (Utils = {}));
var Utils;
! function(a) {
var b = function() {
function a(a, b, c, d) {
this.x = 0, this.y = 0, this.rotation = 0, this.radius = 10, this.removeMe = !1, this.frameInc = 0, this.animType = "loop", this.offsetX = 0, this.offsetY = 0, this.scaleX = 1, this.scaleY = 1, this.alpha = 1, this.oImgData = a, this.oAnims = this.oImgData.oData.oAnims, this.fps = b, this.radius = c, this.animId = d, this.centreX = Math.round(this.oImgData.oData.spriteWidth / 2), this.centreY = Math.round(this.oImgData.oData.spriteHeight / 2)
}
return a.prototype.updateAnimation = function(a) {
this.frameInc += this.fps * a
}, a.prototype.changeImgData = function(a, b) {
this.oImgData = a, this.oAnims = this.oImgData.oData.oAnims, this.animId = b, this.centreX = Math.round(this.oImgData.oData.spriteWidth / 2), this.centreY = Math.round(this.oImgData.oData.spriteHeight / 2), this.resetAnim()
}, a.prototype.resetAnim = function() {
this.frameInc = 0
}, a.prototype.setFrame = function(a) {
this.fixedFrame = a
}, a.prototype.setAnimType = function(a, b, c) {
switch ("undefined" == typeof c && (c = !0), this.animId = b, this.animType = a, c && this.resetAnim(), a) {
case "loop":
break;
case "once":
this.maxIdx = this.oAnims[this.animId].length - 1
}
}, a.prototype.render = function(a) {
if (a.save(), a.translate(this.x, this.y), a.rotate(this.rotation), a.scale(this.scaleX, this.scaleY), a.globalAlpha = this.alpha, null != this.animId) {
var b = this.oAnims[this.animId].length,
c = Math.floor(this.frameInc);
this.curFrame = this.oAnims[this.animId][c % b];
var d = this.curFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
e = Math.floor(this.curFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
if ("once" == this.animType && c > this.maxIdx) {
if (this.fixedFrame = this.oAnims[this.animId][b - 1], this.animId = null, null != this.animEndedFunc) return this.animEndedFunc(), a.restore(), void 0;
var d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight
}
} else var d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
a.drawImage(this.oImgData.img, d, e, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.centreX + this.offsetX, -this.centreY + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight), a.restore()
}, a.prototype.renderSimple = function(a) {
if (null != this.animId) {
var b = this.oAnims[this.animId].length,
c = Math.floor(this.frameInc);
this.curFrame = this.oAnims[this.animId][c % b];
var d = this.curFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
e = Math.floor(this.curFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
if ("once" == this.animType && c > this.maxIdx) {
if (this.fixedFrame = this.oAnims[this.animId][b - 1], this.animId = null, null != this.animEndedFunc) return this.animEndedFunc(), void 0;
var d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight
}
} else var d = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
e = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
a.drawImage(this.oImgData.img, d, e, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, this.x - (this.centreX - this.offsetX) * this.scaleX, this.y - (this.centreY - this.offsetY) * this.scaleY, this.oImgData.oData.spriteWidth * this.scaleX, this.oImgData.oData.spriteHeight * this.scaleY)
}, a
}();
a.AnimSprite = b
}(Utils || (Utils = {}));
var Utils;
! function(a) {
var b = function() {
function a(a, b, c) {
"undefined" == typeof c && (c = 0), this.x = 0, this.y = 0, this.rotation = 0, this.radius = 10, this.removeMe = !1, this.offsetX = 0, this.offsetY = 0, this.scaleX = 1, this.scaleY = 1, this.oImgData = a, this.radius = b, this.setFrame(c)
}
return a.prototype.setFrame = function(a) {
this.frameNum = a
}, a.prototype.render = function(a) {
a.save(), a.translate(this.x, this.y), a.rotate(this.rotation), a.scale(this.scaleX, this.scaleY);
var b = this.frameNum * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
c = Math.floor(this.frameNum / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
a.drawImage(this.oImgData.img, b, c, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight), a.restore()
}, a
}();
a.BasicSprite = b
}(Utils || (Utils = {}));
var Utils;
! function(a) {
var b = function() {
function a(a, b) {
var c = this;
this.canvasX = 0, this.canvasY = 0, this.canvasScaleX = 1, this.canvasScaleY = 1, this.prevHitTime = 0, this.pauseIsOn = !1, this.isDown = !1, this.isDetectingKeys = !1, this.isBugBrowser = b, a.addEventListener("touchstart", function(a) {
for (var b = 0; b < a.changedTouches.length; b++) c.hitDown(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier)
}, !1), a.addEventListener("touchend", function(a) {
for (var b = 0; b < a.changedTouches.length; b++) c.hitUp(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier)
}, !1), a.addEventListener("touchmove", function(a) {
for (var b = 0; b < c.aHitAreas.length; b++) c.move(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier, !0)
}, !1), a.addEventListener("mousedown", function(a) {
c.isDown = !0, c.hitDown(a, a.pageX, a.pageY, 1)
}, !1), a.addEventListener("mouseup", function(a) {
c.isDown = !1, c.hitUp(a, a.pageX, a.pageY, 1)
}, !1), a.addEventListener("mousemove", function(a) {
c.move(a, a.pageX, a.pageY, 1, c.isDown)
}, !1), this.aHitAreas = new Array, this.aKeys = new Array
}
return a.prototype.setCanvas = function(a, b, c, d) {
this.canvasX = a, this.canvasY = b, this.canvasScaleX = c, this.canvasScaleY = d
}, a.prototype.hitDown = function(a, b, c, d) {
if (a.preventDefault(), a.stopPropagation(), !this.pauseIsOn) {
var e = (new Date).getTime();
b = (b - this.canvasX) * this.canvasScaleX, c = (c - this.canvasY) * this.canvasScaleY;
for (var f = 0; f < this.aHitAreas.length; f++)
if (this.aHitAreas[f].rect && b > this.aHitAreas[f].area[0] && c > this.aHitAreas[f].area[1] && b < this.aHitAreas[f].area[2] && c < this.aHitAreas[f].area[3]) {
if (this.aHitAreas[f].aTouchIdentifiers.push(d), this.aHitAreas[f].oData.hasLeft = !1, !this.aHitAreas[f].oData.isDown) {
if (this.aHitAreas[f].oData.isDown = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, e - this.prevHitTime < 500 && ("game" != gameState || "pause" == this.aHitAreas[f].id) && isBugBrowser) return;
this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData)
}
break
}
this.prevHitTime = e
}
}, a.prototype.hitUp = function(a, b, c, d) {
if (!this.pauseIsOn) {
a.preventDefault(), a.stopPropagation(), b = (b - this.canvasX) * this.canvasScaleX, c = (c - this.canvasY) * this.canvasScaleY;
for (var e = 0; e < this.aHitAreas.length; e++)
if (this.aHitAreas[e].rect && b > this.aHitAreas[e].area[0] && c > this.aHitAreas[e].area[1] && b < this.aHitAreas[e].area[2] && c < this.aHitAreas[e].area[3]) {
for (var f = 0; f < this.aHitAreas[e].aTouchIdentifiers.length; f++) this.aHitAreas[e].aTouchIdentifiers[f] == d && (this.aHitAreas[e].aTouchIdentifiers.splice(f, 1), f -= 1);
0 == this.aHitAreas[e].aTouchIdentifiers.length && (this.aHitAreas[e].oData.isDown = !1, this.aHitAreas[e].oData.multiTouch && (this.aHitAreas[e].oData.x = b, this.aHitAreas[e].oData.y = c, this.aHitAreas[e].callback(this.aHitAreas[e].id, this.aHitAreas[e].oData)));
break
}
}
}, a.prototype.move = function(a, b, c, d, e) {
if (!this.pauseIsOn && e) {
b = (b - this.canvasX) * this.canvasScaleX, c = (c - this.canvasY) * this.canvasScaleY;
for (var f = 0; f < this.aHitAreas.length; f++)
if (this.aHitAreas[f].rect)
if (b > this.aHitAreas[f].area[0] && c > this.aHitAreas[f].area[1] && b < this.aHitAreas[f].area[2] && c < this.aHitAreas[f].area[3]) this.aHitAreas[f].oData.hasLeft = !1, this.aHitAreas[f].oData.isDown || (this.aHitAreas[f].oData.isDown = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].aTouchIdentifiers.push(d), this.aHitAreas[f].oData.multiTouch && this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData)), this.aHitAreas[f].oData.isDraggable && (this.aHitAreas[f].oData.isBeingDragged = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData), this.aHitAreas[f].oData.isBeingDragged = !1);
else if (this.aHitAreas[f].oData.isDown && !this.aHitAreas[f].oData.hasLeft) {
for (var g = 0; g < this.aHitAreas[f].aTouchIdentifiers.length; g++) this.aHitAreas[f].aTouchIdentifiers[g] == d && (this.aHitAreas[f].aTouchIdentifiers.splice(g, 1), g -= 1);
0 == this.aHitAreas[f].aTouchIdentifiers.length && (this.aHitAreas[f].oData.hasLeft = !0, this.aHitAreas[f].oData.isBeingDragged || (this.aHitAreas[f].oData.isDown = !1), this.aHitAreas[f].oData.multiTouch && this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData))
}
}
}, a.prototype.keyDown = function(a) {
for (var b = 0; b < this.aKeys.length; b++) a.keyCode == this.aKeys[b].keyCode && (this.aKeys[b].oData.isDown = !0, this.aKeys[b].callback(this.aKeys[b].id, this.aKeys[b].oData))
}, a.prototype.keyUp = function(a) {
for (var b = 0; b < this.aKeys.length; b++) a.keyCode == this.aKeys[b].keyCode && (this.aKeys[b].oData.isDown = !1, this.aKeys[b].callback(this.aKeys[b].id, this.aKeys[b].oData))
}, a.prototype.addKey = function(a, b, c, d) {
var e = this;
this.isDetectingKeys || (window.focus(), window.addEventListener("keydown", function(a) {
e.keyDown(a)
}, !1), window.addEventListener("keyup", function(a) {
e.keyUp(a)
}, !1), this.isDetectingKeys = !0), null == c && (c = new Object), this.aKeys.push({
id: a,
callback: b,
oData: c,
keyCode: d
})
}, a.prototype.removeKey = function(a) {
for (var b = this, c = 0; c < this.aKeys.length; c++) this.aKeys[c].id == a && (this.aKeys.splice(c, 1), c -= 1);
0 == this.aKeys.length && (window.removeEventListener("keydown", function(a) {
b.keyDown(a)
}, !1), window.removeEventListener("keyup", function(a) {
b.keyUp(a)
}, !1))
}, a.prototype.addHitArea = function(a, b, c, d, e, f) {
"undefined" == typeof f && (f = !1), null == c && (c = new Object), f && this.removeHitArea(a);
var g = new Array;
switch (d) {
case "image":
var h;
h = new Array(e.aPos[0] - e.oImgData.oData.oAtlasData[e.id].width / 2, e.aPos[1] - e.oImgData.oData.oAtlasData[e.id].height / 2, e.aPos[0] + e.oImgData.oData.oAtlasData[e.id].width / 2, e.aPos[1] + e.oImgData.oData.oAtlasData[e.id].height / 2), this.aHitAreas.push({
id: a,
aTouchIdentifiers: g,
callback: b,
oData: c,
rect: !0,
area: h
});
break;
case "rect":
this.aHitAreas.push({
id: a,
aTouchIdentifiers: g,
callback: b,
oData: c,
rect: !0,
area: e.aRect
})
}
}, a.prototype.removeHitArea = function(a) {
for (var b = 0; b < this.aHitAreas.length; b++) this.aHitAreas[b].id == a && (this.aHitAreas.splice(b, 1), b -= 1)
}, a
}();
a.UserInput = b
}(Utils || (Utils = {}));
var Utils;
! function(a) {
var b = function() {
function a(a) {
this.updateFreq = 10, this.updateInc = 0, this.frameAverage = 0, this.display = 1, this.log = "", this.render = function(a) {
this.frameAverage += this.delta / this.updateFreq, ++this.updateInc >= this.updateFreq && (this.updateInc = 0, this.display = this.frameAverage, this.frameAverage = 0), a.textAlign = "left", ctx.font = "10px Helvetica", a.fillStyle = "#333333", a.beginPath(), a.rect(0, this.canvasHeight - 15, 40, 15), a.closePath(), a.fill(), a.fillStyle = "#ffffff", a.fillText(Math.round(1e3 / (1e3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5)
}, this.canvasHeight = a
}
return a.prototype.update = function(a) {
this.delta = a
}, a
}();
a.FpsMeter = b
}(Utils || (Utils = {}));
var Elements;
! function(a) {
var b = function() {
function a() {
this.x = 0, this.y = 0, this.targY = 0, this.inc = 0, this.renderState = null, this.oImgData = assetLib.getData("ground" + Math.floor(Math.random() * aLevelData.length))
}
return a.prototype.update = function() {
switch (this.renderState) {
case "menuScroll":
this.inc += .2 * delta, this.x = 500 * Math.cos(this.inc) + 1e3 - canvas.width / 2, this.y = 300 * Math.sin(this.inc) + 1e3 - canvas.height / 2
}
}, a.prototype.render = function() {
switch (this.renderState) {
case "menuScroll":
ctx.drawImage(this.oImgData.img, this.x, this.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
break;
case "none":
ctx.drawImage(this.oImgData.img, 0, 0)
}
}, a
}();
a.Background = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a(a, b, c) {
this.inc = 0, this.oSplashScreenImgData = a, this.canvasWidth = b, this.canvasHeight = c, this.posY = -this.canvasHeight, TweenLite.to(this, .5, {
posY: 0
})
}
return a.prototype.render = function(a, b) {
this.inc += 5 * b, a.drawImage(this.oSplashScreenImgData.img, 0, 0 - this.posY)
}, a
}();
a.Splash = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a(a, b, c, d) {
this.timer = .3, this.endTime = 0, this.posY = 0, this.fatNumberSpace = 17, this.incY = 0, this.levelSelectX = 0, this.timeSpace = 23, this.largeTimeSpace = 71, this.oPanelsImgData = assetLib.getData("panels"), this.oFatNumbersImgData = assetLib.getData("fatNumbers"), this.oSmallNumbersImgData = assetLib.getData("smallNumbers"), this.oLevelSelect1ImgData = assetLib.getData("levelSelect1"), this.oLevelSelect2ImgData = assetLib.getData("levelSelect2"), this.oUiButsImgData = assetLib.getData("uiButs"), this.oGameElementsImgData = assetLib.getData("gameElements"), this.panelType = a, this.aButs = b, this.canvasWidth = c, this.canvasHeight = d, this.levelSelectX = -curLevel
}
return a.prototype.update = function(a) {
this.incY += 5 * a
}, a.prototype.startTween1 = function() {
this.posY = 550, TweenLite.to(this, .8, {
posY: 0,
ease: "Back.easeOut"
})
}, a.prototype.startTween2 = function() {
this.posY = 550, TweenLite.to(this, .5, {
posY: 0,
ease: "Quad.easeOut"
})
}, a.prototype.startGameEndTween = function() {
this.posY = 550, TweenLite.to(this, .8, {
posY: 0,
ease: "Back.easeOut"
}), this.prevScore < saveDataHandler.getData(curLevel, 0) ? (this.curStarBarScale = 0, this.newStarBarScale = Math.min(levelStars / saveDataHandler.getData(curLevel, 0), 1), this.newStarBarScale > this.curStarBarScale ? (playSound("starBarIncrease"), 1 == this.newStarBarScale ? 7 > curLevel ? TweenLite.to(this, 1, {
curStarBarScale: this.newStarBarScale,
delay: .6,
ease: "Quad.easeInOut",
onComplete: showGameEndPlayBut,
onCompleteParams: [oImageIds.newPlayBut, "playNew"]
}) : TweenLite.to(this, 1, {
curStarBarScale: this.newStarBarScale,
delay: .6,
ease: "Quad.easeInOut",
onComplete: showGameEndPlayBut,
onCompleteParams: [oImageIds.playAgainBut, "playAgain"]
}) : TweenLite.to(this, 1, {
curStarBarScale: this.newStarBarScale,
delay: .6,
ease: "Quad.easeInOut",
onComplete: showGameEndPlayBut,
onCompleteParams: [oImageIds.retryBut, "playAgain"]
})) : showGameEndPlayBut(oImageIds.retryBut, "playAgain")) : showGameEndPlayBut(oImageIds.playAgainBut, "playAgain")
}, a.prototype.scrollLevelSelect = function(a) {
"left" == a && curLevel > 0 ? (curLevel--, playSound("click")) : "right" == a && curLevel < aLevelData.length - 1 && (curLevel++, playSound("click")), TweenLite.to(this, .5, {
levelSelectX: -curLevel,
ease: "Quad.easeOut"
})
}, a.prototype.render = function(a, b) {
switch ("undefined" == typeof b && (b = !0), b || this.addButs(a), this.panelType) {
case "start":
var c = 0,
d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
a.drawImage(this.oPanelsImgData.img, d, e + 1, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight - 2, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
break;
case "credits":
var c = 2,
d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
a.drawImage(this.oPanelsImgData.img, d, e, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
break;
case "levelSelect":
var c = 3,
d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
a.drawImage(this.oPanelsImgData.img, d, e, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
for (var f = 0; f < aLevelData.length; f++)
if (0 == f || f > 0 && saveDataHandler.getData(f - 1, 1) >= saveDataHandler.getData(f - 1, 0)) {
var g = this.oLevelSelect1ImgData.oData.oAtlasData[oImageIds["levelIntroUnlock" + f]].x,
h = this.oLevelSelect1ImgData.oData.oAtlasData[oImageIds["levelIntroUnlock" + f]].y,
i = this.oLevelSelect1ImgData.oData.oAtlasData[oImageIds["levelIntroUnlock" + f]].width,
j = this.oLevelSelect1ImgData.oData.oAtlasData[oImageIds["levelIntroUnlock" + f]].height,
k = 310 * f - i / 2 + 310 * this.levelSelectX + 225,
l = 300 - j / 2 + this.posY + Math.abs(k - (225 - i / 2)) / 8;
a.drawImage(this.oLevelSelect1ImgData.img, g, h, i, j, k, l, i, j), this.renderScore(f, k + 147, l + 325)
} else {
var g = this.oLevelSelect2ImgData.oData.oAtlasData[oImageIds["levelIntroLock" + f]].x,
h = this.oLevelSelect2ImgData.oData.oAtlasData[oImageIds["levelIntroLock" + f]].y,
i = this.oLevelSelect2ImgData.oData.oAtlasData[oImageIds["levelIntroLock" + f]].width,
j = this.oLevelSelect2ImgData.oData.oAtlasData[oImageIds["levelIntroLock" + f]].height,
k = 310 * f - i / 2 + 310 * this.levelSelectX + 225,
l = 306 - j / 2 + this.posY + Math.abs(k - (225 - i / 2)) / 8;
a.drawImage(this.oLevelSelect2ImgData.img, g, h, i, j, k, l, i, j);
for (var m = saveDataHandler.getData(f - 1, 0), n = 0; n < m.toString().length; n++) {
c = parseFloat(m.toString().charAt(n));
var d = c * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
e = Math.floor(c / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
a.drawImage(this.oFatNumbersImgData.img, d, e, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, k + 152 + n * this.timeSpace, l + 115, Math.round(.3 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.3 * this.oFatNumbersImgData.oData.spriteHeight))
}
}
break;
case "gameEnd":
var c = 1,
d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
a.drawImage(this.oPanelsImgData.img, d, e + 1, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight - 2, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight), this.renderLargeScore(), this.renderScore(curLevel, 229, 417 + this.posY);
var o, p = 77;
1 == this.curStarBarScale && 7 == curLevel ? (o = oImageIds.congratulations, p = -5) : o = saveDataHandler.getData(curLevel, 1) <= levelStars ? oImageIds.endTextBestScore : levelStars > 5 ? oImageIds["endTextGeneral" + gamePlayed % 3] : oImageIds.endTextBad;
var g = this.oGameElementsImgData.oData.oAtlasData[o].x,
h = this.oGameElementsImgData.oData.oAtlasData[o].y,
i = this.oGameElementsImgData.oData.oAtlasData[o].width,
j = this.oGameElementsImgData.oData.oAtlasData[o].height;
if (a.drawImage(this.oGameElementsImgData.img, g, h, i, j, canvas.width / 2 - i / 2, p + this.posY, i, j), this.prevScore < saveDataHandler.getData(curLevel, 0)) {
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBarBg].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBarBg].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBarBg].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBarBg].height;
a.drawImage(this.oGameElementsImgData.img, g, h, i, j, 210 - i / 2, 252 + this.posY, i, j);
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBar].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBar].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBar].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.starBar].height,
q = .02 * i + .98 * i * this.curStarBarScale;
a.drawImage(this.oGameElementsImgData.img, g, h, q, j, 30, 254 + this.posY, q, j);
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.star].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.star].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.star].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.star].height;
if (a.drawImage(this.oGameElementsImgData.img, g, h, i, j, 37 + q - i / 2, 252 + this.posY, i, j), this.curStarBarScale < 1) {
if (7 > curLevel) {
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toUnlock].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toUnlock].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toUnlock].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toUnlock].height;
a.drawImage(this.oGameElementsImgData.img, g, h, i, j, 46, 325 + this.posY, i, j)
} else {
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toComplete].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toComplete].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toComplete].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.toComplete].height;
a.drawImage(this.oGameElementsImgData.img, g, h, i, j, 46, 325 + this.posY, i, j)
}
for (var m = saveDataHandler.getData(curLevel, 0), n = 0; n < m.toString().length; n++) {
c = parseFloat(m.toString().charAt(n));
var d = c * this.oSmallNumbersImgData.oData.spriteWidth % this.oSmallNumbersImgData.img.width,
e = Math.floor(c / (this.oSmallNumbersImgData.img.width / this.oSmallNumbersImgData.oData.spriteWidth)) * this.oSmallNumbersImgData.oData.spriteHeight;
a.drawImage(this.oSmallNumbersImgData.img, d, e, this.oSmallNumbersImgData.oData.spriteWidth, this.oSmallNumbersImgData.oData.spriteHeight, 305 + n * smallNumberSpace, 332 + this.posY, this.oSmallNumbersImgData.oData.spriteWidth, this.oSmallNumbersImgData.oData.spriteHeight)
}
} else if (1 == this.curStarBarScale && 7 == curLevel) {
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.success].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.success].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.success].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.success].height;
a.drawImage(this.oGameElementsImgData.img, g, h, i, j, canvas.width / 2 - i / 2, 320 + this.posY, i, j)
} else {
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.endTextLevelUnlocked].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.endTextLevelUnlocked].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.endTextLevelUnlocked].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.endTextLevelUnlocked].height;
a.drawImage(this.oGameElementsImgData.img, g, h, i, j, canvas.width / 2 - i / 2, 328 + this.posY, i, j)
}
} else {
var g = this.oGameElementsImgData.oData.oAtlasData[oImageIds.cash].x,
h = this.oGameElementsImgData.oData.oAtlasData[oImageIds.cash].y,
i = this.oGameElementsImgData.oData.oAtlasData[oImageIds.cash].width,
j = this.oGameElementsImgData.oData.oAtlasData[oImageIds.cash].height;
a.drawImage(this.oGameElementsImgData.img, g, h, i, j, 130, 277 + this.posY, i, j);
for (var m = totalStars, n = 0; n < m.toString().length; n++) {
c = parseFloat(m.toString().charAt(n));
var d = c * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
e = Math.floor(c / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
a.drawImage(this.oFatNumbersImgData.img, d, e, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, 220 + n * this.timeSpace, 292 + this.posY, Math.round(.3 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.3 * this.oFatNumbersImgData.oData.spriteHeight))
}
}
break;
case "pause":
a.fillStyle = "rgba(0, 0, 0, 0.75)", a.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
}
b && this.addButs(a)
}, a.prototype.renderScore = function(a, b, c) {
for (var d = saveDataHandler.getData(a, 1), e = 0; e < d.toString().length; e++) {
var f = parseFloat(d.toString().charAt(e)),
g = f * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
h = Math.floor(f / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, g, h, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + e * this.timeSpace, c, Math.round(.31 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.31 * this.oFatNumbersImgData.oData.spriteHeight))
}
}, a.prototype.renderLargeScore = function() {
for (var a = levelStars, b = 0; b < a.toString().length; b++) {
var c = parseFloat(a.toString().charAt(b)),
d = c * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
e = Math.floor(c / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, d, e, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, 206 + b * this.largeTimeSpace, 132 + this.posY, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight)
}
}, a.prototype.renderLargeTime = function() {
var a = curTime,
b = 4,
c = 130 + this.posY,
d = Math.floor(a / 6e3).toString(),
e = Math.floor((a - 6e3 * Math.floor(a / 6e3)) / 100).toString();
e.length < 2 && (e = "0" + e);
var f = a.toString().charAt(a.toString().length - 2) + a.toString().charAt(a.toString().length - 1);
f.length < 2 && (f = "0" + f);
for (var g = 0; 2 > g; g++) {
var h = parseFloat(d.charAt(g));
if (d.length < 2) {
if (0 == g) continue;
h = parseFloat(d.charAt(0))
}
var i = h * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
j = Math.floor(h / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, i, j, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + g * this.largeTimeSpace, c, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight)
}
for (var g = 0; 2 > g; g++) {
var h = parseFloat(e.charAt(g)),
i = h * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
j = Math.floor(h / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, i, j, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + 167 + g * this.largeTimeSpace, c, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight)
}
for (var g = 0; 2 > g; g++) {
var h = parseFloat(f.charAt(g)),
i = h * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
j = Math.floor(h / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, i, j, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + 311 + g * (this.largeTimeSpace / 2), c, Math.round(.5 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.5 * this.oFatNumbersImgData.oData.spriteHeight))
}
}, a.prototype.renderTime = function(a, b, c) {
var d = saveDataHandler.getData(a, 1),
e = Math.floor(d / 6e3).toString(),
f = Math.floor((d - 6e3 * Math.floor(d / 6e3)) / 100).toString();
f.length < 2 && (f = "0" + f);
var g = d.toString().charAt(d.toString().length - 2) + d.toString().charAt(d.toString().length - 1);
g.length < 2 && (g = "0" + g);
for (var h = 0; 2 > h; h++) {
var i = parseFloat(e.charAt(h));
if (e.length < 2) {
if (0 == h) continue;
i = parseFloat(e.charAt(0))
}
var j = i * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
k = Math.floor(i / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, j, k, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + h * this.timeSpace, c, Math.round(.31 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.31 * this.oFatNumbersImgData.oData.spriteHeight))
}
for (var h = 0; 2 > h; h++) {
var i = parseFloat(f.charAt(h)),
j = i * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
k = Math.floor(i / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, j, k, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + 56 + h * this.timeSpace, c, Math.round(.31 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.31 * this.oFatNumbersImgData.oData.spriteHeight))
}
for (var h = 0; 2 > h; h++) {
var i = parseFloat(g.charAt(h)),
j = i * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
k = Math.floor(i / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
ctx.drawImage(this.oFatNumbersImgData.img, j, k, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, b + 112 + h * this.timeSpace, c, Math.round(.3 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.3 * this.oFatNumbersImgData.oData.spriteHeight))
}
}, a.prototype.addButs = function(a) {
for (var b = 0; b < this.aButs.length; b++) {
if ("levelSelect" == this.panelType) {
if (this.aButs[b].id == oImageIds.scrollLeftBut && 1 > curLevel) continue;
if (this.aButs[b].id == oImageIds.scrollRightBut && curLevel > aLevelData.length - 2) continue;
if (this.aButs[b].id == oImageIds.playBut && saveDataHandler.getData(curLevel - 1, 0) > saveDataHandler.getData(curLevel - 1, 1)) continue
}
var c = this.posY,
d = 0;
0 == this.incY || this.aButs[b].noMove || (d = 3 * Math.sin(2 * this.incY + 45 * b));
var e = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].x,
f = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].y,
g = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].width,
h = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].height;
a.drawImage(this.aButs[b].oImgData.img, e, f, g, h, this.aButs[b].aPos[0] - g / 2 + c - d / 2, this.aButs[b].aPos[1] - h / 2 + d / 2, g + d, h - d)
}
}, a
}();
a.Panel = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a() {
this.medSpace = 37, this.smallSpace = 26, this.introTimer = 0, this.hintY = 0, this.oHudImgData = assetLib.getData("hud"), this.oFatNumbersImgData = assetLib.getData("fatNumbers"), this.oSmallNumbersImgData = assetLib.getData("smallNumbers"), 0 == firstTimeState && 0 == curLevel && (this.hintY = 400, TweenLite.to(this, 1, {
hintY: 0,
ease: "Back.easeOut",
delay: 1
}))
}
return a.prototype.render = function(a) {
if (0 == firstTimeState && 0 == curLevel) {
this.introTimer > 6 ? (this.introTimer = -1, userCar.aCarData[0].accRate = 2, TweenLite.to(this, .5, {
hintY: 400,
ease: "Quad.easeIn",
onComplete: function(a) {
firstTimeState = 1, a.introTimer
},
onCompleteParams: [this]
})) : this.introTimer >= 0 && (this.introTimer += delta);
var b = 1,
c = b * this.oHudImgData.oData.spriteWidth % this.oHudImgData.img.width,
d = Math.floor(b / (this.oHudImgData.img.width / this.oHudImgData.oData.spriteWidth)) * this.oHudImgData.oData.spriteHeight;
a.drawImage(this.oHudImgData.img, c, d, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight, 0, 0, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight);
var b = 2,
c = b * this.oHudImgData.oData.spriteWidth % this.oHudImgData.img.width,
d = Math.floor(b / (this.oHudImgData.img.width / this.oHudImgData.oData.spriteWidth)) * this.oHudImgData.oData.spriteHeight;
a.drawImage(this.oHudImgData.img, c, d, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight, 0, this.hintY, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight)
} else if (2 == firstTimeState && 0 == curLevel) {
this.introTimer += delta, this.introTimer > 4 && (firstTimeState = 3);
var b = 3,
c = b * this.oHudImgData.oData.spriteWidth % this.oHudImgData.img.width,
d = Math.floor(b / (this.oHudImgData.img.width / this.oHudImgData.oData.spriteWidth)) * this.oHudImgData.oData.spriteHeight;
a.drawImage(this.oHudImgData.img, c, d, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight, 0, 0, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight)
} else {
var b = 0,
c = b * this.oHudImgData.oData.spriteWidth % this.oHudImgData.img.width,
d = Math.floor(b / (this.oHudImgData.img.width / this.oHudImgData.oData.spriteWidth)) * this.oHudImgData.oData.spriteHeight;
a.drawImage(this.oHudImgData.img, c, d, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight, 0, 0, this.oHudImgData.oData.spriteWidth, this.oHudImgData.oData.spriteHeight);
var e = Math.floor(curTime / 6e3).toString(),
f = Math.floor((curTime - 6e3 * Math.floor(curTime / 6e3)) / 100).toString();
f.length < 2 && (f = "0" + f);
var g = curTime.toString().charAt(curTime.toString().length - 2) + curTime.toString().charAt(curTime.toString().length - 1);
g.length < 2 && (g = "0" + g);
for (var h = 0; 2 > h; h++) {
var b = parseFloat(e.charAt(h));
if (e.length < 2) {
if (0 == h) continue;
b = parseFloat(e.charAt(0))
}
var c = b * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
d = Math.floor(b / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
a.drawImage(this.oFatNumbersImgData.img, c, d, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, 162 + h * this.medSpace, 7, Math.round(.5 * this.oFatNumbersImgData.oData.spriteWidth), Math.round(.5 * this.oFatNumbersImgData.oData.spriteHeight))
}
for (var h = 0; 2 > h; h++) {
var b = parseFloat(f.charAt(h)),
c = b * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
d = Math.floor(b / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
a.drawImage(this.oFatNumbersImgData.img, c, d, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, 249 + h * this.medSpace, 7, .5 * this.oFatNumbersImgData.oData.spriteWidth, .5 * this.oFatNumbersImgData.oData.spriteHeight)
}
for (var h = 0; 2 > h; h++) {
var b = parseFloat(g.charAt(h)),
c = b * this.oFatNumbersImgData.oData.spriteWidth % this.oFatNumbersImgData.img.width,
d = Math.floor(b / (this.oFatNumbersImgData.img.width / this.oFatNumbersImgData.oData.spriteWidth)) * this.oFatNumbersImgData.oData.spriteHeight;
a.drawImage(this.oFatNumbersImgData.img, c, d, this.oFatNumbersImgData.oData.spriteWidth, this.oFatNumbersImgData.oData.spriteHeight, 325 + h * this.smallSpace, 7, .35 * this.oFatNumbersImgData.oData.spriteWidth, .35 * this.oFatNumbersImgData.oData.spriteHeight)
}
for (var i = levelStars, j = 0; j < i.toString().length; j++) {
b = parseFloat(i.toString().charAt(j));
var c = b * this.oSmallNumbersImgData.oData.spriteWidth % this.oSmallNumbersImgData.img.width,
d = Math.floor(b / (this.oSmallNumbersImgData.img.width / this.oSmallNumbersImgData.oData.spriteWidth)) * this.oSmallNumbersImgData.oData.spriteHeight;
a.drawImage(this.oSmallNumbersImgData.img, c, d, this.oSmallNumbersImgData.oData.spriteWidth, this.oSmallNumbersImgData.oData.spriteHeight, 89 + j * smallNumberSpace - i.toString().length / 2 * smallNumberSpace, 42, this.oSmallNumbersImgData.oData.spriteWidth, this.oSmallNumbersImgData.oData.spriteHeight)
}
for (var i = saveDataHandler.getData(curLevel, 0), j = 0; j < i.toString().length; j++) {
b = parseFloat(i.toString().charAt(j));
var c = b * this.oSmallNumbersImgData.oData.spriteWidth % this.oSmallNumbersImgData.img.width,
d = Math.floor(b / (this.oSmallNumbersImgData.img.width / this.oSmallNumbersImgData.oData.spriteWidth)) * this.oSmallNumbersImgData.oData.spriteHeight;
a.drawImage(this.oSmallNumbersImgData.img, c, d, this.oSmallNumbersImgData.oData.spriteWidth, this.oSmallNumbersImgData.oData.spriteHeight, 150 + j * smallNumberSpace - i.toString().length / 2 * smallNumberSpace, 42, this.oSmallNumbersImgData.oData.spriteWidth, this.oSmallNumbersImgData.oData.spriteHeight)
}
}
}, a
}();
a.Hud = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a() {
this.x = 0, this.y = 0, this.targY = 0, this.incY = 0, this.renderState = null, this.maxWidth = 2e3, this.maxHeight = 2e3, this.aheadX = 0, this.aheadY = 0, this.offsetDist = 175, this.shudderInc = 0, this.oImgData = assetLib.getData("ground" + curLevel)
}
return a.prototype.update = function() {
this.targAheadX = this.offsetDist * Math.cos(userCar.angle), this.targAheadY = this.offsetDist * Math.sin(userCar.angle), this.aheadX += 2 * (this.targAheadX - this.aheadX) * delta, this.aheadY += 2 * (this.targAheadY - this.aheadY) * delta, this.x = Math.max(Math.min(userCar.trackX + this.aheadX + this.shudderInc, this.maxWidth - canvas.width / 2), canvas.width / 2), this.y = Math.max(Math.min(userCar.trackY + this.aheadY + this.shudderInc, this.maxHeight - canvas.height / 2), canvas.height / 2)
}, a.prototype.render = function() {
ctx.drawImage(this.oImgData.img, this.x - canvas.width / 2, this.y - canvas.height / 2, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
}, a
}();
a.Ground = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a(a) {
this.x = 0, this.y = 0, this.speed = 0, this.targSpeed = 0, this.aCarData = new Array({
maxEnemySpeed: 2,
maxSpeed: 3.7,
groundFriction: 2.2,
accRate: 2,
steerRate: .3,
steerDamper: 3,
steerReaction: 15
}, {
maxEnemySpeed: 2.5,
maxSpeed: 4,
groundFriction: 2,
accRate: 3,
steerRate: .32,
steerDamper: 3,
steerReaction: 7
}, {
maxEnemySpeed: 2.5,
maxSpeed: 4.3,
groundFriction: 2.5,
accRate: 5,
steerRate: .3,
steerDamper: 3.2,
steerReaction: 12
}, {
maxEnemySpeed: 3.2,
maxSpeed: 4.7,
groundFriction: 1.5,
accRate: 4,
steerRate: .23,
steerDamper: 2,
steerReaction: 8
}, {
maxEnemySpeed: 3.2,
maxSpeed: 4.5,
groundFriction: 3.5,
accRate: 5,
steerRate: .26,
steerDamper: 4,
steerReaction: 12
}, {
maxEnemySpeed: 3,
maxSpeed: 4.2,
groundFriction: 1,
accRate: 2,
steerRate: .27,
steerDamper: 5,
steerReaction: 5
}, {
maxEnemySpeed: 3.5,
maxSpeed: 4.5,
groundFriction: 2,
accRate: 4,
steerRate: .3,
steerDamper: 2,
steerReaction: 7
}, {
maxEnemySpeed: 4,
maxSpeed: 5,
groundFriction: 1.75,
accRate: 4,
steerRate: .3,
steerDamper: 2,
steerReaction: 20
}), this.carType = "user", this.canHit = !0, this.angle = 0, this.rotation = 0, this.radius = 40, this.carHitRadius = 60, this.vx = 0, this.vy = 0, this.m = 1, this.f = .5, this.b = 1, this.steer = 0, this.targVx = 0, this.targVy = 0, this.endTimer = 0, this.driftInc = 5, this.shieldState = 0, this.shieldInc = 0, this.shieldFlickerInc = 0, this.shieldFlickerState = !1, this.hitScale = 1, this.hitState = 0, this.flickerInc = 0, this.flickerState = !1, this.firstDrift = !0, this.oImgData = assetLib.getData("cars"), this.carId = oImageIds["userCar" + curLevel], this.oData = a, this.trackX = this.oData.trackX, this.trackY = this.oData.trackY, this.p0 = {
x: this.trackX,
y: this.trackY
}, this.p1 = {
x: this.trackX,
y: this.trackY
}, this.angle = this.rotation = this.oData.rot, this.updateFunc = this.updateInPlay, this.vx = this.speed * Math.cos(this.angle), this.vy = this.speed * Math.sin(this.angle);
var b = this.aCarData[curLevel].maxSpeed;
this.aCarData[curLevel].maxSpeed = 1, TweenLite.to(this.aCarData[curLevel], 3, {
maxSpeed: b,
ease: "Linear.easeNone"
})
}
return a.prototype.hitWall = function() {
0 == this.shieldState && carInPlay, playSound("hitWall");
var a = Math.atan2(this.vy, this.vx);
a - this.angle > 180 * radian ? a -= 360 * radian : a - this.angle < -180 * radian && (a += 360 * radian), a > this.angle ? this.angle += 20 * radian : this.angle -= 20 * radian
}, a.prototype.hitCar = function(a, b) {
"undefined" == typeof b && (b = !1), this.angle += (40 * Math.random() - 20) * radian, b ? (this.hitState = 1, this.flickerInc = 0, this.flickerState = !1, this.hitScale = .2, TweenLite.to(this, .7, {
hitScale: 1,
ease: "Elastic.easeOut",
onComplete: function(a) {
a.hitState = 0, a.carId = oImageIds["userCar" + curLevel]
},
onCompleteParams: [this]
}), this.vx = 1 * this.speed * Math.cos(a), this.vy = 1 * this.speed * Math.sin(a)) : (this.vx = this.speed * Math.cos(a) / 2, this.vy = this.speed * Math.sin(a) / 2)
}, a.prototype.explode = function() {
carInPlay && (this.carId = oImageIds["userCarDead" + curLevel], this.updateFunc = this.updateNotInPlay, this.targSpeed = this.aCarData[curLevel].maxSpeed / 2, TweenLite.to(this, 2, {
endTimer: 0,
ease: "Quad.easeOut",
onComplete: initGameEnd
}))
}, a.prototype.hitShield = function() {
this.shieldInc = 10, this.shieldState = 2
}, a.prototype.update = function(a, b) {
this.updateFunc(a, b)
}, a.prototype.updateInPlay = function(a, b) {
this.shieldInc -= delta, this.shieldInc < 0 ? this.shieldState = 0 : this.shieldInc < 3 && (this.shieldState = 1), this.steer = (rightSteer + leftSteer) / this.aCarData[curLevel].steerRate, this.angle -= this.steer * delta, this.angle < -180 * radian ? (this.angle += 360 * radian, this.rotation += 360 * radian) : this.angle > 180 * radian && (this.angle -= 360 * radian, this.rotation -= 360 * radian), Math.abs(this.steer) == 1 / this.aCarData[curLevel].steerRate ? (this.driftInc += delta, this.driftInc > .02 && (this.firstDrift && (playSound("skid"), this.firstDrift = !1), addDrift(this.trackX, this.trackY), this.driftInc = 0)) : (this.driftInc = -.2, this.firstDrift = !0), this.rotation += (this.angle - this.rotation) * this.aCarData[curLevel].steerReaction * delta, this.targSpeed = this.aCarData[curLevel].maxSpeed * (1 - this.aCarData[curLevel].steerRate / this.aCarData[curLevel].steerDamper * Math.abs(this.steer)), this.speed += (this.targSpeed - this.speed) * this.aCarData[curLevel].accRate * delta, this.targVx = this.speed * Math.cos(this.angle), this.targVy = this.speed * Math.sin(this.angle), this.vx += (this.targVx - this.vx) * this.aCarData[curLevel].groundFriction * delta, this.vy += (this.targVy - this.vy) * this.aCarData[curLevel].groundFriction * delta, this.x = this.trackX - a + canvas.width / 2, this.y = this.trackY - b + canvas.height / 2
}, a.prototype.updateNotInPlay = function(a, b) {
this.angle < -180 * radian ? (this.angle += 360 * radian, this.rotation += 360 * radian) : this.angle > 180 * radian && (this.angle -= 360 * radian, this.rotation -= 360 * radian), this.rotation += 20 * (this.angle - this.rotation) * delta, this.speed += 2 * (this.targSpeed - this.speed) * delta, this.vx += 2 * (0 - this.vx) * delta, this.vy += 2 * (0 - this.vy) * delta, this.x = this.trackX - a + canvas.width / 2, this.y = this.trackY - b + canvas.height / 2
}, a.prototype.render = function() {
if (2 == this.shieldState) {
var a = this.oImgData.oData.oAtlasData[oImageIds.carShield0].x,
b = this.oImgData.oData.oAtlasData[oImageIds.carShield0].y,
c = this.oImgData.oData.oAtlasData[oImageIds.carShield0].width,
d = this.oImgData.oData.oAtlasData[oImageIds.carShield0].height;
ctx.drawImage(this.oImgData.img, a, b, c, d, this.x - c / 2, this.y - d / 2, c, d)
} else if (1 == this.shieldState)
if (this.shieldFlickerInc -= delta, this.shieldFlickerInc < 0 && (this.shieldFlickerState = !this.shieldFlickerState, this.shieldFlickerInc = .1), this.shieldFlickerState) {
var a = this.oImgData.oData.oAtlasData[oImageIds.carShield0].x,
b = this.oImgData.oData.oAtlasData[oImageIds.carShield0].y,
c = this.oImgData.oData.oAtlasData[oImageIds.carShield0].width,
d = this.oImgData.oData.oAtlasData[oImageIds.carShield0].height;
ctx.drawImage(this.oImgData.img, a, b, c, d, this.x - c / 2, this.y - d / 2, c, d)
} else {
var a = this.oImgData.oData.oAtlasData[oImageIds.carShield1].x,
b = this.oImgData.oData.oAtlasData[oImageIds.carShield1].y,
c = this.oImgData.oData.oAtlasData[oImageIds.carShield1].width,
d = this.oImgData.oData.oAtlasData[oImageIds.carShield1].height;
ctx.drawImage(this.oImgData.img, a, b, c, d, this.x - c / 2, this.y - d / 2, c, d)
}
1 == this.hitState && (this.flickerInc -= delta, this.flickerInc < 0 && (this.flickerState = !this.flickerState, this.flickerInc = .1), this.carId = this.flickerState ? oImageIds["userCarDead" + curLevel] : oImageIds["userCar" + curLevel]), ctx.save(), ctx.translate(this.x, this.y), ctx.rotate(this.rotation), ctx.scale(this.hitScale, 2 - this.hitScale);
var a = this.oImgData.oData.oAtlasData[this.carId].x,
b = this.oImgData.oData.oAtlasData[this.carId].y,
c = this.oImgData.oData.oAtlasData[this.carId].width,
d = this.oImgData.oData.oAtlasData[this.carId].height;
ctx.drawImage(this.oImgData.img, a, b, c, d, -c / 2, -d / 2, c, d), ctx.restore()
}, a
}();
a.UserCar = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a(a) {
this.x = 0, this.y = 0, this.speed = 0, this.targSpeed = 0, this.maxSpeed = .5, this.carType = "enemy", this.canHit = !0, this.angle = 0, this.rotation = 0, this.radius = 40, this.carHitRadius = 60, this.vx = 0, this.vy = 0, this.m = 1, this.f = .5, this.b = 1, this.steer = 0, this.steerRate = 0, this.targVx = 0, this.targVy = 0, this.inc = 0, this.aTargs = new Array, this.hitInc = 0, this.frozenState = 0, this.flickerState = !1, this.flickerInc = 0, this.hitState = 0, this.frameInc = 1 * Math.random(), this.flashLights = !0, this.oImgData = assetLib.getData("cars"), this.oData = a, this.oData.id = 0, this.carId = oImageIds["enemyCar" + this.oData.id], this.trackX = this.oData.trackX, this.trackY = this.oData.trackY, this.p0 = {
x: this.trackX,
y: this.trackY
}, this.p1 = {
x: this.trackX,
y: this.trackY
}, this.angle = this.rotation = this.targAngle = this.oData.rot, this.updateFunc = this.updateInPlay, this.vx = this.speed * Math.cos(this.angle), this.vy = this.speed * Math.sin(this.angle)
}
return a.prototype.hitWall = function() {
var a = Math.atan2(this.vy, this.vx);
a - this.angle > 180 * radian ? a -= 360 * radian : a - this.angle < -180 * radian && (a += 360 * radian), a > this.angle ? this.angle += 20 * radian : this.angle -= 20 * radian
}, a.prototype.hitCar = function(a, b) {
"undefined" == typeof b && (b = 0), this.hitState = b, 2 == this.hitState ? (this.vx = 2 * this.maxSpeed * Math.cos(a), this.vy = 2 * this.maxSpeed * Math.sin(a), this.angle += (360 * Math.random() - 180) * radian, this.hitInc = 0, this.flickerState = !1, this.flickerInc = 0, this.updateFunc = this.updateNotInPlay, this.carId = oImageIds.userCarDead0, this.flashLights = !1) : 1 == this.hitState ? (this.vx = 1 * this.maxSpeed * Math.cos(a), this.vy = 1 * this.maxSpeed * Math.sin(a), this.angle += (360 * Math.random() - 180) * radian, this.hitInc = 0, this.updateFunc = this.updateNotInPlay) : (this.vx = this.maxSpeed * Math.cos(a) / 2, this.vy = this.maxSpeed * Math.sin(a) / 2, this.angle += (40 * Math.random() - 20) * radian), this.canHit = !1
}, a.prototype.freeze = function() {
this.canHit && (this.hitInc = 0, this.carId = oImageIds.enemyCarFrozen, this.flashLights = !1, this.updateFunc = this.updateFrozen, this.frozenState = 1, this.flickerState = !1, this.flickerInc = 0)
}, a.prototype.update = function(a, b) {
this.updateFunc(a, b)
}, a.prototype.updateInPlay = function(a, b) {
this.maxSpeed = Math.min(this.maxSpeed + delta / 10, userCar.aCarData[curLevel].maxEnemySpeed), this.steerRate = this.maxSpeed / 2, this.canHit || (this.hitInc += delta, this.hitInc > .1 && (this.canHit = !0, this.hitInc = 0)), this.inc -= delta, this.inc < 0 && 0 != this.targId && (this.inc = 4 * Math.random() + 4, this.targId = (this.targId + 1) % this.aTargs.length), 0 == this.targId ? (this.targAngle = Math.atan2(userCar.y - this.y, userCar.x - this.x), userCar.x - this.x < 200 && userCar.y - this.y > 300 && (this.inc = 4 * Math.random() + 4, this.targId = Math.floor(Math.random() * this.aTargs.length))) : (this.targAngle = Math.atan2(this.aTargs[this.targId - 1].y - b + canvas.height / 2 - this.y, this.aTargs[this.targId - 1].x - a + canvas.width / 2 - this.x), userCar.x - this.x < 300 && userCar.y - this.y < 300 && (this.targId = 0)), this.targAngle - this.angle > 180 * radian ? this.targAngle -= 360 * radian : this.targAngle - this.angle < -180 * radian && (this.targAngle += 360 * radian), this.targAngle > this.angle ? this.angle += this.steerRate * delta : this.angle -= this.steerRate * delta, this.angle < -180 * radian ? (this.angle += 360 * radian, this.rotation += 360 * radian) : this.angle > 180 * radian && (this.angle -= 360 * radian, this.rotation -= 360 * radian), this.rotation += 5 * (this.angle - this.rotation) * delta, this.targSpeed = this.maxSpeed, this.speed += 2 * (this.targSpeed - this.speed) * delta, this.targVx = this.speed * Math.cos(this.angle), this.targVy = this.speed * Math.sin(this.angle), this.vx += 1.5 * (this.targVx - this.vx) * delta, this.vy += 1.5 * (this.targVy - this.vy) * delta, this.x = this.trackX - a + canvas.width / 2, this.y = this.trackY - b + canvas.height / 2
}, a.prototype.updateNotInPlay = function(a, b) {
return 2 == this.hitState && (this.flickerInc -= delta, this.flickerInc < 0 && (this.flickerState = !this.flickerState, this.flickerInc = .1), this.flickerState ? (this.carId = oImageIds.userCarDead0, this.flashLights = !1) : (this.carId = oImageIds["enemyCar" + this.oData.id], this.flashLights = !0)), this.hitInc += delta, this.hitInc > .5 ? (2 == this.hitState ? (explodeEnemy(this), this.frozenState = 0, this.updateFunc = this.updateResetCheck, this.hitInc = 0) : (this.hitInc = 0, this.frozenState = 0, this.canHit = !0, this.updateFunc = this.updateInPlay), void 0) : (this.angle < -180 * radian ? (this.angle += 360 * radian, this.rotation += 360 * radian) : this.angle > 180 * radian && (this.angle -= 360 * radian, this.rotation -= 360 * radian), this.rotation += 20 * (this.angle - this.rotation) * delta, this.speed += 2 * (this.targSpeed - this.speed) * delta, this.vx += 2 * (0 - this.vx) * delta, this.vy += 2 * (0 - this.vy) * delta, this.x = this.trackX - a + canvas.width / 2, this.y = this.trackY - b + canvas.height / 2, void 0)
}, a.prototype.updateFrozen = function(a, b) {
return this.hitInc += delta, this.hitInc > 7 ? (this.hitInc = 0, this.frozenState = 0, this.canHit = !0, this.carId = oImageIds["enemyCar" + this.oData.id], this.flashLights = !0, this.updateFunc = this.updateInPlay, void 0) : (this.hitInc > 4 && (this.frozenState = 2), 2 == this.frozenState && (this.flickerInc -= delta, this.flickerInc < 0 && (this.flickerState = !this.flickerState, this.flickerInc = .1), this.flickerState ? (this.carId = oImageIds.enemyCarFrozen, this.flashLights = !1) : (this.carId = oImageIds["enemyCar" + this.oData.id], this.flashLights = !0)), this.angle < -180 * radian ? (this.angle += 360 * radian, this.rotation += 360 * radian) : this.angle > 180 * radian && (this.angle -= 360 * radian, this.rotation -= 360 * radian), this.rotation += 20 * (this.angle - this.rotation) * delta, this.speed += 2 * (this.targSpeed - this.speed) * delta, this.vx += 2 * (0 - this.vx) * delta, this.vy += 2 * (0 - this.vy) * delta, this.x = this.trackX - a + canvas.width / 2, this.y = this.trackY - b + canvas.height / 2, void 0)
}, a.prototype.updateResetCheck = function(a, b) {
this.x = -200 - a + canvas.width / 2, this.y = -200 - b + canvas.height / 2, (userCar.trackX < this.oData.trackX - 400 || userCar.trackX > this.oData.trackX + 400) && (userCar.trackY < this.oData.trackY - 650 || userCar.trackY > this.oData.trackY + 650) && (this.trackX = this.oData.trackX, this.trackY = this.oData.trackY, this.updateFunc = this.updateInPlay, this.canHit = !1, this.p0 = {
x: this.trackX,
y: this.trackY
}, this.p1 = {
x: this.trackX,
y: this.trackY
}, this.carId = oImageIds["enemyCar" + this.oData.id], this.flashLights = !0)
}, a.prototype.render = function() {
ctx.save(), ctx.translate(this.x, this.y), ctx.rotate(this.rotation), this.flashLights && (this.frameInc += 6 * delta, this.oData.id = Math.round(this.frameInc) % 2, this.carId = oImageIds["enemyCar" + this.oData.id]);
var a = this.oImgData.oData.oAtlasData[this.carId].x,
b = this.oImgData.oData.oAtlasData[this.carId].y,
c = this.oImgData.oData.oAtlasData[this.carId].width,
d = this.oImgData.oData.oAtlasData[this.carId].height;
ctx.drawImage(this.oImgData.img, a, b, c, d, -c / 2, -d / 2, c, d), ctx.restore()
}, a
}();
a.EnemyCar = b
}(Elements || (Elements = {}));
var Utils;
! function(a) {
var b = function() {
function a(a, b) {
this.aLines = new Array, this.aBalls = new Array, this.aLines = a, this.aBalls = b.slice(0);
for (var c = 0; c < this.aLines.length; c++) this.updateVector(this.aLines[c], null, !0)
}
return a.prototype.drawAll = function(a) {
for (var b = 0; b < this.aBalls.length; b++) {
var c = this.aBalls[b];
c.trackX = c.p1.x, c.trackY = c.p1.y, c.p0 = c.p1, this.updateVector(c, a)
}
}, a.prototype.update = function(a) {
var b;
for (b = 0; b < this.aBalls.length; b++) {
var c = this.aBalls[b];
this.updateVector(c, a);
for (var d = 0; d < this.aLines.length; d++) {
this.fi = this.findIntersection(c, this.aLines[d]), this.updateVector(this.fi, a, !1);
var e = c.radius - this.fi.len;
if (e >= 0) {
c.hitWall(), playSound("wall" + Math.ceil(2 * Math.random())), c.p1.x += this.fi.dx * e, c.p1.y += this.fi.dy * e;
var f = {
dx: this.fi.lx,
dy: this.fi.ly,
lx: this.fi.dx,
ly: this.fi.dy,
b: 1,
f: 1
},
g = this.bounce(c, f);
c.vx = g.vx, c.vy = g.vy
}
}
}
this.drawAll(a)
}, a.prototype.updateVector = function(a, b, c) {
"undefined" == typeof c && (c = !1), null == b && (b = .016), 1 == c ? (a.vx = a.p1.x - a.p0.x, a.vy = a.p1.y - a.p0.y) : (a.p1.x = a.p0.x + 60 * a.vx * b, a.p1.y = a.p0.y + 60 * a.vy * b), this.makeVector(a)
}, a.prototype.makeVector = function(a) {
a.len = Math.sqrt(a.vx * a.vx + a.vy * a.vy), a.len > 0 ? (a.dx = a.vx / a.len, a.dy = a.vy / a.len) : (a.dx = 0, a.dy = 0), a.rx = -a.dy, a.ry = a.dx, a.lx = a.dy, a.ly = -a.dx
}, a.prototype.dotP = function(a, b) {
var c = a.vx * b.vx + a.vy * b.vy;
return c
}, a.prototype.projectVector = function(a, b, c) {
var d = a.vx * b + a.vy * c,
e = {};
return e.vx = d * b, e.vy = d * c, e
}, a.prototype.bounceBalls = function(a, b, c) {
var d = this.projectVector(a, c.dx, c.dy),
e = this.projectVector(a, c.lx, c.ly),
f = this.projectVector(b, c.dx, c.dy),
g = this.projectVector(b, c.lx, c.ly),
h = a.m * d.vx + b.m * f.vx,
i = d.vx - f.vx,
j = (h + i * a.m) / (a.m + b.m),
k = j - i;
h = a.m * d.vy + b.m * f.vy, i = d.vy - f.vy;
var l = (h + i * a.m) / (a.m + b.m),
m = l - i,
n = {};
return n.vx1 = e.vx + k, n.vy1 = e.vy + m, n.vx2 = g.vx + j, n.vy2 = g.vy + l, n
}, a.prototype.bounce = function(a, b) {
var c = this.projectVector(a, b.dx, b.dy),
d = this.projectVector(a, b.lx, b.ly),
e = {};
return d.len = Math.sqrt(d.vx * d.vx + d.vy * d.vy), d.vx = b.lx * d.len, d.vy = b.ly * d.len, e.vx = a.f * b.f * c.vx + a.b * b.b * d.vx, e.vy = a.f * b.f * c.vy + a.b * b.b * d.vy, e
}, a.prototype.findIntersection = function(a, b) {
var c = {},
d = {};
d.vx = a.p1.x - b.p0.x, d.vy = a.p1.y - b.p0.y;
var e = d.vx * b.dx + d.vy * b.dy;
if (0 > e) c = d;
else {
var f = {};
f.vx = a.p1.x - b.p1.x, f.vy = a.p1.y - b.p1.y, e = f.vx * b.dx + f.vy * b.dy, c = e > 0 ? f : this.projectVector(d, b.lx, b.ly)
}
return c.p0 = {
x: 0,
y: 0
}, c.p1 = {
x: 0,
y: 0
}, c
}, a
}();
a.Physics2D = b
}(Utils || (Utils = {}));
var Utils;
! function(a) {
var b = function() {
function a(a) {
this.dataGroupNum = 2, this.saveDataId = a, this.clearData(), this.setInitialData()
}
return a.prototype.clearData = function() {
this.aLevelStore = new Array
}, a.prototype.resetData = function() {
this.aLevelStore = [150, 0, 160, 0, 160, 0, 140, 0, 190, 0, 160, 0, 170, 0, 180, 0, 0], this.saveData()
}, a.prototype.setInitialData = function() {
if ("undefined" != typeof Storage)
if (null != localStorage.getItem(this.saveDataId) && "" != localStorage.getItem(this.saveDataId)) {
this.aLevelStore = localStorage.getItem(this.saveDataId).split(",");
for (var a in this.aLevelStore) this.aLevelStore[a] = parseInt(this.aLevelStore[a])
} else this.resetData()
}, a.prototype.setData = function(a, b, c) {
this.aLevelStore[a * this.dataGroupNum + b] = c, this.saveData()
}, a.prototype.getData = function(a, b) {
return this.aLevelStore[a * this.dataGroupNum + b]
}, a.prototype.saveData = function() {
if ("undefined" != typeof Storage) {
for (var a = "", b = 0; b < this.aLevelStore.length; b++) a += this.aLevelStore[b], b < this.aLevelStore.length - 1 && (a += ",");
localStorage.setItem(this.saveDataId, a)
}
}, a
}();
a.SaveDataHandler = b
}(Utils || (Utils = {}));
var __extends = this.__extends || function(a, b) {
function c() {
this.constructor = a
}
c.prototype = b.prototype, a.prototype = new c
},
Elements;
! function(a) {
var b = function(a) {
function b(b, c) {
"undefined" == typeof c && (c = 0), a.call(this, assetLib.getData("pickUps"), 25, 30, "explode"), this.startX = 0, this.startY = 0, this.canHit = !1, this.removeMe = !1, this.carHitRadius = 80, this.onDelay = 0, this.pickUpId = 0, this.squash = 0, this.squashInc = 0, this.flickerInc = 0, this.flickerState = !0, this.starType = c, this.oData = b, this.startTween(), 0 == this.starType ? this.resetPos() : (this.startX = this.oData.x, this.startY = this.oData.y), this.updateFunc = this.updateStill, this.renderFunc = this.renderStill
}
return __extends(b, a), b.prototype.resetPos = function() {
this.startX = this.oData.x + 90 * Math.cos(360 * Math.random() * radian), this.startY = this.oData.y + 90 * Math.sin(360 * Math.random() * radian)
}, b.prototype.throwMe = function(a, b) {
this.canHit = !1, TweenLite.to(this, 1, {
startX: this.startX + a,
startY: this.startY + b,
ease: "Quad.easeOut",
onComplete: function(a) {
a.canHit = !0, a.pickUpId = 1
},
onCompleteParams: [this]
})
}, b.prototype.hit = function() {
this.canHit = !1, this.scaleX = this.scaleY = 1.5, this.updateFunc = this.updateExplode, this.renderFunc = this.renderExplode, this.animEndedFunc = this.explodeComplete, this.setAnimType("once", "explode")
}, b.prototype.startTween = function() {
this.scaleX = this.scaleY = 0, this.canHit = !0;
var a = .65;
this.pickUpId = 2 == this.starType ? 0 : Math.random() < a || 1 == this.starType || 0 == firstTimeState ? 1 : 2 + Math.floor(4 * Math.random()), TweenLite.to(this, 1, {
scaleX: 1,
scaleY: 1,
ease: "Elastic.easeOut"
})
}, b.prototype.explodeComplete = function() {
0 == this.starType ? (this.scaleX = this.scaleY = 0, this.onDelay = 3, this.resetPos(), this.updateFunc = this.updateStill, this.renderFunc = this.renderStill) : this.removeMe = !0
}, b.prototype.update = function(a, b) {
this.updateFunc(a, b)
}, b.prototype.updateStill = function(a, b) {
this.x = this.startX - a + canvas.width / 2, this.y = this.startY - b + canvas.height / 2, this.squashInc += delta, this.squash = 10 * Math.sin(10 * this.squashInc)
}, b.prototype.updateExplode = function(b, c) {
this.x = this.startX - b + canvas.width / 2, this.y = this.startY - c + canvas.height / 2, a.prototype.updateAnimation.call(this, delta)
}, b.prototype.render = function() {
this.renderFunc()
}, b.prototype.renderStill = function() {
if (this.onDelay <= 0) {
if (0 == this.starType || 1 == this.starType && !this.canHit) {
var a = this.pickUpId * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
b = Math.floor(this.pickUpId / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
ctx.drawImage(this.oImgData.img, a, b, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, this.x - (this.oImgData.oData.spriteWidth / 2 + this.squash / 2) * this.scaleX, this.y - (this.oImgData.oData.spriteHeight / 2 - this.squash / 2) * this.scaleY, (this.oImgData.oData.spriteWidth + this.squash) * this.scaleX, (this.oImgData.oData.spriteHeight - this.squash) * this.scaleY)
} else if (this.onDelay -= delta, this.onDelay < -6 && (this.removeMe = !0), this.onDelay > -3 ? this.flickerState = !0 : (this.flickerInc -= delta, this.flickerInc < 0 && (this.flickerState = !this.flickerState, this.flickerInc = .1)), this.flickerState) {
var a = this.pickUpId * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
b = Math.floor(this.pickUpId / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
ctx.drawImage(this.oImgData.img, a, b, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, this.x - (this.oImgData.oData.spriteWidth / 2 + this.squash / 2) * this.scaleX, this.y - (this.oImgData.oData.spriteHeight / 2 - this.squash / 2) * this.scaleY, (this.oImgData.oData.spriteWidth + this.squash) * this.scaleX, (this.oImgData.oData.spriteHeight - this.squash) * this.scaleY)
}
} else this.onDelay -= delta, this.onDelay <= 0 && (this.onDelay = 0, this.startTween())
}, b.prototype.renderExplode = function() {
a.prototype.renderSimple.call(this, ctx)
}, b
}(Utils.AnimSprite);
a.Star = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function(a) {
function b() {
a.call(this, assetLib.getData("skidmark"), 5, 30, "explode"), this.startX = 0, this.startY = 0, this.setAnimType("once", "explode"), this.animEndedFunc = function() {
this.removeMe = !0
}
}
return __extends(b, a), b.prototype.update = function(b, c) {
this.x = this.startX - b + canvas.width / 2, this.y = this.startY - c + canvas.height / 2, a.prototype.updateAnimation.call(this, delta)
}, b.prototype.render = function() {
a.prototype.renderSimple.call(this, ctx)
}, b
}(Utils.AnimSprite);
a.Drift = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function() {
function a() {
this.x = 0, this.y = 0, this.startX = 0, this.startY = 0, this.targX = 0, this.targY = 0, this.oImgData = assetLib.getData("debris")
}
return a.prototype.explode = function() {
TweenLite.to(this, 2 * Math.random() + 1, {
startX: this.targX,
startY: this.targY,
ease: "Quad.easeOut"
})
}, a.prototype.update = function(a, b) {
this.x = this.startX - a + canvas.width / 2, this.y = this.startY - b + canvas.height / 2
}, a.prototype.render = function() {
var a = this.debrisId * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
b = Math.floor(this.debrisId / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
ctx.drawImage(this.oImgData.img, a, b, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, this.x - this.oImgData.oData.spriteWidth / 2, this.y - this.oImgData.oData.spriteHeight / 2, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight)
}, a
}();
a.Debris = b
}(Elements || (Elements = {}));
var Elements;
! function(a) {
var b = function(a) {
function b() {
a.call(this, assetLib.getData("carExplode"), 20, 30, "explode"), this.startX = 0, this.startY = 0, this.scaleX = this.scaleY = 1.75, this.setAnimType("once", "explode"), this.animEndedFunc = function() {
this.removeMe = !0
}
}
return __extends(b, a), b.prototype.update = function(b, c) {
this.x = this.startX - b + canvas.width / 2, this.y = this.startY - c + canvas.height / 2, a.prototype.updateAnimation.call(this, delta)
}, b.prototype.render = function() {
a.prototype.renderSimple.call(this, ctx)
}, b
}(Utils.AnimSprite);
a.Explode = b
}(Elements || (Elements = {}));
var requestAnimFrame = function() {
return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
window.setTimeout(a, 1e3 / 60, (new Date).getTime())
}
}(),
previousTime, canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");
canvas.width = 450, canvas.height = 700;
var canvasX, canvasY, canvasScaleX, canvasScaleY, div = document.getElementById("viewporter"),
sound, music, audioType = 0,
muted = !1,
splash, splashTimer = 0,
assetLib, preAssetLib, rotatePause = !1,
manualPause = !1,
isMobile = !1,
gameState = "loading",
aLangs = new Array("EN"),
curLang = "",
isBugBrowser = !1,
delta, isIE10 = !1,
radian = Math.PI / 180,
oImageIds = {};
navigator.userAgent.match(/MSIE\s([\d]+)/) && (isIE10 = !0);
var deviceAgent = navigator.userAgent.toLowerCase();
(deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i)) && (isMobile = !0, deviceAgent.match(/(android)/) && !/Chrome/.test(navigator.userAgent) && (isBugBrowser = !0));
var userInput = new Utils.UserInput(canvas, isBugBrowser);
resizeCanvas(), window.onresize = function() {
setTimeout(function() {
resizeCanvas()
}, 1)
}, window.addEventListener("load", function() {
setTimeout(function() {
resizeCanvas()
}, 0), window.addEventListener("orientationchange", function() {
setTimeout(function() {
resizeCanvas()
}, 500)
}, !1)
}), isIE10 || "undefined" == typeof window.AudioContext && "undefined" == typeof window.webkitAudioContext && -1 != navigator.userAgent.indexOf("Android") ? audioType = 0 : (audioType = 1, sound = new Howl({
urls: ["audio/sound.ogg", "audio/sound.m4a"],
sprite: {
click: [0, 200],
dropStars: [500, 800],
levelEnd: [1500, 800],
levelStart: [2500, 800],
collectTimer: [3500, 600],
enemyExplode: [4500, 1e3],
collectBomb: [6e3, 1500],
hitFrozenCar: [8e3, 700],
collectFreeze: [9e3, 1300],
collectShield: [10500, 1200],
levelUnlocked: [12500, 1500],
starBarIncrease: [14500, 1500],
hitEnemyWithShield: [16500, 800],
collectStar: [17500, 1e3],
hitWall: [19e3, 400],
skid: [19500, 800]
}
}), music = new Howl({
urls: ["audio/music.ogg", "audio/music.m4a"],
volume: .01,
loop: !0
}));
var panel, hud, background, oLogoData = {},
oLogoBut, leftSteer = 0,
rightSteer = 0,
ground, userCar, physics2D, curTime = 0,
aCars, saveDataHandler = new Utils.SaveDataHandler("getawaydriverv4"),
levelStars, totalStars, smallNumberSpace = 12,
carInPlay, curLevel = 0,
gamePlayed = 0,
aStars, aEffects, firstTimeState = 0,
musicTween, dropDelay = 0,
aLevelData = new Array({
aData: [{
type: "star",
p0: {
x: 1808,
y: 1448
},
p1: {
x: 0,
y: 1448
}
}, {
type: "star",
p0: {
x: 588,
y: 1806
},
p1: {
x: 0,
y: 1806
}
}, {
type: "star",
p0: {
x: 703,
y: 1421
},
p1: {
x: 0,
y: 1421
}
}, {
type: "star",
p0: {
x: 799,
y: 203
},
p1: {
x: 0,
y: 203
}
}, {
type: "star",
p0: {
x: 194,
y: 502
},
p1: {
x: 0,
y: 502
}
}, {
type: "star",
p0: {
x: 205,
y: 1090
},
p1: {
x: 0,
y: 1090
}
}, {
type: "star",
p0: {
x: 1263,
y: 1213
},
p1: {
x: 0,
y: 1213
}
}, {
type: "star",
p0: {
x: 1102,
y: 660
},
p1: {
x: 0,
y: 660
}
}, {
type: "star",
p0: {
x: 1801,
y: 986
},
p1: {
x: 0,
y: 986
}
}, {
type: "star",
p0: {
x: 1600,
y: 309
},
p1: {
x: 0,
y: 309
}
}, {
type: "enemyStart",
p0: {
x: 1464,
y: 918
},
p1: {
x: -.8074589909193377,
y: 918
}
}, {
type: "enemyStart",
p0: {
x: 831,
y: 1199
},
p1: {
x: -2.641198533201573,
y: 1199
}
}, {
type: "enemyStart",
p0: {
x: 251,
y: 1402
},
p1: {
x: 2.1700208878681755,
y: 1402
}
}, {
type: "enemyStart",
p0: {
x: 853,
y: 474
},
p1: {
x: -2.5877582111874977,
y: 474
}
}, {
type: "enemyStart",
p0: {
x: 193,
y: 178
},
p1: {
x: .22797644300681608,
y: 178
}
}, {
type: "userStart",
p0: {
x: 1231,
y: 1838
},
p1: {
x: -1.5707047140533978,
y: 1838
}
}, {
type: "wall",
p0: {
x: 106,
y: 1256
},
p1: {
x: 92,
y: 1367
}
}, {
type: "wall",
p0: {
x: 106,
y: 255
},
p1: {
x: 122,
y: 365
}
}, {
type: "wall",
p0: {
x: 1377,
y: 571
},
p1: {
x: 1487,
y: 589
}
}, {
type: "wall",
p0: {
x: 1864,
y: 722
},
p1: {
x: 1876,
y: 832
}
}, {
type: "wall",
p0: {
x: 1848,
y: 614
},
p1: {
x: 1821,
y: 722
}
}, {
type: "wall",
p0: {
x: 1306,
y: 1913
},
p1: {
x: 1414,
y: 1888
}
}, {
type: "wall",
p0: {
x: 1174,
y: 1888
},
p1: {
x: 1284,
y: 1906
}
}, {
type: "wall",
p0: {
x: 1292,
y: 1043
},
p1: {
x: 1388,
y: 1097
}
}, {
type: "wall",
p0: {
x: 711,
y: 1196
},
p1: {
x: 769,
y: 1290
}
}, {
type: "wall",
p0: {
x: 1709,
y: 1290
},
p1: {
x: 1571,
y: 1288
}
}, {
type: "wall",
p0: {
x: 1709,
y: 1290
},
p1: {
x: 1709,
y: 1150
}
}, {
type: "wall",
p0: {
x: 1571,
y: 1150
},
p1: {
x: 1709,
y: 1152
}
}, {
type: "wall",
p0: {
x: 1571,
y: 1150
},
p1: {
x: 1571,
y: 1290
}
}, {
type: "wall",
p0: {
x: 1716,
y: 1749
},
p1: {
x: 1578,
y: 1747
}
}, {
type: "wall",
p0: {
x: 1716,
y: 1749
},
p1: {
x: 1716,
y: 1609
}
}, {
type: "wall",
p0: {
x: 1578,
y: 1609
},
p1: {
x: 1716,
y: 1611
}
}, {
type: "wall",
p0: {
x: 1578,
y: 1609
},
p1: {
x: 1578,
y: 1749
}
}, {
type: "wall",
p0: {
x: 913,
y: 1736
},
p1: {
x: 775,
y: 1734
}
}, {
type: "wall",
p0: {
x: 913,
y: 1736
},
p1: {
x: 913,
y: 1596
}
}, {
type: "wall",
p0: {
x: 775,
y: 1596
},
p1: {
x: 913,
y: 1598
}
}, {
type: "wall",
p0: {
x: 775,
y: 1596
},
p1: {
x: 775,
y: 1736
}
}, {
type: "wall",
p0: {
x: 403,
y: 1742
},
p1: {
x: 264,
y: 1740
}
}, {
type: "wall",
p0: {
x: 403,
y: 1742
},
p1: {
x: 403,
y: 1601
}
}, {
type: "wall",
p0: {
x: 264,
y: 1601
},
p1: {
x: 403,
y: 1603
}
}, {
type: "wall",
p0: {
x: 264,
y: 1601
},
p1: {
x: 264,
y: 1741
}
}, {
type: "wall",
p0: {
x: 953,
y: 934
},
p1: {
x: 192,
y: 931
}
}, {
type: "wall",
p0: {
x: 953,
y: 934
},
p1: {
x: 953,
y: 659
}
}, {
type: "wall",
p0: {
x: 192,
y: 659
},
p1: {
x: 953,
y: 662
}
}, {
type: "wall",
p0: {
x: 192,
y: 659
},
p1: {
x: 192,
y: 934
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 1030,
y: 1284
},
p1: {
x: 0,
y: 1284
}
}, {
type: "star",
p0: {
x: 1376,
y: 579
},
p1: {
x: 0,
y: 579
}
}, {
type: "star",
p0: {
x: 767,
y: 1673
},
p1: {
x: 0,
y: 1673
}
}, {
type: "star",
p0: {
x: 1545,
y: 1133
},
p1: {
x: 0,
y: 1133
}
}, {
type: "star",
p0: {
x: 218,
y: 213
},
p1: {
x: 0,
y: 213
}
}, {
type: "star",
p0: {
x: 268,
y: 1236
},
p1: {
x: 0,
y: 1236
}
}, {
type: "star",
p0: {
x: 1553,
y: 1503
},
p1: {
x: 0,
y: 1503
}
}, {
type: "star",
p0: {
x: 584,
y: 512
},
p1: {
x: 0,
y: 512
}
}, {
type: "star",
p0: {
x: 234,
y: 1780
},
p1: {
x: 0,
y: 1780
}
}, {
type: "star",
p0: {
x: 1781,
y: 1800
},
p1: {
x: 0,
y: 1800
}
}, {
type: "star",
p0: {
x: 1771,
y: 914
},
p1: {
x: 0,
y: 914
}
}, {
type: "star",
p0: {
x: 1514,
y: 1761
},
p1: {
x: 0,
y: 1761
}
}, {
type: "star",
p0: {
x: 1156,
y: 200
},
p1: {
x: 0,
y: 200
}
}, {
type: "enemyStart",
p0: {
x: 1513,
y: 925
},
p1: {
x: 3.0188454284191693,
y: 925
}
}, {
type: "star",
p0: {
x: 1781,
y: 208
},
p1: {
x: 0,
y: 208
}
}, {
type: "enemyStart",
p0: {
x: 1212,
y: 342
},
p1: {
x: -3.087537673996128,
y: 342
}
}, {
type: "enemyStart",
p0: {
x: 174,
y: 1841
},
p1: {
x: -1.3555841485767213,
y: 1841
}
}, {
type: "enemyStart",
p0: {
x: 1719,
y: 1814
},
p1: {
x: -2.1202812945048746,
y: 1814
}
}, {
type: "enemyStart",
p0: {
x: 169,
y: 140
},
p1: {
x: .24933978863921372,
y: 140
}
}, {
type: "userStart",
p0: {
x: 1839,
y: 407
},
p1: {
x: 1.9005406771691287,
y: 407
}
}, {
type: "wall",
p0: {
x: 93,
y: 1329
},
p1: {
x: 105,
y: 1225
}
}, {
type: "wall",
p0: {
x: 786,
y: 1943
},
p1: {
x: 1131,
y: 1439
}
}, {
type: "wall",
p0: {
x: 1132,
y: 1436
},
p1: {
x: 1407,
y: 1171
}
}, {
type: "wall",
p0: {
x: 1407,
y: 1571
},
p1: {
x: 1404,
y: 1165
}
}, {
type: "wall",
p0: {
x: 1302,
y: 1948
},
p1: {
x: 1407,
y: 1578
}
}, {
type: "wall",
p0: {
x: 1925,
y: 1747
},
p1: {
x: 1916,
y: 1643
}
}, {
type: "wall",
p0: {
x: 1800,
y: 1460
},
p1: {
x: 1938,
y: 1411
}
}, {
type: "wall",
p0: {
x: 1695,
y: 1571
},
p1: {
x: 1794,
y: 1462
}
}, {
type: "wall",
p0: {
x: 1689,
y: 1168
},
p1: {
x: 1694,
y: 1575
}
}, {
type: "wall",
p0: {
x: 1946,
y: 1012
},
p1: {
x: 1691,
y: 1167
}
}, {
type: "wall",
p0: {
x: 1525,
y: 396
},
p1: {
x: 1418,
y: 423
}
}, {
type: "wall",
p0: {
x: 1663,
y: 413
},
p1: {
x: 1554,
y: 398
}
}, {
type: "wall",
p0: {
x: 664,
y: 640
},
p1: {
x: 426,
y: 760
}
}, {
type: "wall",
p0: {
x: 783,
y: 504
},
p1: {
x: 670,
y: 636
}
}, {
type: "wall",
p0: {
x: 947,
y: 448
},
p1: {
x: 782,
y: 503
}
}, {
type: "wall",
p0: {
x: 1064,
y: 537
},
p1: {
x: 948,
y: 450
}
}, {
type: "wall",
p0: {
x: 1020,
y: 799
},
p1: {
x: 1062,
y: 538
}
}, {
type: "wall",
p0: {
x: 1015,
y: 969
},
p1: {
x: 1015,
y: 810
}
}, {
type: "wall",
p0: {
x: 971,
y: 1125
},
p1: {
x: 1012,
y: 972
}
}, {
type: "wall",
p0: {
x: 832,
y: 1162
},
p1: {
x: 968,
y: 1125
}
}, {
type: "wall",
p0: {
x: 224,
y: 1061
},
p1: {
x: 830,
y: 1162
}
}, {
type: "wall",
p0: {
x: 200,
y: 921
},
p1: {
x: 225,
y: 1060
}
}, {
type: "wall",
p0: {
x: 223,
y: 769
},
p1: {
x: 202,
y: 921
}
}, {
type: "wall",
p0: {
x: 223,
y: 769
},
p1: {
x: 428,
y: 762
}
}, {
type: "wall",
p0: {
x: 77,
y: 660
},
p1: {
x: 82,
y: 552
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 730,
y: 1428
},
p1: {
x: 0,
y: 1428
}
}, {
type: "star",
p0: {
x: 531,
y: 834
},
p1: {
x: 0,
y: 834
}
}, {
type: "star",
p0: {
x: 1475,
y: 1790
},
p1: {
x: 0,
y: 1790
}
}, {
type: "star",
p0: {
x: 962,
y: 812
},
p1: {
x: 0,
y: 812
}
}, {
type: "star",
p0: {
x: 871,
y: 353
},
p1: {
x: 0,
y: 353
}
}, {
type: "star",
p0: {
x: 283,
y: 362
},
p1: {
x: 0,
y: 362
}
}, {
type: "star",
p0: {
x: 1620,
y: 1291
},
p1: {
x: 0,
y: 1291
}
}, {
type: "star",
p0: {
x: 205,
y: 1790
},
p1: {
x: 0,
y: 1790
}
}, {
type: "star",
p0: {
x: 1624,
y: 694
},
p1: {
x: 0,
y: 694
}
}, {
type: "star",
p0: {
x: 213,
y: 1258
},
p1: {
x: 0,
y: 1258
}
}, {
type: "star",
p0: {
x: 1719,
y: 205
},
p1: {
x: 0,
y: 205
}
}, {
type: "star",
p0: {
x: 1183,
y: 1263
},
p1: {
x: 0,
y: 1263
}
}, {
type: "enemyStart",
p0: {
x: 1697,
y: 1598
},
p1: {
x: -1.2801628938734593,
y: 1598
}
}, {
type: "enemyStart",
p0: {
x: 439,
y: 933
},
p1: {
x: .3129589786556806,
y: 933
}
}, {
type: "enemyStart",
p0: {
x: 283,
y: 1683
},
p1: {
x: -1.3555841485767213,
y: 1683
}
}, {
type: "enemyStart",
p0: {
x: 1254,
y: 1152
},
p1: {
x: -2.9012580778605734,
y: 1152
}
}, {
type: "enemyStart",
p0: {
x: 1454,
y: 300
},
p1: {
x: .3774455602391863,
y: 300
}
}, {
type: "userStart",
p0: {
x: 468,
y: 248
},
p1: {
x: -.010985805812685866,
y: 248
}
}, {
type: "wall",
p0: {
x: 1469,
y: 678
},
p1: {
x: 1032,
y: 676
}
}, {
type: "wall",
p0: {
x: 1469,
y: 678
},
p1: {
x: 1469,
y: 507
}
}, {
type: "wall",
p0: {
x: 1032,
y: 507
},
p1: {
x: 1469,
y: 509
}
}, {
type: "wall",
p0: {
x: 1032,
y: 507
},
p1: {
x: 1032,
y: 678
}
}, {
type: "wall",
p0: {
x: 1625,
y: 535
},
p1: {
x: 1735,
y: 553
}
}, {
type: "wall",
p0: {
x: 1629,
y: 1116
},
p1: {
x: 1727,
y: 1169
}
}, {
type: "wall",
p0: {
x: 1267,
y: 1565
},
p1: {
x: 1283,
y: 1675
}
}, {
type: "wall",
p0: {
x: 693,
y: 284
},
p1: {
x: 712,
y: 393
}
}, {
type: "wall",
p0: {
x: 1250,
y: 1697
},
p1: {
x: 1309,
y: 1792
}
}, {
type: "wall",
p0: {
x: 958,
y: 1017
},
p1: {
x: 942,
y: 1126
}
}, {
type: "wall",
p0: {
x: 256,
y: 1154
},
p1: {
x: 365,
y: 1172
}
}, {
type: "wall",
p0: {
x: 1461,
y: 1474
},
p1: {
x: 1323,
y: 1472
}
}, {
type: "wall",
p0: {
x: 1461,
y: 1474
},
p1: {
x: 1461,
y: 1334
}
}, {
type: "wall",
p0: {
x: 1323,
y: 1334
},
p1: {
x: 1461,
y: 1335
}
}, {
type: "wall",
p0: {
x: 1323,
y: 1334
},
p1: {
x: 1323,
y: 1474
}
}, {
type: "wall",
p0: {
x: 924,
y: 678
},
p1: {
x: 522,
y: 676
}
}, {
type: "wall",
p0: {
x: 924,
y: 678
},
p1: {
x: 924,
y: 507
}
}, {
type: "wall",
p0: {
x: 522,
y: 507
},
p1: {
x: 924,
y: 509
}
}, {
type: "wall",
p0: {
x: 522,
y: 507
},
p1: {
x: 522,
y: 678
}
}, {
type: "wall",
p0: {
x: 683,
y: 1281
},
p1: {
x: 545,
y: 1279
}
}, {
type: "wall",
p0: {
x: 683,
y: 1281
},
p1: {
x: 683,
y: 1141
}
}, {
type: "wall",
p0: {
x: 545,
y: 1141
},
p1: {
x: 683,
y: 1143
}
}, {
type: "wall",
p0: {
x: 545,
y: 1141
},
p1: {
x: 545,
y: 1281
}
}, {
type: "wall",
p0: {
x: 1031,
y: 1475
},
p1: {
x: 892,
y: 1473
}
}, {
type: "wall",
p0: {
x: 1031,
y: 1475
},
p1: {
x: 1031,
y: 1334
}
}, {
type: "wall",
p0: {
x: 892,
y: 1334
},
p1: {
x: 1031,
y: 1336
}
}, {
type: "wall",
p0: {
x: 892,
y: 1334
},
p1: {
x: 892,
y: 1475
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 1560,
y: 320
},
p1: {
x: 0,
y: 320
}
}, {
type: "star",
p0: {
x: 593,
y: 268
},
p1: {
x: 0,
y: 268
}
}, {
type: "star",
p0: {
x: 1367,
y: 1101
},
p1: {
x: 0,
y: 1101
}
}, {
type: "star",
p0: {
x: 995,
y: 206
},
p1: {
x: 0,
y: 206
}
}, {
type: "star",
p0: {
x: 683,
y: 1796
},
p1: {
x: 0,
y: 1796
}
}, {
type: "star",
p0: {
x: 241,
y: 1422
},
p1: {
x: 0,
y: 1422
}
}, {
type: "star",
p0: {
x: 792,
y: 568
},
p1: {
x: 0,
y: 568
}
}, {
type: "star",
p0: {
x: 212,
y: 386
},
p1: {
x: 0,
y: 386
}
}, {
type: "star",
p0: {
x: 1713,
y: 1429
},
p1: {
x: 0,
y: 1429
}
}, {
type: "star",
p0: {
x: 1142,
y: 1339
},
p1: {
x: 0,
y: 1339
}
}, {
type: "star",
p0: {
x: 1802,
y: 724
},
p1: {
x: 0,
y: 724
}
}, {
type: "enemyStart",
p0: {
x: 209,
y: 1247
},
p1: {
x: -1.0710485556032383,
y: 1247
}
}, {
type: "star",
p0: {
x: 685,
y: 875
},
p1: {
x: 0,
y: 875
}
}, {
type: "enemyStart",
p0: {
x: 223,
y: 156
},
p1: {
x: 1.808869878758639,
y: 156
}
}, {
type: "enemyStart",
p0: {
x: 550,
y: 1849
},
p1: {
x: -.21228296733519714,
y: 1849
}
}, {
type: "enemyStart",
p0: {
x: 1744,
y: 1853
},
p1: {
x: -2.933074597087641,
y: 1853
}
}, {
type: "enemyStart",
p0: {
x: 783,
y: 171
},
p1: {
x: 1.1290998747286767,
y: 171
}
}, {
type: "userStart",
p0: {
x: 1442,
y: 434
},
p1: {
x: 1.5882964909500252,
y: 434
}
}, {
type: "wall",
p0: {
x: 570,
y: 435
},
p1: {
x: 676,
y: 538
}
}, {
type: "wall",
p0: {
x: 468,
y: 538
},
p1: {
x: 574,
y: 641
}
}, {
type: "wall",
p0: {
x: 675,
y: 537
},
p1: {
x: 571,
y: 642
}
}, {
type: "wall",
p0: {
x: 573,
y: 434
},
p1: {
x: 469,
y: 539
}
}, {
type: "wall",
p0: {
x: 1429,
y: 1343
},
p1: {
x: 1535,
y: 1446
}
}, {
type: "wall",
p0: {
x: 1327,
y: 1446
},
p1: {
x: 1433,
y: 1549
}
}, {
type: "wall",
p0: {
x: 1534,
y: 1445
},
p1: {
x: 1430,
y: 1550
}
}, {
type: "wall",
p0: {
x: 1432,
y: 1342
},
p1: {
x: 1328,
y: 1447
}
}, {
type: "wall",
p0: {
x: 1719,
y: 377
},
p1: {
x: 1825,
y: 480
}
}, {
type: "wall",
p0: {
x: 1617,
y: 480
},
p1: {
x: 1722,
y: 583
}
}, {
type: "wall",
p0: {
x: 1824,
y: 480
},
p1: {
x: 1720,
y: 584
}
}, {
type: "wall",
p0: {
x: 1722,
y: 376
},
p1: {
x: 1618,
y: 481
}
}, {
type: "wall",
p0: {
x: 1333,
y: 271
},
p1: {
x: 1161,
y: 265
}
}, {
type: "wall",
p0: {
x: 1333,
y: 157
},
p1: {
x: 1161,
y: 150
}
}, {
type: "wall",
p0: {
x: 1327,
y: 34
},
p1: {
x: 1331,
y: 150
}
}, {
type: "wall",
p0: {
x: 1121,
y: 32
},
p1: {
x: 1166,
y: 149
}
}, {
type: "wall",
p0: {
x: 1330,
y: 276
},
p1: {
x: 1304,
y: 676
}
}, {
type: "wall",
p0: {
x: 1157,
y: 272
},
p1: {
x: 1118,
y: 580
}
}, {
type: "wall",
p0: {
x: 1306,
y: 686
},
p1: {
x: 1225,
y: 1028
}
}, {
type: "wall",
p0: {
x: 1116,
y: 591
},
p1: {
x: 1e3,
y: 790
}
}, {
type: "wall",
p0: {
x: 835,
y: 962
},
p1: {
x: 1065,
y: 1190
}
}, {
type: "wall",
p0: {
x: 992,
y: 797
},
p1: {
x: 1223,
y: 1025
}
}, {
type: "wall",
p0: {
x: 1062,
y: 1197
},
p1: {
x: 784,
y: 1507
}
}, {
type: "wall",
p0: {
x: 774,
y: 1520
},
p1: {
x: 429,
y: 1797
}
}, {
type: "wall",
p0: {
x: 829,
y: 963
},
p1: {
x: 325,
y: 1581
}
}, {
type: "wall",
p0: {
x: 421,
y: 1801
},
p1: {
x: 52,
y: 1943
}
}, {
type: "wall",
p0: {
x: 312,
y: 1590
},
p1: {
x: 55,
y: 1720
}
}, {
type: "wall",
p0: {
x: 89,
y: 1449
},
p1: {
x: 125,
y: 1550
}
}, {
type: "wall",
p0: {
x: 325,
y: 258
},
p1: {
x: 382,
y: 349
}
}, {
type: "wall",
p0: {
x: 781,
y: 672
},
p1: {
x: 811,
y: 775
}
}, {
type: "wall",
p0: {
x: 1711,
y: 189
},
p1: {
x: 1607,
y: 160
}
}, {
type: "wall",
p0: {
x: 1814,
y: 1050
},
p1: {
x: 1707,
y: 1034
}
}, {
type: "wall",
p0: {
x: 1237,
y: 1195
},
p1: {
x: 1299,
y: 1283
}
}, {
type: "wall",
p0: {
x: 1708,
y: 1721
},
p1: {
x: 1601,
y: 1704
}
}, {
type: "wall",
p0: {
x: 1667,
y: 1593
},
p1: {
x: 1710,
y: 1692
}
}, {
type: "wall",
p0: {
x: 1638,
y: 1588
},
p1: {
x: 1582,
y: 1680
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 879,
y: 272
},
p1: {
x: 0,
y: 272
}
}, {
type: "star",
p0: {
x: 505,
y: 1512
},
p1: {
x: 0,
y: 1512
}
}, {
type: "star",
p0: {
x: 253,
y: 467
},
p1: {
x: 0,
y: 467
}
}, {
type: "star",
p0: {
x: 1550,
y: 1208
},
p1: {
x: 0,
y: 1208
}
}, {
type: "star",
p0: {
x: 571,
y: 620
},
p1: {
x: 0,
y: 620
}
}, {
type: "star",
p0: {
x: 463,
y: 926
},
p1: {
x: 0,
y: 926
}
}, {
type: "star",
p0: {
x: 1564,
y: 276
},
p1: {
x: 0,
y: 276
}
}, {
type: "star",
p0: {
x: 998,
y: 1435
},
p1: {
x: 0,
y: 1435
}
}, {
type: "star",
p0: {
x: 1185,
y: 450
},
p1: {
x: 0,
y: 450
}
}, {
type: "star",
p0: {
x: 755,
y: 1795
},
p1: {
x: 0,
y: 1795
}
}, {
type: "star",
p0: {
x: 1121,
y: 971
},
p1: {
x: 0,
y: 971
}
}, {
type: "star",
p0: {
x: 1404,
y: 1531
},
p1: {
x: 0,
y: 1531
}
}, {
type: "star",
p0: {
x: 1732,
y: 632
},
p1: {
x: 0,
y: 632
}
}, {
type: "enemyStart",
p0: {
x: 468,
y: 1135
},
p1: {
x: -1.38273747273506,
y: 1135
}
}, {
type: "enemyStart",
p0: {
x: 251,
y: 280
},
p1: {
x: .2654215531977662,
y: 280
}
}, {
type: "enemyStart",
p0: {
x: 1751,
y: 1565
},
p1: {
x: 1.1718087228141683,
y: 1565
}
}, {
type: "enemyStart",
p0: {
x: 1013,
y: 1807
},
p1: {
x: 3.075116690671998,
y: 1807
}
}, {
type: "star",
p0: {
x: 1715,
y: 1794
},
p1: {
x: 0,
y: 1794
}
}, {
type: "enemyStart",
p0: {
x: 1537,
y: 767
},
p1: {
x: -1.3029891138926375,
y: 767
}
}, {
type: "userStart",
p0: {
x: 171,
y: 1425
},
p1: {
x: -.012191152522055729,
y: 1425
}
}, {
type: "wall",
p0: {
x: 156,
y: 1024
},
p1: {
x: 159,
y: 1260
}
}, {
type: "wall",
p0: {
x: 336,
y: 1263
},
p1: {
x: 156,
y: 1265
}
}, {
type: "wall",
p0: {
x: 334,
y: 1021
},
p1: {
x: 155,
y: 1023
}
}, {
type: "wall",
p0: {
x: 334,
y: 1021
},
p1: {
x: 337,
y: 1266
}
}, {
type: "wall",
p0: {
x: 521,
y: 1825
},
p1: {
x: 548,
y: 1810
}
}, {
type: "wall",
p0: {
x: 423,
y: 1760
},
p1: {
x: 494,
y: 1830
}
}, {
type: "wall",
p0: {
x: 171,
y: 1669
},
p1: {
x: 343,
y: 1831
}
}, {
type: "wall",
p0: {
x: 468,
y: 1706
},
p1: {
x: 344,
y: 1836
}
}, {
type: "wall",
p0: {
x: 293,
y: 1539
},
p1: {
x: 169,
y: 1669
}
}, {
type: "wall",
p0: {
x: 519,
y: 1716
},
p1: {
x: 561,
y: 1756
}
}, {
type: "wall",
p0: {
x: 293,
y: 1539
},
p1: {
x: 560,
y: 1792
}
}, {
type: "wall",
p0: {
x: 1416,
y: 1914
},
p1: {
x: 1495,
y: 1912
}
}, {
type: "wall",
p0: {
x: 1414,
y: 1879
},
p1: {
x: 1490,
y: 1877
}
}, {
type: "wall",
p0: {
x: 1286,
y: 1912
},
p1: {
x: 1307,
y: 1911
}
}, {
type: "wall",
p0: {
x: 1284,
y: 1877
},
p1: {
x: 1305,
y: 1876
}
}, {
type: "wall",
p0: {
x: 977,
y: 1915
},
p1: {
x: 1120,
y: 1912
}
}, {
type: "wall",
p0: {
x: 977,
y: 1883
},
p1: {
x: 1120,
y: 1880
}
}, {
type: "wall",
p0: {
x: 1532,
y: 1724
},
p1: {
x: 1553,
y: 1724
}
}, {
type: "wall",
p0: {
x: 1530,
y: 1689
},
p1: {
x: 1551,
y: 1689
}
}, {
type: "wall",
p0: {
x: 1161,
y: 1729
},
p1: {
x: 1432,
y: 1725
}
}, {
type: "wall",
p0: {
x: 1160,
y: 1691
},
p1: {
x: 1432,
y: 1687
}
}, {
type: "wall",
p0: {
x: 911,
y: 1726
},
p1: {
x: 1054,
y: 1732
}
}, {
type: "wall",
p0: {
x: 911,
y: 1686
},
p1: {
x: 1055,
y: 1692
}
}, {
type: "wall",
p0: {
x: 1913,
y: 1510
},
p1: {
x: 1903,
y: 1616
}
}, {
type: "wall",
p0: {
x: 1714,
y: 1146
},
p1: {
x: 1721,
y: 1084
}
}, {
type: "wall",
p0: {
x: 1856,
y: 1237
},
p1: {
x: 1966,
y: 1108
}
}, {
type: "wall",
p0: {
x: 1714,
y: 1146
},
p1: {
x: 1856,
y: 1239
}
}, {
type: "wall",
p0: {
x: 1744,
y: 812
},
p1: {
x: 1742,
y: 1180
}
}, {
type: "wall",
p0: {
x: 1744,
y: 812
},
p1: {
x: 1950,
y: 814
}
}, {
type: "wall",
p0: {
x: 1883,
y: 271
},
p1: {
x: 1897,
y: 644
}
}, {
type: "wall",
p0: {
x: 1038,
y: 529
},
p1: {
x: 1031,
y: 639
}
}, {
type: "wall",
p0: {
x: 1040,
y: 263
},
p1: {
x: 1047,
y: 372
}
}, {
type: "wall",
p0: {
x: 1746,
y: 121
},
p1: {
x: 1945,
y: 121
}
}, {
type: "wall",
p0: {
x: 389,
y: 127
},
p1: {
x: 824,
y: 126
}
}, {
type: "wall",
p0: {
x: 1179,
y: 1268
},
p1: {
x: 1378,
y: 1268
}
}, {
type: "wall",
p0: {
x: 797,
y: 1266
},
p1: {
x: 996,
y: 1266
}
}, {
type: "wall",
p0: {
x: 1079,
y: 772
},
p1: {
x: 1277,
y: 771
}
}, {
type: "wall",
p0: {
x: 658,
y: 772
},
p1: {
x: 856,
y: 771
}
}, {
type: "wall",
p0: {
x: 220,
y: 772
},
p1: {
x: 418,
y: 771
}
}, {
type: "wall",
p0: {
x: 102,
y: 268
},
p1: {
x: 80,
y: 644
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 96
},
p1: {
x: 1954,
y: 96
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 735,
y: 209
},
p1: {
x: 0,
y: 209
}
}, {
type: "star",
p0: {
x: 556,
y: 1248
},
p1: {
x: 0,
y: 1248
}
}, {
type: "star",
p0: {
x: 907,
y: 1229
},
p1: {
x: 0,
y: 1229
}
}, {
type: "star",
p0: {
x: 1248,
y: 1772
},
p1: {
x: 0,
y: 1772
}
}, {
type: "star",
p0: {
x: 269,
y: 957
},
p1: {
x: 0,
y: 957
}
}, {
type: "star",
p0: {
x: 1765,
y: 930
},
p1: {
x: 0,
y: 930
}
}, {
type: "star",
p0: {
x: 255,
y: 1758
},
p1: {
x: 0,
y: 1758
}
}, {
type: "star",
p0: {
x: 1159,
y: 522
},
p1: {
x: 0,
y: 522
}
}, {
type: "star",
p0: {
x: 691,
y: 1644
},
p1: {
x: 0,
y: 1644
}
}, {
type: "star",
p0: {
x: 1801,
y: 1785
},
p1: {
x: 0,
y: 1785
}
}, {
type: "star",
p0: {
x: 1608,
y: 1461
},
p1: {
x: 0,
y: 1461
}
}, {
type: "star",
p0: {
x: 1189,
y: 946
},
p1: {
x: 0,
y: 946
}
}, {
type: "star",
p0: {
x: 1752,
y: 217
},
p1: {
x: 0,
y: 217
}
}, {
type: "enemyStart",
p0: {
x: 835,
y: 996
},
p1: {
x: 2.6782502944995183,
y: 996
}
}, {
type: "enemyStart",
p0: {
x: 145,
y: 513
},
p1: {
x: 1.3683470817848171,
y: 513
}
}, {
type: "star",
p0: {
x: 183,
y: 186
},
p1: {
x: 0,
y: 186
}
}, {
type: "enemyStart",
p0: {
x: 178,
y: 1861
},
p1: {
x: -.27760018886269855,
y: 1861
}
}, {
type: "enemyStart",
p0: {
x: 1839,
y: 1855
},
p1: {
x: 2.944067859751379,
y: 1855
}
}, {
type: "enemyStart",
p0: {
x: 1274,
y: 156
},
p1: {
x: 1.830240681242089,
y: 156
}
}, {
type: "userStart",
p0: {
x: 1827,
y: 387
},
p1: {
x: 1.559413709979789,
y: 387
}
}, {
type: "wall",
p0: {
x: 1456,
y: 511
},
p1: {
x: 1525,
y: 580
}
}, {
type: "wall",
p0: {
x: 1646,
y: 452
},
p1: {
x: 1647,
y: 550
}
}, {
type: "wall",
p0: {
x: 1622,
y: 367
},
p1: {
x: 1659,
y: 430
}
}, {
type: "wall",
p0: {
x: 1449,
y: 488
},
p1: {
x: 1600,
y: 356
}
}, {
type: "wall",
p0: {
x: 888,
y: 1894
},
p1: {
x: 990,
y: 1867
}
}, {
type: "wall",
p0: {
x: 435,
y: 1680
},
p1: {
x: 295,
y: 1569
}
}, {
type: "wall",
p0: {
x: 435,
y: 1680
},
p1: {
x: 592,
y: 1484
}
}, {
type: "wall",
p0: {
x: 451,
y: 1372
},
p1: {
x: 591,
y: 1483
}
}, {
type: "wall",
p0: {
x: 451,
y: 1372
},
p1: {
x: 294,
y: 1568
}
}, {
type: "wall",
p0: {
x: 1690,
y: 813
},
p1: {
x: 1320,
y: 816
}
}, {
type: "wall",
p0: {
x: 1690,
y: 813
},
p1: {
x: 1685,
y: 571
}
}, {
type: "wall",
p0: {
x: 1313,
y: 574
},
p1: {
x: 1683,
y: 571
}
}, {
type: "wall",
p0: {
x: 1313,
y: 574
},
p1: {
x: 1317,
y: 816
}
}, {
type: "wall",
p0: {
x: 2010,
y: 1411
},
p1: {
x: 1759,
y: 1414
}
}, {
type: "wall",
p0: {
x: 1754,
y: 1171
},
p1: {
x: 2005,
y: 1168
}
}, {
type: "wall",
p0: {
x: 1754,
y: 1171
},
p1: {
x: 1757,
y: 1414
}
}, {
type: "wall",
p0: {
x: 1491,
y: 1408
},
p1: {
x: 1119,
y: 1411
}
}, {
type: "wall",
p0: {
x: 1491,
y: 1408
},
p1: {
x: 1486,
y: 1167
}
}, {
type: "wall",
p0: {
x: 1112,
y: 1170
},
p1: {
x: 1484,
y: 1167
}
}, {
type: "wall",
p0: {
x: 1112,
y: 1170
},
p1: {
x: 1117,
y: 1411
}
}, {
type: "wall",
p0: {
x: 1645,
y: 1756
},
p1: {
x: 1501,
y: 1758
}
}, {
type: "wall",
p0: {
x: 1645,
y: 1756
},
p1: {
x: 1643,
y: 1612
}
}, {
type: "wall",
p0: {
x: 1498,
y: 1614
},
p1: {
x: 1642,
y: 1612
}
}, {
type: "wall",
p0: {
x: 1498,
y: 1614
},
p1: {
x: 1500,
y: 1758
}
}, {
type: "wall",
p0: {
x: 1913,
y: 922
},
p1: {
x: 1918,
y: 1028
}
}, {
type: "wall",
p0: {
x: 992,
y: 911
},
p1: {
x: 1032,
y: 1009
}
}, {
type: "wall",
p0: {
x: 729,
y: 1217
},
p1: {
x: 746,
y: 1322
}
}, {
type: "wall",
p0: {
x: 77,
y: 936
},
p1: {
x: 91,
y: 1041
}
}, {
type: "wall",
p0: {
x: 196,
y: 385
},
p1: {
x: 344,
y: 510
}
}, {
type: "wall",
p0: {
x: 196,
y: 385
},
p1: {
x: 348,
y: 205
}
}, {
type: "wall",
p0: {
x: 278,
y: 567
},
p1: {
x: 356,
y: 496
}
}, {
type: "wall",
p0: {
x: 397,
y: 598
},
p1: {
x: 292,
y: 591
}
}, {
type: "wall",
p0: {
x: 473,
y: 618
},
p1: {
x: 435,
y: 583
}
}, {
type: "wall",
p0: {
x: 576,
y: 596
},
p1: {
x: 497,
y: 627
}
}, {
type: "wall",
p0: {
x: 701,
y: 626
},
p1: {
x: 592,
y: 626
}
}, {
type: "wall",
p0: {
x: 894,
y: 663
},
p1: {
x: 716,
y: 662
}
}, {
type: "wall",
p0: {
x: 897,
y: 424
},
p1: {
x: 896,
y: 666
}
}, {
type: "wall",
p0: {
x: 709,
y: 421
},
p1: {
x: 898,
y: 424
}
}, {
type: "wall",
p0: {
x: 686,
y: 380
},
p1: {
x: 711,
y: 436
}
}, {
type: "wall",
p0: {
x: 507,
y: 325
},
p1: {
x: 673,
y: 361
}
}, {
type: "wall",
p0: {
x: 350,
y: 202
},
p1: {
x: 488,
y: 316
}
}, {
type: "wall",
p0: {
x: 1073,
y: 95
},
p1: {
x: 1181,
y: 93
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 1244,
y: 1597
},
p1: {
x: 0,
y: 1597
}
}, {
type: "star",
p0: {
x: 682,
y: 1784
},
p1: {
x: 0,
y: 1784
}
}, {
type: "star",
p0: {
x: 309,
y: 210
},
p1: {
x: 0,
y: 210
}
}, {
type: "star",
p0: {
x: 803,
y: 1489
},
p1: {
x: 0,
y: 1489
}
}, {
type: "star",
p0: {
x: 1694,
y: 413
},
p1: {
x: 0,
y: 413
}
}, {
type: "star",
p0: {
x: 420,
y: 1226
},
p1: {
x: 0,
y: 1226
}
}, {
type: "star",
p0: {
x: 1701,
y: 1437
},
p1: {
x: 0,
y: 1437
}
}, {
type: "star",
p0: {
x: 264,
y: 1621
},
p1: {
x: 0,
y: 1621
}
}, {
type: "star",
p0: {
x: 685,
y: 586
},
p1: {
x: 0,
y: 586
}
}, {
type: "star",
p0: {
x: 1726,
y: 1731
},
p1: {
x: 0,
y: 1731
}
}, {
type: "star",
p0: {
x: 1115,
y: 872
},
p1: {
x: 0,
y: 872
}
}, {
type: "star",
p0: {
x: 1201,
y: 196
},
p1: {
x: 0,
y: 196
}
}, {
type: "star",
p0: {
x: 1800,
y: 813
},
p1: {
x: 0,
y: 813
}
}, {
type: "enemyStart",
p0: {
x: 409,
y: 1485
},
p1: {
x: -.4074173077791561,
y: 1485
}
}, {
type: "enemyStart",
p0: {
x: 493,
y: 198
},
p1: {
x: .20231741853612065,
y: 198
}
}, {
type: "enemyStart",
p0: {
x: 1152,
y: 1053
},
p1: {
x: 1.2637743331573297,
y: 1053
}
}, {
type: "enemyStart",
p0: {
x: 1542,
y: 1715
},
p1: {
x: -2.2567214287362503,
y: 1715
}
}, {
type: "enemyStart",
p0: {
x: 477,
y: 333
},
p1: {
x: .27399773085614837,
y: 333
}
}, {
type: "userStart",
p0: {
x: 566,
y: 286
},
p1: {
x: .1626733362330921,
y: 286
}
}, {
type: "wall",
p0: {
x: 474,
y: 1824
},
p1: {
x: 432,
y: 2061
}
}, {
type: "wall",
p0: {
x: 237,
y: 1777
},
p1: {
x: 195,
y: 2014
}
}, {
type: "wall",
p0: {
x: 237,
y: 1777
},
p1: {
x: 475,
y: 1819
}
}, {
type: "wall",
p0: {
x: 105,
y: 1253
},
p1: {
x: 88,
y: 1499
}
}, {
type: "wall",
p0: {
x: 948,
y: 1555
},
p1: {
x: 962,
y: 1448
}
}, {
type: "wall",
p0: {
x: 962,
y: 1585
},
p1: {
x: 1068,
y: 1603
}
}, {
type: "wall",
p0: {
x: 1114,
y: 1469
},
p1: {
x: 1091,
y: 1574
}
}, {
type: "wall",
p0: {
x: 992,
y: 1431
},
p1: {
x: 1099,
y: 1432
}
}, {
type: "wall",
p0: {
x: 1904,
y: 1538
},
p1: {
x: 1908,
y: 1791
}
}, {
type: "wall",
p0: {
x: 1901,
y: 951
},
p1: {
x: 1841,
y: 1341
}
}, {
type: "wall",
p0: {
x: 2189,
y: 1275
},
p1: {
x: 1843,
y: 1342
}
}, {
type: "wall",
p0: {
x: 2221,
y: 1079
},
p1: {
x: 1905,
y: 953
}
}, {
type: "wall",
p0: {
x: 2221,
y: 1079
},
p1: {
x: 2189,
y: 1276
}
}, {
type: "wall",
p0: {
x: 341,
y: 1081
},
p1: {
x: 408,
y: 699
}
}, {
type: "wall",
p0: {
x: 60,
y: 718
},
p1: {
x: 406,
y: 698
}
}, {
type: "wall",
p0: {
x: 25,
y: 910
},
p1: {
x: 337,
y: 1078
}
}, {
type: "wall",
p0: {
x: 25,
y: 910
},
p1: {
x: 60,
y: 717
}
}, {
type: "wall",
p0: {
x: 616,
y: 742
},
p1: {
x: 552,
y: 1127
}
}, {
type: "wall",
p0: {
x: 891,
y: 1084
},
p1: {
x: 545,
y: 1124
}
}, {
type: "wall",
p0: {
x: 934,
y: 889
},
p1: {
x: 617,
y: 745
}
}, {
type: "wall",
p0: {
x: 927,
y: 888
},
p1: {
x: 888,
y: 1081
}
}, {
type: "wall",
p0: {
x: 1634,
y: 1301
},
p1: {
x: 1702,
y: 916
}
}, {
type: "wall",
p0: {
x: 1353,
y: 952
},
p1: {
x: 1699,
y: 915
}
}, {
type: "wall",
p0: {
x: 1318,
y: 1146
},
p1: {
x: 1630,
y: 1299
}
}, {
type: "wall",
p0: {
x: 1318,
y: 1146
},
p1: {
x: 1353,
y: 952
}
}, {
type: "wall",
p0: {
x: 1805,
y: 221
},
p1: {
x: 1848,
y: -19
}
}, {
type: "wall",
p0: {
x: 1561,
y: 179
},
p1: {
x: 1605,
y: -62
}
}, {
type: "wall",
p0: {
x: 1561,
y: 179
},
p1: {
x: 1801,
y: 219
}
}, {
type: "wall",
p0: {
x: 1907,
y: 472
},
p1: {
x: 1921,
y: 755
}
}, {
type: "wall",
p0: {
x: 1854,
y: 610
},
p1: {
x: 2055,
y: 644
}
}, {
type: "wall",
p0: {
x: 1303,
y: 522
},
p1: {
x: 1504,
y: 556
}
}, {
type: "wall",
p0: {
x: 760,
y: 432
},
p1: {
x: 961,
y: 466
}
}, {
type: "wall",
p0: {
x: 213,
y: 345
},
p1: {
x: 413,
y: 379
}
}, {
type: "wall",
p0: {
x: 82,
y: 450
},
p1: {
x: 98,
y: 198
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}, {
aData: [{
type: "star",
p0: {
x: 1230,
y: 1735
},
p1: {
x: 0,
y: 1735
}
}, {
type: "star",
p0: {
x: 732,
y: 1746
},
p1: {
x: 0,
y: 1746
}
}, {
type: "star",
p0: {
x: 1047,
y: 202
},
p1: {
x: 0,
y: 202
}
}, {
type: "star",
p0: {
x: 1291,
y: 1241
},
p1: {
x: 0,
y: 1241
}
}, {
type: "star",
p0: {
x: 1690,
y: 291
},
p1: {
x: 0,
y: 291
}
}, {
type: "star",
p0: {
x: 634,
y: 1286
},
p1: {
x: 0,
y: 1286
}
}, {
type: "star",
p0: {
x: 258,
y: 1071
},
p1: {
x: 0,
y: 1071
}
}, {
type: "star",
p0: {
x: 254,
y: 1772
},
p1: {
x: 0,
y: 1772
}
}, {
type: "star",
p0: {
x: 859,
y: 614
},
p1: {
x: 0,
y: 614
}
}, {
type: "star",
p0: {
x: 1740,
y: 1781
},
p1: {
x: 0,
y: 1781
}
}, {
type: "star",
p0: {
x: 1071,
y: 904
},
p1: {
x: 0,
y: 904
}
}, {
type: "star",
p0: {
x: 202,
y: 689
},
p1: {
x: 0,
y: 689
}
}, {
type: "star",
p0: {
x: 1700,
y: 777
},
p1: {
x: 0,
y: 777
}
}, {
type: "enemyStart",
p0: {
x: 379,
y: 1801
},
p1: {
x: -.734571201361068,
y: 1801
}
}, {
type: "enemyStart",
p0: {
x: 189,
y: 658
},
p1: {
x: .9606767737021035,
y: 658
}
}, {
type: "enemyStart",
p0: {
x: 1438,
y: 849
},
p1: {
x: 1.2431020778278075,
y: 849
}
}, {
type: "enemyStart",
p0: {
x: 1408,
y: 1825
},
p1: {
x: -2.1266262758019883,
y: 1825
}
}, {
type: "enemyStart",
p0: {
x: 839,
y: 125
},
p1: {
x: .27399773085614837,
y: 125
}
}, {
type: "userStart",
p0: {
x: 688,
y: 876
},
p1: {
x: -.03738199327311524,
y: 876
}
}, {
type: "wall",
p0: {
x: 790,
y: 196
},
p1: {
x: 426,
y: 178
}
}, {
type: "wall",
p0: {
x: 790,
y: 196
},
p1: {
x: 891,
y: 278
}
}, {
type: "wall",
p0: {
x: 860,
y: 407
},
p1: {
x: 892,
y: 274
}
}, {
type: "wall",
p0: {
x: 647,
y: 625
},
p1: {
x: 855,
y: 415
}
}, {
type: "wall",
p0: {
x: 364,
y: 627
},
p1: {
x: 630,
y: 628
}
}, {
type: "wall",
p0: {
x: 364,
y: 627
},
p1: {
x: 174,
y: 443
}
}, {
type: "wall",
p0: {
x: 198,
y: 231
},
p1: {
x: 166,
y: 440
}
}, {
type: "wall",
p0: {
x: 198,
y: 231
},
p1: {
x: 421,
y: 179
}
}, {
type: "wall",
p0: {
x: 1814,
y: 1113
},
p1: {
x: 2047,
y: 1196
}
}, {
type: "wall",
p0: {
x: 1554,
y: 1136
},
p1: {
x: 1800,
y: 1109
}
}, {
type: "wall",
p0: {
x: 1699,
y: 1490
},
p1: {
x: 1946,
y: 1490
}
}, {
type: "wall",
p0: {
x: 1512,
y: 1311
},
p1: {
x: 1686,
y: 1486
}
}, {
type: "wall",
p0: {
x: 1512,
y: 1311
},
p1: {
x: 1546,
y: 1140
}
}, {
type: "wall",
p0: {
x: 1058,
y: 1420
},
p1: {
x: 1121,
y: 1188
}
}, {
type: "wall",
p0: {
x: 915,
y: 1500
},
p1: {
x: 1031,
y: 1425
}
}, {
type: "wall",
p0: {
x: 813,
y: 1421
},
p1: {
x: 889,
y: 1508
}
}, {
type: "wall",
p0: {
x: 814,
y: 1269
},
p1: {
x: 799,
y: 1397
}
}, {
type: "wall",
p0: {
x: 887,
y: 1242
},
p1: {
x: 821,
y: 1247
}
}, {
type: "wall",
p0: {
x: 948,
y: 1138
},
p1: {
x: 919,
y: 1238
}
}, {
type: "wall",
p0: {
x: 948,
y: 1138
},
p1: {
x: 1124,
y: 1184
}
}, {
type: "wall",
p0: {
x: 1232,
y: 730
},
p1: {
x: 1328,
y: 729
}
}, {
type: "wall",
p0: {
x: 1232,
y: 633
},
p1: {
x: 1328,
y: 632
}
}, {
type: "wall",
p0: {
x: 1329,
y: 729
},
p1: {
x: 1328,
y: 633
}
}, {
type: "wall",
p0: {
x: 1232,
y: 729
},
p1: {
x: 1231,
y: 633
}
}, {
type: "wall",
p0: {
x: 234,
y: 1527
},
p1: {
x: 330,
y: 1526
}
}, {
type: "wall",
p0: {
x: 234,
y: 1430
},
p1: {
x: 330,
y: 1429
}
}, {
type: "wall",
p0: {
x: 331,
y: 1526
},
p1: {
x: 330,
y: 1430
}
}, {
type: "wall",
p0: {
x: 234,
y: 1526
},
p1: {
x: 233,
y: 1430
}
}, {
type: "wall",
p0: {
x: 427,
y: 1129
},
p1: {
x: 524,
y: 1128
}
}, {
type: "wall",
p0: {
x: 427,
y: 1032
},
p1: {
x: 524,
y: 1031
}
}, {
type: "wall",
p0: {
x: 525,
y: 1129
},
p1: {
x: 524,
y: 1032
}
}, {
type: "wall",
p0: {
x: 428,
y: 1129
},
p1: {
x: 427,
y: 1032
}
}, {
type: "wall",
p0: {
x: 1741,
y: 102
},
p1: {
x: 1636,
y: 83
}
}, {
type: "wall",
p0: {
x: 1913,
y: 335
},
p1: {
x: 1897,
y: 229
}
}, {
type: "wall",
p0: {
x: 1901,
y: 529
},
p1: {
x: 1926,
y: 425
}
}, {
type: "wall",
p0: {
x: 1929,
y: 939
},
p1: {
x: 1919,
y: 832
}
}, {
type: "wall",
p0: {
x: 1913,
y: 1735
},
p1: {
x: 1910,
y: 1628
}
}, {
type: "wall",
p0: {
x: 941,
y: 1881
},
p1: {
x: 835,
y: 1897
}
}, {
type: "wall",
p0: {
x: 89,
y: 1723
},
p1: {
x: 102,
y: 1617
}
}, {
type: "wall",
p0: {
x: 100,
y: 1324
},
p1: {
x: 100,
y: 1217
}
}, {
type: "wall",
p0: {
x: 102,
y: 932
},
p1: {
x: 87,
y: 827
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 1954,
y: 46
}
}, {
type: "wall",
p0: {
x: 1954,
y: 1954
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 46,
y: 1954
}
}, {
type: "wall",
p0: {
x: 46,
y: 46
},
p1: {
x: 1954,
y: 46
}
}]
}),
adSense, analytics, moregames;
