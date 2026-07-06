import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { footerLinks, contactInfo } from "@/config/site";

export function Footer() {
  const columnTitleClass = "font-semibold text-base text-black mb-3";
  const linkClass = "block text-sm text-black py-1 hover:opacity-70 transition-opacity break-words";

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="grid grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:gap-8 md:px-8 md:py-12">
        {/* Column 1 — Logo */}
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Image
            src="/images/logo_plasmalo.png"
            alt="Plásmalo"
            width={512}
            height={512}
            className="h-20 w-20 object-contain"
          />
          <p className="text-xs text-gray-600">{contactInfo.tagline}</p>
        </div>

        {/* Column 2 — Menu */}
        <div>
          <p className={columnTitleClass}>Catálogo</p>
          {footerLinks.catalogo.map(({ label, href }) => (
            <a key={label} href={href} className={linkClass}>{label}</a>
          ))}
        </div>

        {/* Column 3 — Contact Info con iconos (incluye redes sociales) */}
        <div>
          <p className={columnTitleClass}>Contacto</p>
          <div className="space-y-3">
            <a href={contactInfo.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <WhatsAppIcon size={18} />
              <span className="text-sm">{contactInfo.whatsapp.label}</span>
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <Mail size={18} className="shrink-0" />
              <span className="text-sm break-all">{contactInfo.email}</span>
            </a>
            <a href={contactInfo.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <InstagramIcon size={18} />
              <span className="text-sm">{contactInfo.instagram.handle}</span>
            </a>
            <div className="flex items-center gap-2 text-black">
              <MapPin size={18} />
              <span className="text-sm">{contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Column 4 — Legal Pages */}
        <div>
          <p className={columnTitleClass}>Legal</p>
          {footerLinks.legal.map(({ label, href }) => (
            <a key={label} href={href} className={linkClass}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
