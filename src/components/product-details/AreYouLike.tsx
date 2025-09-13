import React from 'react'
import { Heading } from '../common/Heading'
import Loading from '../common/Loading'
import ProductCard from '../home/ProductCard'

const AreYouLike = ({ areYouLikes, heading, loading }: { areYouLikes: any[]; heading: string; loading: boolean }) => {

    return (
        <section className="container mx-auto px-6 py-10">
            <Heading title={heading || "NEW ARRIVALS"} />
            <div className="grid md:grid-cols-4 sm:grid-cols-6 col-12 gap-6">
                {loading ? (
                    <Loading />
                ) : areYouLikes ? (
                    areYouLikes?.map((item: any) => (
                        <ProductCard key={item.id} {...item} />
                    ))
                ) : (
                    <Loading message="No products found." />
                )}
            </div>
        </section>
    )
}

export default AreYouLike