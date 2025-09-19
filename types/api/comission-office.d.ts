import type { Student } from './student.d'
import type { Vacancy } from './vacancy.d'
import type { Cycle } from './cycle.d'

export interface ComissionOffice {
  id: number
  studentId: number
  vacancyId: number
  cycleId: number
  beginDate: string // ISO date
  status: 'APPROVED' | 'REJECTED' | 'PENDING'
  fileId: number
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

export interface ComissionOfficeWithRelations extends ComissionOffice {
  student?: Student
  vacancy?: Vacancy
  cycle?: Cycle
}

export type CreateComissionOffice = Omit<ComissionOffice, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateComissionOffice = Partial<Omit<ComissionOffice, 'id' | 'createdAt' | 'updatedAt'>>
