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
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

interface VacancyWithRelations extends Vacancy {
  department?: Department
  cycle?: Cycle
}

export type CreateVacancy = Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateVacancy = Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt' | 'departmentId' | 'cycleId'>

export type { Vacancy, VacancyWithRelations }
