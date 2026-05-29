export * as CONST from "../common/constants.mjs";
export * as documents from "./documents/_module.mjs";
export * as data from "./data/_module.mjs";
export * as packages from "./packages/_module.mjs";
export * as abstract from "../common/abstract/_module.mjs";
export * as utils from "./utils/_module.mjs";
export * as config from "../common/config.mjs";
export * as prosemirror from "../common/prosemirror/_module.mjs";
export * as grid from "../common/grid/_module.mjs";
export * as applications from "./applications/_module.mjs";
export * as appv1 from "./appv1/_module.mjs";
export * as av from "./av/_module.mjs";
export * as audio from "./audio/_module.mjs";
export * as canvas from "./canvas/_module.mjs";
export * as dice from "./dice/_module.mjs";
export * as helpers from "./helpers/_module.mjs";
export * as nue from "./nue/_module.mjs";
export { default as Game } from "./game.mjs";
/**
 * A collection of application instances
 */
export const ui: {
    activeWindow: foundry.appv1.api.Application | foundry.applications.api.ApplicationV2 | null;
    windows: Record<string, foundry.appv1.api.Application>;
    chat: foundry.applications.sidebar.tabs.ChatLog;
    combat: foundry.applications.sidebar.tabs.CombatTracker;
    controls: foundry.applications.ui.SceneControls;
    hotbar: foundry.applications.ui.Hotbar;
    menu: foundry.applications.ui.MainMenu;
    nav: foundry.applications.ui.SceneNavigation;
    notifications: foundry.applications.ui.Notifications;
    pause: foundry.applications.ui.GamePause;
    players: foundry.applications.ui.Players;
    sidebar: foundry.applications.sidebar.Sidebar;
};
export * as types from "./_types.mjs";
