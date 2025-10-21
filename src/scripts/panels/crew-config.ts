import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import getPanelDimensions from '../utilities/get-dimensions.ts'
import getCrewConfig from '../state/crew-config/get.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

class CrewConfigPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-crew-config`,
    classes: ['crew-config'],
    tag: 'form',
    position: getPanelDimensions(800, 500),
    window: {
      resizable: true,
      title: `${MODULE_ID}.settings.crew-config.name`
    },
    form: {
      handler: CrewConfigPanel.formHandler,
      submitOnChange: false,
      closeOnSubmit: false
    }
  }

  static PARTS = {
    form: {
      template: `modules/${MODULE_ID}/templates/crew-config.hbs`
    },
    footer: {
      template: `templates/generic/form-footer.hbs`
    }
  }

  static async formHandler (_event: SubmitEvent, _form: HTMLFormElement, data: FormDataExtended) {
    const json = data.get<string>('json')
    if (!json) return
    await game.settings.set<string>(MODULE_ID, MODULE_SETTINGS.CREW_CONFIG, json)
  }

  async _prepareContext () {
    const json = JSON.stringify(getCrewConfig(), null, 2)

    return {
      json,
      buttons: [
        { type: 'submit', icon: 'fas fa-save', label: `${MODULE_ID}.settings.crew-config.save` }
      ]
    }
  }
}

export default CrewConfigPanel
