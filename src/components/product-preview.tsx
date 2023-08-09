import Image from 'next/image'

import { Product } from '@/types'

type ProductPreviewProps = {
	product: Product
}

export const ProductPreview = ({ product }: ProductPreviewProps) => {
	const image = product.images[0]

	return (
		<div className="flex flex-col gap-2 items-center">
			<Image src={image.asset.url} alt={image.alt} width={200} height={200} />
			<div className="flex flex-col gap-1">
				<p className="text-center font-semibold">{product.name}</p>
				<p className="text-center font-semibold">{product.shortDescription}</p>
			</div>
		</div>
	)
}
