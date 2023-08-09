import { Product } from '@/types'

type Categories = { [key: string]: number }

export const getProductListCategoriesWithCount = (products: Product[]) => {
	const categories: Categories = {}

	for (const product of products) {
		const category = product.category.name
		categories[category] ? (categories[category] += 1) : (categories[category] = 1)
	}

	return categories
}
