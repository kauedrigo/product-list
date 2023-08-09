'use client'

import { FilterTag } from '@/components/filter-tag'
import { ProductPreview } from '@/components/product-preview'
import { Product, ProductList } from '@/types'
import { getProductListCategoriesWithCount } from '@/utils'
import { ChangeEvent, useMemo, useState } from 'react'
import products from '../assets/products.json'
import { SearchBar } from '@/components/search-bar'

export default function Home() {
	const productList = products as ProductList

	const [tagFilter, setTagFilter] = useState<string[]>([])
	const [searchFilter, setSearchFilter] = useState('')

	const filteredProducts = useMemo(() => {
		const products = productList.data.nodes

		const filterByName = (products: Product[]) => {
			return products.filter((product) =>
				product.name.toLowerCase().includes(searchFilter.toLowerCase()),
			)
		}

		const filterByTag = (products: Product[]) => {
			return tagFilter.length
				? products.filter((product) => tagFilter.includes(product.category.name))
				: products
		}

		const filteredByName = filterByName(products)
		const filteredByTag = filterByTag(filteredByName)

		const categories = getProductListCategoriesWithCount(filteredByName)

		return { products: filteredByTag, categories }
	}, [tagFilter, productList, searchFilter])

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
	}

	return (
		<div className="p-4 md:p-6 flex flex-col gap-6">
			<h1 className="uppercase text-2xl font-bold text-blue-900">
				¿Qué producto quieres encontrar?
			</h1>
			<SearchBar initialValue={searchFilter} setSearchValue={setSearchFilter} />
			<div className="w-full min-h-screen grid md:grid-cols-[200px_auto] gap-6">
				<div className="w-full flex flex-col gap-6">
					<p className="text-2xl">Filtros</p>
					<div className="flex flex-col gap-4 grid-col">
						{Object.keys(filteredProducts.categories).map((category) => (
							<FilterTag
								key={category}
								category={category}
								count={filteredProducts.categories[category]}
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
				<div className="w-full flex flex-col gap-6">
					<p className="text-2xl">
						{filteredProducts.products.length}{' '}
						{filteredProducts.products.length === 1 ? 'resultado' : 'resultados'}
					</p>

					<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-10">
						{filteredProducts.products.map((product) => (
							<ProductPreview key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
