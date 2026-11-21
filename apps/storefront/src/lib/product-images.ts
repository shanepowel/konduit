/**
 * Static catalogue imagery for the offline (zero-Cloud) storefront.
 * Photos are illustrative of product type, not OEM marketing assets.
 */

export type CatalogImageKey =
  | "laptop"
  | "desktop"
  | "switch"
  | "server"
  | "firewall"
  | "wifi"
  | "router"
  | "radio"
  | "ups"
  | "inverter"
  | "printer"
  | "phone"
  | "storage"
  | "monitor"
  | "battery"
  | "cabling"
  | "survey"

const IMAGE_BY_KEY: Record<CatalogImageKey, string> = {
  laptop: "/images/catalog/catalog-laptop.jpg",
  desktop: "/images/catalog/catalog-desktop.jpg",
  switch: "/images/catalog/catalog-switch.jpg",
  server: "/images/catalog/catalog-server.jpg",
  firewall: "/images/catalog/catalog-firewall.jpg",
  wifi: "/images/catalog/catalog-wifi.jpg",
  router: "/images/catalog/catalog-router.jpg",
  radio: "/images/catalog/catalog-radio.jpg",
  ups: "/images/catalog/catalog-ups.jpg",
  inverter: "/images/catalog/catalog-inverter.jpg",
  printer: "/images/catalog/catalog-printer.jpg",
  phone: "/images/catalog/catalog-phone.jpg",
  storage: "/images/catalog/catalog-storage.jpg",
  monitor: "/images/catalog/catalog-monitor.jpg",
  battery: "/images/catalog/catalog-battery.jpg",
  cabling: "/images/catalog/catalog-cabling.jpg",
  survey: "/images/catalog/catalog-survey.jpg",
}

const HANDLE_IMAGE: Record<string, CatalogImageKey> = {
  "lenovo-thinkpad-t14-gen-5": "laptop",
  "dell-optiplex-7020-tower": "desktop",
  "cisco-catalyst-9200l-24p": "switch",
  "dell-poweredge-r740": "server",
  "hpe-msa-2060": "storage",
  "dell-poweredge-t350": "server",
  "fortinet-fortigate-60f": "firewall",
  "structured-cabling-cat6-per-metre": "cabling",
  "apc-netshelter-42u-accessories": "cabling",
  "hpe-proliant-dl360-gen10-plus": "server",
  "cisco-isr-4331": "router",
  "dell-powerswitch-n3248p-on": "switch",
  "apc-rack-pdu-metered-16a": "cabling",
  "ubiquiti-unifi-u6-pro": "wifi",
  "telecoms-site-survey": "survey",
  "ubiquiti-unifi-u6-enterprise": "wifi",
  "ubiquiti-unifi-dream-machine-pro": "router",
  "mikrotik-hap-ax3": "wifi",
  "mikrotik-ccr2004-12s": "router",
  "ubiquiti-airfiber-60-lr": "radio",
  "ubiquiti-nanostation-5ac": "radio",
  "starlink-business-kit": "radio",
  "cisco-ip-phone-8841": "phone",
  "ubiquiti-unifi-switch-lite-8-poe": "switch",
  "mikrotik-audience": "wifi",
  "ubiquiti-edgerouter-4": "router",
  "yealink-t46u": "phone",
  "imports-business-router-kit": "router",
  "apc-smart-ups-1500va": "ups",
  "eaton-5p-1550va": "ups",
  "victron-multiplus-48-5000": "inverter",
  "victron-smartsolar-mppt-150-45": "inverter",
  "pylontech-us3000c": "battery",
  "anker-737-power-bank": "battery",
  "apc-surge-protection-strip": "cabling",
  "hp-laserjet-pro-4002dw": "printer",
  "brother-hl-l6400dw": "printer",
  "dell-p2723d-monitor": "monitor",
  "huawei-sun2000-5ktl": "inverter",
  "cyberpower-cp1500epfclcd": "ups",
  "sunsynk-5-5kw-hybrid": "inverter",
}

export const HERO_WAREHOUSE_IMAGE = "/images/hero/warehouse.jpg"

export function catalogImageForHandle(handle: string): string {
  const key = HANDLE_IMAGE[handle] || "server"
  return IMAGE_BY_KEY[key]
}

export function catalogImagesForHandle(handle: string): { id: string; url: string }[] {
  const url = catalogImageForHandle(handle)
  return [{ id: `img_${handle}`, url }]
}
