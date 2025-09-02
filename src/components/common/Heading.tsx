import React from 'react'

export const Heading = ({ title }: { title: string }) => {
    return (
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">{title}</h2>
    )
}
