import { ProductList } from '@/types'
import products from '../assets/products.json'
import { ProductPreview } from '@/components/product-preview'

export default function Home() {
	const productList = products as ProductList

	return (
		<main className="min-h-screen">
			{productList.data.nodes.map((product) => (
				<ProductPreview key={product.id} product={product} />
			))}
		</main>
	)
}
