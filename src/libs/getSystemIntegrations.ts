import { Category, SubCategory } from '../interfaces/Category'
import { SystemIntegration } from '../interfaces/SystemInteration'

export const getSystemIntegrations = (
  category: Category | SubCategory,
): Array<SystemIntegration> => {
  if (category.hasOwnProperty('systemIntegrations')) {
    return category.systemIntegrations
  }
  return []
}
