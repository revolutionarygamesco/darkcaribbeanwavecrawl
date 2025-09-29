import mod from './id.ts'

Hooks.once('init', () => {
  if (!(game instanceof Game) || !game.i18n) return

  game.settings.register(mod.id, 'historical', {
    name: game.i18n.localize('revolutionary-darkcaribbean.settings.historical.name'),
    hint: game.i18n.localize('revolutionary-darkcaribbean.settings.historical.hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false
  })
})
