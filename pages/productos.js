import { PageSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import siteMetadata from '@/data/siteMetadata'

export default function Productos({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Productos"
      />
    </>
  )
}
