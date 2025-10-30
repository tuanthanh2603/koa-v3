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
            image: "/uploads/projects/villa-dong-nai-1/1.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/2.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/3.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/4.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/5.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/6.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/7.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/8.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/9.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/10.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/11.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/12.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/13.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-1/14.jpg"
          },
          {
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
        image: "/uploads/projects/villa-dong-nai-2/SHC/26.jpg",
        slug: "villa-dong-nai-2",
        images: [
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/23.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/24.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/25.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/26.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/New folder/29.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/New folder/29.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/New folder/33.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/New folder/34.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/SHC/New folder/35.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/1.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/2.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/3.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/5.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/6.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/7.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/8.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/9.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/11.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/12.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/13.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/14.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/15.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/16.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/17.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/18.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/19.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/20.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/21.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/22.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/23.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/24.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/25.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/26.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/khach bep/27.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/1.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/3.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/4.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/5.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/6.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/7.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/8.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/9.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/10.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/11.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/13.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/MASTER/14.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/2.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/3.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/4.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/5.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/6.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/29.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/NHA DONG NAI NEW/NHA DONG NAI NEW LOGO/31.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/P DOC SACH/15.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/P DOC SACH/16.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/P DOC SACH/17.jpg"
          },
          {
            image: "/uploads/projects/villa-dong-nai-2/P DOC SACH/18.jpg"
          },
          
        ],
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

