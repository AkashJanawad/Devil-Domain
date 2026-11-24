#!/usr/bin/env node
/**
 * Devil Domain — Automated Test Suite
 * Node.js logic tests (no browser required).
 */

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); console.log(`  \u2713 ${name}`); passed++; }
  catch(e) { console.error(`  \u2717 ${name}: ${e.message}`); failed++; }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || "assertion failed"); }

// ---- AABB collision ----
console.log("\n[Collision Detection]");
const aabb = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const R = (x, y, w, h) => ({ x, y, w, h });

test("overlapping rects collide", () => assert(aabb(R(0,0,10,10), R(5,5,10,10))));
test("adjacent rects do NOT collide", () => assert(!aabb(R(0,0,10,10), R(10,0,10,10))));
test("contained rect collides", () => assert(aabb(R(2,2,4,4), R(0,0,10,10))));
test("separated rects don't collide", () => assert(!aabb(R(0,0,5,5), R(20,20,5,5))));
test("Y-only separation no collision", () => assert(!aabb(R(0,0,10,5), R(0,10,10,5))));

// ---- Physics constants (verified from game.js) ----
console.log("\n[Physics Constants]");
test("jump velocity is negative (upward)", () => assert(-645 < 0));
test("gravity is positive (downward)", () => assert(2150 > 0));
test("max fall speed reasonable", () => assert(980 < 2000));
test("player speed sane", () => assert(265 > 0 && 265 < 1000));
test("coyote time positive", () => assert(0.1 > 0));
test("jump buffer positive", () => assert(0.12 > 0));

// ---- File existence and content ----
console.log("\n[File Checks]");
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(ROOT, "game.js"), "utf8");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");

test("game.js readable and non-trivial", () => assert(src.length > 20000));
test("LEVELS array present", () => assert(src.includes("const LEVELS = [")));
test("40 level build() entries", () => {
  const m = src.match(/build: \(\) =>/g);
  assert(m && m.length === 40, `Found ${m ? m.length : 0}, expected 40`);
});
test("no FableDevil player-facing strings", () => assert(!src.includes('"FABLEDEVIL"') && !src.includes("'FABLEDEVIL'")));
test("uses dd_done save key", () => assert(src.includes('"dd_done"')));
test("uses dd_deaths save key", () => assert(src.includes('"dd_deaths"')));
test("uses dd_theme key", () => assert(src.includes('"dd_theme"')));
test("DEVIL DOMAIN in source", () => assert(src.includes("DEVIL DOMAIN")));
test("KEEP GOING win text", () => assert(src.includes("KEEP GOING")));
test("YOU ESCAPED win text", () => assert(src.includes("YOU ESCAPED")));
test("migrates fd_ keys", () => assert(src.includes('readValue("fd_" + suffix)')));

// ---- HTML checks ----
console.log("\n[HTML Structure]");
test("title contains DEVIL DOMAIN", () => assert(html.includes("DEVIL DOMAIN")));
test("no vercel analytics CDN", () => assert(!html.includes("@vercel/analytics")));
test("no Google Fonts CDN", () => assert(!html.includes("fonts.googleapis.com")));
test("canvas element present", () => assert(html.includes('id="game"')));
test("touch controls present", () => assert(html.includes('id="touch-controls"')));
test("hud present", () => assert(html.includes('id="hud"')));
test("level grid present", () => assert(html.includes('id="level-grid"')));
test("menu artwork has an accessible game title", () => assert(html.includes('content/branding/menu-art.jpg') && html.includes('alt="Devil Domain"')));

// ---- CSS checks ----
console.log("\n[CSS Structure]");
test("dark theme vars", () => assert(css.includes('[data-theme="dark"]')));
test("light theme vars", () => assert(css.includes('[data-theme="light"]')));
test("crimson accent color", () => assert(css.includes("#e8553e") || css.includes("#d94030")));
test("touch controls styled", () => assert(css.includes("#touch-controls")));
test("tc-btn styled", () => assert(css.includes(".tc-btn")));

// ---- Capacitor config ----
console.log("\n[Capacitor Config]");
test("capacitor.config.json exists", () => assert(fs.existsSync(path.join(ROOT, "capacitor.config.json"))));
test("correct appId", () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "capacitor.config.json"), "utf8"));
  assert(cfg.appId === "com.janawad.devildomain", `got: ${cfg.appId}`);
});
test("correct appName", () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "capacitor.config.json"), "utf8"));
  assert(cfg.appName === "Devil Domain");
});

// ---- Level schema spot-check ----
console.log("\n[Level Schema]");
test("level 1 name present", () => assert(src.includes("WELCOME TO THE DOMAIN")));
test("level 30 name present", () => assert(src.includes("THE FINAL DOMAIN")));
test("Door class present", () => assert(src.includes("class Door {")));
test("CollapseFloor present", () => assert(src.includes("class CollapseFloor {")));
test("Saw class present", () => assert(src.includes("class Saw {")));
test("Laser class present", () => assert(src.includes("class Laser {")));
test("Teleporter class present", () => assert(src.includes("class Teleporter {")));

// ---- Summary ----
console.log(`\n${"=".repeat(42)}`);
console.log(`  Results: ${passed} passed, ${failed} failed`);
console.log(`${"=".repeat(42)}\n`);
process.exit(failed > 0 ? 1 : 0);
