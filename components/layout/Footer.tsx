import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Lock,
} from "lucide-react";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={className}
      style={{
        background:
          "linear-gradient(160deg, #0F1825 0%, #1A2433 50%, #0F1825 100%)",
        color: "#AECAE9",
        marginTop: "auto",
      }}
    >
      {/* ── CTA Banner removed per user request ──────────────── */}

      {/* ── Main Footer Grid ─────────────────────────── */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "56px 20px 48px",
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              className="w-12 h-12 bg-white flex items-center justify-center p-1.5 shrink-0 shadow-sm"
              style={{ borderRadius: "6px" }}
            >
              <Image
                src="/logo.png"
                alt="GSTradeLink Logo"
                width={60}
                height={60}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  lineHeight: 1,
                }}
              >
                GSTradeLink
              </div>
              <div
                style={{
                  color: "#6D94C5",
                  fontSize: "0.7rem",
                  marginTop: "3px",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                }}
              >
                Bharatpur · Chitwan
              </div>
            </div>
          </div>
          <p
            style={{
              color: "#6D94C5",
              fontSize: "0.875rem",
              lineHeight: 1.7,
              maxWidth: "22rem",
            }}
          >
            Your trusted partner for precision weighing solutions in Chitwan.
            Authorized sales, calibration, and expert repair services since
            2015.
          </p>
          {/* Business hours badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "20px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              fontSize: "0.75rem",
              color: "#6D94C5",
            }}
          >
            <Clock size={12} style={{ color: "#DCA963" }} />
            Open all days except Monday: 10:00 AM – 6:00 PM
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "18px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Quick Links
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[
              { label: "Browse Catalogue", href: "/products" },
              {
                label: "Precision Scales",
                href: "/products?category=Precision%20%26%20Pocket%20Mini%20Scales",
              },
              {
                label: "Kitchen Scales",
                href: "/products?category=Kitchen%20%26%20Compact%20Tabletop%20Scales",
              },
              {
                label: "Health & Baby",
                href: "/products?category=Personal%20Health%20%26%20Bathroom%20Scales",
              },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#6D94C5",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  <ArrowRight
                    size={12}
                    style={{ color: "rgba(220,169,99,0.55)", flexShrink: 0 }}
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "18px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Categories
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[
              {
                label: "Luggage Scales",
                href: "/products?category=Portable%20%26%20Luggage%20Scales",
              },
              {
                label: "Crane & Hanging",
                href: "/products?category=Heavy-Duty%20Hanging%20%26%20Crane%20Scales",
              },
              {
                label: "Packaging Equip",
                href: "/products?category=Packaging%20%26%20Miscellaneous%20Equipment",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#6D94C5",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "rgba(220,169,99,0.6)",
                      flexShrink: 0,
                    }}
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "18px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Get in Touch
          </h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {[
              {
                icon: MapPin,
                text: "Bharatpur-3, Chitwan, Nepal",
                href: "https://www.google.com/maps/place/G.+S+Trade+link+(+Taraju+pasa)/@27.6920136,84.4236706,19z/data=!4m10!1m2!2m1!1sgs+trade+link+chitwan!3m6!1s0x3994fb007174d2ff:0x18e2ebfc7038baf7!8m2!3d27.6920149!4d84.4244971!15sChVncyB0cmFkZSBsaW5rIGNoaXR3YW6SAQp3aG9sZXNhbGVy4AEA!16s%2Fg%2F11lf1yxdwc?entry=ttu",
              },
              {
                icon: Phone,
                text: "+977 9845541939",
                href: "tel:+9779845541939",
              },
              { icon: Mail, text: "gstradelinkngt@gmail.com", href: undefined },
            ].map(({ icon: Icon, text, href }) => (
              <li
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  <Icon size={13} style={{ color: "#DCA963" }} />
                </div>
                {href ? (
                  <a
                    href={href}
                    style={{
                      color: "#6D94C5",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      textDecoration: "none",
                    }}
                  >
                    {text}
                  </a>
                ) : (
                  <span
                    style={{
                      color: "#6D94C5",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      wordBreak: "break-word",
                    }}
                  >
                    {text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "18px 20px",
        }}
      >
        <div
          style={{ maxWidth: "72rem", margin: "0 auto" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p style={{ fontSize: "0.75rem", color: "#4A6070" }}>
            © {new Date().getFullYear()} GSTradeLink. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p style={{ fontSize: "0.75rem", color: "#4A6070" }}>
              Bharatpur, Chitwan, Nepal
            </p>
            {/* Discreet admin access — intentionally low-visibility */}
            <Link
              href="/admin/login"
              title=""
              aria-label="Admin"
              className="transition-opacity hover:opacity-60"
              style={{ color: "#2A3A4A", opacity: 0.35 }}
            >
              <Lock size={11} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
