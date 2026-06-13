import type { Room } from '@/types'

const STORAGE_KEY = 'party_topic_bag_rooms'

function normalizeRoom(room: Room): Room {
  return {
    ...room,
    appointmentTime: room.appointmentTime ?? null
  }
}

export function getRooms(): Room[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const rooms: Room[] = data ? JSON.parse(data) : []
    return rooms.map(normalizeRoom)
  } catch {
    return []
  }
}

export function saveRooms(rooms: Room[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms))
}

export function getRoomById(id: string): Room | undefined {
  return getRooms().find(room => room.id === id)
}

export function getRoomByCode(code: string): Room | undefined {
  return getRooms().find(room => room.code === code)
}

export function saveRoom(room: Room): void {
  const rooms = getRooms()
  const index = rooms.findIndex(r => r.id === room.id)
  if (index >= 0) {
    rooms[index] = room
  } else {
    rooms.push(room)
  }
  saveRooms(rooms)
}

export function deleteRoom(id: string): void {
  const rooms = getRooms().filter(room => room.id !== id)
  saveRooms(rooms)
}
