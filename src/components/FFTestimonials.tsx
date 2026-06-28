import Image from "next/image";

const testimonials = [
  {
    name: "Rohan Kapoor",
    role: "Verified Buyer",
    quote: '"Fast delivery and amazing products! The quality exceeded my expectations."',
    avatar: "/fabfit/avatar-rohan.png",
  },
  {
    name: "Aanay Mehta",
    role: "Verified Buyer",
    quote: '"Didn\'t expect it to be this good. Fast delivery and solid quality."',
    avatar: "/fabfit/avatar-aanay.png",
  },
  {
    name: "Sofia Martinez",
    role: "Verified Buyer",
    quote: '"Quality feels premium and delivery was quick. No complaints."',
    avatar: "/fabfit/avatar-sofia.png",
  },
  {
    name: "Emily Carter",
    role: "Verified Buyer",
    quote: '"Came fast, packed well, and works great. Would buy again."',
    avatar: "/fabfit/avatar-emily.png",
  },
];

export function FFTestimonials() {
  return (
    <section className="bg-white px-8 py-16">
      <h2
        className="text-black mb-8"
        style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "48px" }}
      >
        Customer Testimonials
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="border border-gray-200 rounded-none p-8"
          >
            {/* Top row: avatar + name/role */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div style={{ fontFamily: "var(--font-spline-sans)" }}>
                <p className="text-base font-semibold text-black leading-tight">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 leading-tight">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Quote */}
            <p
              className="text-base text-black italic mb-3"
              style={{ fontFamily: "var(--font-spline-sans)" }}
            >
              {testimonial.quote}
            </p>

            {/* Stars */}
            <span style={{ color: "rgb(255, 193, 7)", fontSize: "1.25rem" }}>
              ★★★★★
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
