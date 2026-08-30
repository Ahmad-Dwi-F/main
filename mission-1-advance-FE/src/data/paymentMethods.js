import BCA from "../assets/BCA.png";
import BNI from "../assets/BNI.png";
import BRI from "../assets/BRI.png";
import MANDIRI from "../assets/MANDIRI.png";
import DANA from "../assets/DANA.png";
import OVO from "../assets/OVO.png";
import LINKAJA from "../assets/LINK-AJA.png";
import SHOPEE from "../assets/SHOPEE.png";
import MASTERCARD from "../assets/MASTERCARD.png";
import VISA from "../assets/VISA.png";
import JCB from "../assets/JCB.png";

function bankInstructions(bankName) {
  return [
    {
      id: "atm",
      title: `ATM ${bankName}`,
      steps: [
        `Masukkan kartu ATM dan PIN ${bankName} Anda`,
        `Di menu utama, pilih "Transaksi Lainnya", pilih "Transfer", pilih "Ke ${bankName} Virtual Account"`,
        "Masukkan nomor Virtual Account",
        'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
        "Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih 'Ya', atau pilih 'Tidak' jika data di layar masih salah",
        "Transaksi Anda sudah selesai. Pilih 'Tidak' untuk tidak melanjutkan transaksi lain",
      ],
    },
    {
      id: "mobile",
      title: `Mobile Banking ${bankName}`,
      steps: [
        `Buka aplikasi ${bankName} mobile`,
        'Pilih "m-BCA", kemudian pilih "m-Transfer"',
        'Pilih "BCA Virtual Account"',
        'Masukkan nomor Virtual Account, lalu pilih "OK"',
        'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
        'Klik "OK" untuk melanjutkan pembayaran',
        "Masukkan PIN Anda untuk meng-otorisasi transaksi",
        "Transaksi Anda telah selesai",
      ],
    },
    {
      id: "internet",
      title: `Internet Banking ${bankName}`,
      steps: [
        `Login ke KlikBCA Individual `,
        'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
        "Masukkan nomor Virtual Account",
        'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
        'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
        "Pembayaran telah selesai",
      ],
    },
  ];
}

function ewalletInstructions(walletName) {
  return [
    {
      id: "app",
      title: `Aplikasi ${walletName}`,
      steps: [
        `Buka aplikasi ${walletName} di ponsel Anda`,
        "Pilih menu Scan QR / Bayar",
        "Arahkan kamera ke kode QR yang tertera di halaman ini",
        "Periksa nominal pembayaran, lalu konfirmasi dengan PIN",
        "Pembayaran selesai",
      ],
    },
  ];
}

export const paymentGroups = [
  {
    id: "transfer-bank",
    title: "Transfer Bank",
    options: [
      {
        id: "bca",
        label: "Bank BCA",
        image: BCA,
        type: "bank",
        vaNumber: "11739081234567890",
        vaDisplay: "11739 081234567890",
        instructions: bankInstructions("BCA"),
      },
      {
        id: "bni",
        label: "Bank BNI",
        image: BNI,
        type: "bank",
        vaNumber: "8808081234567890",
        vaDisplay: "8808 081234567890",
        instructions: bankInstructions("BNI"),
      },
      {
        id: "bri",
        label: "Bank BRI",
        image: BRI,
        type: "bank",
        vaNumber: "26215081234567890",
        vaDisplay: "26215 081234567890",
        instructions: bankInstructions("BRI"),
      },
      {
        id: "mandiri",
        label: "Bank Mandiri",
        image: MANDIRI,
        type: "bank",
        vaNumber: "88908081234567890",
        vaDisplay: "88908 081234567890",
        instructions: bankInstructions("Mandiri"),
      },
    ],
  },

  {
    id: "e-wallet",
    title: "E-Wallet",
    options: [
      {
        id: "dana",
        label: "Dana",
        image: DANA,
        type: "ewallet",
        instructions: ewalletInstructions("Dana"),
      },
      {
        id: "ovo",
        label: "OVO",
        image: OVO,
        type: "ewallet",
        instructions: ewalletInstructions("OVO"),
      },
      {
        id: "linkaja",
        label: "LinkAja",
        image: LINKAJA,
        type: "ewallet",
        instructions: ewalletInstructions("LinkAja"),
      },
      {
        id: "shopeepay",
        label: "Shopee Pay",
        image: SHOPEE,
        type: "ewallet",
        instructions: ewalletInstructions("Shopee Pay"),
      },
    ],
  },
  {
    id: "kartu",
    title: "Kartu Kredit/Debit",
    options: [
      {
        id: "kartu",
        type: "card",
        logos: [
          { label: "Mastercard", image: MASTERCARD },
          { label: "Visa", image: VISA },
          { label: "JCB", image: JCB },
        ],
      },
    ],
  },
];

export function findPaymentMethod(methodId) {
  for (const group of paymentGroups) {
    const found = group.options.find((option) => option.id === methodId);
    if (found) return found;
  }
  return null;
}
