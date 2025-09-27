import type { Student } from './student.d'
import type { Vacancy } from './vacancy.d'
import type { Cycle } from './cycle.d'

export interface FinalReport {
  id: number
  studentId: number
  vacancyId: number
  cycleId: number
  status: 'APPROVED' | 'REJECTED' | 'PENDING'
  hours: number // Integer
  fileId: number
  createdAt: Date
  updatedAt: Date
}

export interface FinalReportWithRelations extends FinalReport {
  student?: Student
  vacancy?: Vacancy
  cycle?: Cycle
}

export type CreateFinalReport = Omit<FinalReport, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateFinalReport = Partial<Omit<FinalReport, 'id' | 'createdAt' | 'updatedAt' | 'cycleId' | 'vacancyId' | 'studentId'>>
