import { notFound } from 'next/navigation'

type Post = {
  title: string
  content: string
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://api.vercel.app/blog/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </article>
  )
}
