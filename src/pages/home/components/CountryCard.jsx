import { Link } from 'react-router-dom';



export default function CountryCard({name ,population,region,capital,flag,countryCode}){
   
    return (
        <>
        <Link to= {`/country/${countryCode}`} className=" cursor-pointer min-h-[420px] dark:bg-dark-blue bg-white shadow-xl max-w-[320px]  rounded-lg overflow-hidden ">
            <div>
                <img className='min-w-[300px]' loading= 'lazy' src={flag} alt="" />
            </div>
            <div className="p-8">
                <h1 className=" text-[25px] font-semibold dark:text-white">{name}</h1>
                <div>
                    <p className=" text-[16px] font-semibold dark:text-white">Population: <span className=" font-normal">{population}</span></p>
                    <p className=" text-[16px] font-semibold dark:text-white">Region: <span className=" font-normal">{region}</span></p>
                    <p className=" text-[16px] font-semibold dark:text-white">Capital: <span className=" font-normal">{capital}</span></p>
                </div>
            </div>
        </Link>
        </>
    )
}