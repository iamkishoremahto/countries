import { create } from 'zustand';
import axios from 'axios';



const useThemeStore = create((set) => ({
    themeMode: false,
    changeThemeMode: () => set((state) => ({ themeMode: !state.themeMode }))

}))

const useCountryAPIstore = create((set) => ({
    loading: false,
    error: null,
    countries: null,
    getAllCountries: (url) => {
        set({ loading: true })
    
        axios.get(url)
            .then((response) => {
           
                set({ countries: response.data, loading: false, error: null });


            })
            .catch((error) => {
                set({ loading: false, error: error });
            })

    },

}))


const useOneCountryAPIstore = create((set) => ({
    loading: false,
    error: null,
    country: null,
    getCountry: (url) => {
        set({ loading: true })
    
        axios.get(url)
       
            .then((response) => {
            
                set({ country: response.data, loading: false, error: null });


            })
            .catch((error) => {
                set({ loading: false, error: error });
            })

    },

}))




export { useThemeStore, useCountryAPIstore,useOneCountryAPIstore }

