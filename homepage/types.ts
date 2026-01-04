export interface SparkResult {
  topic: string
  creation: string
  platform: string
  impact: string
}

export interface SavedSpark extends SparkResult {
  id: string
  date: number
}
