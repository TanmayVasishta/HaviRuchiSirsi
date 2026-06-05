export const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;

export const DAYS_KN = [
  "ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ",
] as const;

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type MealType = "breakfast" | "lunch" | "dinner";

export interface MenuItem {
  kn: string;
  en: string;
  qty?: string;
}

export const WHATSAPP_NUMBER = "919980864037";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappOrder(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export function getTodayIndex(): DayIndex {
  return new Date().getDay() as DayIndex;
}

export const MENU: Record<MealType, MenuItem[][]> = {
  breakfast: [
    // Sunday
    [
      { kn: "ಉತ್ತಪ್ಪ", en: "Uttappa", qty: "2" },
      { kn: "ಅಕ್ಕಿ ಶಾವಿಗೆ", en: "Akki Shavige" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
      { kn: "ಬಾಳೆಹಣ್ಣು ಪಾಯಸ", en: "Banana Payasa" },
    ],
    // Monday
    [
      { kn: "ಸೆಟ್ ದೋಸೆ", en: "Set Dose", qty: "3" },
      { kn: "ಉಪ್ಪಿಟ್ಟು", en: "Uppittu" },
      { kn: "ಆಲೂ ಪಲ್ಯ", en: "Aloo Palya" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
    ],
    // Tuesday
    [
      { kn: "ನೀರು ದೋಸೆ", en: "Neeru Dose", qty: "4" },
      { kn: "ಶಾವಿಗೆ ಉಪ್ಪಿಟ್ಟು", en: "Shavige Uppittu" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
      { kn: "ಕಾಯಿ ಬೆಲ್ಲ", en: "Kayi Bella" },
    ],
    // Wednesday
    [
      { kn: "ಸೆಟ್ ದೋಸೆ / ಅಪ್ಪಂ", en: "Set Dose / Appam", qty: "3" },
      { kn: "ಶಿರಾ", en: "Shira" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
    ],
    // Thursday
    [
      { kn: "ಇಡ್ಲಿ", en: "Idli", qty: "3" },
      { kn: "ವಡೆ", en: "Vada", qty: "2" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
    ],
    // Friday
    [
      { kn: "ಅವಲಕ್ಕಿ", en: "Avalakki" },
      { kn: "ರವಾ / ಸಾಬೂದಾನ ಉಪ್ಪಿಟ್ಟು", en: "Rava / Sabudana Uppittu" },
      { kn: "ಮೊಸರು", en: "Mosaru (Curd)" },
    ],
    // Saturday
    [
      { kn: "ಪೂರಿ / ಬನ್ಸ್", en: "Puri / Buns", qty: "2" },
      { kn: "ಸೆಟ್ ದೋಸೆ", en: "Set Dose", qty: "2" },
      { kn: "ಬಾಜಿ", en: "Baji" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
    ],
  ],
  lunch: [
    // Sunday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ತಂಬುಳಿ", en: "Tambuli" },
      { kn: "ಪಲ್ಯ", en: "Palya" },
      { kn: "ಚಟ್ನಿ / ಕಾಯಿರಸ", en: "Chutney / Kayirasa" },
      { kn: "ಅಪ್ಪೆಹುಳಿ", en: "Appehuli" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಚಪಾತಿ", en: "Chapati", qty: "2" },
      { kn: "ಹಪ್ಪಳ", en: "Happala" },
    ],
    // Monday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ಹಶಿ", en: "Hashi" },
      { kn: "ಅಪ್ಪೆಹುಳಿ", en: "Appehuli" },
      { kn: "ಪಲ್ಯ", en: "Palya" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಜೋಳ ರೊಟ್ಟಿ", en: "Jola Rotti", qty: "2" },
      { kn: "ಹಪ್ಪಳ", en: "Happala" },
    ],
    // Tuesday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ತೊವೆ", en: "Tove (Dal)" },
      { kn: "ರಸಂ", en: "Rasam" },
      { kn: "ತಂಬುಳಿ", en: "Tambuli" },
      { kn: "ಪಲ್ಯ", en: "Palya" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಚಪಾತಿ", en: "Chapati", qty: "2" },
      { kn: "ಸಿಹಿ", en: "Local Sweet" },
      { kn: "ಹಪ್ಪಳ", en: "Happala" },
    ],
    // Wednesday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ಸಾಸಿವೆ", en: "Sasive" },
      { kn: "ಅಪ್ಪೆಹುಳಿ", en: "Appehuli" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಜೋಳ ರೊಟ್ಟಿ", en: "Jola Rotti", qty: "2" },
      { kn: "ಚಟ್ನಿ / ಪಲ್ಯ", en: "Chutney / Palya" },
      { kn: "ಹಪ್ಪಳ / ಭಜ್ಜಿ", en: "Happala / Bhajji" },
    ],
    // Thursday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಪಾಲಾದ್ಯ", en: "Paladya" },
      { kn: "ದಾಲ್ ಸಾಂಬಾರ್", en: "Dal Sambar" },
      { kn: "ಅಪ್ಪೆಹುಳಿ", en: "Appehuli" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಚಪಾತಿ", en: "Chapati", qty: "2" },
      { kn: "ಕಾಳಿನ ಭಾಜಿ", en: "Kalin Bhaji" },
      { kn: "ಹಪ್ಪಳ", en: "Happala" },
    ],
    // Friday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ತಂಬುಳಿ", en: "Tambuli" },
      { kn: "ಚಟ್ನಿ", en: "Chutney" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಕೋಸಂಬರಿ", en: "Kosambar" },
      { kn: "ಜೋಳ ರೊಟ್ಟಿ", en: "Jola Rotti", qty: "2" },
      { kn: "ಪಲ್ಯ", en: "Palya" },
      { kn: "ಹಪ್ಪಳ", en: "Happala" },
    ],
    // Saturday
    [
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ಹಶಿ", en: "Hashi" },
      { kn: "ಪಲ್ಯ", en: "Palya" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಸಲಾಡ್", en: "Salad" },
      { kn: "ಅಕ್ಕಿ / ಜೋಳ ರೊಟ್ಟಿ", en: "Akki / Jola Rotti", qty: "2" },
      { kn: "ಹಪ್ಪಳ / ಭಜ್ಜಿ", en: "Happala / Bhajji" },
    ],
  ],
  dinner: [
    // Sunday
    [
      { kn: "ಚಪಾತಿ", en: "Chapati", qty: "2" },
      { kn: "ಬಾಜಿ / ಪಲ್ಯ", en: "Baji / Palya" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಹಿಂಗ್ ದಾಲ್", en: "Hing Dal" },
      { kn: "ಹಶಿ", en: "Hashi" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
    ],
    // Monday
    [
      { kn: "ಜೋಳ ರೊಟ್ಟಿ", en: "Jola Rotti", qty: "2" },
      { kn: "ಬಾಜಿ", en: "Baji" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ರಸಂ", en: "Rasam" },
      { kn: "ಪಾಲಾದ್ಯ", en: "Paladya" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
    ],
    // Tuesday
    [
      { kn: "ಅಕ್ಕಿ ರೊಟ್ಟಿ", en: "Akki Rotti", qty: "2" },
      { kn: "ಈರುಳ್ಳಿ ಚಟ್ನಿ", en: "Eerulli Chutney" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ಸಾಸಿವೆ", en: "Sasive" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
    ],
    // Wednesday
    [
      { kn: "ಚಪಾತಿ", en: "Chapati", qty: "2" },
      { kn: "ಬಾಜಿ / ಪಲ್ಯ", en: "Baji / Palya" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಪಾಲಾದ್ಯ", en: "Paladya" },
      { kn: "ರಸಂ", en: "Rasam" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
    ],
    // Thursday
    [
      { kn: "ಜೋಳ ರೊಟ್ಟಿ", en: "Jola Rotti", qty: "2" },
      { kn: "ಬಾಜಿ / ಪಲ್ಯ", en: "Baji / Palya" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಹಶಿ", en: "Hashi" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
    ],
    // Friday
    [
      { kn: "ಅಕ್ಕಿ ರೊಟ್ಟಿ", en: "Akki Rotti", qty: "2" },
      { kn: "ಈರುಳ್ಳಿ ಚಟ್ನಿ", en: "Eerulli Chutney" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಕಾಯಿ ಗೊಜ್ಜು", en: "Kayi Gojju" },
      { kn: "ದಾಲ್", en: "Dal" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
    ],
    // Saturday
    [
      { kn: "ಜೋಳ ರೊಟ್ಟಿ", en: "Jola Rotti", qty: "2" },
      { kn: "ಬಾಜಿ / ಪಲ್ಯ", en: "Baji / Palya" },
      { kn: "ಅನ್ನ", en: "Rice" },
      { kn: "ಸಾಂಬಾರ್", en: "Sambar" },
      { kn: "ಮೊಸರು", en: "Mosaru" },
      { kn: "ಭಜ್ಜಿ / ಮಾರಿಗೆ ಗೊಜ್ಜು", en: "Bhajji / Marige Gojju" },
    ],
  ],
};

export const MEAL_LABELS: Record<MealType, { kn: string; en: string; icon: string; time: string }> = {
  breakfast: { kn: "ತಿಂಡಿ", en: "Breakfast", icon: "🌅", time: "7:30 – 10:00 AM" },
  lunch: { kn: "ಊಟ", en: "Lunch", icon: "☀️", time: "12:00 – 2:30 PM" },
  dinner: { kn: "ರಾತ್ರಿ ಊಟ", en: "Dinner", icon: "🌙", time: "7:00 – 9:30 PM" },
};

export const MOCK_REGULARS = [
  { name: "ಶ್ರೀನಿವಾಸ ಭಟ್", phone: "98450XXXXX", usual: "Lunch + Dinner daily", lastOrder: "Today", ordersThisMonth: 24, since: "Jan 2026" },
  { name: "ಸರಸ್ವತಿ ಅಮ್ಮ", phone: "94481XXXXX", usual: "Lunch only", lastOrder: "Today", ordersThisMonth: 18, since: "Mar 2026" },
  { name: "ರಾಘವೇಂದ್ರ ಹೆಗಡೆ", phone: "99016XXXXX", usual: "All 3 meals", lastOrder: "Yesterday", ordersThisMonth: 30, since: "Feb 2026" },
  { name: "ಮಂಜುನಾಥ್ ಕಾಮತ್", phone: "80500XXXXX", usual: "Dinner only", lastOrder: "Today", ordersThisMonth: 15, since: "Apr 2026" },
  { name: "ಸುಮಾ ಶಾಸ್ತ್ರಿ", phone: "97310XXXXX", usual: "Lunch + Dinner", lastOrder: "2 days ago", ordersThisMonth: 20, since: "Jan 2026" },
  { name: "ವೆಂಕಟೇಶ್ ನಾಯಕ್", phone: "86603XXXXX", usual: "Breakfast + Lunch", lastOrder: "Today", ordersThisMonth: 22, since: "Mar 2026" },
  { name: "ಅನಿತಾ ಜೋಶಿ", phone: "99001XXXXX", usual: "Lunch (Mon–Fri)", lastOrder: "Yesterday", ordersThisMonth: 12, since: "May 2026" },
  { name: "ಪ್ರಕಾಶ್ ಗೌಡ", phone: "94483XXXXX", usual: "All 3 meals (family of 4)", lastOrder: "Today", ordersThisMonth: 28, since: "Feb 2026" },
];

export const MOCK_ORDERS = [
  { id: "ORD-001", customer: "ಶ್ರೀನಿವಾಸ ಭಟ್", meal: "Lunch" as const, time: "12:30 PM", status: "delivered" as const, items: "Full Thali" },
  { id: "ORD-002", customer: "ರಾಘವೇಂದ್ರ ಹೆಗಡೆ", meal: "Lunch" as const, time: "12:00 PM", status: "out_for_delivery" as const, items: "Full Thali x3" },
  { id: "ORD-003", customer: "ಮಂಜುನಾಥ್ ಕಾಮತ್", meal: "Dinner" as const, time: "7:30 PM", status: "confirmed" as const, items: "Dinner Set" },
  { id: "ORD-004", customer: "ಅನಿತಾ ಜೋಶಿ", meal: "Lunch" as const, time: "1:00 PM", status: "pending" as const, items: "Full Thali" },
  { id: "ORD-005", customer: "ಸುಮಾ ಶಾಸ್ತ್ರಿ", meal: "Dinner" as const, time: "8:00 PM", status: "pending" as const, items: "Dinner Set x2" },
  { id: "ORD-006", customer: "ವೆಂಕಟೇಶ್ ನಾಯಕ್", meal: "Breakfast" as const, time: "8:30 AM", status: "delivered" as const, items: "Breakfast Set" },
];

export const ORDER_STATUS_CONFIG = {
  pending: { label: "Pending", labelKn: "ಬಾಕಿ", color: "bg-amber-100 text-amber-800", next: "confirmed" as const },
  confirmed: { label: "Confirmed", labelKn: "ದೃಢೀಕರಿಸಲಾಗಿದೆ", color: "bg-blue-100 text-blue-800", next: "out_for_delivery" as const },
  out_for_delivery: { label: "Out for Delivery", labelKn: "ಡೆಲಿವರಿಗೆ", color: "bg-purple-100 text-purple-800", next: "delivered" as const },
  delivered: { label: "Delivered", labelKn: "ತಲುಪಿಸಲಾಗಿದೆ", color: "bg-green-100 text-green-800", next: null },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS_CONFIG;
