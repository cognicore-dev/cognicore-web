/**
 * Renders structured data as <script type="application/ld+json">, on the server, as the Next.js JSON-LD guide
 * recommends. "<" is escaped so no string in the data can close the script tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
