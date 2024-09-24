"use client";
export default function JournalPage() {
  return (
    <div className="py-8 mt-16 flex flex-col justify-center">
      <h2 className="text-center text-4xl">Read Journal</h2>
      <p className="text-center text-gray-500 mb-8 mt-2">
        Latest trends and inspirations in fashion design.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        <div className="card">
          <div className="image-container">
            <img
              src="https://demo-alukas.myshopify.com/cdn/shop/articles/3.jpg?v=1711695248&width=533"
              alt=""
            />
            <span className="label">ACCESSORIES</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-small">POST BY ALUKAS SHOPIFY - MAR 06 2024</p>
            <h3 className="text-2xl font-semibold">
              Selective Styles Help your look
            </h3>
            <a href="#" className="underline-animation">
              Continue Reading
            </a>
          </div>
        </div>

        <div className="card">
          <div className="image-container">
            <img
              src="https://demo-alukas.myshopify.com/cdn/shop/articles/2.jpg?v=1711695314&width=533"
              alt=""
            />
            <span className="label">ACCESSORIES</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-small">POST BY ALUKAS SHOPIFY - MAR 06 2024</p>
            <h3 className="text-2xl font-semibold">How to Style a Quiff</h3>
            <a href="#" className="underline-animation">
              Continue Reading
            </a>
          </div>
        </div>

        <div className="card">
          <div className="image-container">
            <img
              src="https://demo-alukas.myshopify.com/cdn/shop/articles/1.jpg?v=1711695328&width=533"
              alt=""
            />
            <span className="label">ACCESSORIES</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-small">POST BY ALUKAS SHOPIFY - MAR 06 2024</p>
            <h3 className="text-2xl font-semibold">Christmas Gift Guide</h3>
            <a href="#" className="underline-animation">
              Continue Reading
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
