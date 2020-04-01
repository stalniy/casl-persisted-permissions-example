import { RawRuleOf } from '@casl/ability';
import { AppAbility } from '../services/appAbility';

export interface User {
  id: number
  email: string
  role: string
  permissions: RawRuleOf<AppAbility>[]
}
