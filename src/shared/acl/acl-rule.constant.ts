import { ROLE } from './../../auth/constants/role.constant'
import { Action } from './action.constant'
import { IActor } from './actor.constant'

/**
 * Custom rule callback definition
 */
export type RuleCallback<Resource> = (
  resource: Resource,
  actor: IActor,
) => boolean

/**
 * ACL rule format
 */
export interface IAclRule<Resource> {
  // list of actions permissible
  actions: Action[]

  // if rule for particular role or for all role
  role: ROLE

  // specific rule there or otherwise true
  ruleCallback?: RuleCallback<Resource>
}

export type AclRule<Resource> = IAclRule<Resource>
