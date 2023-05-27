import dynamic from 'next/dynamic';

const DynamicVideoComponent = dynamic(
  () => import('../components/VideoComponent'),
  { ssr: false }
)

export default function Home() {
  return (
    <div>
      <DynamicVideoComponent />
    </div>
  )
}
