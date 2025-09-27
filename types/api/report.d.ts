import type { Student } from './student.d'
import type { Vacancy } from './vacancy.d'
import type { Cycle } from './cycle.d'

interface Report {
  id: number
  studentId: number
  vacancyId: number
  cycleId: number
  reportNumber: '1' | '2'
  status: 'APPROVED' | 'REJECTED' | 'PENDING'
  hours: number // integer
  fileId: number
  createdAt: Date
  updatedAt: Date
}

export interface ReportWithRelations extends Report {
  student?: Student
  vacancy?: Vacancy
  cycle?: Cycle
}

export type CreateReport = Omit<Report, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateReport = Partial<Omit<Report, 'id' | 'createdAt' | 'cycleId' | 'vacancyId' | 'studentId' | 'reportNumber'>>
