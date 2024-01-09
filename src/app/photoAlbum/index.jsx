
import {ImageList, ImageListItem} from "@mui/material";

import './index.scss'

const itemData = [
  {
    img: 'https://assest.sablogs.cn/imgs/blog/c7e7b7b78f316e8653598f7e8ff11f1.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/8485426d9f83760e55157b0414f580d.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/a051a1a56bcb082fb80d0b7469872da.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/1973f6f31ede499cd80c613f99871d0.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/673330b23fc4c4cfc6fe73bcc03060c.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/f8f4ba6bba40c7cf1cc3938d0d2b419.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/1580b1649eb7328eaba0540de9e6e72.jpg',
    title: ''
  },
  {
    img: 'https://assest.sablogs.cn/imgs/blog/b31f2441a7f6df24a4b8acc37b67826.jpg',
    title: ''
  }
]

const PhotoAlbum = () => {
  return <div className='photo-album'>
    <ImageList variant="masonry" cols={2} gap={10}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}`}
            src={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  </div>
}


export default PhotoAlbum
