import React, { useEffect, useState } from 'react'
import { Card, CardBody, Container, Form } from 'react-bootstrap'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
function Home() {
    const[images, setimages]= useState([]);
    const[InputValue, setInputvalue]= useState("");
    const[SearchTerm, setSearchTerm]= useState("nature");
    const handleinputchange=(event)=>{
   setInputvalue(event.target.value);
    };
    const handlekeypres=(event)=>{
        if (event.key==='Enter') {
            // api call
            setSearchTerm(InputValue);
        }
    }
    useEffect(()=>{
        // API
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=96b3b6a795a6ddbd5ebc40365d350483&tags=${SearchTerm}&per_page=50&format=json&nojsoncallback=1`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            const photos=data.photos.photo;
            const fetchedimages= photos.map((photo)=>({
                original:  `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg` ,
                thumbnail:  `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`  ,
                description: photo.title,
            }));
            setimages(fetchedimages);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[SearchTerm]);
  return (
    <div>
        <Container>
        <Card className='mt-3'>
            <Card.Header className='text-secondary'>Heading</Card.Header>
            <CardBody>
                <Form.Control type="text" className='text-center' placeholder='Search some images...'value={InputValue} onChange={handleinputchange} onKeyDown={handlekeypres}/>
                <h6 className='text-center'>Pics of {SearchTerm}</h6>
                <ImageGallery items={images} />
            </CardBody>
        </Card>
        </Container>
    </div>
  )
}

export default Home