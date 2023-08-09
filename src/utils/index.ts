import { ProductList } from '@/types'

type Categories = { [key: string]: number }

export const getProductListCategoriesWithCount = (productList: ProductList) => {
	const categories: Categories = {}

	for (const product of productList.data.nodes) {
		const category = product.category.name
		categories[category] ? (categories[category] += 1) : (categories[category] = 1)
	}

	return categories
}
