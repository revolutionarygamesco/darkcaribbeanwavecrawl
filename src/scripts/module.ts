const mod: { id: string; name: string } = {
  id: 'revolutionary-darkcaribbean',
  name: 'Dark Caribbean Wave Crawl'
}

Hooks.once('init', () => {
  if (!(game instanceof Game) || !game.i18n) return

  game.settings.register(mod.id as any, 'historical' as any, {
    name: game.i18n.localize('revolutionary-darkcaribbean.settings.historical.name'),
    hint: game.i18n.localize('revolutionary-darkcaribbean.settings.historical.hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  })
})
