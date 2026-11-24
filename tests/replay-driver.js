// Shared movement-only replay driver, evaluated beside the real game source.
function playReplay(replay) {
  Game.loadLevel(replay.level - 1);
  Game.state = 'play';
  const startingDeaths = Game.deaths;
  const events = new Set(), trace = [];
  let tick = 0;
  for (const [direction, jump] of replay.actions) {
    keys.ArrowLeft = direction < 0;
    keys.ArrowRight = direction > 0;
    if (jump && !keys.Space) jumpBuffered = 0.12;
    keys.Space = jump;
    for (let i = 0; i < replay.framesPerAction && Game.state === 'play'; i++) {
      Game.update(STEP); tick++;
      if (Game.level.door.i > 0) events.add('Door:fled');
      for (const t of Game.level.traps) {
        if (t instanceof PopSpikes && t.trigger && t.state === 'popping') events.add('PopSpikes:triggered');
        if (t instanceof CollapseFloor && t.state !== 'idle') events.add('CollapseFloor:triggered');
        if (t instanceof CrumblePlatform && t.state !== 'idle') events.add('CrumblePlatform:triggered');
        if (t instanceof FallBlock && t.state !== 'idle') events.add('FallBlock:triggered');
        if (t instanceof Button && t.pressed) events.add('Button:' + t.key);
        if (t instanceof Teleporter && t.cool > 0) events.add('Teleporter:used');
        if (t instanceof Spring && t.c > 0) events.add('Spring:used');
      }
      if (tick % 24 === 0) trace.push({ tick, x: Game.player.x, y: Game.player.y });
    }
    if (Game.state !== 'play') break;
  }
  clearInput();
  return { state: Game.state, deaths: Game.deaths - startingDeaths, tick, seconds: tick / 120,
    x: Game.player.x, y: Game.player.y, events: [...events], trace };
}
