'use client'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { HiSearch } from 'react-icons/hi'

type SearchBarProps = {
	searchValue: string
	setSearchValue: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
	}

	return (
		<form className="relative w-full max-w-sm">
			<input
				type="text"
				placeholder=" Buscar por nombre"
				className="pl-3 h-11 items-center pr-14 rounded-lg border-slate-200 border-2 border-solid w-full focus:outline-blue-400"
				value={searchValue}
				onChange={handleChange}
			/>
			<button
				type="submit"
				className="flex absolute top-0 right-0 w-11 h-11 items-center justify-center"
			>
				<HiSearch className="text-slate-400 text-2xl" />
			</button>
		</form>
	)
}
