import { ProductPreview } from '@/components/product-preview'
import { ProductList } from '@/types'
import products from '../assets/products.json'

export default function Home() {
	const productList = products as ProductList

	return (
		<div className="w-full min-h-screen md:grid md:grid-cols-[200px_auto] p-4 md:p-6">
			<p>filter</p>
			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-10">
				{productList.data.nodes.map((product) => (
					<ProductPreview key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
