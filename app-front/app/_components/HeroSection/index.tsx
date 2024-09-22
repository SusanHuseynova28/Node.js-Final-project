export default function HeroSection() {
    return (
      <div className="flex justify-center items-center space-x-4 py-10 px-6 gap-2">
        {/* Sol Tərəf Şəkil */}
        <div className="relative group overflow-hidden w-[650px]">
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_4.jpg?v=1710149492"
            alt="New Bangles Collection"
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white bg-opacity-0 flex flex-col justify-center p-6">
            <h2 className="text-3xl w-[15rem] mb-4">New Bangles Collection</h2>
            <p className="text-sm mb-2">Catch the highlight in the roof</p>
            <a
              href="#"
              className="mb-10 text-black inline-block relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
              style={{ width: 'fit-content' }}
            >
              SHOP NOW
            </a>
          </div>
        </div>
  
        {/* Sağ Tərəf Şəkil */}
        <div className="relative group overflow-hidden w-[650px]">
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_5.jpg?v=1710149492"
            alt="Culture of Ring Design"
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white bg-opacity-0 flex flex-col justify-center p-6">
            <h2 className="text-3xl w-[15rem] mb-4">Culture of Ring Design</h2>
            <p className="text-sm mb-2">Pasha de Cartier Collection.</p>
            <a
              href="#"
              className="mb-10 text-black inline-block relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
              style={{ width: 'fit-content' }}
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    );
  }
  