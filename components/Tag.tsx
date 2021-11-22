import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="text-xs rounded-xl py-1 px-2 font-bold text-gray-500 hover:bg-primary-500 hover:text-white">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
