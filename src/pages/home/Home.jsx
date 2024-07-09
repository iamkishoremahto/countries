import Container from "../../components/Container"
import { IoSearch } from "react-icons/io5";
import CountryCard from "./components/CountryCard";
import { LuLoader } from "react-icons/lu";
import { useCountryAPIstore } from "../../store/useStore";
import { useState, useEffect } from 'react'

export default function Home() {
    const { loading, error, countries, getAllCountries } = useCountryAPIstore();
   const [searchValue, setSearchValue] = useState('')

    useEffect(()=>{
        getAllCountries('https://restcountries.com/v3.1/all');
   

    },[])

 

    const handleSearch = (e) =>{
        setSearchValue(e.target.value);
    }
    const handleFilter = (e) =>{
        let region = e.target.value;
        if(region === ""){
            getAllCountries('https://restcountries.com/v3.1/all');
        }
        else{
            getAllCountries(`https://restcountries.com/v3.1/region/${region}`);
        }
    }

    
    
   
    
    
    return (
        <>
            <div className=" min-h-screen min-w-screen dark:bg-blue-950 bg-very-light-gray dark:bg-very-dark-blue py-11 px-5 flex justify-center ">
                <Container>
                    <div className="searchWrapper  ">
                        <div className="search flex flex-col lg:flex-row gap-5 items-center justify-between ">
                            <div className=" flex items-center  ">
                                <div className="flex  shadow-xl dark:bg-dark-blue bg-white px-5 py-2 rounded-lg items-center gap-5">
                                <span className=" rounded-l-md text-[35px] flex items-center justify-center dark:text-white  text-gray-600"><IoSearch /></span><span ><input type="text" onKeyUp = {handleSearch} placeholder="Search for a country..." className="lg:text-[23px] text-[15px] dark:bg-dark-blue dark:text-white p-2 active:border-none outline-none placeholder:text-[18px]" /></span>
                                </div>
                               
                            </div>

                            <div className="rounded-lg overflow-hidden dark:bg-dark-blue bg-white px-2 shadow-xl min-w-[250px] h-[60px]  flex items-center justify-center">
                                
                                    <select onChange = {handleFilter} className=" cursor-pointer w-full h-full dark:bg-dark-blue bg-white outline-none dark:text-white p-5">
                                        <option value="" selected>Filter by Region</option>
                                        <option value="africa">Africa</option>
                                        <option value="america">America</option>
                                        <option value="asia">Asia</option>
                                        <option value="europe">Europe</option>
                                        <option value="oceania">Oceania</option>
                                    </select>
                                
                            </div>
                        </div>
                    </div>

                    {
                        loading?<div className="   min-h-[600px] grid place-items-center text-[150px] text-very-dark-blue"><LuLoader className="animate-spin" /></div>
                    :<div className="showCountries mt-[100px]  flex gap-6 p-5 items-center justify-center flex-wrap">
                    
                    {
                      countries &&  countries.map((country,index) =>(

                        searchValue !== '' ?  country.name.common.toLowerCase().includes(searchValue.toLowerCase()) 
                        && <CountryCard key={index} name = {country.name.common} population = {country.population} region = {country.region} capital = {country.capital} flag={country.flags.svg} countryCode = {country.altSpellings[0]} />
                        : <CountryCard key={index} name = {country.name.common} population = {country.population} region = {country.region} capital = {country.capital} flag={country.flags.svg} countryCode = {country.altSpellings[0]} />
                        ))
                    }
                    </div>}
                </Container>
            </div>


        </>
    )
}