import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Car } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'

type Props = {
  items: Car[]
}

const WithServerSideProps = ({ items }: Props) => {
  console.log(items)
  
  const restructuredCars: Car[] = []
  items.forEach((make) => {
    const families = make.families
    const familiesWithImagesFirst = []
    let hasAtleast1image = false
    families.forEach(family => {
      if(family.baseVariantImages.length) {
        familiesWithImagesFirst.unshift(family)
        hasAtleast1image = true
      }else{
        familiesWithImagesFirst.push(family)
      }
    });

    if(hasAtleast1image) {
      restructuredCars.push({...make, families: familiesWithImagesFirst})
    } 
  })
  console.log('restructured', restructuredCars)
  return (

    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Cars list</h1>
      <div className='page-info'>
        <p>Cars Make list with Families that has at least 1 image in its families with image first family order</p>
      </div>
      <div className='car-cards-container'>
        {restructuredCars.map((car, index) => (
          <div key={`make-${index}`} className='single-car-card'>
            <div className='make-title'>
              <h4>{car.title}</h4>
            </div>
            <div className='families-container'>
              {car.families.map((family, index) => (
                <div key={`family-${index}-${family.uuid}`} className='family-wrapper'>
                  <div className='family-details'>
                    <span><strong>Model: </strong>{family.title}</span>
                    <span><strong>Uuid: </strong>{family.uuid}</span>
                  </div>
                  <div className='family-img-wrapper'>
                    <img src={family.baseVariantImages[0]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // Example for including serverSide props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const items: Car[] = sampleUserData
  return { props: { items } }
}

export default WithServerSideProps
