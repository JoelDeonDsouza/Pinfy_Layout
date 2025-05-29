/**
 * @author: Joel Deon Dsouza
 * @description: Example application using the Masonry component to display a grid of images with responsive columns, gaps, and animations. Demonstrates item click and load events.
 * @version: 1.0.0
 * @date: 2025-05-29
 */

import { Masonry } from "./components";
import type { MasonryItemData } from "./types";

const sampleImages: MasonryItemData[] = [
  {
    id: 1,
    src: "https://picsum.photos/800/1000?random=1",
    alt: "Random HD image 1",
  },
  {
    id: 2,
    src: "https://picsum.photos/800/1200?random=2",
    alt: "Random HD image 2",
  },
  {
    id: 3,
    src: "https://picsum.photos/800/800?random=3",
    alt: "Random HD image 3",
  },
  {
    id: 4,
    src: "https://picsum.photos/800/1100?random=4",
    alt: "Random HD image 4",
  },
  {
    id: 5,
    src: "https://picsum.photos/800/900?random=5",
    alt: "Random HD image 5",
  },
  {
    id: 6,
    src: "https://picsum.photos/800/950?random=6",
    alt: "Random HD image 6",
  },
  {
    id: 7,
    src: "https://picsum.photos/800/700?random=7",
    alt: "Random HD image 7",
  },
  {
    id: 8,
    src: "https://picsum.photos/800/1050?random=8",
    alt: "Random HD image 8",
  },
  {
    id: 9,
    src: "https://picsum.photos/800/980?random=9",
    alt: "Random HD image 9",
  },
  {
    id: 10,
    src: "https://picsum.photos/800/860?random=10",
    alt: "Random HD image 10",
  },
  {
    id: 11,
    src: "https://picsum.photos/800/960?random=11",
    alt: "Random HD image 11",
  },
  {
    id: 12,
    src: "https://picsum.photos/800/840?random=12",
    alt: "Random HD image 12",
  },
];

function App() {
  const handleItemClick = (item: MasonryItemData, index: number) => {
    console.log("Item clicked:", item, "at index:", index);
  };

  const handleItemLoad = (item: MasonryItemData, index: number) => {
    console.log("Item loaded:", item.id, "at index:", index);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Masonry
          items={sampleImages}
          columns={{
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            "2xl": 5,
          }}
          gap={20}
          className="masonry-wrapper"
          itemClassName="masonry-item-custom"
          transitionDuration={400}
          enableAnimation={true}
          onItemClick={handleItemClick}
          onItemLoad={handleItemLoad}
        />
      </div>
    </div>
  );
}

export default App;
