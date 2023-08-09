type FilterTagProps = {
	category: string
	count?: number
}

export const FilterTag = ({ category, count = 0 }: FilterTagProps) => {
	return (
		<label className="flex gap-2 items-center">
			<input
				type="checkbox"
				className="w-6 h-6 border-blue-500 rounded border-2 focus:outline-amber-500"
			/>
			<span>
				{category} ({count})
			</span>
		</label>
	)
}
