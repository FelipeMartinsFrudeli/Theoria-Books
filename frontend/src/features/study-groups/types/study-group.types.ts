export type GroupPrivacy = 'public' | 'private'

export type GroupMember = {
  id: string
  name: string
  pagesRead: number
  avatar: string
}

export type Discussion = {
  id: string
  author: string
  body: string
  pageNumber: number
}

export type StudyGroup = {
  id: string
  name: string
  description: string
  currentBookId: string
  currentBookTitle: string
  weeklyChallenge: string
  privacy: GroupPrivacy
  groupProgress: number
  groupStreak: number
  members: GroupMember[]
  discussions: Discussion[]
}

export type CreateStudyGroupInput = {
  name: string
  description: string
  currentBookId: string
  privacy: GroupPrivacy
}
