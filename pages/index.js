/* eslint-disable @next/next/no-img-element */
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

export default function Home({ setProgress, Categorys }) {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [loading, setLoading] = useState([true])
  let paginatedPosts;

  const onPageChange = (page) => {
    setProgress(30)
    setCurrentPage(page);
    setProgress(100)
  };

  const onFilterChange = async (Val) => {
    setProgress(10)
    const url = `https://fakestoreapi.com/products/category/${Val}`
    setLoading(true)
    let data = await fetch(url)
    setProgress(30)
    let parsedData = await data.json()
    setProgress(70)
    setProducts(parsedData)
    setLoading(false)
    setProgress(100)
  }

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }
  setProgress(70)
  paginatedPosts = paginate(products, currentPage, pageSize);
  setProgress(100)

  const getProducts = async () => {
    setProgress(10)
    const url = `https://fakestoreapi.com/products`
    setLoading(true)
    let data = await fetch(url)
    setProgress(30)
    let parsedData = await data.json()
    setProgress(70)
    setProducts(parsedData)
    setLoading(false)
    setProgress(100)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main className='flex flex-col items-center font-[EduTASBeginner]'>
      <h1 className="text-center sm:w-2/5 text-gray-900 font-bold title-font text-4xl my-4 sm:mb-0">Latest Products</h1>
      <div className="h-1 rounded overflow-hidden mt-2">
        <div className="w-56 h-full bg-red-500"></div>
      </div>
      <div className="flex justify-center md:flex-row flex-col mt-5">
        <button onClick={() => getProducts()} className="bg-red-500 p-1 px-4 mx-5 md:my-0 my-1 btn fw-bold rounded-3xl text-white">All</button>
        {Categorys.map((Val, id) => {
          return (
            <button
              onClick={() => onFilterChange(Val)}
              className="bg-red-500 p-1 px-4 mx-5 btn fw-bold rounded-3xl md:my-0 my-1 text-white"
              key={id}
            >
              {Val}
            </button>
          );
        })}
      </div>
      <div>
        {loading && <Spinner />}
        <section className="text-gray-600 body-font mt-6 m-auto">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center">
              {paginatedPosts.map((item) => {
                return <Link key={item.id} href={`/product/${item.id}`}><div className="p-4 shadow-lg mx-5 my-2 md:w-[20vw] w-full">
                  <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="-z-10 relative mx-auto h-[30vh] md:h-[36vh] block" src={item.image} />
                  </div>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">${item.price}</p>
                  </div>
                </div></Link>;
              })}
            </div>
          </div>
        </section>
        <div className="buttons flex justify-center mt-6 items-center">
          <button disabled={currentPage == 1 ? true : false} className="PrevButton disabled:hover:cursor-not-allowed disabled:bg-red-300 flex text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded cursor-pointer mr-4" onClick={() => { onPageChange(1) }}>Previous</button>
          <Pagination
            items={products.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
          <button disabled={currentPage == 2 ? true : false} className="disabled:hover:cursor-not-allowed disabled:bg-red-300 NextButton flex ml-4 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded cursor-pointer" onClick={() => { onPageChange(2) }}>Next</button>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  const filterUrl = 'https://fakestoreapi.com/products/categories'
  let filterData = await fetch(filterUrl)
  let Categorys = await filterData.json()
  return { props: { Categorys } }
}