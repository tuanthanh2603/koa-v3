import type { Category, Project } from '~/types/project'

export const categories: Category[] = [
  {
    id: 1,
    name: "Nhà phố",
    projects: [
      {
        id: 1,
        name: "Căn Hộ Vinhomes Central Park",
        description: "Thiết kế sang trọng, tông màu trắng và gỗ sồi tự nhiên.",
        image: "/uploads/projects/im1.jpg",
        tag: "Sang Trọng",
        slug: "can-ho-vinhomes-central-park"
      },
      {
        id: 2,
        name: "Căn Hộ Sunrise City",
        description: "Phong cách tối giản, tối ưu ánh sáng tự nhiên.",
        image: "/uploads/projects/im1.jpg",
        tag: "Tối Giản",
        slug: "can-ho-sunrise-city"
      },
      {
        id: 3,
        name: "LONG ANH LUXURY CAR SHOWROOM",
        description: "Thiết kế độc quyền, mang màu sắc của các siêu xe đến từ KOA gửi đến cho khách hàng. Showroom được KOA thiết kế dựa trên màu sắc và đẳng cấp của các loại xe được trưng bày tại đây. Dùng các gam màu đặc sắc của Porsche để làm điểm nhấn là điều mà KOA muốn mang đến để nâng tầm trải nghiệm sản phẩm tại showroom.",
        image: "/uploads/projects/im2.jpg",
        slug: "long-anh-luxury-car-showroom",
        tag: "Tối Giản",
        images: [
          {
            id: 1,
            image: "/uploads/projects/im1.jpg"
          },
          {
            id: 2,
            image: "/uploads/projects/im2.jpg"
          }
        ],
      },
      {
        id: 4,
        name: "Căn Hộ Vinhomes Central Park",
        description: "Thiết kế sang trọng, tông màu trắng và gỗ sồi tự nhiên.",
        image: "/uploads/projects/im1.jpg",
        slug: "can-ho-vinhomes-central-park-2",
        images: [
          {
            id: 1,
            image: "/uploads/projects/im1.jpg"
          },
          {
            id: 2,
            image: "/uploads/projects/im2.jpg"
          }
        ],
      },
      {
        id: 5,
        name: "Căn Hộ Sunrise City",
        description: "Phong cách tối giản, tối ưu ánh sáng tự nhiên.",
        image: "/uploads/projects/im1.jpg",
        tag: "Tối Giản",
        slug: "can-ho-sunrise-city-2"
      },
      {
        id: 6,
        name: "LONG ANH LUXURY CAR SHOWROOM",
        description: "Thiết kế độc quyền, mang màu sắc của các siêu xe đến từ KOA gửi đến cho khách hàng. Showroom được KOA thiết kế dựa trên màu sắc và đẳng cấp của các loại xe được trưng bày tại đây. Dùng các gam màu đặc sắc của Porsche để làm điểm nhấn là điều mà KOA muốn mang đến để nâng tầm trải nghiệm sản phẩm tại showroom.",
        image: "/uploads/projects/im2.jpg",
        slug: "long-anh-luxury-car-showroom-2",
        tag: "Tối Giản"
      },
    ],
    name_vn: '',
    name_en: ''
  },
  {
    id: 2,
    name: "Villa",
    projects: [
      {
        id: 21,
        name: "Villa Đồng Nai 1",
        description: "Không gian xanh, hài hòa thiên nhiên với hồ cá koi.",
        image: "/uploads/projects/villa-dong-nai-1/1.jpg",
        slug: "villa-dong-nai-1",
        images: [
          {
            id: 211,
            image: "/uploads/projects/villa-dong-nai-1/1.jpg"
          },
          {
            id: 212,
            image: "/uploads/projects/villa-dong-nai-1/2.jpg"
          },
          {
            id: 213,
            image: "/uploads/projects/villa-dong-nai-1/3.jpg"
          },
          {
            id: 214,
            image: "/uploads/projects/villa-dong-nai-1/4.jpg"
          },
          {
            id: 215,
            image: "/uploads/projects/villa-dong-nai-1/5.jpg"
          },
          {
            id: 216,
            image: "/uploads/projects/villa-dong-nai-1/6.jpg"
          },
          {
            id: 217,
            image: "/uploads/projects/villa-dong-nai-1/7.jpg"
          },
          {
            id: 218,
            image: "/uploads/projects/villa-dong-nai-1/8.jpg"
          },
          {
            id: 219,
            image: "/uploads/projects/villa-dong-nai-1/9.jpg"
          },
          {
            id: 2110,
            image: "/uploads/projects/villa-dong-nai-1/10.jpg"
          },
          {
            id: 2111,
            image: "/uploads/projects/villa-dong-nai-1/11.jpg"
          },
          {
            id: 2112,
            image: "/uploads/projects/villa-dong-nai-1/12.jpg"
          },
          {
            id: 2113,
            image: "/uploads/projects/villa-dong-nai-1/13.jpg"
          },
          {
            id: 2114,
            image: "/uploads/projects/villa-dong-nai-1/14.jpg"
          },
          {
            id: 2115,
            image: "/uploads/projects/villa-dong-nai-1/15.jpg"
          },
        ],
      },
      {
        id: 22,
        name: "Villa Đồng Nai 2",
        description: "Tân cổ điển kết hợp hiện đại, nội thất cao cấp.",
        image: "https://via.placeholder.com/600x600?text=Villa+District+2",
        tag: "Cổ Điển",
        slug: "biet-thu-quan-2"
      },
    ],
    name_vn: '',
    name_en: ''
  },
  {
    id: 3,
    name: "Căn hộ",
    projects: [
      {
        id: 5,
        name: "Văn Phòng Startup Quận 1",
        description: "Không gian mở, năng động, phong cách sáng tạo.",
        image: "https://via.placeholder.com/600x600?text=Office+Startup",
        tag: "Sáng Tạo",
        slug: "van-phong-startup-quan-1"
      },
    ],
    name_vn: '',
    name_en: ''
  },
  {
    id: 4,
    name: "F&B",
    projects: [
      {
        id: 5,
        name: "Văn Phòng Startup Quận 1",
        description: "Không gian mở, năng động, phong cách sáng tạo.",
        image: "https://via.placeholder.com/600x600?text=Office+Startup",
        tag: "Sáng Tạo",
        slug: "van-phong-startup-quan-1"
      },
    ],
    name_vn: '',
    name_en: ''
  },
  {
    id: 5,
    name: "Khác",
    projects: [
      {
        id: 5,
        name: "Văn Phòng Startup Quận 1",
        description: "Không gian mở, năng động, phong cách sáng tạo.",
        image: "https://via.placeholder.com/600x600?text=Office+Startup",
        tag: "Sáng Tạo",
        slug: "van-phong-startup-quan-1"
      },
    ],
    name_vn: '',
    name_en: ''
  },
]

// Helper function to find project by slug
export function getProjectBySlug(slug: string): Project | null {
  for (const category of categories) {
    const project = category.projects.find(p => p.slug === slug)
    if (project) return project
  }
  return null
}

