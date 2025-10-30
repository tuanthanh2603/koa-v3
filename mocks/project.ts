import type { Category, Project } from '~/types/project'

export const categories: Category[] = [
  {
    id: 1,
    name: "Nhà phố",
    projects: [
      
    ],
    name_vn: 'Nhà phố',
    name_en: 'Townhouse'
  },
  {
    id: 2,
    name: "Villa",
    projects: [
      {
        id: 21,
        name_vn: "Villa Đồng Nai 1",
        name_en: "Villa Dong Nai 1",
        description_vn: "Không gian xanh, hài hòa thiên nhiên với hồ cá koi.",
        description_en: "Green space, harmonious with nature with koi pond.",
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
        name_vn: "Villa Đồng Nai 2",
        name_en: "Villa Dong Nai 2",
        description_vn: "Tân cổ điển kết hợp hiện đại, nội thất cao cấp.",
        description_en: "Classic meets modern, high-end interior.",
        image: "https://via.placeholder.com/600x600?text=Villa+District+2",
        slug: "villa-dong-nai-2",
      },
    ],
    name_vn: 'Villa',
    name_en: 'Villa'
  },
  {
    id: 3,
    name: "Căn hộ",
    projects: [
      
    ],
    name_vn: 'Căn hộ',
    name_en: 'Apartment'
  },
  {
    id: 4,
    name: "F&B",
    projects: [
      
    ],
    name_vn: 'F&B',
    name_en: 'F&B'
  },
  {
    id: 5,
    name: "Khác",
    projects: [
      
    ],
    name_vn: 'Khác',
    name_en: 'Other'
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

