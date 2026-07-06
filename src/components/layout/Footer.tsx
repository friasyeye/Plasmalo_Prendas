import Image from "next/image";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { footerLinks, contactInfo } from "@/config/site";

export function Footer() {
  const columnTitleClass = "font-semibold text-base text-black mb-3";
  const linkClass = "block text-sm text-black py-1 hover:opacity-70 transition-opacity";

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 gap-8 px-8 py-12">
        {/* Column 1 — Logo */}
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo_plasmalo.png"
            alt="Plásmalo"
            width={512}
            height={512}
            className="h-12 w-12 object-contain"
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

        {/* Column 3 — Redes Sociales con iconos */}
        <div>
          <p className={columnTitleClass}>Redes Sociales</p>
          <div className="space-y-3">
            <a href={contactInfo.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <InstagramIcon size={18} />
              <span className="text-sm">{contactInfo.instagram.handle}</span>
            </a>
            <a href={contactInfo.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <MessageCircle size={18} />
              <span className="text-sm">{contactInfo.whatsapp.label}</span>
            </a>
          </div>
        </div>

        {/* Column 4 — Contact Info con iconos */}
        <div>
          <p className={columnTitleClass}>Contacto</p>
          <div className="space-y-3">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <Mail size={18} />
              <span className="text-sm">{contactInfo.email}</span>
            </a>
            <div className="flex items-center gap-2 text-black">
              <MapPin size={18} />
              <span className="text-sm">{contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Column 5 — Legal Pages */}
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
