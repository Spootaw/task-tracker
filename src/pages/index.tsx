import dynamic from 'next/dynamic'
import Head from 'next/head'

const ClientOnlyTodoList = dynamic(() => import('@/components/TodoList'), {
  ssr: false,
})

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Task Tracker</title>
      </Head>
      <ClientOnlyTodoList />
    </>
  )
}
