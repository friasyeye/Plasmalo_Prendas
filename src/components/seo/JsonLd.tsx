/**
 * Datos estructurados (schema.org) para Google, como <script type="application/ld+json">.
 * Se escapa "<" para que un texto con "</script>" no pueda cerrar la etiqueta.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
