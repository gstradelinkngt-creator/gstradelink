/**
 * Business contact details shared by every public page.
 * Change the phone number, email or address here — nowhere else.
 */
export const SITE = {
  name: "GSTradeLink",
  phoneDisplay: "+977 984-5541939",
  phoneHref: "tel:+9779845541939",
  whatsapp: "https://wa.me/9779845541939",
  email: "gstradelinkngt@gmail.com",
  address: "Bharatpur-3, Chitwan, Nepal",
  mapsUrl:
    "https://www.google.com/maps/place/G.+S+Trade+link+(+Taraju+pasa)/@27.6920136,84.4236706,19z/data=!4m10!1m2!2m1!1sgs+trade+link+chitwan!3m6!1s0x3994fb007174d2ff:0x18e2ebfc7038baf7!8m2!3d27.6920149!4d84.4244971!15sChVncyB0cmFkZSBsaW5rIGNoaXR3YW6SAQp3aG9sZXNhbGVy4AEA!16s%2Fg%2F11lf1yxdwc?entry=ttu",
  hoursShort: "10 AM – 6 PM · closed Mondays",
  since: 2015,
} as const;

/** WhatsApp deep link with a pre-filled message. */
export function waLink(message: string) {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry(productName: string) {
  return waLink(
    `Hello GSTradeLink! I'm interested in the ${productName}. Could you please share availability and pricing?`,
  );
}

/** Store hours, Sunday-first to match Date#getDay(). */
export const HOURS = [
  { day: "Sunday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Monday", time: "Closed", open: false },
  { day: "Tuesday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Wednesday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Thursday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Friday", time: "10:00 AM – 6:00 PM", open: true },
  { day: "Saturday", time: "10:00 AM – 6:00 PM", open: true },
] as const;
