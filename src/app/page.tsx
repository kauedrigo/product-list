'use client'

import { useMemo, useState } from 'react'

import { FilterTagContainer } from '@/components/filter-tag-container'
import { ProductPreview } from '@/components/product-preview'
import { SearchBar } from '@/components/search-bar'
import { Product, ProductList } from '@/types'
import { getProductListCategoriesWithCount } from '@/utils'
import products from '../assets/products.json'

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

		const removeTagFromFilter = (tag: string) => {
			setTagFilter((prev) => {
				const tagFilterCopy = [...prev]
				const tagIndex = prev.findIndex((currentTag) => currentTag === tag)
				tagFilterCopy.splice(tagIndex, 1)
				return tagFilterCopy
			})
		}

		const filteredByName = filterByName(products)
		const filteredByTag = filterByTag(filteredByName)

		const categories = getProductListCategoriesWithCount(filteredByName)
		const categoryKeys = Object.keys(categories)

		for (const tag of tagFilter) {
			if (!categoryKeys.includes(tag)) {
				removeTagFromFilter(tag)
			}
		}

		return { products: filteredByTag, categories }
	}, [tagFilter, productList, searchFilter])

	return (
		<div className="p-4 md:p-6 flex flex-col gap-6">
			<h1 className="uppercase text-2xl font-bold text-blue-900">
				¿Qué producto quieres encontrar?
			</h1>
			<SearchBar searchValue={searchFilter} setSearchValue={setSearchFilter} />
			<div className="w-full min-h-screen grid md:grid-cols-[200px_auto] gap-6">
				<FilterTagContainer
					categories={filteredProducts.categories}
					setTagFilter={setTagFilter}
					tagFilter={tagFilter}
				/>
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
