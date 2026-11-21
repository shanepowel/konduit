import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const gallery = images?.filter((image) => Boolean(image?.url)) || []

  if (!gallery.length) {
    return (
      <div className="relative flex items-start">
        <div className="flex w-full flex-1 flex-col gap-y-4 small:mx-16">
          <Container className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface)]">
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <PlaceholderImage size={40} />
            </div>
          </Container>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-start">
      <div className="flex w-full flex-1 flex-col gap-y-4 small:mx-16">
        {gallery.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface)]"
              id={image.id}
            >
              <Image
                src={image.url}
                priority={index <= 2}
                className="absolute inset-0 object-cover object-center"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
