import Image from "next/image";

export function FFFooter() {
  const columnTitleClass = "font-semibold text-base text-black mb-3";
  const linkClass = "block text-sm text-black py-1 hover:opacity-70 transition-opacity";

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 gap-8 px-8 py-12">
        {/* Column 1 — Logo + Model */}
        <div className="flex flex-col gap-4">
          <span
            className="font-bold text-2xl leading-none"
            style={{ fontFamily: "var(--font-satoshi)" }}
          >
            <span className="text-black">FABFIT</span>
            <span style={{ color: "rgb(251, 126, 36)" }}>.</span>
          </span>
          <Image
            src="/fabfit/footer-model.png"
            alt="FabFit fashion model"
            width={128}
            height={181}
            className="object-cover"
          />
        </div>

        {/* Column 2 — Menu */}
        <div>
          <p className={columnTitleClass}>Menu</p>
          <a href="#" className={linkClass}>All</a>
          <a href="#" className={linkClass}>JERSEYS</a>
          <a href="#" className={linkClass}>ACCESSORIES</a>
        </div>

        {/* Column 3 — Socials */}
        <div>
          <p className={columnTitleClass}>Socials</p>
          <a href="#" className={linkClass}>INSTAGRAM</a>
          <a href="#" className={linkClass}>FACEBOOK</a>
          <a href="#" className={linkClass}>WHATSAPP</a>
        </div>

        {/* Column 4 — Contact Info */}
        <div>
          <p className={columnTitleClass}>Contact Info</p>
          <div className="mb-3">
            <p className="text-sm font-medium">Email:</p>
            <p className="text-sm">support@fabfitfashion.store</p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-medium">Phone:</p>
            <p className="text-sm">+91 99856854125</p>
          </div>
          <div className="mb-3">
            <p className="text-sm font-medium">Address:</p>
            <p className="text-sm">500 Terry, Mumbai, India</p>
          </div>
        </div>

        {/* Column 5 — Pages */}
        <div>
          <p className={columnTitleClass}>Pages</p>
          <a href="#" className={linkClass}>ABOUT US</a>
          <a href="#" className={linkClass}>CONTACT US</a>
          <a href="#" className={linkClass}>RETURNS POLICY</a>
          <a href="#" className={linkClass}>PRIVACY POLICY</a>
          <a href="#" className={linkClass}>FAQ</a>
          <a href="#" className={linkClass}>404</a>
        </div>
      </div>
    </footer>
  );
}
