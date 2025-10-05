import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import getBackgrounds from './get-backgrounds.ts'

const backgrounds: Record<string, { direct: string[], indirect: string[] }> = {
  'captain': { direct: ['captain'], indirect: ['first mate', 'officer'] },
  'quartermaster': { direct: ['quartermaster'], indirect: ['first mate', 'bosun', 'captain', 'officer'] },
  'pilot': { direct: ['navigator', 'pilot'], indirect: ['captain', 'cartographer', 'explorer'] },
  'pilot-mate': { direct: ['navigator', 'pilot'], indirect: ['captain', 'explorer', 'cartographer'] },
  'bosun': { direct: ['bosun'], indirect: ['captain', 'officer'] },
  'bosun-mate': { direct: ['bosun'], indirect: ['captain', 'officer'] },
  'gunner': { direct: ['gunner'], indirect: ['hunter'] },
  'gunner-mate': { direct: ['gunner'], indirect: ['hunter'] },
  'master': { direct: [], indirect: ['sailor', 'captain', 'first mate', 'naval deserter', 'sail maker'] },
  'master-mate': { direct: ['sailor'], indirect: ['cabin boy', 'cabin girl', 'cabin boy/girl', 'captain', 'first mate', 'naval deserter', 'sail maker'] },
  'carpenter': { direct: ['shipwright'], indirect: ['craftsman', 'pirate'] },
  'carpenter-mate': { direct: ['shipwright'], indirect: ['craftsman', 'pirate'] },
  'cook': { direct: ['chef', 'cook'], indirect: [] },
  'surgeon': { direct: ['doctor', 'medic', 'nurse', 'surgeon'], indirect: ['apothecary'] },
  'master-arms': { direct: ['marine'], indirect: ['captain', 'guard', 'hunter', 'military', 'soldier', 'warrior'] },
  'priest': { direct: ['missionary', 'monk', 'priest'], indirect: ['religious follower'] },
  'sorcerer': { direct: ['rumored sorcerer', 'shaman'], indirect: ['cultist', 'heretic'] }
}

const calculatePreviousExperience = (actor: Actor | string[]): Record<string, number> => {
  const bgs = 'collections' in actor ? getBackgrounds(actor) : actor
  const experience: Record<string, number> = {}

  for (const position in backgrounds) {
    let xp = 0

    for (const background of backgrounds[position].direct) {
      if (bgs.includes(background)) xp += new DiceRoll('1d100 + 50').total
    }

    for (const background of backgrounds[position].indirect) {
      if (bgs.includes(background)) xp += new DiceRoll('5d10').total
    }

    experience[position] = xp
  }

  return experience
}

export default calculatePreviousExperience
