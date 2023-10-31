/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Home({products}) {
  return (
    <main className='h-screen flex flex-col items-center font-[EduTASBeginner]'>
      <h1 className="text-center sm:w-2/5 text-gray-900 font-bold title-font text-4xl my-4 sm:mb-0">Latest Products</h1>
      <div className="h-1 rounded overflow-hidden mt-2">
        <div className="w-56 h-full bg-red-500"></div>
      </div>
      <div>
        <section className="text-gray-600 body-font mt-6 m-auto">
          <div className="container md:px-28 py-24 mx-auto">
            <div className="flex flex-wrap cursor-pointer -m-4">
              {products.map((item) => {
                return <Link key={item.id} href={`/product/${item.id}`}><div className="lg:w-1/5 md:w-[20%] p-4 w-full shadow-lg mx-5 my-2">
                  <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="-z-10 relative m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={item.image} />
                  </div>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{item.price}</p>
                  </div>
                </div></Link>;
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch("https://fakestoreapi.com/products?limit=10");
  const products = await response.json();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) } // will be passed to the page component as props
  }
}
