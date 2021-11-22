import { AuthorFrontMatter } from "types/AuthorFrontMatter"
import Image from '@/components/Image'

interface Props{
  frontMatter: AuthorFrontMatter
}

const Intro = ({frontMatter}: Props) => {
  const { name } = frontMatter
  console.log("frontMatter", frontMatter)
  return(
    <div className="py-8 flex flex-col items-center">
      <p className="text-2xl mb-4 md:text-3xl font-bold">Olá, o meu nome é</p>
      <div className="flex flex-row items-center">
        <h1 className="mb-4 text-3xl md:text-6xl font-extrabold">{name}</h1>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold">e sou Web Developer {`</>`}</h2>
    </div>
  )
}

export default Intro