import { CustomDecorator, SetMetadata } from '@nestjs/common'

import { ROLE } from '../constants/role.constant'

export const ROLES_KEY = 'roles'
export function Roles(...roles: ROLE[]): CustomDecorator<string> {
  return SetMetadata(ROLES_KEY, roles)
}
