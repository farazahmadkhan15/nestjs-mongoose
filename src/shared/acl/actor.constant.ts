/**
 * The actor who is perfoming the action
 */
export interface IActor {
  _id: string

  roles: string[]
}

export type Actor = IActor
