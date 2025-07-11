import { type ChangeEvent, type FormEvent, useState } from "react";
import type { SearchType } from "../../types";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather} : FormProps) {

    //State de datos del form
    const [ search, setSearch ] = useState<SearchType>({
        city: '',
        country: ''
    })

    //state de alertas
    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search)
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            {/* Si hay algo en alert, llamamos al componente alert y le pasamos alert que tiene le mensaje */}
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}//lo que se va a escribir en el input se guardara en el city del state
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select
                    id="country"
                    name="country"
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País ---</option>
                    {countries.map( country => (
                        <option
                            key={country.code}
                            value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}
