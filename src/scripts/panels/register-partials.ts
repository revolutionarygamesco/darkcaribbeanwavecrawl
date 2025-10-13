import { MODULE_ID } from '../settings.ts'

const partials = [
  'listing',
  'team',
  'crew-tab'
]

const getFilename = (partial: string): string => {
  const directory = `modules/${MODULE_ID}/templates`
  return `${directory}/${partial}.hbs`
}

const registerPartials = async (): Promise<void> => {
  const filenames = partials.map(partial => getFilename(partial))
  await foundry.applications.handlebars.loadTemplates(filenames)
  await Promise.all(partials.map(async partial => {
    const template = await foundry.applications.handlebars.getTemplate(getFilename(partial))
    Handlebars.registerPartial(partial, template)
  }))
}

export default registerPartials
