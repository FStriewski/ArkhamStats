import { InvestigatorListEntry } from '../types';
import {
  investigatorList,
  investigatorClassColor,
  investigatorByFaction
} from './lists';

const lookupFaction = (icode: string) => {
  const factions = Object.keys(investigatorByFaction);
  const result = factions.find((iclass) =>
    (investigatorByFaction[iclass] as string[]).includes(icode)
  );
  return result;
};

export const lookupInvestigator = (icode: string): InvestigatorListEntry => {
  if (!icode) return;

  const investigator: InvestigatorListEntry = investigatorList.find(
    (item) => item.code === icode
  );
  investigator.color = investigatorClassColor[
    investigator.faction_code
  ] as string;
  investigator.faction = lookupFaction(icode);

  return investigator;
};
