import type { Career } from './career.d'

export interface Student {
  id: number
  name: string
  code: string
  careerId: number
  email: string
  telephone: string
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

export type StudentWithCareer = Student & {
  career?: Career
}

export type CreateStudent = Omit<Student, 'id' | 'createdAt' | 'updatedAt' | 'email'> & { password: string }
export type UpdateStudent = Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>
