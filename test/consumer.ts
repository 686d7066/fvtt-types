/// <reference path="../dist/index.d.ts" />

const currentUser = game.user;
const scene = canvas.scene;
const localized = game.i18n.localize("Foundry.Types.Test");
const cloned = foundry.utils.deepClone({name: "base"});

export type ConsumerSmokeTest = {
  currentUser: typeof currentUser;
  scene: typeof scene;
  localized: typeof localized;
  cloned: typeof cloned;
};
