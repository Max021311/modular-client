export interface Department {
  id: number
  name: string
  address: string
  phone: string
  email: string
  chiefName: string
  createdAt: Date
  updatedAt: Date
  searchVector: string
}

export type CreateDepartment = Omit<Department, 'id' | 'searchVector' | 'createdAt' | 'updatedAt'>
export type UpdateDepartment = Partial<Omit<Department, 'id' | 'createdAt' | 'searchVector' | 'updatedAt'>>
