import { useState } from 'react';
import { Formik, Form, Field } from 'formik'
import './header.css';
import './content.css';
import './article.css'

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos })
  return (
    <div>
      <header>
        <h1>Search all that you want it</h1>
      </header>
      <main>
      
        <Formik
        initialValues={{ search: '' }}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, 
          { headers: {
            'Authorization': 'Client-ID 7IBmidrBZg98d1e8u4nVLHAtxID9Vl_UyTWmPyqXFO4'
          }
          })
          const data = await response.json()

          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </main>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt=""/>
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)}
            
        </div>
      </div>
    </div>
  );
}

export default App;
