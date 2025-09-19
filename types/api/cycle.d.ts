export interface Cycle {
  id: number
  slug: string // 2024A, 2024B, etc.
  isCurrent: boolean
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

export type CreateCycle = Omit<Cycle, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCycle = Partial<Omit<Cycle, 'id' | 'createdAt' | 'updatedAt'>>
