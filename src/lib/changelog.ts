export interface ChangelogEntry {
	version: string
	date: string
	type: "feature" | "fix" | "update" | "security" | "release"
	description: string
	details?: string[]
}

export const changelogEntries: ChangelogEntry[] = [
	{
		version: "1",
		date: "May 17, 2025",
		type: "security",
		description: "SITE IN PROGRESS",
		details: [
			"WIP SITE",
			"",
		],
	},
]

export const getLatestVersion = (): string => {
	return changelogEntries[0].version
}

export const getRecentChangelogs = (limit = 5): ChangelogEntry[] => {
	return changelogEntries.slice(0, limit)
}
