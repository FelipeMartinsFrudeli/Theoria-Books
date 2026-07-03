import { mockApiClient } from '@shared/services/api/mockApiClient'
import type { CreateStudyGroupInput, StudyGroup } from '@features/study-groups/types/study-group.types'

const bookTitles: Record<string, string> = {
  meditations: 'Meditations',
  'psychology-money': 'The Psychology of Money',
  'clean-architecture': 'Clean Architecture',
  'atomic-habits': 'Atomic Habits',
}

let groups: StudyGroup[] = [
  {
    id: 'philosophy-beginners',
    name: 'Philosophy Beginners',
    currentBookId: 'meditations',
    currentBookTitle: 'Meditations',
    weeklyChallenge: 'Share one insight about discipline.',
    description: 'A quiet circle for readers beginning with Stoicism and practical philosophy.',
    privacy: 'public',
    groupProgress: 72,
    groupStreak: 9,
    members: [
      { id: 'a', name: 'Mara', pagesRead: 144, avatar: 'M' },
      { id: 'b', name: 'Jon', pagesRead: 112, avatar: 'J' },
      { id: 'c', name: 'Leah', pagesRead: 91, avatar: 'L' },
    ],
    discussions: [
      { id: 'd1', author: 'Mara', body: 'Discipline reads less like force and more like attention.', pageNumber: 40 },
      { id: 'd2', author: 'Jon', body: 'I keep returning to the line between event and judgment.', pageNumber: 88 },
    ],
  },
  {
    id: 'wealth-and-psychology',
    name: 'Wealth and Psychology',
    currentBookId: 'psychology-money',
    currentBookTitle: 'The Psychology of Money',
    weeklyChallenge: 'Read 20 pages and summarize one idea.',
    description: 'A group for understanding money through behavior, time, and decision-making.',
    privacy: 'public',
    groupProgress: 44,
    groupStreak: 12,
    members: [
      { id: 'd', name: 'Noor', pagesRead: 84, avatar: 'N' },
      { id: 'e', name: 'Theo', pagesRead: 72, avatar: 'T' },
      { id: 'f', name: 'Iris', pagesRead: 61, avatar: 'I' },
    ],
    discussions: [
      { id: 'd3', author: 'Noor', body: 'Compounding feels like patience made visible.', pageNumber: 42 },
      { id: 'd4', author: 'Iris', body: 'Risk is easier to judge after the story has already ended.', pageNumber: 96 },
    ],
  },
  {
    id: 'software-architecture-club',
    name: 'Software Architecture Club',
    currentBookId: 'clean-architecture',
    currentBookTitle: 'Clean Architecture',
    weeklyChallenge: 'Explain dependency inversion in your own words.',
    description: 'A study group for engineers who want to reason better about software design.',
    privacy: 'private',
    groupProgress: 28,
    groupStreak: 5,
    members: [
      { id: 'g', name: 'Ari', pagesRead: 96, avatar: 'A' },
      { id: 'h', name: 'Sam', pagesRead: 68, avatar: 'S' },
      { id: 'i', name: 'Ren', pagesRead: 54, avatar: 'R' },
    ],
    discussions: [
      { id: 'd5', author: 'Ari', body: 'A boundary is a promise about what can change independently.', pageNumber: 96 },
      { id: 'd6', author: 'Sam', body: 'Dependency direction is really about protecting policy.', pageNumber: 128 },
    ],
  },
]

export const studyGroupsService = {
  async getGroups() {
    return mockApiClient(groups)
  },
  async getGroupDetail(groupId: string) {
    return mockApiClient(groups.find((group) => group.id === groupId))
  },
  async createGroup(input: CreateStudyGroupInput) {
    const group: StudyGroup = {
      id: `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name: input.name,
      description: input.description,
      currentBookId: input.currentBookId,
      currentBookTitle: bookTitles[input.currentBookId] ?? 'Shared reading',
      weeklyChallenge: 'Share one insight with the circle.',
      privacy: input.privacy,
      groupProgress: 0,
      groupStreak: 0,
      members: [{ id: 'you', name: 'You', pagesRead: 0, avatar: 'Y' }],
      discussions: [],
    }
    groups = [group, ...groups]
    return mockApiClient(group)
  },
}
