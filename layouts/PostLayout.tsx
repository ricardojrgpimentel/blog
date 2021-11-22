import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import { ReactNode } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface Props {
  frontMatter: PostFrontMatter
  authorDetails: AuthorFrontMatter[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
}

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }: Props) {
  const { slug, fileName, date, title, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <article>
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="pb-8">
            <div className="xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">{children}</div>
              <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                {(next || prev) && (
                  <div className="grid grid-cols-1 py-2 xl:grid-cols-2">
                    {prev && (
                      <Link href={`/blog/${prev.slug}`} className="p-5 xl:mr-1 mb-1 xl:mb-0 rounded-md transition duration-500 ease-in-out bg-gray-500 bg-opacity-5 hover:bg-opacity-20">
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Publicação Anterior
                        </h2>
                        <div className="text-2xl text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <p>{prev.title}</p>
                        </div>
                      </Link>
                    )}
                    {next && (
                      <Link href={`/blog/${next.slug}`} className="p-5 rounded-md transition duration-500 ease-in-out bg-gray-500 bg-opacity-5 hover:bg-opacity-20 text-right">
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Publicação SEguinte
                        </h2>
                        <div className="text-2xl text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <p>{next.title}</p>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Lista de publicações
                </Link>
              </div>
              {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs mb-2 tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
            </footer>
          </div>
      </article>
    </SectionContainer>
  )
}
