export interface Career {
  id: number
  name: string
  slug: string
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

export type CreateCareer = Omit<Career, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCareer = Partial<Omit<Career, 'id' | 'createdAt' | 'updatedAt'>>
