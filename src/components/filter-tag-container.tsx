import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { FilterTag } from '@/components/filter-tag'

type FilterTagContainerProps = {
	categories: { [key: string]: number }
	tagFilter: string[]
	setTagFilter: Dispatch<SetStateAction<string[]>>
}

export const FilterTagContainer = ({
	categories,
	setTagFilter,
	tagFilter,
}: FilterTagContainerProps) => {
	const [containerKey, setContainerKey] = useState(new Date().getTime())

	const handleSelectTag = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value
		const isChecked = event.currentTarget.checked

		if (!isChecked) {
			setTagFilter((prev) => {
				const tagFilterCopy = [...prev]
				const tagIndex = prev.findIndex((tag) => tag === value)
				tagFilterCopy.splice(tagIndex, 1)
				return tagFilterCopy
			})
		}

		if (isChecked) {
			setTagFilter((prev) => [...prev, value])
		}
	}

	const resetTagFilters = () => {
		setTagFilter([])
		setContainerKey(new Date().getTime())
	}

	return (
		<div className="w-full flex flex-col gap-6">
			<p className="text-2xl">Filtros</p>
			<div className="flex flex-col gap-4 grid-col" key={containerKey}>
				{Object.keys(categories).map((category) => (
					<FilterTag
						key={category}
						category={category}
						count={categories[category]}
						onChange={handleSelectTag}
					/>
				))}
			</div>
			{tagFilter.length > 0 && (
				<button onClick={resetTagFilters} className="w-max">
					X Limpiar filtros
				</button>
			)}
		</div>
	)
}
