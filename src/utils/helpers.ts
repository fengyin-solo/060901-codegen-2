export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getDaysRemaining(expiresAt: string): number {
  const now = new Date()
  const expiry = new Date(expiresAt)
  const diff = expiry.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function getMinutesUntil(targetTimeStr: string | null): number | null {
  if (!targetTimeStr) return null
  const now = new Date()
  const target = new Date(targetTimeStr)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60))
}

export function getAppointmentReminder(appointmentTime: string | null): { level: 'urgent' | 'soon' | 'upcoming' | null; message: string | null } {
  const minutes = getMinutesUntil(appointmentTime)
  if (minutes === null) return { level: null, message: null }
  if (minutes <= 0) return { level: 'urgent', message: '聚会时间已到，快开始吧！' }
  if (minutes <= 10) return { level: 'urgent', message: `还有 ${minutes} 分钟就要开始啦，别迟到！` }
  if (minutes <= 30) return { level: 'soon', message: `还有 ${minutes} 分钟开始，准备出发啦～` }
  if (minutes <= 60) return { level: 'soon', message: `还有 ${Math.floor(minutes / 60)} 小时 ${minutes % 60} 分钟开始` }
  if (minutes <= 360) {
    const hours = Math.floor(minutes / 60)
    return { level: 'upcoming', message: `${hours} 小时后开始聚会` }
  }
  const days = Math.floor(minutes / 1440)
  if (days > 0) return { level: 'upcoming', message: `${days} 天后开始聚会` }
  return { level: null, message: null }
}

export function formatAppointmentTime(timeStr: string | null): string | null {
  if (!timeStr) return null
  const date = new Date(timeStr)
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const isToday = date.toDateString() === now.toDateString()
  const isTomorrow = date.toDateString() === tomorrow.toDateString()
  
  const timePart = date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  
  if (isToday) {
    return `今天 ${timePart}`
  } else if (isTomorrow) {
    return `明天 ${timePart}`
  } else {
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric'
    }) + ' ' + timePart
  }
}

export function formatDateTimeLocal(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function getDefaultAppointmentTime(): Date {
  const now = new Date()
  now.setHours(now.getHours() + 2)
  now.setMinutes(0)
  return now
}
