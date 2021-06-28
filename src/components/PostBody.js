import React from 'react'

export default function PostBody({ content }) {
    return (
        <section className="my-1 p-2">
            <p className="text-sm">{content}</p>
        </section>
    )
}
