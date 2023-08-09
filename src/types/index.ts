export type ProductList = {
	data: {
		nodes: Product[]
	}
}

export type Product = {
	name: string
	shortDescription: string
	id: string
	images: Image[]
	category: {
		_id: string
		name: string
	}
}

type Image = {
	alt: string
	asset: { url: string }
}
