export interface BaseNote {
  title: string,
  content: string,
  created_at: string,
}

export interface PostNote extends BaseNote {
  uid?: string,
  username?: string,
}

export interface Note extends BaseNote {
  username: string,
}