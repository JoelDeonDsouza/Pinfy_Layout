# 🚀 Pinfy

A highly performant, responsive masonry layout component for React and React Native with TypeScript support. Features smooth animations, responsive breakpoints, lazy loading, and customizable rendering.

## Tech Stack

**Client:** React, Tailwind css, Typescript

## Install

```
npm i pinfy-layouts
```

## Host

```
https://www.npmjs.com/package/pinfy-layouts
```

## Screenshots

![App Screenshot](https://i.ibb.co/YFPPbyVc/pin.png)

### Features

- **Responsive Design** - Configurable breakpoints with mobile-first approach
- **High Performance** - Optimized calculations with debouncing and throttling
- **Smooth Animations** - Configurable transition animations
- **Cross-Platform** - Works with both React and React Native
- **Image Support** - Automatic image dimension detection and lazy loading
- **Customizable** - Custom rendering, styling, and event handling
- **TypeScript** - Full type safety and IntelliSense support
- **Accessible** - Built with accessibility best practices

### Quick Start

```
import React from 'react';
import { Masonry } from 'pinfy-layouts';

const items = [
  { id: 1, src: 'https://picsum.photos/800/1000?random=1', alt: 'Beautiful landscape' },
  { id: 2, src: 'https://picsum.photos/800/1200?random=2', alt: 'City skyline' },
];

function App() {
  return (
    <div className="container mx-auto p-4">
      <Masonry
        items={items}
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        gap={16}
        onItemClick={(item, index) => console.log('Clicked:', item)}
      />
    </div>
  );
}

export default App;
```

| Prop                 | Type                             | Default                               | Description                            |
| -------------------- | -------------------------------- | ------------------------------------- | -------------------------------------- |
| `items`              | `MasonryItemData[]`              | **required**                          | Array of items to display              |
| `columns`            | `number` \| `MasonryBreakpoints` | `{ sm:1, md:2, lg:3, xl:4, "2xl":5 }` | Number of columns or responsive config |
| `gap`                | `number`                         | `16`                                  | Gap between items in pixels            |
| `className`          | `string`                         | `undefined`                           | CSS class for container                |
| `itemClassName`      | `string`                         | `undefined`                           | CSS class for individual items         |
| `transitionDuration` | `number`                         | `300`                                 | Animation duration in milliseconds     |
| `enableAnimation`    | `boolean`                        | `true`                                | Enable/disable animations              |
| `loading`            | `boolean`                        | `false`                               | Show loading skeleton                  |
| `onItemClick`        | `(item, index) => void`          | `undefined`                           | Item click handler                     |
| `onItemLoad`         | `(item, index) => void`          | `undefined`                           | Item load handler                      |
| `renderItem`         | `(item, index) => ReactNode`     | `undefined`                           | Custom item renderer                   |

### MasonryItemData Interface

```
interface MasonryItemData {
  id: string | number;           // Unique identifier
  src?: string;                  // Image source URL
  alt?: string;                  // Image alt text
  width?: number;                // Item width (for aspect ratio)
  height?: number;               // Item height (for aspect ratio)
  content?: React.ReactNode;     // Custom content (non-image items)
  className?: string;            // Item-specific CSS class
}
```

### Usage Examples

```
import { Masonry } from 'pinfy-layouts';

const ImageGallery = () => {
  const images = [
    { id: 1, src: '/image1.jpg', alt: 'Image 1' },
    { id: 2, src: '/image2.jpg', alt: 'Image 2' },
    { id: 3, src: '/image3.jpg', alt: 'Image 3' },
  ];

  return <Masonry items={images} columns={3} gap={20} className="my-gallery" />;
};

```

### Responsive Layout

```
const ResponsiveGallery = () => (
  <Masonry
    items={items}
    columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
    gap={16}
  />
);

```

### Custom Content Rendering

```
const CustomMasonry = () => {
  const posts = [
    { id: 1, title: 'Blog Post 1', content: 'Lorem ipsum...', author: 'John Doe' }
  ];

  return (
    <Masonry
      items={posts}
      columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
      renderItem={(item) => (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">{item.title}</h3>
          <p className="text-gray-600 mt-2">{item.content}</p>
          <p className="text-sm text-gray-400 mt-4">By {item.author}</p>
        </div>
      )}
    />
  );
};

```

### Mixed Content (Images + Cards)

```
const MixedContent = () => {
  const items = [
    { id: 1, src: '/image1.jpg', alt: 'Photo' },
    {
      id: 2,
      content: (
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3>Text Card</h3>
          <p>This is a text-only card in the masonry layout.</p>
        </div>
      ),
      height: 200
    }
  ];

  return <Masonry items={items} columns={{ md: 2, lg: 3 }} gap={20} />;
};

```

### Event Handlers

```
const InteractiveGallery = () => {
  const handleItemClick = (item) => {
    console.log('Item clicked:', item.id);
  };

  const handleItemLoad = (item) => {
    console.log('Item loaded:', item.id);
  };

  return (
    <Masonry
      items={items}
      columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
      onItemClick={handleItemClick}
      onItemLoad={handleItemLoad}
      transitionDuration={400}
    />
  );
};

```

### Custom Styling Example

```
.my-masonry {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
}

.my-masonry-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.my-masonry-item:hover {
  transform: translateY(-4px);
}

```

## Run Locally

Clone the project

```bash
  git clone https://github.com/JoelDeonDsouza/Pinfy_Layout.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Test cases

**Tech used:** React, @testing-library/react, @testing-library/jest-dom.

To run tests, run the following command

```bash
   npm run test
```
