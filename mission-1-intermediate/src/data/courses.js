import cc1 from "../assets/cc-1.jpg";
import cc2 from "../assets/cc-2.jpg";
import cc3 from "../assets/cc-3.jpg";
import cc4 from "../assets/cc-4.jpg";
import cc5 from "../assets/cc-5.jpg";
import cc6 from "../assets/cc-6.jpg";
import cc7 from "../assets/cc-7.jpg";
import cc8 from "../assets/cc-8.jpg";
import cc9 from "../assets/cc-9.jpg";
import pp1 from "../assets/pp-1.png";
import pp2 from "../assets/pp-2.png";
import pp3 from "../assets/pp-3.png";
import pp4 from "../assets/pp-4.png";
import pp5 from "../assets/pp-5.png";
import pp6 from "../assets/pp-6.png";
import pp7 from "../assets/pp-7.png";
import pp8 from "../assets/pp-8.png";
import pp9 from "../assets/pp-9.png";

export const courses = [
  {
    id: "course-1",
    image: cc1,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp1,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 700000,
    originalPrice: 700000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-2",
    image: cc2,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp2,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 300000,
    originalPrice: 500000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-3",
    image: cc3,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp3,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 500000,
    originalPrice: 500000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-4",
    image: cc4,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp4,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 600000,
    originalPrice: 600000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-5",
    image: cc5,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp5,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 250000,
    originalPrice: 600000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-6",
    image: cc6,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp6,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 550000,
    originalPrice: 550000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-7",
    image: cc7,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp7,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 300000,
    originalPrice: 650000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-8",
    image: cc8,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp8,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 800000,
    originalPrice: 800000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
  {
    id: "course-9",
    image: cc9,
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: {
      name: "Jenna Ortega",
      role: "Senior Accountant di Gojek",
      avatar: pp9,
    },
    rating: 3.5,
    reviewCount: 86,
    price: 900000,
    originalPrice: 900000,
    offerText: "Penawaran spesial tersisa 2 hari lagi!",
    includes: [
      { icon: "exam", label: "Ujian Akhir" },
      { icon: "video", label: "49 Video" },
      { icon: "doc", label: "7 Dokumen" },
      { icon: "certificate", label: "Sertifikat" },
      { icon: "pretest", label: "Pretest" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem dignissim mattis tristique elementum. Sit consequat turpis orci vel. Diam aenean mattis hac vitae, orci sed pretium pretium. Sit ut cursus adipiscing vestibulum, ac nibh. Viverra quis at quis suscipit. Fermentum duis duis porttitor amet diam sed ultrices condimentum dolor. Imperdiet dictum sapien porta faucibus viverra cum massa nec. Eget risus turpis viverra massa ullamcorper.",
    tutors: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Senior Talent Acquisition di WingsGroup",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
      },
    ],
    language: "Bahasa Indonesia",
    curriculum: [
      {
        id: "curr-1",
        title: "Introduction to HR",
        items: [
          {
            title: "Pre-test Introduction",
            duration: "5 Menit",
            type: "pre-test",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-2",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-3",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
        ],
      },
      {
        id: "curr-4",
        title: "Introduction to HR",
        items: [
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Video: Introduction to HR",
            duration: "12 Menit",
            type: "video",
          },
          {
            title: "Rangkuman Introduction",
            duration: "3 Menit",
            type: "rangkuman",
          },
          {
            title: "Quiz Introduction",
            duration: "10 Menit",
            type: "quiz",
          },
        ],
      },
    ],
    reviews: [
      {
        avatar: pp1,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 2",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
      {
        avatar: pp2,
        name: "Gregorius Edrik Lawanto",
        subtitle: "Alumni Batch 4",
        text: "Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.",
        rating: 3.5,
      },
    ],
  },
];
