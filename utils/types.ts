export interface BaseNote {
  title: string,
  content: string,
  created_at: Date,
}

export interface PostNote extends BaseNote {
  uid?: string,
  username?: string,
}

export interface Note extends BaseNote {
  username: string,
}