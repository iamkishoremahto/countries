
import { useParams, Link } from "react-router-dom"
import Container from "../../components/Container"
import { MdKeyboardBackspace } from "react-icons/md";
import { useOneCountryAPIstore } from "../../store/useStore";
import { useEffect, useState } from  'react'
import axios from 'axios';
import { LuLoader } from "react-icons/lu";


export default function CountryDetail(){
    const { CountryCode } = useParams()
    const [ loading, setLoading ] = useState(false)
    const [error, setError] = useState(null)
    const [ country, setCountry ] = useState(null)
    const [ borders, setBorders ] = useState(null)

    
    useEffect(() =>{
      
        setLoading(true);
        axios.get(`https://restcountries.com/v3.1/alpha/${CountryCode}`)
        .then((response) => {
            setCountry(response.data[0])
            setLoading(false);
            setError(null);
            if(response.data[0].borders){
               axios.get(`https://restcountries.com/v3.1/alpha?codes=${response.data[0].borders}`)
               .then((response) =>{
                response.data.map((borderCountry,index) =>{
                    if(borders){
                        setBorders( prevValue => [...prevValue, borderCountry.name.common])
                    }
                   
                })
               })
            }
        })
        .catch((error) =>{
            setError(error)
            alert(error.message)
        })
        
    },[])
    
   

    if(!loading){

        return (
            <>
            <div className="flex justify-center items-start min-h-screen dark:bg-very-dark-blue bg-very-light-gray dark:text-white    pt-[100px] ">
                <Container>
                    <div className="mb-11 px-5">
                        <Link to='/' className="flex items-center justify-center gap-2 rounded-lg py-2 dark:bg-dark-blue shadow-lg  lg:w-[150px] lg:text-[30px] w-[100px] text-[20px]"><span><MdKeyboardBackspace /></span><span>Back</span></Link>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <img className="min-w-[200px]" src={country && country.flags.svg} alt="" />
                        </div>
                        <div className="flex flex-col   gap-5 lg:p-2">
                           
                                <h1 className=" text-center lg:text-start lg:text-[40px] text-[25px]  font-semibold">{country && country.name.common}</h1>
                       
                            <div className="grid lg:grid-cols-2 grid-cols-1   w-full text-[18px] lg:text-[25px]  ">
                                <div className="   p-5">
                                    <p className='font-semibold'>Native Name: <span className="font-normal">{country && Object.entries(country.name.nativeName)[0][1].common}</span></p>
                                    <p className='font-semibold'>Population: <span className="font-normal">{country && country.population}</span></p>
                                    <p className='font-semibold'>Region: <span className="font-normal">{country && country.region}</span></p>
                                    <p className='font-semibold'>Sub. Region: <span className="font-normal">{country && country.subregion}</span></p>
                                    <p className='font-semibold'>Capital: <span className="font-normal">{country && country.capital}</span></p>
                                </div>
                                <div className=" p-5">
                                <p className='font-semibold'>Top Level Domain: <span className="font-normal">{country && country.tld}</span></p>
                                <p className='font-semibold'>Currencies: <span className="font-normal">{country && Object.entries(country.currencies)[0][1].name}</span></p>
                                <p className='font-semibold'>Languages: <span className="font-normal">{country && Object.entries(country.languages).map((value,key) =>(`${value[1]} `))}</span></p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center flex-col lg:flex-row">
                                <p className='font-semibold text-[25px]'>Border Countries: </p>
                                <div className="flex gap-3 flex-wrap p-2 lg:justify-center">
                                    {
                                        country && country.borders ? country.borders.map((border,index) =>{
                                            return <a key={index} href = {`/country/${border}`} className="dark:bg-dark-blue p-2 shadow-lg flex items-center justify-center rounded-lg">{border}</a>
                                        }):<p className="text-[20px]">No Borders</p>
                                    }
                                    
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            </>
        )

    }
    else{
        return (<>
       <div className="   min-h-[600px] grid place-items-center text-[150px] text-very-dark-blue"><LuLoader className="animate-spin" /></div></>)
    }

    
}