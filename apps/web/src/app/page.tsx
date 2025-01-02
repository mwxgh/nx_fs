import { ButtonAlert } from '@libs/share-ui'

const Home = () => (
  <div>
    <ButtonAlert appName="web" className="bg-blue-600 p-6">
      Open alert web
    </ButtonAlert>
    <div className="bg-red-700 p-8">
      <h1>Web</h1>
    </div>
  </div>
)

export default Home
