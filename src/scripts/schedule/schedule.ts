import type Watch from './watch.ts'

export interface ScheduleItem {
  hour: number
  end: Watch
  start: Watch
}

const schedule: ScheduleItem[] = [
  { hour: 0, end: 'first', start: 'middle' },
  { hour: 4, end: 'middle', start: 'morning' },
  { hour: 8, end: 'morning', start: 'forenoon' },
  { hour: 12, end: 'forenoon', start: 'afternoon' },
  { hour: 16, end: 'afternoon', start: 'first dog' },
  { hour: 18, end: 'first dog', start: 'second dog' },
  { hour: 20, end: 'second dog', start: 'first' }
]

export default schedule
