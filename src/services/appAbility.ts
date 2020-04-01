import { Ability, RawRuleOf, ForcedSubject } from '@casl/ability';

export const actions = ['manage', 'create', 'read', 'update', 'delete'] as const;
export const subjects = ['Article', 'all'] as const;

export type AppAbilities = [
  typeof actions[number],
  typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
];
export type AppAbility = Ability<AppAbilities>;
export const createAbility = (rules: RawRuleOf<AppAbility>[]) => new Ability<AppAbilities>(rules);
