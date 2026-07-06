import Image from "next/image";
import { Mail, MessageCircle, MapPin } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

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
          <p className="text-xs text-gray-600">Prendas personalizadas con diseño y calidad</p>
        </div>

        {/* Column 2 — Menu */}
        <div>
          <p className={columnTitleClass}>Catálogo</p>
          <a href="#" className={linkClass}>Camisetas</a>
          <a href="#" className={linkClass}>Sudaderas</a>
          <a href="#" className={linkClass}>Polos</a>
        </div>

        {/* Column 3 — Redes Sociales con iconos */}
        <div>
          <p className={columnTitleClass}>Redes Sociales</p>
          <div className="space-y-3">
            <a href="https://instagram.com/plasmalo_prendas" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <InstagramIcon size={18} />
              <span className="text-sm">@plasmalo_prendas</span>
            </a>
            <a href="https://wa.me/34632742050" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <MessageCircle size={18} />
              <span className="text-sm">+34 632 742 050</span>
            </a>
          </div>
        </div>

        {/* Column 4 — Contact Info con iconos */}
        <div>
          <p className={columnTitleClass}>Contacto</p>
          <div className="space-y-3">
            <a href="mailto:esperandocorreo@gmail.com" className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity">
              <Mail size={18} />
              <span className="text-sm">esperandocorreo@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-black">
              <MapPin size={18} />
              <span className="text-sm">Barcelona, España</span>
            </div>
          </div>
        </div>

        {/* Column 5 — Legal Pages */}
        <div>
          <p className={columnTitleClass}>Legal</p>
          <a href="#" className={linkClass}>FAQ</a>
          <a href="#" className={linkClass}>Política de Privacidad</a>
          <a href="#" className={linkClass}>Términos de Servicio</a>
          <a href="#" className={linkClass}>Política de Devoluciones</a>
          <a href="#" className={linkClass}>Envíos</a>
        </div>
      </div>
    </footer>
  );
}
