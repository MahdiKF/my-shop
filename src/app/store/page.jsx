import Container from '@/components/Container'
import Pagination from '@/components/Pagination'
import ProductItem from '@/components/ProductItem'
import Search from '@/components/Search'
import Link from 'next/link'
import React from 'react'

async function Store({searchParams}) {
    
    const page = (await searchParams).page ?? "1"
    const per_page = (await searchParams).per_page ?? "5"
    const title = (await searchParams).title ?? ""
    const result = await fetch (`http://localhost:3004/products?_page=${page}&_per_page=${per_page}&title=${title} `);
    const data = await result.json();

  return (
    <Container>
        <h1 className="py-4">Store</h1>

        <Search />
        <div className="grid grid-cols-4 gap-4">
            {
                data.data.map((item) =>(
                
                    <Link key={item.id} href= {`/store/${item.id}`}>
                        <ProductItem  {...item}/>
                    </Link>
                ))
            }
            
        </div>

        <Pagination pageCount={data.pages || 0 } />
    </Container>
  )
}
export default Store
