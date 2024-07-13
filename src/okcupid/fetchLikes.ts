export interface User {
  id: string
  name: string
  imageUrl: string
}

export async function fetchLikes(): Promise<User[]> {
  if (!window.location.hostname.includes('okcupid.com')) {
    throw new Error('This function can only be called on OkCupid.com')
  }

  return []
}
