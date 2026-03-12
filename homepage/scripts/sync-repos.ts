const GITHUB_ORG = 'pastel-sketchbook'
const OUTPUT_PATH = './public/repos.json'

interface GitHubRepo {
  name: string
  description: string | null
  language: string | null
  license: { spdx_id: string } | null
  html_url: string
  pushed_at: string
  stargazers_count: number
  forks_count: number
  archived: boolean
  fork: boolean
}

async function fetchRepos() {
  const repos = []
  let page = 1

  while (true) {
    const response = await fetch(
      `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=pushed&direction=desc&page=${page}`,
      { headers: { Accept: 'application/vnd.github.v3+json' } },
    )

    if (!response.ok) {
      console.error(`  ✗ GitHub API returned ${response.status}`)
      break
    }

    const data: GitHubRepo[] = await response.json()
    if (data.length === 0) break

    for (const repo of data) {
      if (repo.archived || repo.fork) continue
      repos.push({
        name: repo.name,
        description: repo.description || '',
        language: repo.language || 'Other',
        license:
          repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
            ? repo.license.spdx_id
            : undefined,
        url: repo.html_url,
        updated: repo.pushed_at,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      })
    }

    page++
  }

  return repos
}

console.log('📦 Fetching GitHub repos...')
const repos = await fetchRepos()
console.log(`  ✓ Found ${repos.length} repositories`)

const output = { repos, timestamp: new Date().toISOString() }
await Bun.write(OUTPUT_PATH, JSON.stringify(output, null, 2))
console.log(`  ✓ Saved to ${OUTPUT_PATH}`)
