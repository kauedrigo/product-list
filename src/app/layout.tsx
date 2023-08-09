import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Lista de produtos',
	description: 'Encontre o seu produto favorito',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt">
			<body className={`${inter.className} text-gray-800 bg-zinc-50 text-sm md:text-base`}>
				{children}
			</body>
		</html>
	)
}
