export interface FollowingCard {
  type: string
  id: number
  playlist: string
  flashcard_front: string
  flashcard_back: string
  description: string
  user: User
}

export interface User {
  name: string
  avatar: string
}
