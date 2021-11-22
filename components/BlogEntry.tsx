import formatDate from '@/lib/utils/formatDate'
import Tag from '@/components/Tag'
import Link from '@/components/Link'

const BlogEntry = ({frontMatter}) => {
  const { slug, date, title, summary, tags } = frontMatter
  return(
    <li className="py-12 px-4 rounded-md transition duration-500 ease-in-out hover:bg-gray-500 hover:bg-opacity-10">
    <article className="xl:grid xl:grid-cols-4 xl:items-baseline">
      <dl className="max-xl:mb-4">
        <dt className="sr-only">Published on</dt>
        <dd className="pr-2 text-base text-right font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date)}</time>
          <div className="flex flex-wrap justify-end">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
        </dd>
      </dl>
      <div className="xl:col-span-3">
        <div>
          <h3 className="text-2xl font-bold leading-8 tracking-tight">
            <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
              {title}
            </Link>
          </h3>
        </div>
        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
          {summary}
        </div>
      </div>
    </article>
  </li>
  )
}

export default BlogEntry