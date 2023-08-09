'use client'

import { FilterTag } from '@/components/filter-tag'
import { ProductPreview } from '@/components/product-preview'
import { ProductList } from '@/types'
import { getProductListCategoriesWithCount } from '@/utils'
import { ChangeEvent, useMemo, useState } from 'react'
import products from '../assets/products.json'

export default function Home() {
	const productList = products as ProductList
	const categories = getProductListCategoriesWithCount(productList)

	const [tagFilter, setTagFilter] = useState<string[]>([])

	const filteredProducts = useMemo(() => {
		const products = productList.data.nodes
		return tagFilter.length
			? products.filter((product) => tagFilter.includes(product.category.name))
			: products
	}, [tagFilter, productList])

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

	return (
		<div className="w-full min-h-screen grid md:grid-cols-[200px_auto] p-4 md:p-6 gap-6">
			<p className="text-2xl">Filtros</p>
			<p className="text-2xl">
				{filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
			</p>
			<div className="flex flex-col gap-4">
				{Object.keys(categories).map((category) => (
					<FilterTag
						key={category}
						category={category}
						count={categories[category]}
						onChange={handleSelectTag}
					/>
				))}
			</div>
			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-10">
				{filteredProducts.map((product) => (
					<ProductPreview key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
