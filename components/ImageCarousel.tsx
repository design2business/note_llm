import { useRef, useEffect } from 'react';
import Image from 'next/image';

const LIFESTYLE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    title: '精品咖啡',
    description: '品味生活的醇香时光',
    alt: '一杯精致的拿铁咖啡，顶部有精美的拉花艺术'
  },
  {
    url: 'https://images.unsplash.com/photo-1487070183336-b863922373d4',
    title: '花艺生活',
    description: '自然与艺术的邂逅',
    alt: '优雅的花艺装饰，粉色和白色玫瑰搭配绿叶'
  },
  {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    title: '宠物猫咪',
    description: '温暖治愈的毛绒陪伴',
    alt: '一只优雅的猫咪在阳光下休息'
  },
  {
    url: 'https://images.unsplash.com/photo-1526359395878-56f9a884bd45',
    title: '潜水探索',
    description: '探索海洋的奥秘',
    alt: '潜水者在蓝色海水中游动，周围是丰富的海洋生物'
  },
  {
    url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee',
    title: '热气球之旅',
    description: '触摸云端的梦想',
    alt: '五彩斑斓的热气球漂浮在晨光中的天空'
  },
  {
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8',
    title: '日本美食',
    description: '舌尖上的和风味道',
    alt: '精致的日式料理拼盘'
  },
  {
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
    title: '恋人时光',
    description: '浪漫温馨的爱情故事',
    alt: '一对恋人在夕阳下漫步'
  },
  {
    url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    title: '自行车运动',
    description: '城市探索新方式',
    alt: '一辆复古自行车停在阳光明媚的街道上'
  },
  {
    url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8',
    title: '马拉松',
    description: '突破自我的挑战',
    alt: '跑步者在日出时分奔跑在城市道路上'
  },
  {
    url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    title: '旅行探索',
    description: '发现世界的美',
    alt: '壮丽的自然风景，远处是连绵的山脉和湖泊'
  }
];

export function ImageCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = setInterval(() => {
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;
      if (isAtEnd) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50/50 via-green-50/50 to-yellow-50/50 mt-20">
      <div className="w-full max-w-[2000px] mx-auto py-6 sm:py-8">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 sm:space-x-6 px-4 sm:px-6 lg:px-8 pb-6 hide-scrollbar"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {LIFESTYLE_IMAGES.map((image, index) => (
            <div
              key={index}
              className="flex-none w-[280px] sm:w-[320px] relative rounded-xl overflow-hidden shadow-lg"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="aspect-[3/4] relative group">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 280px, 320px"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{image.title}</h3>
                  <p className="text-xs sm:text-sm opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 