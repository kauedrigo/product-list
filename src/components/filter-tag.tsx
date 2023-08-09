import { ChangeEventHandler } from 'react'

type FilterTagProps = {
	category: string
	count?: number
	onChange: ChangeEventHandler<HTMLInputElement>
}

export const FilterTag = ({ category, count = 0, onChange }: FilterTagProps) => {
	return (
		<label className="flex gap-2 items-center">
			<input
				type="checkbox"
				className="w-6 h-6 border-blue-500 rounded border-2 focus:outline-amber-500 peer"
				onChange={onChange}
				value={category}
			/>
			<span className="peer-checked:text-blue-800 peer-checked:font-semibold">
				{category} ({count})
			</span>
		</label>
	)
}
