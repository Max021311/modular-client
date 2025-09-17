import type { Department } from './department.d'
import type { Cycle } from './cycle.d'

interface Vacancy {
  id: number
  name: string
  description: string
  slots: number
  departmentId: number
  cycleId: number
  disabled: boolean
  createdAt: Date
  updatedAt: Date
}

interface VacancyWithRelations extends Vacancy {
  department?: Department
  cycle?: Cycle
}

export type CreateVacancy = Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateVacancy = Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>

export type { Vacancy, VacancyWithRelations }
