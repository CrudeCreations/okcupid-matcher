import { createSignal, createEffect, Show } from 'solid-js'
import { User } from '../okcupid/fetchLikes'

export const Popup = () => {
  const [likes, setLikes] = createSignal<User[]>([])
  const [error, setError] = createSignal<string | null>(null)

  createEffect(() => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0]
        if (currentTab && currentTab.id) {
          chrome.tabs.sendMessage(currentTab.id, { action: 'getLikes' }, (response) => {
            if (chrome.runtime.lastError) {
              setError(`Error: ${chrome.runtime.lastError.message}`)
            } else if (response && response.likes) {
              setLikes(response.likes)
              setError(null)
            } else {
              setError('No likes data received')
            }
          })
        } else {
          setError('No active tab found')
        }
      })
    } catch {
      setError('Error: Chrome plugin context not available')
    }
  })

  const handleMatch = (userId: string) => {
    setLikes((prev) => prev.filter((user) => user.id !== userId))
    chrome.storage.sync.set({ likes: likes() })
  }

  const handleViewProfile = (userId: string) => {
    //TODO: Load profile into view or figure out profile urls
  }

  return (
    <main class="bg-gray-100 min-h-screen p-4">
      <h3 class="text-2xl font-bold text-center text-pink-600 mb-4">OkCupid Likes</h3>
      <div class="bg-white rounded-lg shadow-md p-4">
        <Show
          when={error()}
          fallback={
            <div class="space-y-4">
              {likes().map((user) => (
                <div class="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg">
                  <div class="col-span-1 flex items-center">
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      class="w-16 h-16 rounded-full object-cover mr-2"
                    />
                  </div>
                  <div class="col-span-1 flex items-stretch">
                    <span class="font-medium text-center flex-grow">{user.name}</span>
                  </div>
                  <div class="col-span-1 flex items-stretch">
                    <button
                      onClick={() => handleMatch(user.id)}
                      class="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded flex-grow"
                    >
                      Match
                    </button>
                  </div>
                  <div class="col-span-1 flex items-stretch">
                    <button
                      onClick={() => handleViewProfile(user.id)}
                      class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded flex-grow"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <div class="text-red-500 font-semibold">{error()}</div>
        </Show>
      </div>
    </main>
  )
}

export default Popup
