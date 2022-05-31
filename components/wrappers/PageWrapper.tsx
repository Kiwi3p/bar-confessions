import { ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  bgClass?: string
}

const PageWrapper: React.VFC<IProps> = ({children, bgClass}) => {
  
  return (
    <main className={`main ${bgClass}`}>
      <div className="">
        {children}    
      </div>
    </main>
  )
}

export default PageWrapper