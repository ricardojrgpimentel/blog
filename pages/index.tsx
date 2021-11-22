import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'
import Intro from '@/components/intro'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const MAX_DISPLAY = 3

//@ts-ignore
export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[], authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter } }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', ['default'])

  return { props: { posts, authorDetails } }
}

export default function Home({ posts, authorDetails }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { frontMatter } = authorDetails
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Intro frontMatter={frontMatter}/>
      <div>
          <h1 className="text-2xl xl:text-3xl mb-4 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:leading-14">
            Últimas publicações
          </h1>
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-2">
                <article className="flex justify-between">
                <h2 className="text-2xl font-semibold leading-8 tracking-tight">
                  <Link
                    href={`/blog/${slug}`}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="pr-2 text-base text-right font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-start text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            Todas as publicações &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
