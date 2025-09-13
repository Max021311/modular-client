import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDateTime(dateString: string) {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function formatDate(date: Date) {
  return format(date, 'dd MMM yyyy', {
    locale: es
  })
}
export function getTimeInDay(date: Date) {
  return format(date, 'hh:mm aaa', {
    locale: es
  })
}
